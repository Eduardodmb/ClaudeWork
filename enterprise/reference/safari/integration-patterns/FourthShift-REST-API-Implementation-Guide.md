# Fourth Shift REST API Wrapper - Implementation Guide

**Project**: REST API Wrapper for Fourth Shift Transactional Interface (FSTM)  
**Date**: January 2025  
**Author**: Implementation guide for Safari IT  
**Technology Stack**: ASP.NET Core, C#, Fourth Shift SDK 8.00

---

## Table of Contents

1. [Executive Summary](#executive-summary)
2. [Architecture Overview](#architecture-overview)
3. [Technology Stack Selection](#technology-stack-selection)
4. [Key Implementation Components](#key-implementation-components)
5. [Complete Code Implementation](#complete-code-implementation)
6. [Configuration Guide](#configuration-guide)
7. [API Endpoints Reference](#api-endpoints-reference)
8. [Kafka Integration Strategy](#kafka-integration-strategy)
9. [Deployment Considerations](#deployment-considerations)
10. [Testing Strategy](#testing-strategy)
11. [Security Considerations](#security-considerations)
12. [Future Enhancements](#future-enhancements)

---

## Executive Summary

### Objective
Create a modern REST API wrapper around the Fourth Shift Transactional Interface (FSTM) to enable:
- Integration with modern tools (Confluent Kafka, Apache Kafka, Apache Iceberg)
- Simplified external system integration without .NET SDK requirements
- Scalable, cloud-ready architecture
- Event-driven data pipelines for data warehouse migration (PostgreSQL/Microsoft Fabric)

### Why This Approach?

**Current State:**
- Fourth Shift uses .NET COM-based SDK
- Direct integration requires .NET assemblies
- Limited scalability options
- Complex for external partners (Planful, etc.)

**Target State:**
- HTTP REST API (language-agnostic)
- Connection pooling for performance
- Event streaming support (Kafka)
- Modern observability and monitoring
- Container-ready (Docker/Kubernetes)

### Business Value
1. **Partner Integration**: Easy API access for Planful FP&A and other external systems
2. **Data Pipeline**: Enable real-time replication to PostgreSQL/Fabric lakehouse
3. **Scalability**: Horizontal scaling of API instances
4. **Future-Proof**: Positions architecture for Fourth Shift → Modern ERP migration
5. **CMMC Compliance**: Centralized audit trails and logging

---

## Architecture Overview

### High-Level Architecture

```
┌─────────────────┐
│ External Systems│
│ (Planful, etc.) │
└────────┬────────┘
         │ HTTPS/REST
         ▼
┌─────────────────────────────────┐
│   REST API Layer                │
│   (ASP.NET Core Web API)        │
│                                 │
│  ┌──────────────────────────┐  │
│  │  TransactionsController  │  │
│  └───────────┬──────────────┘  │
│              │                  │
│  ┌───────────▼──────────────┐  │
│  │   TransactionService     │  │
│  └───────────┬──────────────┘  │
│              │                  │
│  ┌───────────▼──────────────┐  │
│  │   FSTIClientPool         │  │
│  │  (Connection Pooling)    │  │
│  └───────────┬──────────────┘  │
└──────────────┼──────────────────┘
               │
               ▼
┌──────────────────────────────────┐
│  Fourth Shift Remoting Service   │
│  (Fourth Shift Server)           │
│                                  │
│  ┌────────────┐ ┌────────────┐  │
│  │FSTIApp.exe │ │FSTIApp.exe │  │
│  └────────────┘ └────────────┘  │
└──────────────┬───────────────────┘
               │
               ▼
┌──────────────────────────────────┐
│   Fourth Shift Database          │
│   (SQL Server)                   │
└──────────────────────────────────┘

         Optional: Kafka Integration
         
┌─────────────────────────────────┐
│   Kafka Producer                │
│   (Async Processing)            │
└───────────┬─────────────────────┘
            │
            ▼
┌─────────────────────────────────┐
│   Kafka Topic                   │
│   "fourthshift-transactions"    │
└───────────┬─────────────────────┘
            │
            ▼
┌─────────────────────────────────┐
│   Consumer Workers              │
│   (Process transactions)        │
└───────────┬─────────────────────┘
            │
            ▼
┌─────────────────────────────────┐
│   Results Topic                 │
│   → PostgreSQL                  │
│   → Fabric Lakehouse            │
└─────────────────────────────────┘
```

### Component Responsibilities

| Component | Responsibility | Technology |
|-----------|---------------|------------|
| **REST API** | HTTP endpoint management, validation | ASP.NET Core 8.0 |
| **TransactionService** | Business logic, transaction orchestration | C# Service Layer |
| **FSTIClientPool** | Connection pooling, lifecycle management | Custom Singleton |
| **FSTIClient** | Fourth Shift SDK wrapper | Fourth Shift SDK |
| **Kafka Producer** | Async message queuing (optional) | Confluent.Kafka |

---

## Technology Stack Selection

### C# vs VB.NET vs VB6

Based on analysis of the Fourth Shift SDK samples, **C# is the definitive choice**:

| Criteria | C# | VB.NET | VB6 |
|----------|-----|---------|-----|
| **Modern Web API** | ✅ Native | ✅ Native | ❌ No framework |
| **Async/Await** | ✅ Full support | ✅ Full support | ❌ None |
| **Kafka Libraries** | ✅ Excellent | ✅ Good | ❌ COM workarounds |
| **Container Support** | ✅ Docker/K8s | ✅ Docker/K8s | ❌ Difficult |
| **Developer Pool** | ✅ Large | ⚠️ Smaller | ❌ Very limited |
| **Future-Proof** | ✅ Active dev | ⚠️ Maintenance | ❌ Legacy |
| **Cloud-Native** | ✅ Azure/AWS SDK | ✅ Azure/AWS SDK | ❌ Poor support |

### Recommended Stack

```yaml
Runtime: .NET 8.0 (LTS)
Web Framework: ASP.NET Core 8.0
Language: C# 12
API Style: RESTful JSON
Authentication: JWT Bearer Tokens + API Keys
Messaging: Confluent.Kafka (optional)
Observability: OpenTelemetry + Application Insights
Containerization: Docker
Orchestration: Kubernetes (future)
```

---

## Key Implementation Components

### Critical Findings from SDK Analysis

From analyzing `FSTIInsertItemSample.cs` and `ItmbObject.cs`:

1. **FSTIClient is Stateful**: Can be reused for multiple transactions after initialization
2. **Requires Explicit Cleanup**: Must call `Terminate()` to release resources
3. **Unified Logon**: Should be DISABLED in server context (set to `false`)
4. **Thread-Safety**: Unknown - requires testing, likely needs synchronization
5. **Connection Pattern**:
   ```csharp
   Initialize → Logon → ProcessId (multiple times) → Terminate
   ```

### Connection Pool Strategy

**Why Connection Pooling?**
- FSTIClient initialization has overhead (.NET Remoting connection)
- Logon consumes Fourth Shift license
- Reusing authenticated sessions improves performance
- Reduces load on Fourth Shift server

**Pool Design:**
- Pre-initialized pool of authenticated FSTIClient instances
- Semaphore-based concurrency control
- Health checks for stale connections
- Automatic recreation of failed clients

---

## Complete Code Implementation

### 1. Configuration Models

```csharp
// Configuration/FSTIConfiguration.cs
namespace FourthShiftAPI.Configuration
{
    public class FSTIConfiguration
    {
        /// <summary>
        /// Path to Fourth Shift configuration file (fs.cfg)
        /// Example: "\\\\server\\mfgsys\\fs.cfg"
        /// Leave empty if using SystemName/ServerName
        /// </summary>
        public string ConfigFilePath { get; set; }
        
        /// <summary>
        /// Fourth Shift system name (from fs.cfg)
        /// Used if ConfigFilePath is empty
        /// </summary>
        public string SystemName { get; set; }
        
        /// <summary>
        /// Fourth Shift database server name
        /// Used if ConfigFilePath is empty
        /// </summary>
        public string ServerName { get; set; }
        
        /// <summary>
        /// TCP/IP port for Fourth Shift Remoting Service
        /// Default: 7361
        /// </summary>
        public string Port { get; set; } = "7361";
        
        /// <summary>
        /// Service account user ID for API authentication to Fourth Shift
        /// </summary>
        public string UserId { get; set; }
        
        /// <summary>
        /// Service account password
        /// Should be encrypted in production
        /// </summary>
        public string Password { get; set; }
        
        /// <summary>
        /// Enable impersonation support
        /// Allows API to submit transactions as different users
        /// Must also configure impersonation in Fourth Shift SDK Admin
        /// </summary>
        public bool EnableImpersonation { get; set; } = true;
        
        /// <summary>
        /// Maximum number of pooled FSTIClient connections
        /// Recommend: 10-20 for typical load
        /// </summary>
        public int MaxPoolSize { get; set; } = 10;
        
        /// <summary>
        /// Maximum idle time before client is considered stale
        /// </summary>
        public int MaxIdleMinutes { get; set; } = 30;
        
        /// <summary>
        /// Connection timeout in seconds
        /// </summary>
        public int ConnectionTimeoutSeconds { get; set; } = 30;
    }
}
```

### 2. Connection Pool Implementation

```csharp
// Services/FSTIClientPool.cs
using System;
using System.Collections.Concurrent;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using SoftBrands.FourthShift.Transaction;
using FourthShiftAPI.Configuration;

namespace FourthShiftAPI.Services
{
    public class FSTIClientPool : IDisposable
    {
        private readonly ConcurrentBag<FSTIClientWrapper> _availableClients;
        private readonly SemaphoreSlim _semaphore;
        private readonly FSTIConfiguration _config;
        private readonly ILogger<FSTIClientPool> _logger;
        private int _totalClients = 0;
        private bool _disposed = false;
        
        public class FSTIClientWrapper
        {
            public FSTIClient Client { get; set; }
            public DateTime LastUsed { get; set; }
            public DateTime Created { get; set; }
            public Guid Id { get; set; }
            public int UsageCount { get; set; }
        }
        
        public FSTIClientPool(
            IOptions<FSTIConfiguration> config,
            ILogger<FSTIClientPool> logger)
        {
            _config = config.Value;
            _logger = logger;
            _availableClients = new ConcurrentBag<FSTIClientWrapper>();
            _semaphore = new SemaphoreSlim(_config.MaxPoolSize, _config.MaxPoolSize);
            
            _logger.LogInformation(
                "Initialized FSTIClientPool with max size {MaxSize}",
                _config.MaxPoolSize);
        }
        
        public async Task<FSTIClientWrapper> AcquireClientAsync(
            CancellationToken cancellationToken = default)
        {
            if (_disposed)
                throw new ObjectDisposedException(nameof(FSTIClientPool));
            
            // Wait for available slot
            await _semaphore.WaitAsync(cancellationToken);
            
            try
            {
                // Try to get existing client from pool
                if (_availableClients.TryTake(out var wrapper))
                {
                    // Validate client health
                    if (IsClientHealthy(wrapper))
                    {
                        wrapper.LastUsed = DateTime.UtcNow;
                        wrapper.UsageCount++;
                        
                        _logger.LogDebug(
                            "Reusing FSTIClient {ClientId}, usage count: {Count}",
                            wrapper.Id,
                            wrapper.UsageCount);
                        
                        return wrapper;
                    }
                    else
                    {
                        // Client is stale or unhealthy, terminate it
                        _logger.LogWarning(
                            "FSTIClient {ClientId} is unhealthy, terminating",
                            wrapper.Id);
                        
                        TerminateClient(wrapper);
                    }
                }
                
                // No healthy client available, create new one
                return await CreateNewClientAsync(cancellationToken);
            }
            catch
            {
                // Release semaphore on error
                _semaphore.Release();
                throw;
            }
        }
        
        public void ReleaseClient(FSTIClientWrapper wrapper)
        {
            if (wrapper == null) return;
            
            if (_disposed)
            {
                TerminateClient(wrapper);
                return;
            }
            
            try
            {
                wrapper.LastUsed = DateTime.UtcNow;
                _availableClients.Add(wrapper);
                
                _logger.LogDebug(
                    "Released FSTIClient {ClientId} back to pool",
                    wrapper.Id);
            }
            finally
            {
                _semaphore.Release();
            }
        }
        
        private async Task<FSTIClientWrapper> CreateNewClientAsync(
            CancellationToken cancellationToken)
        {
            var client = new FSTIClient();
            var wrapper = new FSTIClientWrapper
            {
                Client = client,
                LastUsed = DateTime.UtcNow,
                Created = DateTime.UtcNow,
                Id = Guid.NewGuid(),
                UsageCount = 0
            };
            
            try
            {
                _logger.LogInformation("Creating new FSTIClient {ClientId}", wrapper.Id);
                
                // Initialize client
                if (!string.IsNullOrEmpty(_config.ConfigFilePath))
                {
                    // Initialize using config file path
                    client.InitializeByConfigFile(
                        _config.ConfigFilePath,
                        unifiedLogon: false,  // IMPORTANT: false for server context
                        impersonation: _config.EnableImpersonation
                    );
                }
                else
                {
                    // Initialize using explicit parameters
                    client.InitializeBySystemName(
                        _config.SystemName,
                        _config.ServerName,
                        unifiedLogon: false,
                        impersonation: _config.EnableImpersonation,
                        _config.Port
                    );
                }
                
                // Perform logon
                string message = null;
                int status = client.Logon(
                    _config.UserId,
                    _config.Password,
                    ref message
                );
                
                if (status > 0)
                {
                    throw new FSTIApplicationException(
                        $"Logon failed for user {_config.UserId}. Status: {status}");
                }
                
                // Log any warning messages from logon
                if (!string.IsNullOrEmpty(message))
                {
                    _logger.LogWarning(
                        "Logon message for client {ClientId}: {Message}",
                        wrapper.Id,
                        message);
                }
                
                Interlocked.Increment(ref _totalClients);
                
                _logger.LogInformation(
                    "Successfully created FSTIClient {ClientId}. Total clients: {Total}",
                    wrapper.Id,
                    _totalClients);
                
                return wrapper;
            }
            catch (Exception ex)
            {
                _logger.LogError(
                    ex,
                    "Failed to create FSTIClient {ClientId}",
                    wrapper.Id);
                
                // Clean up on failure
                try
                {
                    client?.Terminate();
                }
                catch (Exception termEx)
                {
                    _logger.LogError(termEx, "Error terminating failed client");
                }
                
                throw;
            }
        }
        
        private bool IsClientHealthy(FSTIClientWrapper wrapper)
        {
            try
            {
                // Check idle timeout
                var idleTime = DateTime.UtcNow - wrapper.LastUsed;
                if (idleTime > TimeSpan.FromMinutes(_config.MaxIdleMinutes))
                {
                    _logger.LogDebug(
                        "Client {ClientId} exceeded max idle time: {IdleMinutes} minutes",
                        wrapper.Id,
                        idleTime.TotalMinutes);
                    return false;
                }
                
                // Check total age (recreate after 24 hours)
                var age = DateTime.UtcNow - wrapper.Created;
                if (age > TimeSpan.FromHours(24))
                {
                    _logger.LogDebug(
                        "Client {ClientId} exceeded max age: {AgeHours} hours",
                        wrapper.Id,
                        age.TotalHours);
                    return false;
                }
                
                // TODO: Add actual health check (test transaction?)
                // Could try a lightweight query or check connection state
                
                return true;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error checking client health");
                return false;
            }
        }
        
        private void TerminateClient(FSTIClientWrapper wrapper)
        {
            try
            {
                _logger.LogInformation(
                    "Terminating FSTIClient {ClientId} (usage count: {Count})",
                    wrapper.Id,
                    wrapper.UsageCount);
                
                wrapper.Client?.Terminate();
                Interlocked.Decrement(ref _totalClients);
            }
            catch (Exception ex)
            {
                _logger.LogError(
                    ex,
                    "Error terminating FSTIClient {ClientId}",
                    wrapper.Id);
            }
        }
        
        public void Dispose()
        {
            if (_disposed) return;
            
            _disposed = true;
            
            _logger.LogInformation(
                "Disposing FSTIClientPool. Terminating {Count} clients",
                _availableClients.Count);
            
            // Terminate all pooled clients
            while (_availableClients.TryTake(out var wrapper))
            {
                TerminateClient(wrapper);
            }
            
            _semaphore?.Dispose();
            
            _logger.LogInformation(
                "FSTIClientPool disposed. Total clients terminated: {Total}",
                _totalClients);
        }
        
        // Health check endpoint support
        public PoolHealthStatus GetHealthStatus()
        {
            return new PoolHealthStatus
            {
                TotalClients = _totalClients,
                AvailableClients = _availableClients.Count,
                MaxPoolSize = _config.MaxPoolSize,
                IsHealthy = _totalClients <= _config.MaxPoolSize
            };
        }
    }
    
    public class PoolHealthStatus
    {
        public int TotalClients { get; set; }
        public int AvailableClients { get; set; }
        public int MaxPoolSize { get; set; }
        public bool IsHealthy { get; set; }
    }
}
```

### 3. Transaction Service

```csharp
// Services/TransactionService.cs
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.Extensions.Logging;
using SoftBrands.FourthShift.Transaction;
using FourthShiftAPI.Models;

namespace FourthShiftAPI.Services
{
    public class TransactionService
    {
        private readonly FSTIClientPool _clientPool;
        private readonly ILogger<TransactionService> _logger;
        private readonly TransactionFactory _transactionFactory;
        
        public TransactionService(
            FSTIClientPool clientPool,
            ILogger<TransactionService> logger)
        {
            _clientPool = clientPool;
            _logger = logger;
            _transactionFactory = new TransactionFactory();
        }
        
        public async Task<TransactionResult> ProcessTransactionAsync(
            string transactionType,
            Dictionary<string, string> fields,
            string impersonateUserId = null,
            CancellationToken cancellationToken = default)
        {
            FSTIClientPool.FSTIClientWrapper clientWrapper = null;
            var startTime = DateTime.UtcNow;
            
            try
            {
                // Validate transaction type
                ValidateTransactionType(transactionType);
                
                // Acquire client from pool
                clientWrapper = await _clientPool.AcquireClientAsync(cancellationToken);
                var client = clientWrapper.Client;
                
                _logger.LogInformation(
                    "Processing {TransactionType} with client {ClientId}",
                    transactionType,
                    clientWrapper.Id);
                
                // Create transaction object
                ITransaction transaction = CreateTransaction(transactionType, fields);
                
                // Validate required fields
                if (!transaction.RequiredAreSet)
                {
                    var missingFields = GetMissingRequiredFields(transaction);
                    
                    _logger.LogWarning(
                        "Transaction {TransactionType} missing required fields: {Fields}",
                        transactionType,
                        string.Join(", ", missingFields.Keys));
                    
                    return new TransactionResult
                    {
                        Success = false,
                        TransactionType = transactionType,
                        Error = "Required fields not set",
                        MissingFields = missingFields,
                        Timestamp = DateTime.UtcNow,
                        ProcessingTimeMs = (DateTime.UtcNow - startTime).TotalMilliseconds
                    };
                }
                
                // Process the transaction
                bool success = client.ProcessId(transaction, impersonateUserId);
                
                var processingTime = (DateTime.UtcNow - startTime).TotalMilliseconds;
                
                if (success)
                {
                    // Success case
                    var result = new TransactionResult
                    {
                        Success = true,
                        TransactionType = transactionType,
                        Timestamp = DateTime.UtcNow,
                        ProcessingTimeMs = processingTime,
                        ImpersonatedUser = impersonateUserId
                    };
                    
                    // Extract response based on transaction category
                    if (transaction.Category == TransactionCategory.fsCORE)
                    {
                        // RCVR transaction - CDF response
                        result.Response = client.CDFResponse;
                        result.ParsedResponse = ParseCDFResponse(
                            transaction,
                            client.CDFResponse);
                    }
                    else if (transaction.Category == TransactionCategory.fsSOPM)
                    {
                        // SOP transaction - XML response
                        result.Response = client.XMLResponse;
                        result.ParsedResponse = ParseXMLResponse(client.XMLResponse);
                    }
                    
                    _logger.LogInformation(
                        "Successfully processed {TransactionType} in {Ms}ms",
                        transactionType,
                        processingTime);
                    
                    return result;
                }
                else
                {
                    // Failure case - extract error details
                    var error = client.TransactionError;
                    
                    var result = new TransactionResult
                    {
                        Success = false,
                        TransactionType = transactionType,
                        Error = error.Description,
                        ErrorDetails = new ErrorDetails
                        {
                            MessageFound = error.MessageFound,
                            MessageID = error.MessageID,
                            MessageSource = error.MessageSource.ToString(),
                            Number = error.Number,
                            Source = error.Source,
                            FieldsInError = ExtractFieldErrors(error, transaction)
                        },
                        Timestamp = DateTime.UtcNow,
                        ProcessingTimeMs = processingTime,
                        ImpersonatedUser = impersonateUserId
                    };
                    
                    _logger.LogWarning(
                        "Transaction {TransactionType} failed: {Error} (MessageID: {MessageID})",
                        transactionType,
                        error.Description,
                        error.MessageID);
                    
                    return result;
                }
            }
            catch (FSTIApplicationException ex)
            {
                _logger.LogError(
                    ex,
                    "FSTI Application exception for {TransactionType}",
                    transactionType);
                
                return new TransactionResult
                {
                    Success = false,
                    TransactionType = transactionType,
                    Error = $"FSTI Error: {ex.Message}",
                    Timestamp = DateTime.UtcNow,
                    ProcessingTimeMs = (DateTime.UtcNow - startTime).TotalMilliseconds
                };
            }
            catch (Exception ex)
            {
                _logger.LogError(
                    ex,
                    "Unexpected error processing {TransactionType}",
                    transactionType);
                
                return new TransactionResult
                {
                    Success = false,
                    TransactionType = transactionType,
                    Error = $"Internal error: {ex.Message}",
                    Timestamp = DateTime.UtcNow,
                    ProcessingTimeMs = (DateTime.UtcNow - startTime).TotalMilliseconds
                };
            }
            finally
            {
                // Always return client to pool
                if (clientWrapper != null)
                {
                    _clientPool.ReleaseClient(clientWrapper);
                }
            }
        }
        
        private void ValidateTransactionType(string transactionType)
        {
            if (string.IsNullOrWhiteSpace(transactionType))
            {
                throw new ArgumentException("Transaction type cannot be empty");
            }
            
            // Transaction types are 6 characters
            if (transactionType.Length != 6)
            {
                throw new ArgumentException(
                    $"Invalid transaction type '{transactionType}'. Must be 6 characters.");
            }
        }
        
        private ITransaction CreateTransaction(
            string transactionType,
            Dictionary<string, string> fields)
        {
            // Use reflection to dynamically create transaction type
            var assemblyName = "FourthShift.Transactions";
            var typeName = $"SoftBrands.FourthShift.Transaction.{transactionType}";
            
            var type = Type.GetType($"{typeName}, {assemblyName}");
            if (type == null)
            {
                throw new ArgumentException(
                    $"Transaction type '{transactionType}' not found in SDK");
            }
            
            // Create instance
            var transaction = (ITransaction)Activator.CreateInstance(type);
            
            // Set field values from dictionary
            if (fields != null)
            {
                foreach (var kvp in fields)
                {
                    try
                    {
                        // Try by field name first
                        var field = transaction.get_Field(kvp.Key);
                        if (field != null)
                        {
                            field.Value = kvp.Value;
                            continue;
                        }
                        
                        // Try by field number if key is numeric
                        if (int.TryParse(kvp.Key, out int fieldNumber))
                        {
                            field = transaction.get_Field(fieldNumber);
                            if (field != null)
                            {
                                field.Value = kvp.Value;
                            }
                        }
                    }
                    catch (Exception ex)
                    {
                        _logger.LogWarning(
                            ex,
                            "Failed to set field {FieldName} on {TransactionType}",
                            kvp.Key,
                            transactionType);
                    }
                }
            }
            
            return transaction;
        }
        
        private Dictionary<string, string> GetMissingRequiredFields(ITransaction transaction)
        {
            var missing = new Dictionary<string, string>();
            var requiredNames = transaction.GetRequiredFieldNames();
            
            foreach (var fieldName in requiredNames)
            {
                var field = transaction.get_Field(fieldName);
                if (field != null && string.IsNullOrEmpty(field.Value))
                {
                    missing[fieldName] = $"Field '{fieldName}' is required but not set";
                }
            }
            
            return missing;
        }
        
        private List<FieldErrorInfo> ExtractFieldErrors(
            FSTIError error,
            ITransaction transaction)
        {
            var errors = new List<FieldErrorInfo>();
            
            for (int i = 0; i < error.NumberOfFieldsInError; i++)
            {
                int fieldNumber = error.GetFieldNumber(i);
                var field = transaction.get_Field(fieldNumber);
                
                errors.Add(new FieldErrorInfo
                {
                    FieldNumber = fieldNumber,
                    FieldName = field?.Name,
                    CurrentValue = field?.Value
                });
            }
            
            return errors;
        }
        
        private Dictionary<string, string> ParseCDFResponse(
            ITransaction originalTransaction,
            string cdfResponse)
        {
            var parsed = new Dictionary<string, string>();
            
            try
            {
                // Use TransactionFactory to parse response back into object
                var responseTransaction = _transactionFactory.CreateTransactionFromCDF(cdfResponse);
                
                if (responseTransaction != null)
                {
                    var eligibleFields = responseTransaction.GetEligibleFieldNumbers();
                    
                    foreach (var fieldNumber in eligibleFields)
                    {
                        var field = responseTransaction.get_Field(fieldNumber);
                        if (field != null && !string.IsNullOrEmpty(field.Value))
                        {
                            parsed[field.Name] = field.Value;
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                _logger.LogWarning(ex, "Failed to parse CDF response");
                parsed["_raw"] = cdfResponse;
            }
            
            return parsed;
        }
        
        private Dictionary<string, string> ParseXMLResponse(string xmlResponse)
        {
            var parsed = new Dictionary<string, string>();
            
            try
            {
                // Parse SOP XML response
                // Format: <SOPTIRESPONSE TRANSACTION="SOaaxx" CUSTOMER="xxx" ORDER="xxx" LINE="xxx"/>
                
                var xml = System.Xml.Linq.XElement.Parse(xmlResponse);
                
                foreach (var attr in xml.Attributes())
                {
                    parsed[attr.Name.LocalName] = attr.Value;
                }
            }
            catch (Exception ex)
            {
                _logger.LogWarning(ex, "Failed to parse XML response");
                parsed["_raw"] = xmlResponse;
            }
            
            return parsed;
        }
    }
}
```

### 4. Models

```csharp
// Models/TransactionRequest.cs
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace FourthShiftAPI.Models
{
    public class TransactionRequest
    {
        /// <summary>
        /// Field values for the transaction
        /// Key can be field name or field number
        /// Example: { "ItemNumber": "ITEM-001", "ItemDescription": "Test Item" }
        /// </summary>
        [Required]
        public Dictionary<string, string> Fields { get; set; }
        
        /// <summary>
        /// Optional: User ID to impersonate for this transaction
        /// Must be configured in Fourth Shift SDK Admin
        /// </summary>
        public string ImpersonateUserId { get; set; }
        
        /// <summary>
        /// Optional: Process asynchronously via Kafka
        /// </summary>
        public bool Async { get; set; } = false;
        
        /// <summary>
        /// Optional: Correlation ID for tracking
        /// </summary>
        public string CorrelationId { get; set; }
    }
}

// Models/TransactionResult.cs
using System;
using System.Collections.Generic;

namespace FourthShiftAPI.Models
{
    public class TransactionResult
    {
        public bool Success { get; set; }
        public string TransactionType { get; set; }
        public DateTime Timestamp { get; set; }
        public double ProcessingTimeMs { get; set; }
        
        // Success fields
        public string Response { get; set; }
        public Dictionary<string, string> ParsedResponse { get; set; }
        public string ImpersonatedUser { get; set; }
        
        // Error fields
        public string Error { get; set; }
        public ErrorDetails ErrorDetails { get; set; }
        public Dictionary<string, string> MissingFields { get; set; }
    }
    
    public class ErrorDetails
    {
        public bool MessageFound { get; set; }
        public int MessageID { get; set; }
        public string MessageSource { get; set; }
        public int Number { get; set; }
        public string Source { get; set; }
        public List<FieldErrorInfo> FieldsInError { get; set; }
    }
    
    public class FieldErrorInfo
    {
        public int FieldNumber { get; set; }
        public string FieldName { get; set; }
        public string CurrentValue { get; set; }
    }
}

// Models/TransactionSchema.cs
using System.Collections.Generic;

namespace FourthShiftAPI.Models
{
    public class TransactionSchema
    {
        public string TransactionType { get; set; }
        public string Description { get; set; }
        public string Category { get; set; }
        public List<FieldDefinition> RequiredFields { get; set; }
        public List<FieldDefinition> OptionalFields { get; set; }
    }
    
    public class FieldDefinition
    {
        public string Name { get; set; }
        public int Position { get; set; }
        public string Type { get; set; }
        public int MaxLength { get; set; }
        public bool IsRequired { get; set; }
    }
}
```

### 5. API Controller

```csharp
// Controllers/TransactionsController.cs
using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using FourthShiftAPI.Models;
using FourthShiftAPI.Services;

namespace FourthShiftAPI.Controllers
{
    [ApiController]
    [Route("api/fourthshift/transactions")]
    [Produces("application/json")]
    [Authorize] // Add authentication
    public class TransactionsController : ControllerBase
    {
        private readonly TransactionService _transactionService;
        private readonly ILogger<TransactionsController> _logger;
        
        public TransactionsController(
            TransactionService transactionService,
            ILogger<TransactionsController> logger)
        {
            _transactionService = transactionService;
            _logger = logger;
        }
        
        /// <summary>
        /// Process a Fourth Shift transaction
        /// </summary>
        /// <param name="transactionType">6-character transaction code (e.g., ITMB00, MOMT00)</param>
        /// <param name="request">Transaction request with field values</param>
        /// <param name="cancellationToken">Cancellation token</param>
        /// <returns>Transaction result</returns>
        [HttpPost("{transactionType}")]
        [ProducesResponseType(typeof(TransactionResult), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(TransactionResult), StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> ProcessTransaction(
            [FromRoute] string transactionType,
            [FromBody] TransactionRequest request,
            CancellationToken cancellationToken)
        {
            _logger.LogInformation(
                "API request: {TransactionType} with {FieldCount} fields",
                transactionType,
                request?.Fields?.Count ?? 0);
            
            if (request == null || request.Fields == null)
            {
                return BadRequest(new { error = "Request body and fields are required" });
            }
            
            try
            {
                var result = await _transactionService.ProcessTransactionAsync(
                    transactionType.ToUpper(),
                    request.Fields,
                    request.ImpersonateUserId,
                    cancellationToken);
                
                return result.Success ? Ok(result) : BadRequest(result);
            }
            catch (ArgumentException ex)
            {
                _logger.LogWarning(ex, "Invalid request for {TransactionType}", transactionType);
                return BadRequest(new { error = ex.Message });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Internal error processing {TransactionType}", transactionType);
                return StatusCode(500, new { error = "Internal server error" });
            }
        }
        
        /// <summary>
        /// Get schema information for a transaction type
        /// </summary>
        [HttpGet("{transactionType}/schema")]
        [ProducesResponseType(typeof(TransactionSchema), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public IActionResult GetTransactionSchema([FromRoute] string transactionType)
        {
            try
            {
                var schema = TransactionSchemaBuilder.BuildSchema(transactionType.ToUpper());
                return Ok(schema);
            }
            catch (ArgumentException ex)
            {
                return NotFound(new { error = ex.Message });
            }
        }
        
        /// <summary>
        /// List all available transaction types
        /// </summary>
        [HttpGet("types")]
        [ProducesResponseType(typeof(List<string>), StatusCodes.Status200OK)]
        public IActionResult GetTransactionTypes()
        {
            var types = TransactionSchemaBuilder.GetAllTransactionTypes();
            return Ok(types);
        }
    }
    
    /// <summary>
    /// Health check controller
    /// </summary>
    [ApiController]
    [Route("api/health")]
    public class HealthController : ControllerBase
    {
        private readonly FSTIClientPool _clientPool;
        
        public HealthController(FSTIClientPool clientPool)
        {
            _clientPool = clientPool;
        }
        
        [HttpGet]
        public IActionResult GetHealth()
        {
            var poolStatus = _clientPool.GetHealthStatus();
            
            return Ok(new
            {
                status = poolStatus.IsHealthy ? "healthy" : "degraded",
                timestamp = DateTime.UtcNow,
                pool = poolStatus
            });
        }
    }
}
```

### 6. Schema Builder Utility

```csharp
// Utilities/TransactionSchemaBuilder.cs
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using SoftBrands.FourthShift.Transaction;
using FourthShiftAPI.Models;

namespace FourthShiftAPI.Services
{
    public static class TransactionSchemaBuilder
    {
        private const string AssemblyName = "FourthShift.Transactions";
        private const string Namespace = "SoftBrands.FourthShift.Transaction";
        
        public static TransactionSchema BuildSchema(string transactionType)
        {
            var transaction = CreateTransactionInstance(transactionType);
            
            var schema = new TransactionSchema
            {
                TransactionType = transactionType,
                Description = transaction.Description,
                Category = transaction.Category.ToString(),
                RequiredFields = new List<FieldDefinition>(),
                OptionalFields = new List<FieldDefinition>()
            };
            
            // Get all eligible fields
            var eligibleNumbers = transaction.GetEligibleFieldNumbers();
            var requiredNames = transaction.GetRequiredFieldNames();
            
            foreach (var fieldNumber in eligibleNumbers)
            {
                var field = transaction.get_Field(fieldNumber);
                if (field == null) continue;
                
                var fieldDef = new FieldDefinition
                {
                    Name = field.Name,
                    Position = fieldNumber,
                    Type = field.Type.ToString(),
                    MaxLength = field.Length,
                    IsRequired = field.IsRequired
                };
                
                if (requiredNames.Contains(field.Name))
                {
                    schema.RequiredFields.Add(fieldDef);
                }
                else
                {
                    schema.OptionalFields.Add(fieldDef);
                }
            }
            
            return schema;
        }
        
        public static List<string> GetAllTransactionTypes()
        {
            var assembly = Assembly.Load(AssemblyName);
            var transactionTypes = assembly.GetTypes()
                .Where(t => t.Namespace == Namespace &&
                           t.IsClass &&
                           !t.IsAbstract &&
                           typeof(ITransaction).IsAssignableFrom(t) &&
                           t.Name.Length == 6)
                .Select(t => t.Name)
                .OrderBy(name => name)
                .ToList();
            
            return transactionTypes;
        }
        
        private static ITransaction CreateTransactionInstance(string transactionType)
        {
            var typeName = $"{Namespace}.{transactionType}";
            var type = Type.GetType($"{typeName}, {AssemblyName}");
            
            if (type == null)
            {
                throw new ArgumentException(
                    $"Transaction type '{transactionType}' not found");
            }
            
            return (ITransaction)Activator.CreateInstance(type);
        }
    }
}
```

### 7. Program.cs (Startup)

```csharp
// Program.cs
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.OpenApi.Models;
using FourthShiftAPI.Configuration;
using FourthShiftAPI.Services;

var builder = WebApplication.CreateBuilder(args);

// Add services to container
builder.Services.AddControllers();

// Configure Fourth Shift
builder.Services.Configure<FSTIConfiguration>(
    builder.Configuration.GetSection("FSTIConfiguration"));

// Register FSTIClientPool as singleton (connection pool)
builder.Services.AddSingleton<FSTIClientPool>();

// Register TransactionService as scoped (per request)
builder.Services.AddScoped<TransactionService>();

// Add Swagger
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo
    {
        Title = "Fourth Shift API",
        Version = "v1",
        Description = "REST API wrapper for Fourth Shift Transactional Interface"
    });
    
    // Add JWT authentication to Swagger
    c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        Description = "JWT Authorization header using the Bearer scheme",
        Name = "Authorization",
        In = ParameterLocation.Header,
        Type = SecuritySchemeType.ApiKey,
        Scheme = "Bearer"
    });
    
    c.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Type = ReferenceType.SecurityScheme,
                    Id = "Bearer"
                }
            },
            Array.Empty<string>()
        }
    });
});

// Add CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", builder =>
    {
        builder.AllowAnyOrigin()
               .AllowAnyMethod()
               .AllowAnyHeader();
    });
});

// TODO: Add Authentication (JWT)
// builder.Services.AddAuthentication(...)

// Add Health Checks
builder.Services.AddHealthChecks();

var app = builder.Build();

// Configure HTTP pipeline
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseCors("AllowAll");
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();
app.MapHealthChecks("/health");

// Ensure pool cleanup on shutdown
var lifetime = app.Services.GetRequiredService<IHostApplicationLifetime>();
lifetime.ApplicationStopping.Register(() =>
{
    var pool = app.Services.GetRequiredService<FSTIClientPool>();
    pool.Dispose();
});

app.Run();
```

---

## Configuration Guide

### appsettings.json

```json
{
  "Logging": {
    "LogLevel": {
      "Default": "Information",
      "Microsoft.AspNetCore": "Warning",
      "FourthShiftAPI": "Debug"
    }
  },
  "AllowedHosts": "*",
  
  "FSTIConfiguration": {
    "ConfigFilePath": "\\\\fs-server\\mfgsys\\fs.cfg",
    "SystemName": "",
    "ServerName": "",
    "Port": "7361",
    "UserId": "API_SERVICE",
    "Password": "CHANGE_ME_ENCRYPT_IN_PROD",
    "EnableImpersonation": true,
    "MaxPoolSize": 10,
    "MaxIdleMinutes": 30,
    "ConnectionTimeoutSeconds": 30
  },
  
  "Kestrel": {
    "Endpoints": {
      "Http": {
        "Url": "http://localhost:5000"
      },
      "Https": {
        "Url": "https://localhost:5001"
      }
    }
  }
}
```

### appsettings.Production.json

```json
{
  "Logging": {
    "LogLevel": {
      "Default": "Warning",
      "FourthShiftAPI": "Information"
    }
  },
  
  "FSTIConfiguration": {
    "ConfigFilePath": "\\\\prod-fs-server\\mfgsys\\fs.cfg",
    "UserId": "PROD_API_SERVICE",
    "Password": "USE_AZURE_KEY_VAULT",
    "MaxPoolSize": 20
  }
}
```

### User Secrets (Development)

```bash
# Set sensitive data in user secrets
dotnet user-secrets init
dotnet user-secrets set "FSTIConfiguration:Password" "YourDevPassword"
```

### Azure Key Vault (Production)

```csharp
// In Program.cs, add:
if (builder.Environment.IsProduction())
{
    builder.Configuration.AddAzureKeyVault(
        new Uri("https://your-keyvault.vault.azure.net/"),
        new DefaultAzureCredential());
}
```

---

## API Endpoints Reference

### Base URL
```
https://api.yourcompany.com/api/fourthshift
```

### Authentication
All endpoints require JWT Bearer token:
```http
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### Endpoints

#### 1. Process Transaction

```http
POST /transactions/{transactionType}
Content-Type: application/json

{
  "fields": {
    "ItemNumber": "ITEM-001",
    "ItemDescription": "Test Item",
    "ItemUM": "EA"
  },
  "impersonateUserId": "AAA"
}
```

**Response (Success):**
```json
{
  "success": true,
  "transactionType": "ITMB00",
  "timestamp": "2025-01-30T18:45:00Z",
  "processingTimeMs": 125.5,
  "response": "\"ITMB00\",\"AAA\",\"01/30/2025\"...",
  "parsedResponse": {
    "ItemNumber": "ITEM-001",
    "ItemDescription": "Test Item",
    "ItemUM": "EA"
  }
}
```

**Response (Error):**
```json
{
  "success": false,
  "transactionType": "ITMB00",
  "timestamp": "2025-01-30T18:45:00Z",
  "processingTimeMs": 85.2,
  "error": "Item Already Exists On Item Master",
  "errorDetails": {
    "messageFound": true,
    "messageID": 2233,
    "messageSource": "fsMessageString",
    "number": 4,
    "fieldsInError": [
      {
        "fieldNumber": 7,
        "fieldName": "ItemNumber",
        "currentValue": "ITEM-001"
      }
    ]
  }
}
```

#### 2. Get Transaction Schema

```http
GET /transactions/ITMB00/schema
```

**Response:**
```json
{
  "transactionType": "ITMB00",
  "description": "Insert new item",
  "category": "fsCORE",
  "requiredFields": [
    {
      "name": "ItemNumber",
      "position": 7,
      "type": "fsAlpha",
      "maxLength": 20,
      "isRequired": true
    }
  ],
  "optionalFields": [
    {
      "name": "ItemDescription",
      "position": 8,
      "type": "fsAlpha",
      "maxLength": 40,
      "isRequired": false
    }
  ]
}
```

#### 3. List Transaction Types

```http
GET /transactions/types
```

**Response:**
```json
[
  "APCA01",
  "APCF00",
  "ITMB00",
  "MOMT00",
  "COMT00",
  ...
]
```

#### 4. Health Check

```http
GET /health
```

**Response:**
```json
{
  "status": "healthy",
  "timestamp": "2025-01-30T18:45:00Z",
  "pool": {
    "totalClients": 5,
    "availableClients": 3,
    "maxPoolSize": 10,
    "isHealthy": true
  }
}
```

---

## Kafka Integration Strategy

### Architecture with Kafka

```
┌──────────────┐
│   REST API   │
└──────┬───────┘
       │
       ├─► Synchronous Path (immediate response)
       │   └─► FSTIClientPool → Fourth Shift
       │
       └─► Asynchronous Path (Kafka)
           └─► Kafka Producer
               └─► Topic: "fourthshift-transactions-inbound"
                   └─► Consumer Workers (1-N instances)
                       └─► FSTIClientPool → Fourth Shift
                           └─► Topic: "fourthshift-transactions-results"
                               ├─► PostgreSQL Sink Connector
                               ├─► Fabric Lakehouse Connector
                               └─► Result Notification Service
```

### Kafka Producer Implementation

```csharp
// Services/KafkaTransactionProducer.cs
using System;
using System.Threading.Tasks;
using Confluent.Kafka;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;

namespace FourthShiftAPI.Services
{
    public class KafkaTransactionProducer
    {
        private readonly IProducer<string, string> _producer;
        private readonly ILogger<KafkaTransactionProducer> _logger;
        private readonly string _topicName;
        
        public KafkaTransactionProducer(
            IConfiguration configuration,
            ILogger<KafkaTransactionProducer> logger)
        {
            _logger = logger;
            _topicName = configuration["Kafka:TransactionsTopic"];
            
            var config = new ProducerConfig
            {
                BootstrapServers = configuration["Kafka:BootstrapServers"],
                Acks = Acks.All, // Wait for all replicas
                EnableIdempotence = true,
                MaxInFlight = 5,
                CompressionType = CompressionType.Snappy
            };
            
            _producer = new ProducerBuilder<string, string>(config).Build();
        }
        
        public async Task<string> ProduceTransactionAsync(
            string transactionType,
            TransactionRequest request)
        {
            var messageId = Guid.NewGuid().ToString();
            
            var message = new TransactionMessage
            {
                MessageId = messageId,
                TransactionType = transactionType,
                Fields = request.Fields,
                ImpersonateUserId = request.ImpersonateUserId,
                CorrelationId = request.CorrelationId ?? messageId,
                Timestamp = DateTime.UtcNow
            };
            
            var json = JsonConvert.SerializeObject(message);
            
            try
            {
                var result = await _producer.ProduceAsync(
                    _topicName,
                    new Message<string, string>
                    {
                        Key = transactionType, // Partition by type
                        Value = json,
                        Headers = new Headers
                        {
                            { "correlation-id", System.Text.Encoding.UTF8.GetBytes(message.CorrelationId) },
                            { "transaction-type", System.Text.Encoding.UTF8.GetBytes(transactionType) }
                        }
                    });
                
                _logger.LogInformation(
                    "Produced message {MessageId} to Kafka partition {Partition} offset {Offset}",
                    messageId,
                    result.Partition.Value,
                    result.Offset.Value);
                
                return messageId;
            }
            catch (ProduceException<string, string> ex)
            {
                _logger.LogError(ex, "Failed to produce message {MessageId}", messageId);
                throw;
            }
        }
        
        public void Dispose()
        {
            _producer?.Flush(TimeSpan.FromSeconds(10));
            _producer?.Dispose();
        }
    }
    
    public class TransactionMessage
    {
        public string MessageId { get; set; }
        public string TransactionType { get; set; }
        public Dictionary<string, string> Fields { get; set; }
        public string ImpersonateUserId { get; set; }
        public string CorrelationId { get; set; }
        public DateTime Timestamp { get; set; }
    }
}
```

### Kafka Consumer Worker

```csharp
// Workers/TransactionConsumerWorker.cs
using System;
using System.Threading;
using System.Threading.Tasks;
using Confluent.Kafka;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using FourthShiftAPI.Services;

namespace FourthShiftAPI.Workers
{
    public class TransactionConsumerWorker : BackgroundService
    {
        private readonly IConsumer<string, string> _consumer;
        private readonly TransactionService _transactionService;
        private readonly ILogger<TransactionConsumerWorker> _logger;
        private readonly string _topicName;
        
        public TransactionConsumerWorker(
            IConfiguration configuration,
            TransactionService transactionService,
            ILogger<TransactionConsumerWorker> logger)
        {
            _transactionService = transactionService;
            _logger = logger;
            _topicName = configuration["Kafka:TransactionsTopic"];
            
            var config = new ConsumerConfig
            {
                BootstrapServers = configuration["Kafka:BootstrapServers"],
                GroupId = "fourthshift-transaction-processor",
                AutoOffsetReset = AutoOffsetReset.Earliest,
                EnableAutoCommit = false,
                MaxPollIntervalMs = 300000 // 5 minutes
            };
            
            _consumer = new ConsumerBuilder<string, string>(config).Build();
        }
        
        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            _consumer.Subscribe(_topicName);
            
            _logger.LogInformation("Transaction consumer worker started");
            
            try
            {
                while (!stoppingToken.IsCancellationRequested)
                {
                    try
                    {
                        var consumeResult = _consumer.Consume(stoppingToken);
                        
                        if (consumeResult?.Message?.Value != null)
                        {
                            await ProcessMessageAsync(consumeResult, stoppingToken);
                            _consumer.Commit(consumeResult);
                        }
                    }
                    catch (ConsumeException ex)
                    {
                        _logger.LogError(ex, "Consume error");
                    }
                }
            }
            finally
            {
                _consumer.Close();
            }
        }
        
        private async Task ProcessMessageAsync(
            ConsumeResult<string, string> consumeResult,
            CancellationToken cancellationToken)
        {
            var message = JsonConvert.DeserializeObject<TransactionMessage>(
                consumeResult.Message.Value);
            
            _logger.LogInformation(
                "Processing message {MessageId} from partition {Partition} offset {Offset}",
                message.MessageId,
                consumeResult.Partition.Value,
                consumeResult.Offset.Value);
            
            try
            {
                var result = await _transactionService.ProcessTransactionAsync(
                    message.TransactionType,
                    message.Fields,
                    message.ImpersonateUserId,
                    cancellationToken);
                
                // TODO: Publish result to results topic
                // await PublishResultAsync(message.CorrelationId, result);
                
                _logger.LogInformation(
                    "Successfully processed message {MessageId}: {Success}",
                    message.MessageId,
                    result.Success);
            }
            catch (Exception ex)
            {
                _logger.LogError(
                    ex,
                    "Failed to process message {MessageId}",
                    message.MessageId);
                
                // TODO: Implement retry logic or dead letter queue
                throw;
            }
        }
        
        public override void Dispose()
        {
            _consumer?.Close();
            _consumer?.Dispose();
            base.Dispose();
        }
    }
}
```

### Kafka Configuration

```json
{
  "Kafka": {
    "BootstrapServers": "localhost:9092",
    "TransactionsTopic": "fourthshift-transactions-inbound",
    "ResultsTopic": "fourthshift-transactions-results",
    "EnableAsync": true,
    "SchemaRegistryUrl": "http://localhost:8081"
  }
}
```

---

## Deployment Considerations

### 1. Windows Server Deployment

**Requirements:**
- Windows Server 2019/2022
- .NET 8.0 Runtime
- IIS (optional, can use Kestrel)
- Network access to Fourth Shift server
- Access to Fourth Shift configuration file

**Deployment Steps:**

```powershell
# Publish application
dotnet publish -c Release -o ./publish

# Create Windows Service
sc.exe create "FourthShiftAPI" binPath="C:\Apps\FourthShiftAPI\FourthShiftAPI.exe"
sc.exe start "FourthShiftAPI"

# Or deploy to IIS
# Copy publish folder to IIS wwwroot
# Configure application pool (.NET Core, No Managed Code)
```

### 2. Docker Container

```dockerfile
# Dockerfile
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src
COPY ["FourthShiftAPI/FourthShiftAPI.csproj", "FourthShiftAPI/"]
RUN dotnet restore "FourthShiftAPI/FourthShiftAPI.csproj"
COPY . .
WORKDIR "/src/FourthShiftAPI"
RUN dotnet build "FourthShiftAPI.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "FourthShiftAPI.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .

# Copy Fourth Shift SDK DLLs
COPY FourthShift.Transactions.dll .
COPY FourthShift.TransactionClient.dll .

ENTRYPOINT ["dotnet", "FourthShiftAPI.dll"]
```

```yaml
# docker-compose.yml
version: '3.8'

services:
  fourthshift-api:
    image: fourthshift-api:latest
    build:
      context: .
      dockerfile: Dockerfile
    ports:
      - "5000:80"
      - "5001:443"
    environment:
      - ASPNETCORE_ENVIRONMENT=Production
      - FSTIConfiguration__SystemName=PROD
      - FSTIConfiguration__ServerName=fs-server
      - FSTIConfiguration__UserId=API_SERVICE
      - FSTIConfiguration__Password=${FSTI_PASSWORD}
    volumes:
      - ./logs:/app/logs
    restart: unless-stopped
    
  # Optional: Redis for distributed caching
  redis:
    image: redis:alpine
    ports:
      - "6379:6379"
```

### 3. Network Configuration

**Firewall Rules:**
```powershell
# Allow HTTPS inbound
New-NetFirewallRule -DisplayName "Fourth Shift API HTTPS" `
  -Direction Inbound -LocalPort 5001 -Protocol TCP -Action Allow

# Allow Fourth Shift Remoting Service connection
New-NetFirewallRule -DisplayName "Fourth Shift Remoting" `
  -Direction Outbound -RemoteAddress <FS-SERVER-IP> `
  -LocalPort 7361 -Protocol TCP -Action Allow
```

**DNS/Load Balancer:**
- Create DNS record: `api-fourthshift.yourcompany.com`
- Configure SSL certificate (Let's Encrypt or corporate CA)
- Set up load balancer for multiple instances (Azure Load Balancer, HAProxy, etc.)

---

## Testing Strategy

### 1. Unit Tests

```csharp
// Tests/Services/TransactionServiceTests.cs
using Xunit;
using Moq;
using Microsoft.Extensions.Logging;
using FourthShiftAPI.Services;

public class TransactionServiceTests
{
    [Fact]
    public async Task ProcessTransaction_ValidITMB00_ReturnsSuccess()
    {
        // Arrange
        var mockPool = new Mock<FSTIClientPool>();
        var mockLogger = new Mock<ILogger<TransactionService>>();
        var service = new TransactionService(mockPool.Object, mockLogger.Object);
        
        var fields = new Dictionary<string, string>
        {
            { "ItemNumber", "TEST-ITEM-001" },
            { "ItemDescription", "Test Item" },
            { "ItemUM", "EA" }
        };
        
        // Act
        var result = await service.ProcessTransactionAsync("ITMB00", fields);
        
        // Assert
        Assert.True(result.Success);
        Assert.Equal("ITMB00", result.TransactionType);
    }
}
```

### 2. Integration Tests

```csharp
// Tests/Integration/TransactionIntegrationTests.cs
using Microsoft.AspNetCore.Mvc.Testing;
using Xunit;

public class TransactionIntegrationTests : IClassFixture<WebApplicationFactory<Program>>
{
    private readonly WebApplicationFactory<Program> _factory;
    
    public TransactionIntegrationTests(WebApplicationFactory<Program> factory)
    {
        _factory = factory;
    }
    
    [Fact]
    public async Task ProcessTransaction_EndToEnd_ReturnsSuccess()
    {
        // Arrange
        var client = _factory.CreateClient();
        var request = new TransactionRequest
        {
            Fields = new Dictionary<string, string>
            {
                { "ItemNumber", $"TEST-{Guid.NewGuid()}" },
                { "ItemDescription", "Integration Test Item" },
                { "ItemUM", "EA" }
            }
        };
        
        // Act
        var response = await client.PostAsJsonAsync("/api/transactions/ITMB00", request);
        
        // Assert
        response.EnsureSuccessStatusCode();
        var result = await response.Content.ReadFromJsonAsync<TransactionResult>();
        Assert.True(result.Success);
    }
}
```

### 3. Load Testing (k6)

```javascript
// load-test.js
import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  stages: [
    { duration: '1m', target: 10 },  // Ramp up to 10 users
    { duration: '3m', target: 10 },  // Stay at 10 users
    { duration: '1m', target: 50 },  // Ramp up to 50 users
    { duration: '3m', target: 50 },  // Stay at 50 users
    { duration: '1m', target: 0 },   // Ramp down
  ],
};

export default function () {
  const url = 'https://localhost:5001/api/fourthshift/transactions/ITMB00';
  
  const payload = JSON.stringify({
    fields: {
      ItemNumber: `LOAD-TEST-${__VU}-${__ITER}`,
      ItemDescription: 'Load Test Item',
      ItemUM: 'EA'
    }
  });
  
  const params = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer YOUR_TOKEN'
    },
  };
  
  const res = http.post(url, payload, params);
  
  check(res, {
    'status is 200': (r) => r.status === 200,
    'response time < 500ms': (r) => r.timings.duration < 500,
  });
  
  sleep(1);
}
```

---

## Security Considerations

### 1. Authentication & Authorization

**JWT Token Implementation:**

```csharp
// Add to Program.cs
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = builder.Configuration["Jwt:Issuer"],
            ValidAudience = builder.Configuration["Jwt:Audience"],
            IssuerSigningKey = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"]))
        };
    });

builder.Services.AddAuthorization(options =>
{
    options.AddPolicy("TransactionWrite", policy =>
        policy.RequireClaim("permission", "transactions:write"));
});
```

### 2. Password Encryption

**Azure Key Vault:**
```csharp
// Use Azure Key Vault for production passwords
builder.Configuration.AddAzureKeyVault(
    new Uri($"https://{keyVaultName}.vault.azure.net/"),
    new DefaultAzureCredential());
```

**Encrypted Configuration:**
```powershell
# Windows DPAPI for local development
$encrypted = ConvertTo-SecureString "password" -AsPlainText -Force | 
             ConvertFrom-SecureString
```

### 3. Rate Limiting

```csharp
// Add to Program.cs
builder.Services.AddRateLimiter(options =>
{
    options.GlobalLimiter = PartitionedRateLimiter.Create<HttpContext, string>(context =>
        RateLimitPartition.GetFixedWindowLimiter(
            partitionKey: context.User.Identity?.Name ?? context.Request.Headers.Host.ToString(),
            factory: partition => new FixedWindowRateLimiterOptions
            {
                AutoReplenishment = true,
                PermitLimit = 100,
                QueueLimit = 0,
                Window = TimeSpan.FromMinutes(1)
            }));
});

app.UseRateLimiter();
```

### 4. HTTPS/TLS

```json
// appsettings.json
{
  "Kestrel": {
    "Endpoints": {
      "Https": {
        "Url": "https://*:5001",
        "Certificate": {
          "Path": "certificate.pfx",
          "Password": "cert_password"
        }
      }
    }
  }
}
```

### 5. Input Validation

```csharp
// Add data annotations
public class TransactionRequest
{
    [Required]
    [MaxLength(1000)]
    public Dictionary<string, string> Fields { get; set; }
    
    [MaxLength(20)]
    public string ImpersonateUserId { get; set; }
}
```

### 6. CMMC Compliance Audit Logging

```csharp
// Add structured logging for audit trails
_logger.LogInformation(
    "Transaction processed: {TransactionType} by user {UserId} " +
    "impersonating {ImpersonatedUser} with result {Success}",
    transactionType,
    currentUserId,
    impersonateUserId,
    result.Success);
```

---

## Future Enhancements

### 1. Batch Processing

```csharp
[HttpPost("batch")]
public async Task<IActionResult> ProcessBatch(
    [FromBody] List<TransactionRequest> requests)
{
    var results = new List<TransactionResult>();
    
    foreach (var request in requests)
    {
        var result = await _transactionService.ProcessTransactionAsync(...);
        results.Add(result);
    }
    
    return Ok(results);
}
```

### 2. Webhooks for Async Results

```csharp
public class WebhookService
{
    public async Task NotifyAsync(string webhookUrl, TransactionResult result)
    {
        using var client = new HttpClient();
        await client.PostAsJsonAsync(webhookUrl, result);
    }
}
```

### 3. GraphQL API

```csharp
// Alternative to REST - GraphQL endpoint
services.AddGraphQLServer()
    .AddQueryType<Query>()
    .AddMutationType<Mutation>();
```

### 4. Real-time Status with SignalR

```csharp
// Real-time transaction status updates
public class TransactionHub : Hub
{
    public async Task SubscribeToTransaction(string correlationId)
    {
        await Groups.AddToGroupAsync(Context.ConnectionId, correlationId);
    }
}
```

### 5. Caching Layer

```csharp
// Add Redis caching for schema lookups
services.AddStackExchangeRedisCache(options =>
{
    options.Configuration = configuration["Redis:Connection"];
});
```

### 6. OpenTelemetry

```csharp
// Add distributed tracing
services.AddOpenTelemetry()
    .WithTracing(builder =>
    {
        builder
            .AddAspNetCoreInstrumentation()
            .AddHttpClientInstrumentation()
            .AddJaegerExporter();
    });
```

---

## Implementation Checklist

### Phase 1: Core API (Week 1-2)
- [ ] Create ASP.NET Core Web API project
- [ ] Implement FSTIClientPool
- [ ] Implement TransactionService
- [ ] Create basic REST endpoints
- [ ] Add configuration management
- [ ] Implement error handling
- [ ] Add logging

### Phase 2: Testing & Refinement (Week 3)
- [ ] Unit tests for services
- [ ] Integration tests
- [ ] Load testing
- [ ] Connection pool tuning
- [ ] Performance optimization

### Phase 3: Security (Week 4)
- [ ] JWT authentication
- [ ] Authorization policies
- [ ] Rate limiting
- [ ] HTTPS/TLS configuration
- [ ] Password encryption
- [ ] Audit logging

### Phase 4: Kafka Integration (Week 5-6)
- [ ] Kafka producer implementation
- [ ] Consumer worker service
- [ ] Dead letter queue handling
- [ ] Retry logic
- [ ] Result publishing

### Phase 5: Deployment (Week 7-8)
- [ ] Docker containerization
- [ ] CI/CD pipeline setup
- [ ] Production configuration
- [ ] Monitoring setup (Application Insights)
- [ ] Health checks
- [ ] Documentation

### Phase 6: Advanced Features (Future)
- [ ] Batch processing
- [ ] Webhooks
- [ ] GraphQL API
- [ ] SignalR real-time updates
- [ ] Caching layer

---

## Support & Resources

### Documentation
- **Fourth Shift SDK**: Included PDF documentation
- **ASP.NET Core**: https://learn.microsoft.com/aspnet/core
- **Confluent Kafka**: https://docs.confluent.io/kafka-clients/dotnet/current/

### Key Contacts
- **Fourth Shift Support**: For FSTM licensing and server issues
- **Internal DBA**: For database performance concerns
- **Network Team**: For firewall rules and connectivity

### Troubleshooting

**Common Issues:**

1. **"FSTIClient.Logon failed"**
   - Check user credentials
   - Verify Fourth Shift license availability
   - Check network connectivity to server

2. **"Connection pool exhausted"**
   - Increase MaxPoolSize
   - Check for connection leaks
   - Monitor FSTIClient.Terminate() calls

3. **"Transaction failed: Database in Use"**
   - Implement retry logic
   - Check for long-running transactions in Fourth Shift

---

## Appendix: Visual Studio Solution Structure

```
FourthShiftAPI.sln
│
├── src/
│   └── FourthShiftAPI/
│       ├── Controllers/
│       │   ├── TransactionsController.cs
│       │   └── HealthController.cs
│       ├── Services/
│       │   ├── FSTIClientPool.cs
│       │   ├── TransactionService.cs
│       │   ├── KafkaTransactionProducer.cs
│       │   └── TransactionSchemaBuilder.cs
│       ├── Workers/
│       │   └── TransactionConsumerWorker.cs
│       ├── Models/
│       │   ├── TransactionRequest.cs
│       │   ├── TransactionResult.cs
│       │   └── TransactionSchema.cs
│       ├── Configuration/
│       │   └── FSTIConfiguration.cs
│       ├── Program.cs
│       ├── appsettings.json
│       ├── appsettings.Development.json
│       └── appsettings.Production.json
│
├── tests/
│   ├── FourthShiftAPI.Tests/
│   │   ├── Services/
│   │   │   └── TransactionServiceTests.cs
│   │   └── Integration/
│   │       └── TransactionIntegrationTests.cs
│   └── FourthShiftAPI.LoadTests/
│       └── load-test.js
│
├── lib/
│   ├── FourthShift.Transactions.dll
│   └── FourthShift.TransactionClient.dll
│
├── docs/
│   ├── API-Documentation.md
│   ├── Deployment-Guide.md
│   └── FSTM-SDK-Documentation.pdf
│
├── docker/
│   ├── Dockerfile
│   └── docker-compose.yml
│
└── README.md
```

---

**End of Document**

*This guide provides a complete implementation roadmap for the Fourth Shift REST API wrapper. Save this document for future reference and upload it to Claude when you're ready to begin implementation.*

*For questions or clarifications on any section, refer back to this document or consult the Fourth Shift SDK documentation.*

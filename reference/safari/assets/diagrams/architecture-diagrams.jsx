import React, { useState } from 'react';

const ArchitectureDiagrams = () => {
  const [activeTab, setActiveTab] = useState('overview');
  
  const tabs = [
    { id: 'overview', label: 'System Overview' },
    { id: 'modules', label: 'Module Architecture' },
    { id: 'erp', label: 'ERP Integration Patterns' },
    { id: 'datamodel', label: 'Data Model' },
    { id: 'workflows', label: 'Workflow States' },
    { id: 'ti', label: 'TI Backlog Integration' },
  ];

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)',
      fontFamily: "'IBM Plex Sans', -apple-system, BlinkMacSystemFont, sans-serif",
      color: '#e2e8f0',
      padding: '24px',
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500&display=swap');
        * { box-sizing: border-box; }
        .diagram-card {
          background: rgba(30, 41, 59, 0.7);
          border: 1px solid rgba(148, 163, 184, 0.1);
          border-radius: 12px;
          backdrop-filter: blur(12px);
        }
        .node { transition: all 0.2s ease; }
        .node:hover { filter: brightness(1.1); transform: translateY(-2px); }
        .flow-line { stroke-dasharray: 8 4; animation: flow 1.5s linear infinite; }
        @keyframes flow { to { stroke-dashoffset: -12; } }
      `}</style>

      <div style={{ marginBottom: '32px', textAlign: 'center' }}>
        <h1 style={{
          fontSize: '28px',
          fontWeight: '700',
          background: 'linear-gradient(90deg, #60a5fa, #a78bfa, #f472b6)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          marginBottom: '8px',
        }}>
          Multi-ERP Quote & Purchase Integration Architecture
        </h1>
        <p style={{ color: '#94a3b8', fontSize: '14px' }}>
          Modular architecture supporting TI Backlog API, multiple ERPs, and cross-functional quoting
        </p>
      </div>

      <div style={{ display: 'flex', gap: '8px', marginBottom: '24px', flexWrap: 'wrap', justifyContent: 'center' }}>
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              padding: '10px 20px',
              borderRadius: '8px',
              border: activeTab === tab.id ? '1px solid #60a5fa' : '1px solid rgba(148, 163, 184, 0.2)',
              background: activeTab === tab.id ? 'rgba(96, 165, 250, 0.15)' : 'rgba(30, 41, 59, 0.5)',
              color: activeTab === tab.id ? '#60a5fa' : '#94a3b8',
              cursor: 'pointer',
              fontSize: '13px',
              fontWeight: '500',
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="diagram-card" style={{ padding: '24px', minHeight: '600px' }}>
        {activeTab === 'overview' && <SystemOverview />}
        {activeTab === 'modules' && <ModuleArchitecture />}
        {activeTab === 'erp' && <ERPIntegrationPatterns />}
        {activeTab === 'datamodel' && <DataModel />}
        {activeTab === 'workflows' && <WorkflowStates />}
        {activeTab === 'ti' && <TIBacklogIntegration />}
      </div>

      <div style={{
        marginTop: '24px',
        padding: '16px',
        background: 'rgba(30, 41, 59, 0.5)',
        borderRadius: '8px',
        display: 'flex',
        gap: '24px',
        flexWrap: 'wrap',
        justifyContent: 'center',
        fontSize: '12px',
      }}>
        <LegendItem color="#60a5fa" label="Internal Systems" />
        <LegendItem color="#34d399" label="Integration Layer" />
        <LegendItem color="#f472b6" label="External APIs" />
        <LegendItem color="#fbbf24" label="Data Stores" />
        <LegendItem color="#a78bfa" label="User Applications" />
      </div>
    </div>
  );
};

const LegendItem = ({ color, label }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
    <div style={{ width: '12px', height: '12px', borderRadius: '3px', background: color }} />
    <span style={{ color: '#94a3b8' }}>{label}</span>
  </div>
);

const SystemOverview = () => (
  <div>
    <h2 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '16px', color: '#f1f5f9' }}>
      High-Level System Overview
    </h2>
    <p style={{ color: '#94a3b8', marginBottom: '24px', fontSize: '14px', lineHeight: '1.6' }}>
      Central integration platform supporting multiple ERPs, a home-grown purchasing app, 
      and cross-functional quoting needs (Purchasing, Sales, Engineering).
    </p>
    
    <svg viewBox="0 0 900 550" style={{ width: '100%', maxWidth: '900px', margin: '0 auto', display: 'block' }}>
      <defs>
        <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(148,163,184,0.05)" strokeWidth="1"/>
        </pattern>
        <linearGradient id="blueGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3b82f6" /><stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>
        <linearGradient id="greenGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#10b981" /><stop offset="100%" stopColor="#059669" />
        </linearGradient>
        <linearGradient id="pinkGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ec4899" /><stop offset="100%" stopColor="#be185d" />
        </linearGradient>
        <linearGradient id="purpleGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#8b5cf6" /><stop offset="100%" stopColor="#6d28d9" />
        </linearGradient>
        <linearGradient id="yellowGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f59e0b" /><stop offset="100%" stopColor="#d97706" />
        </linearGradient>
      </defs>
      <rect width="900" height="550" fill="url(#grid)" />
      
      <text x="80" y="30" fill="#64748b" fontSize="11" fontWeight="500">SYSTEMS OF RECORD</text>
      <text x="360" y="30" fill="#64748b" fontSize="11" fontWeight="500">INTEGRATION PLATFORM</text>
      <text x="700" y="30" fill="#64748b" fontSize="11" fontWeight="500">SUPPLIERS</text>
      
      <g className="node">
        <rect x="30" y="60" width="160" height="70" rx="8" fill="url(#blueGrad)" opacity="0.9"/>
        <text x="110" y="90" textAnchor="middle" fill="white" fontSize="12" fontWeight="600">ERP System A</text>
        <text x="110" y="108" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="10">(Site 1 - REST API)</text>
      </g>
      
      <g className="node">
        <rect x="30" y="145" width="160" height="70" rx="8" fill="url(#blueGrad)" opacity="0.9"/>
        <text x="110" y="175" textAnchor="middle" fill="white" fontSize="12" fontWeight="600">ERP System B</text>
        <text x="110" y="193" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="10">(Site 2 - File Export)</text>
      </g>
      
      <g className="node">
        <rect x="30" y="230" width="160" height="70" rx="8" fill="url(#blueGrad)" opacity="0.9"/>
        <text x="110" y="260" textAnchor="middle" fill="white" fontSize="12" fontWeight="600">ERP System C</text>
        <text x="110" y="278" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="10">(Site 3 - SOAP/EDI)</text>
      </g>
      
      <g className="node">
        <rect x="30" y="330" width="160" height="90" rx="8" fill="url(#purpleGrad)" opacity="0.9"/>
        <text x="110" y="360" textAnchor="middle" fill="white" fontSize="12" fontWeight="600">Home-Grown</text>
        <text x="110" y="378" textAnchor="middle" fill="white" fontSize="12" fontWeight="600">Purchasing App</text>
        <text x="110" y="400" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="10">(System of Record option)</text>
      </g>
      
      <rect x="250" y="50" width="280" height="470" rx="12" fill="rgba(16, 185, 129, 0.08)" stroke="rgba(16, 185, 129, 0.3)" strokeWidth="1" strokeDasharray="4 2"/>
      
      <g className="node">
        <rect x="270" y="80" width="100" height="50" rx="6" fill="url(#greenGrad)" opacity="0.9"/>
        <text x="320" y="100" textAnchor="middle" fill="white" fontSize="10" fontWeight="500">ERP Adapter</text>
        <text x="320" y="115" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="9">REST</text>
      </g>
      
      <g className="node">
        <rect x="270" y="145" width="100" height="50" rx="6" fill="url(#greenGrad)" opacity="0.9"/>
        <text x="320" y="165" textAnchor="middle" fill="white" fontSize="10" fontWeight="500">ERP Adapter</text>
        <text x="320" y="180" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="9">File/SFTP</text>
      </g>
      
      <g className="node">
        <rect x="270" y="210" width="100" height="50" rx="6" fill="url(#greenGrad)" opacity="0.9"/>
        <text x="320" y="230" textAnchor="middle" fill="white" fontSize="10" fontWeight="500">ERP Adapter</text>
        <text x="320" y="245" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="9">SOAP/EDI</text>
      </g>
      
      <g className="node">
        <rect x="270" y="290" width="240" height="70" rx="8" fill="url(#greenGrad)"/>
        <text x="390" y="320" textAnchor="middle" fill="white" fontSize="13" fontWeight="600">Quoting Service</text>
        <text x="390" y="340" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="10">State Machine • Correlation • Async Handlers</text>
      </g>
      
      <g className="node">
        <rect x="270" y="375" width="240" height="70" rx="8" fill="url(#greenGrad)"/>
        <text x="390" y="405" textAnchor="middle" fill="white" fontSize="13" fontWeight="600">Purchasing Service</text>
        <text x="390" y="425" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="10">Order State • PO Management • Sync</text>
      </g>
      
      <g className="node">
        <rect x="270" y="460" width="110" height="45" rx="6" fill="url(#yellowGrad)"/>
        <text x="325" y="487" textAnchor="middle" fill="white" fontSize="11" fontWeight="500">State DB</text>
      </g>
      
      <g className="node">
        <rect x="400" y="460" width="110" height="45" rx="6" fill="url(#yellowGrad)"/>
        <text x="455" y="487" textAnchor="middle" fill="white" fontSize="11" fontWeight="500">Event Queue</text>
      </g>
      
      <g className="node">
        <rect x="410" y="80" width="100" height="50" rx="6" fill="url(#greenGrad)" opacity="0.9"/>
        <text x="460" y="100" textAnchor="middle" fill="white" fontSize="10" fontWeight="500">TI Adapter</text>
        <text x="460" y="115" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="9">Quote Required</text>
      </g>
      
      <g className="node">
        <rect x="410" y="145" width="100" height="50" rx="6" fill="url(#greenGrad)" opacity="0.9"/>
        <text x="460" y="165" textAnchor="middle" fill="white" fontSize="10" fontWeight="500">Distributor B</text>
        <text x="460" y="180" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="9">Direct Order</text>
      </g>
      
      <g className="node">
        <rect x="410" y="210" width="100" height="50" rx="6" fill="url(#greenGrad)" opacity="0.9"/>
        <text x="460" y="230" textAnchor="middle" fill="white" fontSize="10" fontWeight="500">Distributor C</text>
        <text x="460" y="245" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="9">Direct Order</text>
      </g>
      
      <g className="node">
        <rect x="600" y="60" width="160" height="85" rx="8" fill="url(#pinkGrad)"/>
        <text x="680" y="90" textAnchor="middle" fill="white" fontSize="12" fontWeight="600">TI Backlog API</text>
        <text x="680" y="108" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="10">Quote → 24hr wait</text>
        <text x="680" y="125" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="10">→ Purchase</text>
      </g>
      
      <g className="node">
        <rect x="600" y="160" width="160" height="60" rx="8" fill="url(#pinkGrad)" opacity="0.7"/>
        <text x="680" y="185" textAnchor="middle" fill="white" fontSize="12" fontWeight="600">Distributor B API</text>
        <text x="680" y="203" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="10">Direct Purchase</text>
      </g>
      
      <g className="node">
        <rect x="600" y="235" width="160" height="60" rx="8" fill="url(#pinkGrad)" opacity="0.7"/>
        <text x="680" y="260" textAnchor="middle" fill="white" fontSize="12" fontWeight="600">Distributor C API</text>
        <text x="680" y="278" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="10">Direct Purchase</text>
      </g>
      
      <text x="700" y="340" fill="#64748b" fontSize="11" fontWeight="500">USER APPLICATIONS</text>
      
      <g className="node">
        <rect x="600" y="360" width="90" height="55" rx="6" fill="url(#purpleGrad)" opacity="0.8"/>
        <text x="645" y="382" textAnchor="middle" fill="white" fontSize="10" fontWeight="500">Sales</text>
        <text x="645" y="398" textAnchor="middle" fill="white" fontSize="10" fontWeight="500">Quoting</text>
      </g>
      
      <g className="node">
        <rect x="700" y="360" width="90" height="55" rx="6" fill="url(#purpleGrad)" opacity="0.8"/>
        <text x="745" y="382" textAnchor="middle" fill="white" fontSize="10" fontWeight="500">Engineering</text>
        <text x="745" y="398" textAnchor="middle" fill="white" fontSize="10" fontWeight="500">Quoting</text>
      </g>
      
      <g stroke="#60a5fa" strokeWidth="1.5" fill="none" opacity="0.6">
        <path d="M190 95 L270 105" />
        <path d="M190 180 L270 170" />
        <path d="M190 265 L270 235" />
        <path d="M190 375 L270 380" className="flow-line" />
      </g>
      
      <g stroke="#34d399" strokeWidth="1.5" fill="none" opacity="0.6">
        <path d="M370 105 L410 105" />
        <path d="M370 170 L410 170" />
        <path d="M370 235 L410 235" />
        <path d="M510 105 L600 102" className="flow-line" />
        <path d="M510 170 L600 190" />
        <path d="M510 235 L600 265" />
      </g>
      
      <g stroke="#a78bfa" strokeWidth="1.5" fill="none" opacity="0.6">
        <path d="M645 360 L510 325" />
        <path d="M745 360 L510 325" />
      </g>
    </svg>
  </div>
);

const ModuleArchitecture = () => (
  <div>
    <h2 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '16px', color: '#f1f5f9' }}>
      Modular Backend Architecture
    </h2>
    <p style={{ color: '#94a3b8', marginBottom: '24px', fontSize: '14px', lineHeight: '1.6' }}>
      Separate Quoting and Purchasing modules with shared infrastructure. 
      Quoting serves Purchasing, Sales, and Engineering workflows.
    </p>
    
    <svg viewBox="0 0 850 520" style={{ width: '100%', maxWidth: '850px', margin: '0 auto', display: 'block' }}>
      <defs>
        <pattern id="dots" width="16" height="16" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="1" fill="rgba(148,163,184,0.1)"/>
        </pattern>
      </defs>
      <rect width="850" height="520" fill="url(#dots)" />
      
      <rect x="30" y="40" width="370" height="430" rx="12" fill="rgba(96, 165, 250, 0.06)" stroke="rgba(96, 165, 250, 0.3)" strokeWidth="1"/>
      <text x="50" y="70" fill="#60a5fa" fontSize="14" fontWeight="600">QUOTING MODULE</text>
      
      <g className="node">
        <rect x="50" y="90" width="150" height="60" rx="6" fill="rgba(96, 165, 250, 0.2)" stroke="#60a5fa" strokeWidth="1"/>
        <text x="125" y="115" textAnchor="middle" fill="#60a5fa" fontSize="11" fontWeight="500">Quote Request</text>
        <text x="125" y="132" textAnchor="middle" fill="#60a5fa" fontSize="11" fontWeight="500">Handler</text>
      </g>
      
      <g className="node">
        <rect x="220" y="90" width="150" height="60" rx="6" fill="rgba(96, 165, 250, 0.2)" stroke="#60a5fa" strokeWidth="1"/>
        <text x="295" y="115" textAnchor="middle" fill="#60a5fa" fontSize="11" fontWeight="500">Quote Response</text>
        <text x="295" y="132" textAnchor="middle" fill="#60a5fa" fontSize="11" fontWeight="500">Handler</text>
      </g>
      
      <g className="node">
        <rect x="50" y="170" width="320" height="70" rx="6" fill="rgba(96, 165, 250, 0.15)" stroke="#60a5fa" strokeWidth="1"/>
        <text x="210" y="195" textAnchor="middle" fill="#60a5fa" fontSize="12" fontWeight="600">Quote State Machine</text>
        <text x="210" y="215" textAnchor="middle" fill="rgba(96, 165, 250, 0.8)" fontSize="10">PENDING → RECEIVED → ACCEPTED/REJECTED/EXPIRED</text>
      </g>
      
      <rect x="50" y="260" width="100" height="35" rx="4" fill="rgba(167, 139, 250, 0.2)" stroke="#a78bfa" strokeWidth="1"/>
      <text x="100" y="282" textAnchor="middle" fill="#a78bfa" fontSize="10" fontWeight="500">Purchasing</text>
      
      <rect x="160" y="260" width="100" height="35" rx="4" fill="rgba(251, 191, 36, 0.2)" stroke="#fbbf24" strokeWidth="1"/>
      <text x="210" y="282" textAnchor="middle" fill="#fbbf24" fontSize="10" fontWeight="500">Sales</text>
      
      <rect x="270" y="260" width="100" height="35" rx="4" fill="rgba(244, 114, 182, 0.2)" stroke="#f472b6" strokeWidth="1"/>
      <text x="320" y="282" textAnchor="middle" fill="#f472b6" fontSize="10" fontWeight="500">Engineering</text>
      
      <text x="50" y="325" fill="#94a3b8" fontSize="10">Quote contexts determine downstream workflow</text>
      
      <g className="node">
        <rect x="50" y="350" width="320" height="100" rx="6" fill="rgba(251, 191, 36, 0.1)" stroke="#fbbf24" strokeWidth="1"/>
        <text x="210" y="375" textAnchor="middle" fill="#fbbf24" fontSize="12" fontWeight="600">Quote Data Store</text>
        <text x="80" y="400" fill="rgba(251, 191, 36, 0.8)" fontSize="10" fontFamily="monospace">• quote_requests</text>
        <text x="80" y="418" fill="rgba(251, 191, 36, 0.8)" fontSize="10" fontFamily="monospace">• quote_line_items</text>
        <text x="220" y="400" fill="rgba(251, 191, 36, 0.8)" fontSize="10" fontFamily="monospace">• quote_responses</text>
        <text x="220" y="418" fill="rgba(251, 191, 36, 0.8)" fontSize="10" fontFamily="monospace">• supplier_correlations</text>
      </g>
      
      <rect x="430" y="40" width="390" height="280" rx="12" fill="rgba(52, 211, 153, 0.06)" stroke="rgba(52, 211, 153, 0.3)" strokeWidth="1"/>
      <text x="450" y="70" fill="#34d399" fontSize="14" fontWeight="600">PURCHASING MODULE</text>
      
      <g className="node">
        <rect x="450" y="90" width="160" height="60" rx="6" fill="rgba(52, 211, 153, 0.2)" stroke="#34d399" strokeWidth="1"/>
        <text x="530" y="115" textAnchor="middle" fill="#34d399" fontSize="11" fontWeight="500">Order Creation</text>
        <text x="530" y="132" textAnchor="middle" fill="#34d399" fontSize="11" fontWeight="500">Service</text>
      </g>
      
      <g className="node">
        <rect x="630" y="90" width="160" height="60" rx="6" fill="rgba(52, 211, 153, 0.2)" stroke="#34d399" strokeWidth="1"/>
        <text x="710" y="115" textAnchor="middle" fill="#34d399" fontSize="11" fontWeight="500">Order Submission</text>
        <text x="710" y="132" textAnchor="middle" fill="#34d399" fontSize="11" fontWeight="500">Handler</text>
      </g>
      
      <g className="node">
        <rect x="450" y="170" width="340" height="70" rx="6" fill="rgba(52, 211, 153, 0.15)" stroke="#34d399" strokeWidth="1"/>
        <text x="620" y="195" textAnchor="middle" fill="#34d399" fontSize="12" fontWeight="600">Purchase Order State Machine</text>
        <text x="620" y="215" textAnchor="middle" fill="rgba(52, 211, 153, 0.8)" fontSize="10">DRAFT → QUOTE_PENDING → APPROVED → SUBMITTED → CONFIRMED</text>
      </g>
      
      <g className="node">
        <rect x="450" y="260" width="340" height="50" rx="6" fill="rgba(251, 191, 36, 0.1)" stroke="#fbbf24" strokeWidth="1"/>
        <text x="620" y="290" textAnchor="middle" fill="#fbbf24" fontSize="11" fontWeight="500">purchase_orders • po_line_items • po_quote_links</text>
      </g>
      
      <rect x="430" y="350" width="390" height="120" rx="12" fill="rgba(148, 163, 184, 0.06)" stroke="rgba(148, 163, 184, 0.3)" strokeWidth="1"/>
      <text x="450" y="380" fill="#94a3b8" fontSize="14" fontWeight="600">SHARED INFRASTRUCTURE</text>
      
      <g className="node">
        <rect x="450" y="395" width="105" height="55" rx="6" fill="rgba(148, 163, 184, 0.15)" stroke="#64748b" strokeWidth="1"/>
        <text x="502" y="420" textAnchor="middle" fill="#94a3b8" fontSize="10" fontWeight="500">Event Bus</text>
        <text x="502" y="436" textAnchor="middle" fill="#64748b" fontSize="9">Kafka/RabbitMQ</text>
      </g>
      
      <g className="node">
        <rect x="570" y="395" width="105" height="55" rx="6" fill="rgba(148, 163, 184, 0.15)" stroke="#64748b" strokeWidth="1"/>
        <text x="622" y="420" textAnchor="middle" fill="#94a3b8" fontSize="10" fontWeight="500">Job Queue</text>
        <text x="622" y="436" textAnchor="middle" fill="#64748b" fontSize="9">Polling/Retries</text>
      </g>
      
      <g className="node">
        <rect x="690" y="395" width="105" height="55" rx="6" fill="rgba(148, 163, 184, 0.15)" stroke="#64748b" strokeWidth="1"/>
        <text x="742" y="420" textAnchor="middle" fill="#94a3b8" fontSize="10" fontWeight="500">Webhook</text>
        <text x="742" y="436" textAnchor="middle" fill="#64748b" fontSize="9">Receiver</text>
      </g>
      
      <g stroke="#60a5fa" strokeWidth="2" fill="none" opacity="0.5">
        <path d="M370 205 L450 205" className="flow-line" />
      </g>
      
      <text x="390" y="195" fill="#60a5fa" fontSize="9" fontWeight="500">Quote</text>
      <text x="390" y="207" fill="#60a5fa" fontSize="9" fontWeight="500">Link</text>
    </svg>
    
    <div style={{ marginTop: '24px', padding: '16px', background: 'rgba(96, 165, 250, 0.1)', borderRadius: '8px', borderLeft: '3px solid #60a5fa' }}>
      <h4 style={{ color: '#60a5fa', fontSize: '13px', fontWeight: '600', marginBottom: '8px' }}>Key Design Decision</h4>
      <p style={{ color: '#94a3b8', fontSize: '12px', lineHeight: '1.6', margin: 0 }}>
        The Quoting Module is context-aware: a quote tagged as "Purchasing" flows into the PO workflow, 
        while "Sales" quotes flow to CRM/CPQ systems and "Engineering" quotes feed BOM costing tools. 
        Same backend tables, different downstream handlers.
      </p>
    </div>
  </div>
);

const ERPIntegrationPatterns = () => (
  <div>
    <h2 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '16px', color: '#f1f5f9' }}>
      ERP Integration Patterns
    </h2>
    <p style={{ color: '#94a3b8', marginBottom: '24px', fontSize: '14px', lineHeight: '1.6' }}>
      Adapter pattern accommodates varying ERP capabilities. Each site can use either 
      its ERP or the home-grown app as system of record.
    </p>
    
    <svg viewBox="0 0 850 480" style={{ width: '100%', maxWidth: '850px', margin: '0 auto', display: 'block' }}>
      <defs>
        <pattern id="diag" width="10" height="10" patternUnits="userSpaceOnUse">
          <path d="M-1,1 l2,-2 M0,10 l10,-10 M9,11 l2,-2" stroke="rgba(148,163,184,0.05)" strokeWidth="1"/>
        </pattern>
        <marker id="arrowGreen" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
          <polygon points="0 0, 10 3.5, 0 7" fill="#34d399"/>
        </marker>
        <marker id="arrowYellow" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
          <polygon points="0 0, 10 3.5, 0 7" fill="#fbbf24"/>
        </marker>
        <marker id="arrowPurple" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
          <polygon points="0 0, 10 3.5, 0 7" fill="#a78bfa"/>
        </marker>
      </defs>
      <rect width="850" height="480" fill="url(#diag)" />
      
      <rect x="20" y="20" width="260" height="200" rx="10" fill="rgba(52, 211, 153, 0.08)" stroke="rgba(52, 211, 153, 0.4)" strokeWidth="1"/>
      <text x="40" y="50" fill="#34d399" fontSize="13" fontWeight="600">Pattern A: REST API ERP</text>
      
      <g className="node">
        <rect x="40" y="70" width="100" height="50" rx="5" fill="rgba(59, 130, 246, 0.3)" stroke="#3b82f6" strokeWidth="1"/>
        <text x="90" y="100" textAnchor="middle" fill="#60a5fa" fontSize="10" fontWeight="500">ERP (REST)</text>
      </g>
      
      <path d="M140 95 L160 95" stroke="#34d399" strokeWidth="1.5" markerEnd="url(#arrowGreen)"/>
      
      <g className="node">
        <rect x="160" y="70" width="100" height="50" rx="5" fill="rgba(52, 211, 153, 0.3)" stroke="#34d399" strokeWidth="1"/>
        <text x="210" y="92" textAnchor="middle" fill="#34d399" fontSize="9" fontWeight="500">REST Adapter</text>
        <text x="210" y="106" textAnchor="middle" fill="rgba(52, 211, 153, 0.7)" fontSize="8">Bidirectional</text>
      </g>
      
      <text x="40" y="145" fill="#94a3b8" fontSize="10">✓ Real-time sync</text>
      <text x="40" y="162" fill="#94a3b8" fontSize="10">✓ ERP is system of record</text>
      <text x="40" y="179" fill="#94a3b8" fontSize="10">✓ Push updates to ERP</text>
      <text x="40" y="196" fill="#94a3b8" fontSize="10">✓ Webhook receivers</text>
      
      <rect x="295" y="20" width="260" height="200" rx="10" fill="rgba(251, 191, 36, 0.08)" stroke="rgba(251, 191, 36, 0.4)" strokeWidth="1"/>
      <text x="315" y="50" fill="#fbbf24" fontSize="13" fontWeight="600">Pattern B: File-Based ERP</text>
      
      <g className="node">
        <rect x="315" y="70" width="100" height="50" rx="5" fill="rgba(59, 130, 246, 0.3)" stroke="#3b82f6" strokeWidth="1"/>
        <text x="365" y="92" textAnchor="middle" fill="#60a5fa" fontSize="10" fontWeight="500">ERP (Legacy)</text>
        <text x="365" y="106" textAnchor="middle" fill="rgba(96, 165, 250, 0.7)" fontSize="8">CSV/EDI Export</text>
      </g>
      
      <path d="M415 95 L435 95" stroke="#fbbf24" strokeWidth="1.5" markerEnd="url(#arrowYellow)"/>
      
      <g className="node">
        <rect x="435" y="70" width="100" height="50" rx="5" fill="rgba(251, 191, 36, 0.3)" stroke="#fbbf24" strokeWidth="1"/>
        <text x="485" y="92" textAnchor="middle" fill="#fbbf24" fontSize="9" fontWeight="500">File Adapter</text>
        <text x="485" y="106" textAnchor="middle" fill="rgba(251, 191, 36, 0.7)" fontSize="8">SFTP/Scheduled</text>
      </g>
      
      <text x="315" y="145" fill="#94a3b8" fontSize="10">○ Batch sync (hourly/daily)</text>
      <text x="315" y="162" fill="#94a3b8" fontSize="10">○ ERP is system of record</text>
      <text x="315" y="179" fill="#94a3b8" fontSize="10">○ Generate import files</text>
      <text x="315" y="196" fill="#94a3b8" fontSize="10">○ Monitor file drops</text>
      
      <rect x="570" y="20" width="260" height="200" rx="10" fill="rgba(167, 139, 250, 0.08)" stroke="rgba(167, 139, 250, 0.4)" strokeWidth="1"/>
      <text x="590" y="50" fill="#a78bfa" fontSize="13" fontWeight="600">Pattern C: Home-Grown App</text>
      
      <g className="node">
        <rect x="590" y="70" width="100" height="50" rx="5" fill="rgba(167, 139, 250, 0.3)" stroke="#a78bfa" strokeWidth="1"/>
        <text x="640" y="92" textAnchor="middle" fill="#a78bfa" fontSize="10" fontWeight="500">Purchasing</text>
        <text x="640" y="106" textAnchor="middle" fill="#a78bfa" fontSize="10" fontWeight="500">App</text>
      </g>
      
      <path d="M690 95 L710 95" stroke="#a78bfa" strokeWidth="1.5" markerEnd="url(#arrowPurple)"/>
      
      <g className="node">
        <rect x="710" y="70" width="100" height="50" rx="5" fill="rgba(167, 139, 250, 0.2)" stroke="#a78bfa" strokeWidth="1"/>
        <text x="760" y="92" textAnchor="middle" fill="#a78bfa" fontSize="9" fontWeight="500">Direct DB</text>
        <text x="760" y="106" textAnchor="middle" fill="rgba(167, 139, 250, 0.7)" fontSize="8">No Adapter</text>
      </g>
      
      <text x="590" y="145" fill="#94a3b8" fontSize="10">✓ Full control</text>
      <text x="590" y="162" fill="#94a3b8" fontSize="10">✓ App is system of record</text>
      <text x="590" y="179" fill="#94a3b8" fontSize="10">✓ Native state management</text>
      <text x="590" y="196" fill="#94a3b8" fontSize="10">✓ Optional ERP export</text>
      
      <rect x="20" y="250" width="810" height="210" rx="10" fill="rgba(148, 163, 184, 0.05)" stroke="rgba(148, 163, 184, 0.2)" strokeWidth="1"/>
      <text x="40" y="280" fill="#f1f5f9" fontSize="14" fontWeight="600">System of Record Decision Flow</text>
      
      <g className="node">
        <rect x="350" y="300" width="150" height="50" rx="25" fill="rgba(96, 165, 250, 0.2)" stroke="#60a5fa" strokeWidth="1"/>
        <text x="425" y="330" textAnchor="middle" fill="#60a5fa" fontSize="11" fontWeight="500">New Site Onboard</text>
      </g>
      
      <path d="M425 350 L425 370" stroke="#64748b" strokeWidth="1"/>
      
      <g className="node">
        <rect x="320" y="370" width="210" height="40" rx="5" fill="rgba(148, 163, 184, 0.15)" stroke="#64748b" strokeWidth="1"/>
        <text x="425" y="395" textAnchor="middle" fill="#94a3b8" fontSize="10">Does ERP have API capabilities?</text>
      </g>
      
      <path d="M320 390 L200 390 L200 430" stroke="#34d399" strokeWidth="1"/>
      <text x="220" y="385" fill="#34d399" fontSize="9">YES</text>
      
      <path d="M530 390 L650 390 L650 430" stroke="#fbbf24" strokeWidth="1"/>
      <text x="600" y="385" fill="#fbbf24" fontSize="9">NO</text>
      
      <g className="node">
        <rect x="100" y="430" width="200" height="25" rx="4" fill="rgba(52, 211, 153, 0.2)" stroke="#34d399" strokeWidth="1"/>
        <text x="200" y="447" textAnchor="middle" fill="#34d399" fontSize="10">ERP = System of Record</text>
      </g>
      
      <g className="node">
        <rect x="550" y="430" width="200" height="25" rx="4" fill="rgba(167, 139, 250, 0.2)" stroke="#a78bfa" strokeWidth="1"/>
        <text x="650" y="447" textAnchor="middle" fill="#a78bfa" fontSize="10">Home-Grown App = SoR</text>
      </g>
    </svg>
  </div>
);

const DataModel = () => (
  <div>
    <h2 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '16px', color: '#f1f5f9' }}>
      Core Data Model
    </h2>
    <p style={{ color: '#94a3b8', marginBottom: '24px', fontSize: '14px', lineHeight: '1.6' }}>
      Unified schema supporting multi-context quoting and flexible purchase order tracking.
    </p>
    
    <svg viewBox="0 0 850 580" style={{ width: '100%', maxWidth: '850px', margin: '0 auto', display: 'block' }}>
      <rect width="850" height="580" fill="transparent" />
      
      <g className="node">
        <rect x="20" y="20" width="180" height="120" rx="6" fill="rgba(148, 163, 184, 0.1)" stroke="#64748b" strokeWidth="1"/>
        <rect x="20" y="20" width="180" height="28" rx="6" fill="rgba(148, 163, 184, 0.2)"/>
        <text x="110" y="40" textAnchor="middle" fill="#f1f5f9" fontSize="12" fontWeight="600">sites</text>
        <text x="30" y="65" fill="#94a3b8" fontSize="10" fontFamily="monospace">id</text>
        <text x="160" y="65" fill="#64748b" fontSize="9" textAnchor="end">PK</text>
        <text x="30" y="82" fill="#94a3b8" fontSize="10" fontFamily="monospace">name</text>
        <text x="30" y="99" fill="#94a3b8" fontSize="10" fontFamily="monospace">erp_type</text>
        <text x="30" y="116" fill="#94a3b8" fontSize="10" fontFamily="monospace">system_of_record</text>
      </g>
      
      <g className="node">
        <rect x="20" y="160" width="180" height="130" rx="6" fill="rgba(244, 114, 182, 0.1)" stroke="#f472b6" strokeWidth="1"/>
        <rect x="20" y="160" width="180" height="28" rx="6" fill="rgba(244, 114, 182, 0.2)"/>
        <text x="110" y="180" textAnchor="middle" fill="#f472b6" fontSize="12" fontWeight="600">suppliers</text>
        <text x="30" y="205" fill="#f472b6" fontSize="10" fontFamily="monospace">id</text>
        <text x="160" y="205" fill="#f472b6" fontSize="9" textAnchor="end">PK</text>
        <text x="30" y="222" fill="#94a3b8" fontSize="10" fontFamily="monospace">name</text>
        <text x="30" y="239" fill="#94a3b8" fontSize="10" fontFamily="monospace">api_type</text>
        <text x="30" y="256" fill="#94a3b8" fontSize="10" fontFamily="monospace">requires_quote</text>
        <text x="30" y="273" fill="#94a3b8" fontSize="10" fontFamily="monospace">webhook_url</text>
      </g>
      
      <g className="node">
        <rect x="240" y="20" width="220" height="200" rx="6" fill="rgba(96, 165, 250, 0.1)" stroke="#60a5fa" strokeWidth="1"/>
        <rect x="240" y="20" width="220" height="28" rx="6" fill="rgba(96, 165, 250, 0.2)"/>
        <text x="350" y="40" textAnchor="middle" fill="#60a5fa" fontSize="12" fontWeight="600">quote_requests</text>
        <text x="250" y="65" fill="#60a5fa" fontSize="10" fontFamily="monospace">id</text>
        <text x="420" y="65" fill="#60a5fa" fontSize="9" textAnchor="end">PK</text>
        <text x="250" y="82" fill="#94a3b8" fontSize="10" fontFamily="monospace">site_id</text>
        <text x="420" y="82" fill="#64748b" fontSize="9" textAnchor="end">FK</text>
        <text x="250" y="99" fill="#94a3b8" fontSize="10" fontFamily="monospace">supplier_id</text>
        <text x="420" y="99" fill="#f472b6" fontSize="9" textAnchor="end">FK</text>
        <text x="250" y="116" fill="#94a3b8" fontSize="10" fontFamily="monospace">context</text>
        <text x="420" y="116" fill="#64748b" fontSize="9" textAnchor="end">ENUM</text>
        <text x="250" y="133" fill="#94a3b8" fontSize="10" fontFamily="monospace">status</text>
        <text x="420" y="133" fill="#64748b" fontSize="9" textAnchor="end">ENUM</text>
        <text x="250" y="150" fill="#94a3b8" fontSize="10" fontFamily="monospace">correlation_id</text>
        <text x="250" y="167" fill="#94a3b8" fontSize="10" fontFamily="monospace">supplier_quote_id</text>
        <text x="250" y="184" fill="#94a3b8" fontSize="10" fontFamily="monospace">request_payload</text>
        <text x="420" y="184" fill="#64748b" fontSize="9" textAnchor="end">JSONB</text>
        <text x="250" y="201" fill="#94a3b8" fontSize="10" fontFamily="monospace">response_payload</text>
        <text x="420" y="201" fill="#64748b" fontSize="9" textAnchor="end">JSONB</text>
      </g>
      
      <g className="node">
        <rect x="240" y="240" width="220" height="115" rx="6" fill="rgba(96, 165, 250, 0.1)" stroke="#60a5fa" strokeWidth="1"/>
        <rect x="240" y="240" width="220" height="28" rx="6" fill="rgba(96, 165, 250, 0.2)"/>
        <text x="350" y="260" textAnchor="middle" fill="#60a5fa" fontSize="12" fontWeight="600">quote_line_items</text>
        <text x="250" y="285" fill="#60a5fa" fontSize="10" fontFamily="monospace">id</text>
        <text x="420" y="285" fill="#60a5fa" fontSize="9" textAnchor="end">PK</text>
        <text x="250" y="302" fill="#94a3b8" fontSize="10" fontFamily="monospace">quote_request_id</text>
        <text x="420" y="302" fill="#60a5fa" fontSize="9" textAnchor="end">FK</text>
        <text x="250" y="319" fill="#94a3b8" fontSize="10" fontFamily="monospace">part_number</text>
        <text x="250" y="336" fill="#94a3b8" fontSize="10" fontFamily="monospace">quantity, unit_price</text>
      </g>
      
      <g className="node">
        <rect x="500" y="20" width="220" height="185" rx="6" fill="rgba(52, 211, 153, 0.1)" stroke="#34d399" strokeWidth="1"/>
        <rect x="500" y="20" width="220" height="28" rx="6" fill="rgba(52, 211, 153, 0.2)"/>
        <text x="610" y="40" textAnchor="middle" fill="#34d399" fontSize="12" fontWeight="600">purchase_orders</text>
        <text x="510" y="65" fill="#34d399" fontSize="10" fontFamily="monospace">id</text>
        <text x="680" y="65" fill="#34d399" fontSize="9" textAnchor="end">PK</text>
        <text x="510" y="82" fill="#94a3b8" fontSize="10" fontFamily="monospace">site_id</text>
        <text x="680" y="82" fill="#64748b" fontSize="9" textAnchor="end">FK</text>
        <text x="510" y="99" fill="#94a3b8" fontSize="10" fontFamily="monospace">supplier_id</text>
        <text x="680" y="99" fill="#f472b6" fontSize="9" textAnchor="end">FK</text>
        <text x="510" y="116" fill="#94a3b8" fontSize="10" fontFamily="monospace">erp_po_number</text>
        <text x="510" y="133" fill="#94a3b8" fontSize="10" fontFamily="monospace">status</text>
        <text x="680" y="133" fill="#64748b" fontSize="9" textAnchor="end">ENUM</text>
        <text x="510" y="150" fill="#94a3b8" fontSize="10" fontFamily="monospace">source_system</text>
        <text x="680" y="150" fill="#64748b" fontSize="9" textAnchor="end">'ERP'|'APP'</text>
        <text x="510" y="167" fill="#94a3b8" fontSize="10" fontFamily="monospace">linked_quote_id</text>
        <text x="680" y="167" fill="#60a5fa" fontSize="9" textAnchor="end">FK</text>
        <text x="510" y="184" fill="#94a3b8" fontSize="10" fontFamily="monospace">supplier_order_id</text>
      </g>
      
      <g className="node">
        <rect x="500" y="220" width="220" height="100" rx="6" fill="rgba(52, 211, 153, 0.1)" stroke="#34d399" strokeWidth="1"/>
        <rect x="500" y="220" width="220" height="28" rx="6" fill="rgba(52, 211, 153, 0.2)"/>
        <text x="610" y="240" textAnchor="middle" fill="#34d399" fontSize="12" fontWeight="600">po_line_items</text>
        <text x="510" y="265" fill="#34d399" fontSize="10" fontFamily="monospace">id</text>
        <text x="680" y="265" fill="#34d399" fontSize="9" textAnchor="end">PK</text>
        <text x="510" y="282" fill="#94a3b8" fontSize="10" fontFamily="monospace">purchase_order_id</text>
        <text x="680" y="282" fill="#34d399" fontSize="9" textAnchor="end">FK</text>
        <text x="510" y="299" fill="#94a3b8" fontSize="10" fontFamily="monospace">quote_line_item_id</text>
        <text x="680" y="299" fill="#60a5fa" fontSize="9" textAnchor="end">FK</text>
      </g>
      
      <g className="node">
        <rect x="20" y="320" width="180" height="90" rx="6" fill="rgba(167, 139, 250, 0.1)" stroke="#a78bfa" strokeWidth="1"/>
        <rect x="20" y="320" width="180" height="28" rx="6" fill="rgba(167, 139, 250, 0.2)"/>
        <text x="110" y="340" textAnchor="middle" fill="#a78bfa" fontSize="12" fontWeight="600">quote_context ENUM</text>
        <text x="30" y="365" fill="#a78bfa" fontSize="10" fontFamily="monospace">'PURCHASING'</text>
        <text x="30" y="382" fill="#a78bfa" fontSize="10" fontFamily="monospace">'SALES'</text>
        <text x="30" y="399" fill="#a78bfa" fontSize="10" fontFamily="monospace">'ENGINEERING'</text>
      </g>
      
      <g className="node">
        <rect x="20" y="430" width="180" height="130" rx="6" fill="rgba(96, 165, 250, 0.1)" stroke="#60a5fa" strokeWidth="1"/>
        <rect x="20" y="430" width="180" height="28" rx="6" fill="rgba(96, 165, 250, 0.2)"/>
        <text x="110" y="450" textAnchor="middle" fill="#60a5fa" fontSize="12" fontWeight="600">quote_status ENUM</text>
        <text x="30" y="475" fill="#60a5fa" fontSize="10" fontFamily="monospace">'PENDING'</text>
        <text x="30" y="492" fill="#60a5fa" fontSize="10" fontFamily="monospace">'RECEIVED'</text>
        <text x="30" y="509" fill="#60a5fa" fontSize="10" fontFamily="monospace">'ACCEPTED'</text>
        <text x="30" y="526" fill="#60a5fa" fontSize="10" fontFamily="monospace">'REJECTED'</text>
        <text x="30" y="543" fill="#60a5fa" fontSize="10" fontFamily="monospace">'EXPIRED' | 'FAILED'</text>
      </g>
      
      <g className="node">
        <rect x="240" y="430" width="220" height="130" rx="6" fill="rgba(52, 211, 153, 0.1)" stroke="#34d399" strokeWidth="1"/>
        <rect x="240" y="430" width="220" height="28" rx="6" fill="rgba(52, 211, 153, 0.2)"/>
        <text x="350" y="450" textAnchor="middle" fill="#34d399" fontSize="12" fontWeight="600">po_status ENUM</text>
        <text x="250" y="475" fill="#34d399" fontSize="10" fontFamily="monospace">'DRAFT'</text>
        <text x="250" y="492" fill="#34d399" fontSize="10" fontFamily="monospace">'QUOTE_PENDING'</text>
        <text x="250" y="509" fill="#34d399" fontSize="10" fontFamily="monospace">'QUOTE_RECEIVED'</text>
        <text x="250" y="526" fill="#34d399" fontSize="10" fontFamily="monospace">'APPROVED'</text>
        <text x="250" y="543" fill="#34d399" fontSize="10" fontFamily="monospace">'SUBMITTED' | 'CONFIRMED'</text>
      </g>
      
      <g stroke="#64748b" strokeWidth="1" fill="none" opacity="0.4" strokeDasharray="4 2">
        <path d="M200 80 L240 80" />
        <path d="M200 220 L240 100" />
        <path d="M350 220 L350 240" />
        <path d="M610 205 L610 220" />
        <path d="M460 130 L500 167" stroke="#60a5fa" className="flow-line"/>
      </g>
    </svg>
  </div>
);

const WorkflowStates = () => (
  <div>
    <h2 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '16px', color: '#f1f5f9' }}>
      Workflow State Machines
    </h2>
    <p style={{ color: '#94a3b8', marginBottom: '24px', fontSize: '14px', lineHeight: '1.6' }}>
      Two state machines: Quote lifecycle (shared) and Purchase Order lifecycle (purchasing-specific).
    </p>
    
    <svg viewBox="0 0 850 500" style={{ width: '100%', maxWidth: '850px', margin: '0 auto', display: 'block' }}>
      <defs>
        <marker id="arrowB" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
          <polygon points="0 0, 10 3.5, 0 7" fill="#60a5fa"/>
        </marker>
        <marker id="arrowG" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
          <polygon points="0 0, 10 3.5, 0 7" fill="#34d399"/>
        </marker>
      </defs>
      <rect width="850" height="500" fill="transparent" />
      
      <rect x="20" y="20" width="400" height="460" rx="10" fill="rgba(96, 165, 250, 0.05)" stroke="rgba(96, 165, 250, 0.2)" strokeWidth="1"/>
      <text x="40" y="50" fill="#60a5fa" fontSize="14" fontWeight="600">Quote Request State Machine</text>
      <text x="40" y="70" fill="#64748b" fontSize="10">(Used by Purchasing, Sales, Engineering)</text>
      
      <g className="node">
        <rect x="160" y="100" width="100" height="40" rx="20" fill="rgba(96, 165, 250, 0.3)" stroke="#60a5fa" strokeWidth="2"/>
        <text x="210" y="125" textAnchor="middle" fill="#60a5fa" fontSize="11" fontWeight="600">PENDING</text>
      </g>
      
      <path d="M210 140 L210 170" stroke="#60a5fa" strokeWidth="1.5" markerEnd="url(#arrowB)"/>
      <text x="220" y="160" fill="#64748b" fontSize="9">Supplier responds</text>
      
      <g className="node">
        <rect x="160" y="180" width="100" height="40" rx="20" fill="rgba(52, 211, 153, 0.3)" stroke="#34d399" strokeWidth="2"/>
        <text x="210" y="205" textAnchor="middle" fill="#34d399" fontSize="11" fontWeight="600">RECEIVED</text>
      </g>
      
      <path d="M160 200 L80 200 L80 270" stroke="#34d399" strokeWidth="1.5"/>
      <text x="85" y="235" fill="#64748b" fontSize="9">User accepts</text>
      
      <path d="M260 200 L340 200 L340 270" stroke="#f472b6" strokeWidth="1.5"/>
      <text x="280" y="235" fill="#64748b" fontSize="9">User rejects</text>
      
      <path d="M210 220 L210 330" stroke="#fbbf24" strokeWidth="1.5" strokeDasharray="4 2"/>
      <text x="220" y="280" fill="#64748b" fontSize="9">expires_at</text>
      
      <g className="node">
        <rect x="40" y="270" width="90" height="40" rx="6" fill="rgba(52, 211, 153, 0.2)" stroke="#34d399" strokeWidth="1"/>
        <text x="85" y="295" textAnchor="middle" fill="#34d399" fontSize="10" fontWeight="500">ACCEPTED</text>
      </g>
      
      <g className="node">
        <rect x="290" y="270" width="90" height="40" rx="6" fill="rgba(244, 114, 182, 0.2)" stroke="#f472b6" strokeWidth="1"/>
        <text x="335" y="295" textAnchor="middle" fill="#f472b6" fontSize="10" fontWeight="500">REJECTED</text>
      </g>
      
      <g className="node">
        <rect x="165" y="330" width="90" height="40" rx="6" fill="rgba(251, 191, 36, 0.2)" stroke="#fbbf24" strokeWidth="1"/>
        <text x="210" y="355" textAnchor="middle" fill="#fbbf24" fontSize="10" fontWeight="500">EXPIRED</text>
      </g>
      
      <path d="M160 120 L60 120 L60 400" stroke="#ef4444" strokeWidth="1" strokeDasharray="3 3"/>
      
      <g className="node">
        <rect x="40" y="390" width="80" height="35" rx="6" fill="rgba(239, 68, 68, 0.2)" stroke="#ef4444" strokeWidth="1"/>
        <text x="80" y="412" textAnchor="middle" fill="#ef4444" fontSize="10" fontWeight="500">FAILED</text>
      </g>
      
      <rect x="40" y="440" width="360" height="30" rx="4" fill="rgba(167, 139, 250, 0.1)" stroke="#a78bfa" strokeWidth="1" strokeDasharray="4 2"/>
      <text x="220" y="460" textAnchor="middle" fill="#a78bfa" fontSize="9">ACCEPTED → Routes based on context: PO, CRM, or BOM</text>
      
      <rect x="440" y="20" width="390" height="460" rx="10" fill="rgba(52, 211, 153, 0.05)" stroke="rgba(52, 211, 153, 0.2)" strokeWidth="1"/>
      <text x="460" y="50" fill="#34d399" fontSize="14" fontWeight="600">Purchase Order State Machine</text>
      <text x="460" y="70" fill="#64748b" fontSize="10">(Purchasing workflow only)</text>
      
      <g className="node">
        <rect x="580" y="90" width="100" height="40" rx="6" fill="rgba(148, 163, 184, 0.3)" stroke="#94a3b8" strokeWidth="2"/>
        <text x="630" y="115" textAnchor="middle" fill="#94a3b8" fontSize="11" fontWeight="600">DRAFT</text>
      </g>
      
      <path d="M630 130 L630 155" stroke="#94a3b8" strokeWidth="1.5" markerEnd="url(#arrowG)"/>
      
      <g className="node">
        <rect x="555" y="160" width="150" height="40" rx="6" fill="rgba(96, 165, 250, 0.3)" stroke="#60a5fa" strokeWidth="2"/>
        <text x="630" y="185" textAnchor="middle" fill="#60a5fa" fontSize="11" fontWeight="600">QUOTE_PENDING</text>
      </g>
      
      <path d="M630 200 L630 225" stroke="#60a5fa" strokeWidth="1.5" markerEnd="url(#arrowG)"/>
      
      <g className="node">
        <rect x="555" y="230" width="150" height="40" rx="6" fill="rgba(52, 211, 153, 0.3)" stroke="#34d399" strokeWidth="2"/>
        <text x="630" y="255" textAnchor="middle" fill="#34d399" fontSize="11" fontWeight="600">QUOTE_RECEIVED</text>
      </g>
      
      <path d="M630 270 L630 295" stroke="#34d399" strokeWidth="1.5" markerEnd="url(#arrowG)"/>
      
      <g className="node">
        <rect x="570" y="300" width="120" height="40" rx="6" fill="rgba(167, 139, 250, 0.3)" stroke="#a78bfa" strokeWidth="2"/>
        <text x="630" y="325" textAnchor="middle" fill="#a78bfa" fontSize="11" fontWeight="600">APPROVED</text>
      </g>
      
      <path d="M630 340 L630 365" stroke="#a78bfa" strokeWidth="1.5" markerEnd="url(#arrowG)"/>
      
      <g className="node">
        <rect x="565" y="370" width="130" height="40" rx="6" fill="rgba(251, 191, 36, 0.3)" stroke="#fbbf24" strokeWidth="2"/>
        <text x="630" y="395" textAnchor="middle" fill="#fbbf24" fontSize="11" fontWeight="600">SUBMITTED</text>
      </g>
      
      <path d="M630 410 L630 430" stroke="#fbbf24" strokeWidth="1.5" markerEnd="url(#arrowG)"/>
      
      <g className="node">
        <rect x="565" y="435" width="130" height="35" rx="6" fill="rgba(52, 211, 153, 0.5)" stroke="#34d399" strokeWidth="2"/>
        <text x="630" y="457" textAnchor="middle" fill="#34d399" fontSize="11" fontWeight="700">CONFIRMED</text>
      </g>
      
      <path d="M555 255 L480 255 L480 435" stroke="#ef4444" strokeWidth="1" strokeDasharray="3 3"/>
      
      <g className="node">
        <rect x="450" y="425" width="90" height="35" rx="6" fill="rgba(239, 68, 68, 0.2)" stroke="#ef4444" strokeWidth="1"/>
        <text x="495" y="447" textAnchor="middle" fill="#ef4444" fontSize="10" fontWeight="500">CANCELLED</text>
      </g>
      
      <path d="M680 110 L750 110 L750 320 L690 320" stroke="#34d399" strokeWidth="1" strokeDasharray="5 3"/>
      <text x="765" y="215" fill="#64748b" fontSize="8" transform="rotate(90 765 215)">No quote needed</text>
    </svg>
  </div>
);

const TIBacklogIntegration = () => (
  <div>
    <h2 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '16px', color: '#f1f5f9' }}>
      TI Backlog API Integration Detail
    </h2>
    <p style={{ color: '#94a3b8', marginBottom: '24px', fontSize: '14px', lineHeight: '1.6' }}>
      Specific flow for TI's quote-to-order requirement with 24-hour async response handling.
    </p>
    
    <svg viewBox="0 0 850 500" style={{ width: '100%', maxWidth: '850px', margin: '0 auto', display: 'block' }}>
      <defs>
        <marker id="arrSeq" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
          <polygon points="0 0, 8 3, 0 6" fill="#94a3b8"/>
        </marker>
        <marker id="arrSeqRev" markerWidth="8" markerHeight="6" refX="1" refY="3" orient="auto">
          <polygon points="8 0, 0 3, 8 6" fill="#94a3b8"/>
        </marker>
      </defs>
      <rect width="850" height="500" fill="transparent" />
      
      <text x="20" y="30" fill="#f1f5f9" fontSize="14" fontWeight="600">Quote-to-Order Timeline</text>
      
      <rect x="20" y="50" width="810" height="4" rx="2" fill="rgba(148, 163, 184, 0.2)"/>
      
      <circle cx="60" cy="52" r="8" fill="#60a5fa"/>
      <text x="60" y="80" textAnchor="middle" fill="#60a5fa" fontSize="10" fontWeight="500">T+0</text>
      <text x="60" y="95" textAnchor="middle" fill="#64748b" fontSize="9">Request</text>
      
      <circle cx="300" cy="52" r="8" fill="#fbbf24"/>
      <text x="300" y="80" textAnchor="middle" fill="#fbbf24" fontSize="10" fontWeight="500">T+1h</text>
      <text x="300" y="95" textAnchor="middle" fill="#64748b" fontSize="9">Polling</text>
      
      <circle cx="540" cy="52" r="8" fill="#34d399"/>
      <text x="540" y="80" textAnchor="middle" fill="#34d399" fontSize="10" fontWeight="500">T+24h</text>
      <text x="540" y="95" textAnchor="middle" fill="#64748b" fontSize="9">Response</text>
      
      <circle cx="720" cy="52" r="8" fill="#a78bfa"/>
      <text x="720" y="80" textAnchor="middle" fill="#a78bfa" fontSize="10" fontWeight="500">T+24h+</text>
      <text x="720" y="95" textAnchor="middle" fill="#64748b" fontSize="9">Order</text>
      
      <text x="20" y="130" fill="#f1f5f9" fontSize="14" fontWeight="600">Sequence Flow</text>
      
      <g className="node">
        <rect x="50" y="150" width="100" height="35" rx="4" fill="rgba(167, 139, 250, 0.3)" stroke="#a78bfa" strokeWidth="1"/>
        <text x="100" y="172" textAnchor="middle" fill="#a78bfa" fontSize="11" fontWeight="500">User / ERP</text>
      </g>
      
      <g className="node">
        <rect x="200" y="150" width="110" height="35" rx="4" fill="rgba(52, 211, 153, 0.3)" stroke="#34d399" strokeWidth="1"/>
        <text x="255" y="172" textAnchor="middle" fill="#34d399" fontSize="11" fontWeight="500">Quote Service</text>
      </g>
      
      <g className="node">
        <rect x="360" y="150" width="100" height="35" rx="4" fill="rgba(251, 191, 36, 0.3)" stroke="#fbbf24" strokeWidth="1"/>
        <text x="410" y="172" textAnchor="middle" fill="#fbbf24" fontSize="11" fontWeight="500">State DB</text>
      </g>
      
      <g className="node">
        <rect x="510" y="150" width="100" height="35" rx="4" fill="rgba(244, 114, 182, 0.3)" stroke="#f472b6" strokeWidth="1"/>
        <text x="560" y="172" textAnchor="middle" fill="#f472b6" fontSize="11" fontWeight="500">TI API</text>
      </g>
      
      <g className="node">
        <rect x="660" y="150" width="80" height="35" rx="4" fill="rgba(96, 165, 250, 0.3)" stroke="#60a5fa" strokeWidth="1"/>
        <text x="700" y="172" textAnchor="middle" fill="#60a5fa" fontSize="11" fontWeight="500">Poller</text>
      </g>
      
      <line x1="100" y1="185" x2="100" y2="480" stroke="#a78bfa" strokeWidth="1" strokeDasharray="4 4" opacity="0.5"/>
      <line x1="255" y1="185" x2="255" y2="480" stroke="#34d399" strokeWidth="1" strokeDasharray="4 4" opacity="0.5"/>
      <line x1="410" y1="185" x2="410" y2="480" stroke="#fbbf24" strokeWidth="1" strokeDasharray="4 4" opacity="0.5"/>
      <line x1="560" y1="185" x2="560" y2="480" stroke="#f472b6" strokeWidth="1" strokeDasharray="4 4" opacity="0.5"/>
      <line x1="700" y1="185" x2="700" y2="480" stroke="#60a5fa" strokeWidth="1" strokeDasharray="4 4" opacity="0.5"/>
      
      <path d="M100 210 L245 210" stroke="#a78bfa" strokeWidth="1.5" markerEnd="url(#arrSeq)"/>
      <text x="172" y="205" textAnchor="middle" fill="#94a3b8" fontSize="9">1. Request quote</text>
      
      <path d="M255 230 L400 230" stroke="#34d399" strokeWidth="1.5" markerEnd="url(#arrSeq)"/>
      <text x="327" y="225" textAnchor="middle" fill="#94a3b8" fontSize="9">2. Store PENDING</text>
      
      <path d="M265 250 L550 250" stroke="#34d399" strokeWidth="1.5" markerEnd="url(#arrSeq)"/>
      <text x="407" y="245" textAnchor="middle" fill="#94a3b8" fontSize="9">3. POST /quotes</text>
      
      <path d="M550 270 L265 270" stroke="#f472b6" strokeWidth="1.5" markerEnd="url(#arrSeqRev)"/>
      <text x="407" y="285" textAnchor="middle" fill="#94a3b8" fontSize="9">4. 202 {ti_request_id}</text>
      
      <path d="M245 300 L110 300" stroke="#34d399" strokeWidth="1.5" markerEnd="url(#arrSeqRev)"/>
      <text x="177" y="295" textAnchor="middle" fill="#94a3b8" fontSize="9">5. "Quote pending"</text>
      
      <rect x="30" y="320" width="720" height="25" rx="4" fill="rgba(251, 191, 36, 0.1)" stroke="#fbbf24" strokeWidth="1" strokeDasharray="4 2"/>
      <text x="390" y="337" textAnchor="middle" fill="#fbbf24" fontSize="10" fontWeight="500">⏱ Up to 24 hours...</text>
      
      <path d="M700 360 L420 360" stroke="#60a5fa" strokeWidth="1.5" markerEnd="url(#arrSeqRev)"/>
      <text x="560" y="355" textAnchor="middle" fill="#94a3b8" fontSize="9">6. Find PENDING</text>
      
      <path d="M700 380 L570 380" stroke="#60a5fa" strokeWidth="1.5" markerEnd="url(#arrSeq)"/>
      <text x="635" y="375" textAnchor="middle" fill="#94a3b8" fontSize="9">7. GET status</text>
      
      <path d="M550 400 L265 400" stroke="#f472b6" strokeWidth="1.5" markerEnd="url(#arrSeqRev)"/>
      <text x="407" y="395" textAnchor="middle" fill="#94a3b8" fontSize="9">8. 200 {quote_id, pricing}</text>
      
      <path d="M255 420 L400 420" stroke="#34d399" strokeWidth="1.5" markerEnd="url(#arrSeq)"/>
      <text x="327" y="415" textAnchor="middle" fill="#94a3b8" fontSize="9">9. Update → RECEIVED</text>
      
      <path d="M245 440 L110 440" stroke="#34d399" strokeWidth="1.5" markerEnd="url(#arrSeqRev)"/>
      <text x="177" y="435" textAnchor="middle" fill="#94a3b8" fontSize="9">10. Notify user</text>
      
      <path d="M100 460 L245 460" stroke="#a78bfa" strokeWidth="1.5" markerEnd="url(#arrSeq)"/>
      <text x="172" y="455" textAnchor="middle" fill="#94a3b8" fontSize="9">11. Accept & order</text>
      
      <path d="M265 475 L550 475" stroke="#34d399" strokeWidth="1.5" markerEnd="url(#arrSeq)"/>
      <text x="407" y="470" textAnchor="middle" fill="#94a3b8" fontSize="9">12. POST /orders</text>
    </svg>
    
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginTop: '24px' }}>
      <div style={{ padding: '16px', background: 'rgba(244, 114, 182, 0.1)', borderRadius: '8px', borderLeft: '3px solid #f472b6' }}>
        <h4 style={{ color: '#f472b6', fontSize: '13px', fontWeight: '600', marginBottom: '8px' }}>TI-Specific Requirements</h4>
        <ul style={{ color: '#94a3b8', fontSize: '12px', lineHeight: '1.6', margin: 0, paddingLeft: '16px' }}>
          <li>Quote required before order</li>
          <li>24-hour response window</li>
          <li>Pricing discount via API</li>
          <li>Quote validity period</li>
        </ul>
      </div>
      
      <div style={{ padding: '16px', background: 'rgba(96, 165, 250, 0.1)', borderRadius: '8px', borderLeft: '3px solid #60a5fa' }}>
        <h4 style={{ color: '#60a5fa', fontSize: '13px', fontWeight: '600', marginBottom: '8px' }}>Polling Strategy</h4>
        <ul style={{ color: '#94a3b8', fontSize: '12px', lineHeight: '1.6', margin: 0, paddingLeft: '16px' }}>
          <li>Poll every 15 min initially</li>
          <li>Exponential backoff after 2hrs</li>
          <li>Timeout at 24hr mark</li>
          <li>Webhook as backup</li>
        </ul>
      </div>
      
      <div style={{ padding: '16px', background: 'rgba(52, 211, 153, 0.1)', borderRadius: '8px', borderLeft: '3px solid #34d399' }}>
        <h4 style={{ color: '#34d399', fontSize: '13px', fontWeight: '600', marginBottom: '8px' }}>Correlation Keys</h4>
        <ul style={{ color: '#94a3b8', fontSize: '12px', lineHeight: '1.6', margin: 0, paddingLeft: '16px' }}>
          <li>Your: correlation_id</li>
          <li>TI: ti_request_id</li>
          <li>TI: quote_id (response)</li>
          <li>Link: po_id ↔ quote_id</li>
        </ul>
      </div>
    </div>
  </div>
);

export default ArchitectureDiagrams;

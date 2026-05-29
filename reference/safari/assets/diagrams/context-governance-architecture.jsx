/**
 * Context Governance Architecture Diagram
 * Safari Circuits - Context Management System
 *
 * A React component visualizing the Context Governance System architecture
 * including CPI, SCL, and governance layers.
 *
 * To view: Open in a React environment or use an online JSX viewer like:
 * - CodeSandbox (codesandbox.io)
 * - StackBlitz (stackblitz.com)
 * - Create React App locally
 */

import React, { useState } from 'react';

const ContextGovernanceArchitecture = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedLayer, setSelectedLayer] = useState(null);

  // Safari brand colors
  const colors = {
    safariRed: '#9B1C1C',
    darkBg: '#0f172a',
    darkBgAlt: '#1e293b',
    blue: '#60a5fa',
    green: '#34d399',
    pink: '#f472b6',
    purple: '#a78bfa',
    orange: '#fb923c',
    yellow: '#fbbf24',
    slate: '#64748b',
    white: '#e2e8f0',
    muted: '#94a3b8'
  };

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'safari-mcp', label: 'Safari MCP' },
    { id: 'hierarchy', label: 'Context Hierarchy' },
    { id: 'governance', label: 'Governance Model' },
    { id: 'compiler', label: 'Context Compiler' },
    { id: 'evolution', label: 'Evolution Path' }
  ];

  // Reusable SVG components
  const Arrow = ({ x1, y1, x2, y2, color = colors.slate, animated = false }) => (
    <g>
      <defs>
        <marker
          id={`arrowhead-${color.replace('#', '')}`}
          markerWidth="10"
          markerHeight="7"
          refX="9"
          refY="3.5"
          orient="auto"
        >
          <polygon points="0 0, 10 3.5, 0 7" fill={color} />
        </marker>
      </defs>
      <line
        x1={x1}
        y1={y1}
        x2={x2}
        y2={y2}
        stroke={color}
        strokeWidth="2"
        markerEnd={`url(#arrowhead-${color.replace('#', '')})`}
        strokeDasharray={animated ? "5,5" : "none"}
      >
        {animated && (
          <animate
            attributeName="stroke-dashoffset"
            from="10"
            to="0"
            dur="1s"
            repeatCount="indefinite"
          />
        )}
      </line>
    </g>
  );

  const Box = ({ x, y, width, height, fill, stroke, children, onClick, selected }) => (
    <g
      onClick={onClick}
      style={{ cursor: onClick ? 'pointer' : 'default' }}
      transform={`translate(${x}, ${y})`}
    >
      <rect
        width={width}
        height={height}
        fill={fill}
        stroke={selected ? colors.yellow : stroke}
        strokeWidth={selected ? 3 : 2}
        rx="8"
        ry="8"
      />
      {children}
    </g>
  );

  const renderOverview = () => (
    <svg viewBox="0 0 900 600" style={{ width: '100%', height: 'auto' }}>
      <defs>
        <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={colors.darkBg} />
          <stop offset="50%" stopColor={colors.darkBgAlt} />
          <stop offset="100%" stopColor={colors.darkBg} />
        </linearGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>

      {/* Title */}
      <text x="450" y="40" textAnchor="middle" fill={colors.white} fontSize="24" fontWeight="bold">
        Context Governance Architecture
      </text>
      <text x="450" y="65" textAnchor="middle" fill={colors.muted} fontSize="14">
        Safari Circuits - Self-Evolving AI Context System
      </text>

      {/* Main layers */}
      {/* CPI Layer */}
      <Box x={50} y={100} width={250} height={200} fill={colors.darkBgAlt} stroke={colors.safariRed}>
        <text x="125" y="30" textAnchor="middle" fill={colors.safariRed} fontSize="16" fontWeight="bold">
          CPI Layer
        </text>
        <text x="125" y="50" textAnchor="middle" fill={colors.muted} fontSize="11">
          Context Program Interface
        </text>

        <rect x="20" y="70" width="100" height="50" fill={colors.darkBg} stroke={colors.blue} rx="4" />
        <text x="70" y="95" textAnchor="middle" fill={colors.blue} fontSize="11">Contracts</text>
        <text x="70" y="110" textAnchor="middle" fill={colors.muted} fontSize="9">Versioned APIs</text>

        <rect x="130" y="70" width="100" height="50" fill={colors.darkBg} stroke={colors.green} rx="4" />
        <text x="180" y="95" textAnchor="middle" fill={colors.green} fontSize="11">Types</text>
        <text x="180" y="110" textAnchor="middle" fill={colors.muted} fontSize="9">Schema Definitions</text>

        <rect x="75" y="135" width="100" height="50" fill={colors.darkBg} stroke={colors.purple} rx="4" />
        <text x="125" y="160" textAnchor="middle" fill={colors.purple} fontSize="11">Exports</text>
        <text x="125" y="175" textAnchor="middle" fill={colors.muted} fontSize="9">Module Interfaces</text>
      </Box>

      {/* SCL Layer */}
      <Box x={325} y={100} width={250} height={200} fill={colors.darkBgAlt} stroke={colors.blue}>
        <text x="125" y="30" textAnchor="middle" fill={colors.blue} fontSize="16" fontWeight="bold">
          SCL Layer
        </text>
        <text x="125" y="50" textAnchor="middle" fill={colors.muted} fontSize="11">
          Structured Context Language
        </text>

        <rect x="20" y="70" width="95" height="50" fill={colors.darkBg} stroke={colors.orange} rx="4" />
        <text x="67" y="95" textAnchor="middle" fill={colors.orange} fontSize="10">SELECT</text>
        <text x="67" y="110" textAnchor="middle" fill={colors.muted} fontSize="9">Query Context</text>

        <rect x="125" y="70" width="105" height="50" fill={colors.darkBg} stroke={colors.green} rx="4" />
        <text x="177" y="95" textAnchor="middle" fill={colors.green} fontSize="10">RESOLVE</text>
        <text x="177" y="110" textAnchor="middle" fill={colors.muted} fontSize="9">Dependencies</text>

        <rect x="20" y="135" width="95" height="50" fill={colors.darkBg} stroke={colors.pink} rx="4" />
        <text x="67" y="160" textAnchor="middle" fill={colors.pink} fontSize="10">OPTIMIZE</text>
        <text x="67" y="175" textAnchor="middle" fill={colors.muted} fontSize="9">Token Budget</text>

        <rect x="125" y="135" width="105" height="50" fill={colors.darkBg} stroke={colors.yellow} rx="4" />
        <text x="177" y="160" textAnchor="middle" fill={colors.yellow} fontSize="10">ALLOCATE</text>
        <text x="177" y="175" textAnchor="middle" fill={colors.muted} fontSize="9">Window Space</text>
      </Box>

      {/* Governance Layer */}
      <Box x={600} y={100} width={250} height={200} fill={colors.darkBgAlt} stroke={colors.green}>
        <text x="125" y="30" textAnchor="middle" fill={colors.green} fontSize="16" fontWeight="bold">
          Governance Layer
        </text>
        <text x="125" y="50" textAnchor="middle" fill={colors.muted} fontSize="11">
          OpenMetadata-Inspired
        </text>

        <rect x="15" y="70" width="70" height="45" fill={colors.darkBg} stroke={colors.purple} rx="4" />
        <text x="50" y="92" textAnchor="middle" fill={colors.purple} fontSize="10">Ownership</text>

        <rect x="90" y="70" width="70" height="45" fill={colors.darkBg} stroke={colors.blue} rx="4" />
        <text x="125" y="92" textAnchor="middle" fill={colors.blue} fontSize="10">Lineage</text>

        <rect x="165" y="70" width="70" height="45" fill={colors.darkBg} stroke={colors.orange} rx="4" />
        <text x="200" y="92" textAnchor="middle" fill={colors.orange} fontSize="10">Quality</text>

        <rect x="15" y="130" width="70" height="45" fill={colors.darkBg} stroke={colors.pink} rx="4" />
        <text x="50" y="152" textAnchor="middle" fill={colors.pink} fontSize="10">Discovery</text>

        <rect x="90" y="130" width="70" height="45" fill={colors.darkBg} stroke={colors.green} rx="4" />
        <text x="125" y="152" textAnchor="middle" fill={colors.green} fontSize="10">Lifecycle</text>

        <rect x="165" y="130" width="70" height="45" fill={colors.darkBg} stroke={colors.yellow} rx="4" />
        <text x="200" y="152" textAnchor="middle" fill={colors.yellow} fontSize="10">Access</text>
      </Box>

      {/* Context Registry (center) */}
      <Box x={300} y={340} width={300} height={120} fill={colors.darkBg} stroke={colors.safariRed}>
        <rect x="0" y="0" width="300" height="30" fill={colors.safariRed} rx="8" ry="0" />
        <text x="150" y="22" textAnchor="middle" fill={colors.white} fontSize="14" fontWeight="bold">
          Context Registry
        </text>
        <text x="150" y="55" textAnchor="middle" fill={colors.white} fontSize="12">
          context-registry.json
        </text>
        <text x="150" y="75" textAnchor="middle" fill={colors.muted} fontSize="10">
          Assets | Relationships | Metrics
        </text>
        <text x="150" y="95" textAnchor="middle" fill={colors.muted} fontSize="10">
          Lineage | Quality | Discovery
        </text>
      </Box>

      {/* Connections to registry */}
      <Arrow x1={175} y1={300} x2={350} y2={340} color={colors.safariRed} />
      <Arrow x1={450} y1={300} x2={450} y2={340} color={colors.blue} />
      <Arrow x1={725} y1={300} x2={550} y2={340} color={colors.green} />

      {/* Context Sources (bottom) */}
      <Box x={50} y={500} width={160} height={80} fill={colors.darkBgAlt} stroke={colors.blue}>
        <text x="80" y="30" textAnchor="middle" fill={colors.blue} fontSize="12" fontWeight="bold">
          CLAUDE.md
        </text>
        <text x="80" y="50" textAnchor="middle" fill={colors.muted} fontSize="10">Enterprise Policy</text>
        <text x="80" y="65" textAnchor="middle" fill={colors.muted} fontSize="10">Project Rules</text>
      </Box>

      <Box x={230} y={500} width={160} height={80} fill={colors.darkBgAlt} stroke={colors.green}>
        <text x="80" y="30" textAnchor="middle" fill={colors.green} fontSize="12" fontWeight="bold">
          Skills
        </text>
        <text x="80" y="50" textAnchor="middle" fill={colors.muted} fontSize="10">Reusable Capabilities</text>
        <text x="80" y="65" textAnchor="middle" fill={colors.muted} fontSize="10">Pattern Recognition</text>
      </Box>

      <Box x={410} y={500} width={160} height={80} fill={colors.darkBgAlt} stroke={colors.purple}>
        <text x="80" y="30" textAnchor="middle" fill={colors.purple} fontSize="12" fontWeight="bold">
          Commands
        </text>
        <text x="80" y="50" textAnchor="middle" fill={colors.muted} fontSize="10">User Actions</text>
        <text x="80" y="65" textAnchor="middle" fill={colors.muted} fontSize="10">Workflow Integration</text>
      </Box>

      <Box x={590} y={500} width={160} height={80} fill={colors.darkBgAlt} stroke={colors.orange}>
        <text x="80" y="30" textAnchor="middle" fill={colors.orange} fontSize="12" fontWeight="bold">
          Learning
        </text>
        <text x="80" y="50" textAnchor="middle" fill={colors.muted} fontSize="10">Auto-Captured</text>
        <text x="80" y="65" textAnchor="middle" fill={colors.muted} fontSize="10">Self-Evolving</text>
      </Box>

      <Box x={770} y={500} width={80} height={80} fill={colors.darkBgAlt} stroke={colors.pink}>
        <text x="40" y="30" textAnchor="middle" fill={colors.pink} fontSize="12" fontWeight="bold">
          State
        </text>
        <text x="40" y="50" textAnchor="middle" fill={colors.muted} fontSize="10">Runtime</text>
        <text x="40" y="65" textAnchor="middle" fill={colors.muted} fontSize="10">Ephemeral</text>
      </Box>

      {/* Connections from sources */}
      <Arrow x1={130} y1={500} x2={350} y2={460} color={colors.blue} />
      <Arrow x1={310} y1={500} x2={400} y2={460} color={colors.green} />
      <Arrow x1={490} y1={500} x2={450} y2={460} color={colors.purple} />
      <Arrow x1={670} y1={500} x2={500} y2={460} color={colors.orange} />
      <Arrow x1={810} y1={500} x2={550} y2={460} color={colors.pink} />

      {/* Safari logo placeholder */}
      <circle cx="850" cy="40" r="25" fill={colors.safariRed} filter="url(#glow)" />
      <text x="850" y="45" textAnchor="middle" fill={colors.white} fontSize="18" fontWeight="bold">S</text>
    </svg>
  );

  const renderSafariMCP = () => (
    <svg viewBox="0 0 900 650" style={{ width: '100%', height: 'auto' }}>
      {/* Title */}
      <text x="450" y="40" textAnchor="middle" fill={colors.white} fontSize="24" fontWeight="bold">
        Safari MCP - Internal Context Server
      </text>
      <text x="450" y="65" textAnchor="middle" fill={colors.muted} fontSize="14">
        Bridging Context Governance with Model Context Protocol
      </text>

      {/* Top: LLM Interfaces */}
      <Box x={200} y={90} width={500} height={60} fill={colors.darkBgAlt} stroke={colors.slate}>
        <text x="250" y="25" textAnchor="middle" fill={colors.white} fontSize="14" fontWeight="bold">
          LLM Interfaces
        </text>
        <g transform="translate(30, 35)">
          <rect width="100" height="20" fill={colors.darkBg} stroke={colors.blue} rx="3" />
          <text x="50" y="14" textAnchor="middle" fill={colors.blue} fontSize="10">Claude Code</text>
        </g>
        <g transform="translate(140, 35)">
          <rect width="100" height="20" fill={colors.darkBg} stroke={colors.green} rx="3" />
          <text x="50" y="14" textAnchor="middle" fill={colors.green} fontSize="10">Claude API</text>
        </g>
        <g transform="translate(250, 35)">
          <rect width="100" height="20" fill={colors.darkBg} stroke={colors.purple} rx="3" />
          <text x="50" y="14" textAnchor="middle" fill={colors.purple} fontSize="10">Other LLMs</text>
        </g>
        <g transform="translate(360, 35)">
          <rect width="100" height="20" fill={colors.darkBg} stroke={colors.orange} rx="3" />
          <text x="50" y="14" textAnchor="middle" fill={colors.orange} fontSize="10">MCP Clients</text>
        </g>
      </Box>

      {/* Arrow down */}
      <Arrow x1={450} y1={150} x2={450} y2={170} color={colors.slate} animated />

      {/* Safari MCP Server - Main Box */}
      <Box x={100} y={180} width={700} height={280} fill={colors.darkBg} stroke={colors.safariRed}>
        <rect x="0" y="0" width="700" height="35" fill={colors.safariRed} rx="8" ry="0" />
        <text x="350" y="24" textAnchor="middle" fill={colors.white} fontSize="16" fontWeight="bold">
          Safari MCP Server
        </text>

        {/* Three columns: Resources, Tools, Prompts */}
        {/* Resources */}
        <Box x={20} y={50} width={200} height={210} fill={colors.darkBgAlt} stroke={colors.blue}>
          <text x="100" y="20" textAnchor="middle" fill={colors.blue} fontSize="13" fontWeight="bold">
            Resources (Read)
          </text>
          <text x="100" y="45" textAnchor="middle" fill={colors.muted} fontSize="10">
            safari://context/*
          </text>
          <rect x="10" y="55" width="180" height="25" fill={colors.darkBg} stroke={colors.blue} rx="3" />
          <text x="100" y="72" textAnchor="middle" fill={colors.white} fontSize="9">enterprise-policy</text>
          <rect x="10" y="85" width="180" height="25" fill={colors.darkBg} stroke={colors.blue} rx="3" />
          <text x="100" y="102" textAnchor="middle" fill={colors.white} fontSize="9">project/{'{repo}'}</text>
          <rect x="10" y="115" width="180" height="25" fill={colors.darkBg} stroke={colors.blue} rx="3" />
          <text x="100" y="132" textAnchor="middle" fill={colors.white} fontSize="9">skill/{'{name}'}</text>
          <rect x="10" y="145" width="180" height="25" fill={colors.darkBg} stroke={colors.blue} rx="3" />
          <text x="100" y="162" textAnchor="middle" fill={colors.white} fontSize="9">command/{'{name}'}</text>
          <rect x="10" y="175" width="180" height="25" fill={colors.darkBg} stroke={colors.blue} rx="3" />
          <text x="100" y="192" textAnchor="middle" fill={colors.white} fontSize="9">registry | state/*</text>
        </Box>

        {/* Tools */}
        <Box x={240} y={50} width={220} height={210} fill={colors.darkBgAlt} stroke={colors.green}>
          <text x="110" y="20" textAnchor="middle" fill={colors.green} fontSize="13" fontWeight="bold">
            Tools (Execute)
          </text>
          <text x="110" y="45" textAnchor="middle" fill={colors.muted} fontSize="10">
            SCL + Governance Operations
          </text>
          <rect x="10" y="55" width="95" height="35" fill={colors.darkBg} stroke={colors.orange} rx="3" />
          <text x="57" y="72" textAnchor="middle" fill={colors.orange} fontSize="9">SELECT</text>
          <text x="57" y="85" textAnchor="middle" fill={colors.muted} fontSize="8">Query</text>
          <rect x="115" y="55" width="95" height="35" fill={colors.darkBg} stroke={colors.green} rx="3" />
          <text x="162" y="72" textAnchor="middle" fill={colors.green} fontSize="9">RESOLVE</text>
          <text x="162" y="85" textAnchor="middle" fill={colors.muted} fontSize="8">Dependencies</text>
          <rect x="10" y="95" width="95" height="35" fill={colors.darkBg} stroke={colors.pink} rx="3" />
          <text x="57" y="112" textAnchor="middle" fill={colors.pink} fontSize="9">OPTIMIZE</text>
          <text x="57" y="125" textAnchor="middle" fill={colors.muted} fontSize="8">Tokens</text>
          <rect x="115" y="95" width="95" height="35" fill={colors.darkBg} stroke={colors.yellow} rx="3" />
          <text x="162" y="112" textAnchor="middle" fill={colors.yellow} fontSize="9">ALLOCATE</text>
          <text x="162" y="125" textAnchor="middle" fill={colors.muted} fontSize="8">Route</text>
          <rect x="10" y="135" width="95" height="35" fill={colors.darkBg} stroke={colors.purple} rx="3" />
          <text x="57" y="152" textAnchor="middle" fill={colors.purple} fontSize="9">LINK</text>
          <text x="57" y="165" textAnchor="middle" fill={colors.muted} fontSize="8">Lineage</text>
          <rect x="115" y="135" width="95" height="35" fill={colors.darkBg} stroke={colors.blue} rx="3" />
          <text x="162" y="152" textAnchor="middle" fill={colors.blue} fontSize="9">CAPTURE</text>
          <text x="162" y="165" textAnchor="middle" fill={colors.muted} fontSize="8">Store</text>
          <rect x="10" y="175" width="200" height="25" fill={colors.darkBg} stroke={colors.safariRed} rx="3" />
          <text x="110" y="192" textAnchor="middle" fill={colors.safariRed} fontSize="9">quality | lineage | promote</text>
        </Box>

        {/* Prompts */}
        <Box x={480} y={50} width={200} height={210} fill={colors.darkBgAlt} stroke={colors.purple}>
          <text x="100" y="20" textAnchor="middle" fill={colors.purple} fontSize="13" fontWeight="bold">
            Prompts (Templates)
          </text>
          <text x="100" y="45" textAnchor="middle" fill={colors.muted} fontSize="10">
            Pre-built Context Queries
          </text>
          <rect x="10" y="55" width="180" height="25" fill={colors.darkBg} stroke={colors.purple} rx="3" />
          <text x="100" y="72" textAnchor="middle" fill={colors.white} fontSize="9">discover-context</text>
          <rect x="10" y="85" width="180" height="25" fill={colors.darkBg} stroke={colors.purple} rx="3" />
          <text x="100" y="102" textAnchor="middle" fill={colors.white} fontSize="9">explain-decision</text>
          <rect x="10" y="115" width="180" height="25" fill={colors.darkBg} stroke={colors.purple} rx="3" />
          <text x="100" y="132" textAnchor="middle" fill={colors.white} fontSize="9">suggest-learning</text>
          <rect x="10" y="145" width="180" height="25" fill={colors.darkBg} stroke={colors.purple} rx="3" />
          <text x="100" y="162" textAnchor="middle" fill={colors.white} fontSize="9">audit-context</text>
          <rect x="10" y="175" width="180" height="25" fill={colors.darkBg} stroke={colors.purple} rx="3" />
          <text x="100" y="192" textAnchor="middle" fill={colors.white} fontSize="9">resolve-conflict</text>
        </Box>
      </Box>

      {/* Arrow down to registry */}
      <Arrow x1={450} y1={460} x2={450} y2={480} color={colors.safariRed} animated />

      {/* Context Registry */}
      <Box x={250} y={490} width={400} height={70} fill={colors.darkBgAlt} stroke={colors.safariRed}>
        <text x="200" y="25" textAnchor="middle" fill={colors.safariRed} fontSize="14" fontWeight="bold">
          Context Registry
        </text>
        <text x="200" y="45" textAnchor="middle" fill={colors.white} fontSize="11">
          context-registry.json
        </text>
        <text x="200" y="60" textAnchor="middle" fill={colors.muted} fontSize="10">
          Assets | Relationships | Quality Metrics | Lineage
        </text>
      </Box>

      {/* Context Sources at bottom */}
      <g transform="translate(0, 575)">
        <Box x={50} y={0} width={130} height={50} fill={colors.darkBg} stroke={colors.blue}>
          <text x="65" y="20" textAnchor="middle" fill={colors.blue} fontSize="10" fontWeight="bold">CLAUDE.md</text>
          <text x="65" y="35" textAnchor="middle" fill={colors.muted} fontSize="8">Policy</text>
        </Box>
        <Box x={195} y={0} width={130} height={50} fill={colors.darkBg} stroke={colors.green}>
          <text x="65" y="20" textAnchor="middle" fill={colors.green} fontSize="10" fontWeight="bold">Skills</text>
          <text x="65" y="35" textAnchor="middle" fill={colors.muted} fontSize="8">Capabilities</text>
        </Box>
        <Box x={340} y={0} width={130} height={50} fill={colors.darkBg} stroke={colors.purple}>
          <text x="65" y="20" textAnchor="middle" fill={colors.purple} fontSize="10" fontWeight="bold">Commands</text>
          <text x="65" y="35" textAnchor="middle" fill={colors.muted} fontSize="8">Actions</text>
        </Box>
        <Box x={485} y={0} width={130} height={50} fill={colors.darkBg} stroke={colors.orange}>
          <text x="65" y="20" textAnchor="middle" fill={colors.orange} fontSize="10" fontWeight="bold">Learning</text>
          <text x="65" y="35" textAnchor="middle" fill={colors.muted} fontSize="8">Auto-capture</text>
        </Box>
        <Box x={630} y={0} width={130} height={50} fill={colors.darkBg} stroke={colors.pink}>
          <text x="65" y="20" textAnchor="middle" fill={colors.pink} fontSize="10" fontWeight="bold">State</text>
          <text x="65" y="35" textAnchor="middle" fill={colors.muted} fontSize="8">Session</text>
        </Box>
      </g>

      {/* Arrows from sources to registry */}
      <Arrow x1={115} y1={575} x2={300} y2={560} color={colors.blue} />
      <Arrow x1={260} y1={575} x2={370} y2={560} color={colors.green} />
      <Arrow x1={405} y1={575} x2={450} y2={560} color={colors.purple} />
      <Arrow x1={550} y1={575} x2={530} y2={560} color={colors.orange} />
      <Arrow x1={695} y1={575} x2={600} y2={560} color={colors.pink} />

      {/* Safari logo */}
      <circle cx="850" cy="40" r="25" fill={colors.safariRed} filter="url(#glow)" />
      <text x="850" y="45" textAnchor="middle" fill={colors.white} fontSize="18" fontWeight="bold">S</text>

      {/* Benefits callout */}
      <g transform="translate(750, 180)">
        <text x="0" y="0" fill={colors.white} fontSize="11" fontWeight="bold">Benefits</text>
        <text x="0" y="18" fill={colors.muted} fontSize="9">Unified Access</text>
        <text x="0" y="32" fill={colors.muted} fontSize="9">Governance</text>
        <text x="0" y="46" fill={colors.muted} fontSize="9">Multi-LLM</text>
        <text x="0" y="60" fill={colors.muted} fontSize="9">Auditability</text>
      </g>
    </svg>
  );

  const renderHierarchy = () => (
    <svg viewBox="0 0 900 600" style={{ width: '100%', height: 'auto' }}>
      <text x="450" y="40" textAnchor="middle" fill={colors.white} fontSize="24" fontWeight="bold">
        Context Memory Hierarchy
      </text>
      <text x="450" y="65" textAnchor="middle" fill={colors.muted} fontSize="14">
        4-Layer Memory Model - Higher layers override lower
      </text>

      {/* Layer 1: Enterprise Policy */}
      <Box x={100} y={100} width={700} height={100} fill={colors.darkBgAlt} stroke={colors.safariRed}
           onClick={() => setSelectedLayer('enterprise')} selected={selectedLayer === 'enterprise'}>
        <rect x="0" y="0" width="700" height="30" fill={colors.safariRed} rx="8" ry="0" />
        <text x="350" y="22" textAnchor="middle" fill={colors.white} fontSize="14" fontWeight="bold">
          Layer 1: Enterprise Policy (Highest Authority)
        </text>
        <text x="350" y="55" textAnchor="middle" fill={colors.white} fontSize="12">
          ~/.claude/CLAUDE.md
        </text>
        <text x="350" y="75" textAnchor="middle" fill={colors.muted} fontSize="11">
          Team standards, infrastructure decisions, MCP integrations, enforced best practices
        </text>
      </Box>

      {/* Layer 2: Project Memory */}
      <Box x={150} y={220} width={600} height={100} fill={colors.darkBgAlt} stroke={colors.blue}
           onClick={() => setSelectedLayer('project')} selected={selectedLayer === 'project'}>
        <rect x="0" y="0" width="600" height="30" fill={colors.blue} rx="8" ry="0" />
        <text x="300" y="22" textAnchor="middle" fill={colors.darkBg} fontSize="14" fontWeight="bold">
          Layer 2: Project Memory
        </text>
        <text x="300" y="55" textAnchor="middle" fill={colors.white} fontSize="12">
          {'{repo}'}/.claude/CLAUDE.md
        </text>
        <text x="300" y="75" textAnchor="middle" fill={colors.muted} fontSize="11">
          Project-specific rules, conventions, architecture decisions
        </text>
      </Box>

      {/* Layer 3: Project Rules */}
      <Box x={200} y={340} width={500} height={100} fill={colors.darkBgAlt} stroke={colors.green}
           onClick={() => setSelectedLayer('rules')} selected={selectedLayer === 'rules'}>
        <rect x="0" y="0" width="500" height="30" fill={colors.green} rx="8" ry="0" />
        <text x="250" y="22" textAnchor="middle" fill={colors.darkBg} fontSize="14" fontWeight="bold">
          Layer 3: Project Rules & Skills
        </text>
        <text x="250" y="55" textAnchor="middle" fill={colors.white} fontSize="12">
          ~/.claude/skills/ | ~/.claude/commands/
        </text>
        <text x="250" y="75" textAnchor="middle" fill={colors.muted} fontSize="11">
          Reusable capabilities, workflow commands, pattern library
        </text>
      </Box>

      {/* Layer 4: User Memory */}
      <Box x={250} y={460} width={400} height={100} fill={colors.darkBgAlt} stroke={colors.purple}
           onClick={() => setSelectedLayer('user')} selected={selectedLayer === 'user'}>
        <rect x="0" y="0" width="400" height="30" fill={colors.purple} rx="8" ry="0" />
        <text x="200" y="22" textAnchor="middle" fill={colors.white} fontSize="14" fontWeight="bold">
          Layer 4: User Memory & State
        </text>
        <text x="200" y="55" textAnchor="middle" fill={colors.white} fontSize="12">
          ~/.claude/state/ | ~/.claude/learning/
        </text>
        <text x="200" y="75" textAnchor="middle" fill={colors.muted} fontSize="11">
          Session state, captured learnings, runtime context
        </text>
      </Box>

      {/* Override arrows */}
      <Arrow x1={450} y1={200} x2={450} y2={220} color={colors.safariRed} />
      <Arrow x1={450} y1={320} x2={450} y2={340} color={colors.blue} />
      <Arrow x1={450} y1={440} x2={450} y2={460} color={colors.green} />

      {/* Legend */}
      <g transform="translate(720, 350)">
        <text x="0" y="0" fill={colors.white} fontSize="12" fontWeight="bold">Override Flow</text>
        <line x1="0" y1="20" x2="0" y2="80" stroke={colors.slate} strokeWidth="2" strokeDasharray="5,5" />
        <text x="10" y="35" fill={colors.muted} fontSize="10">Higher layers</text>
        <text x="10" y="50" fill={colors.muted} fontSize="10">override lower</text>
        <text x="10" y="65" fill={colors.muted} fontSize="10">layers when</text>
        <text x="10" y="80" fill={colors.muted} fontSize="10">rules conflict</text>
      </g>
    </svg>
  );

  const renderGovernance = () => (
    <svg viewBox="0 0 900 600" style={{ width: '100%', height: 'auto' }}>
      <text x="450" y="40" textAnchor="middle" fill={colors.white} fontSize="24" fontWeight="bold">
        Context Governance Model
      </text>
      <text x="450" y="65" textAnchor="middle" fill={colors.muted} fontSize="14">
        OpenMetadata-Inspired Governance Principles
      </text>

      {/* Central: Context Asset */}
      <circle cx="450" cy="300" r="80" fill={colors.darkBgAlt} stroke={colors.safariRed} strokeWidth="3" />
      <text x="450" y="295" textAnchor="middle" fill={colors.white} fontSize="14" fontWeight="bold">
        Context
      </text>
      <text x="450" y="315" textAnchor="middle" fill={colors.white} fontSize="14" fontWeight="bold">
        Asset
      </text>

      {/* Governance dimensions */}
      {/* Ownership */}
      <Box x={50} y={120} width={180} height={100} fill={colors.darkBgAlt} stroke={colors.purple}>
        <text x="90" y="25" textAnchor="middle" fill={colors.purple} fontSize="14" fontWeight="bold">
          Ownership
        </text>
        <text x="90" y="50" textAnchor="middle" fill={colors.muted} fontSize="11">Who is responsible?</text>
        <text x="90" y="70" textAnchor="middle" fill={colors.white} fontSize="10">• Team / Individual</text>
        <text x="90" y="85" textAnchor="middle" fill={colors.white} fontSize="10">• Accountability</text>
      </Box>
      <Arrow x1={230} y1={170} x2={380} y2={260} color={colors.purple} />

      {/* Classification */}
      <Box x={350} y={80} width={200} height={100} fill={colors.darkBgAlt} stroke={colors.blue}>
        <text x="100" y="25" textAnchor="middle" fill={colors.blue} fontSize="14" fontWeight="bold">
          Classification
        </text>
        <text x="100" y="50" textAnchor="middle" fill={colors.muted} fontSize="11">What type of context?</text>
        <text x="100" y="70" textAnchor="middle" fill={colors.white} fontSize="10">• Domain / Sensitivity</text>
        <text x="100" y="85" textAnchor="middle" fill={colors.white} fontSize="10">• Lifecycle stage</text>
      </Box>
      <Arrow x1={450} y1={180} x2={450} y2={220} color={colors.blue} />

      {/* Lineage */}
      <Box x={670} y={120} width={180} height={100} fill={colors.darkBgAlt} stroke={colors.green}>
        <text x="90" y="25" textAnchor="middle" fill={colors.green} fontSize="14" fontWeight="bold">
          Lineage
        </text>
        <text x="90" y="50" textAnchor="middle" fill={colors.muted} fontSize="11">Where does it come from?</text>
        <text x="90" y="70" textAnchor="middle" fill={colors.white} fontSize="10">• Dependencies</text>
        <text x="90" y="85" textAnchor="middle" fill={colors.white} fontSize="10">• Impact analysis</text>
      </Box>
      <Arrow x1={670} y1={170} x2={520} y2={260} color={colors.green} />

      {/* Quality */}
      <Box x={670} y={380} width={180} height={100} fill={colors.darkBgAlt} stroke={colors.orange}>
        <text x="90" y="25" textAnchor="middle" fill={colors.orange} fontSize="14" fontWeight="bold">
          Quality
        </text>
        <text x="90" y="50" textAnchor="middle" fill={colors.muted} fontSize="11">Is it good context?</text>
        <text x="90" y="70" textAnchor="middle" fill={colors.white} fontSize="10">• Freshness / Accuracy</text>
        <text x="90" y="85" textAnchor="middle" fill={colors.white} fontSize="10">• Completeness</text>
      </Box>
      <Arrow x1={670} y1={430} x2={520} y2={340} color={colors.orange} />

      {/* Discovery */}
      <Box x={350} y={420} width={200} height={100} fill={colors.darkBgAlt} stroke={colors.pink}>
        <text x="100" y="25" textAnchor="middle" fill={colors.pink} fontSize="14" fontWeight="bold">
          Discovery
        </text>
        <text x="100" y="50" textAnchor="middle" fill={colors.muted} fontSize="11">Can it be found?</text>
        <text x="100" y="70" textAnchor="middle" fill={colors.white} fontSize="10">• Search / Tags</text>
        <text x="100" y="85" textAnchor="middle" fill={colors.white} fontSize="10">• Recommendations</text>
      </Box>
      <Arrow x1={450} y1={420} x2={450} y2={380} color={colors.pink} />

      {/* Access */}
      <Box x={50} y={380} width={180} height={100} fill={colors.darkBgAlt} stroke={colors.yellow}>
        <text x="90" y="25" textAnchor="middle" fill={colors.yellow} fontSize="14" fontWeight="bold">
          Access Control
        </text>
        <text x="90" y="50" textAnchor="middle" fill={colors.muted} fontSize="11">Who can use it?</text>
        <text x="90" y="70" textAnchor="middle" fill={colors.white} fontSize="10">• Permissions</text>
        <text x="90" y="85" textAnchor="middle" fill={colors.white} fontSize="10">• Scope boundaries</text>
      </Box>
      <Arrow x1={230} y1={430} x2={380} y2={340} color={colors.yellow} />
    </svg>
  );

  const renderCompiler = () => (
    <svg viewBox="0 0 900 600" style={{ width: '100%', height: 'auto' }}>
      <text x="450" y="40" textAnchor="middle" fill={colors.white} fontSize="24" fontWeight="bold">
        Context Compiler Pipeline
      </text>
      <text x="450" y="65" textAnchor="middle" fill={colors.muted} fontSize="14">
        Natural Language → Structured Context
      </text>

      {/* Input */}
      <Box x={50} y={150} width={150} height={80} fill={colors.darkBgAlt} stroke={colors.slate}>
        <text x="75" y="35" textAnchor="middle" fill={colors.white} fontSize="12" fontWeight="bold">
          Natural Language
        </text>
        <text x="75" y="55" textAnchor="middle" fill={colors.muted} fontSize="10">
          "Remember that we
        </text>
        <text x="75" y="70" textAnchor="middle" fill={colors.muted} fontSize="10">
          use PostgreSQL"
        </text>
      </Box>

      {/* Stage 1: Parse */}
      <Box x={230} y={120} width={120} height={140} fill={colors.darkBg} stroke={colors.blue}>
        <rect x="0" y="0" width="120" height="25" fill={colors.blue} rx="8" ry="0" />
        <text x="60" y="18" textAnchor="middle" fill={colors.darkBg} fontSize="11" fontWeight="bold">
          1. PARSE
        </text>
        <text x="60" y="50" textAnchor="middle" fill={colors.white} fontSize="10">Extract:</text>
        <text x="60" y="70" textAnchor="middle" fill={colors.muted} fontSize="9">• Key assertions</text>
        <text x="60" y="85" textAnchor="middle" fill={colors.muted} fontSize="9">• Domain/topic</text>
        <text x="60" y="100" textAnchor="middle" fill={colors.muted} fontSize="9">• Relationships</text>
        <text x="60" y="115" textAnchor="middle" fill={colors.muted} fontSize="9">• Confidence</text>
      </Box>

      {/* Stage 2: Resolve */}
      <Box x={380} y={120} width={120} height={140} fill={colors.darkBg} stroke={colors.green}>
        <rect x="0" y="0" width="120" height="25" fill={colors.green} rx="8" ry="0" />
        <text x="60" y="18" textAnchor="middle" fill={colors.darkBg} fontSize="11" fontWeight="bold">
          2. RESOLVE
        </text>
        <text x="60" y="50" textAnchor="middle" fill={colors.white} fontSize="10">Check:</text>
        <text x="60" y="70" textAnchor="middle" fill={colors.muted} fontSize="9">• Conflicts</text>
        <text x="60" y="85" textAnchor="middle" fill={colors.muted} fontSize="9">• References</text>
        <text x="60" y="100" textAnchor="middle" fill={colors.muted} fontSize="9">• Dependencies</text>
        <text x="60" y="115" textAnchor="middle" fill={colors.muted} fontSize="9">• Schema</text>
      </Box>

      {/* Stage 3: Optimize */}
      <Box x={530} y={120} width={120} height={140} fill={colors.darkBg} stroke={colors.orange}>
        <rect x="0" y="0" width="120" height="25" fill={colors.orange} rx="8" ry="0" />
        <text x="60" y="18" textAnchor="middle" fill={colors.darkBg} fontSize="11" fontWeight="bold">
          3. OPTIMIZE
        </text>
        <text x="60" y="50" textAnchor="middle" fill={colors.white} fontSize="10">Transform:</text>
        <text x="60" y="70" textAnchor="middle" fill={colors.muted} fontSize="9">• Summarize</text>
        <text x="60" y="85" textAnchor="middle" fill={colors.muted} fontSize="9">• De-duplicate</text>
        <text x="60" y="100" textAnchor="middle" fill={colors.muted} fontSize="9">• Structure</text>
        <text x="60" y="115" textAnchor="middle" fill={colors.muted} fontSize="9">• Token budget</text>
      </Box>

      {/* Stage 4: Allocate */}
      <Box x={680} y={120} width={120} height={140} fill={colors.darkBg} stroke={colors.purple}>
        <rect x="0" y="0" width="120" height="25" fill={colors.purple} rx="8" ry="0" />
        <text x="60" y="18" textAnchor="middle" fill={colors.white} fontSize="11" fontWeight="bold">
          4. ALLOCATE
        </text>
        <text x="60" y="50" textAnchor="middle" fill={colors.white} fontSize="10">Route:</text>
        <text x="60" y="70" textAnchor="middle" fill={colors.muted} fontSize="9">• Storage path</text>
        <text x="60" y="85" textAnchor="middle" fill={colors.muted} fontSize="9">• Asset type</text>
        <text x="60" y="100" textAnchor="middle" fill={colors.muted} fontSize="9">• Priority</text>
        <text x="60" y="115" textAnchor="middle" fill={colors.muted} fontSize="9">• Budget</text>
      </Box>

      {/* Stage 5: Link */}
      <Box x={530} y={320} width={120} height={140} fill={colors.darkBg} stroke={colors.pink}>
        <rect x="0" y="0" width="120" height="25" fill={colors.pink} rx="8" ry="0" />
        <text x="60" y="18" textAnchor="middle" fill={colors.darkBg} fontSize="11" fontWeight="bold">
          5. LINK
        </text>
        <text x="60" y="50" textAnchor="middle" fill={colors.white} fontSize="10">Connect:</text>
        <text x="60" y="70" textAnchor="middle" fill={colors.muted} fontSize="9">• Related assets</text>
        <text x="60" y="85" textAnchor="middle" fill={colors.muted} fontSize="9">• Update lineage</text>
        <text x="60" y="100" textAnchor="middle" fill={colors.muted} fontSize="9">• Register</text>
        <text x="60" y="115" textAnchor="middle" fill={colors.muted} fontSize="9">• Index</text>
      </Box>

      {/* Output */}
      <Box x={700} y={350} width={150} height={80} fill={colors.darkBgAlt} stroke={colors.safariRed}>
        <text x="75" y="25" textAnchor="middle" fill={colors.safariRed} fontSize="12" fontWeight="bold">
          Structured Context
        </text>
        <text x="75" y="45" textAnchor="middle" fill={colors.muted} fontSize="10">
          Registered in
        </text>
        <text x="75" y="60" textAnchor="middle" fill={colors.white} fontSize="10">
          context-registry.json
        </text>
      </Box>

      {/* Arrows */}
      <Arrow x1={200} y1={190} x2={230} y2={190} color={colors.slate} />
      <Arrow x1={350} y1={190} x2={380} y2={190} color={colors.blue} animated />
      <Arrow x1={500} y1={190} x2={530} y2={190} color={colors.green} animated />
      <Arrow x1={650} y1={190} x2={680} y2={190} color={colors.orange} animated />
      <Arrow x1={740} y1={260} x2={740} y2={290} color={colors.purple} />
      <line x1="740" y1="290" x2="650" y2="290" stroke={colors.purple} strokeWidth="2" />
      <Arrow x1={650} y1={290} x2={650} y2={320} color={colors.purple} />
      <Arrow x1={650} y1={390} x2={700} y2={390} color={colors.pink} animated />

      {/* Quality Gates */}
      <Box x={380} y={320} width={120} height={100} fill={colors.darkBgAlt} stroke={colors.yellow}>
        <text x="60" y="25" textAnchor="middle" fill={colors.yellow} fontSize="11" fontWeight="bold">
          Quality Gates
        </text>
        <text x="60" y="50" textAnchor="middle" fill={colors.muted} fontSize="9">✓ Schema valid</text>
        <text x="60" y="65" textAnchor="middle" fill={colors.muted} fontSize="9">✓ No conflicts</text>
        <text x="60" y="80" textAnchor="middle" fill={colors.muted} fontSize="9">✓ Token budget</text>
      </Box>
      <line x1="500" y1="370" x2="530" y2="370" stroke={colors.yellow} strokeWidth="2" strokeDasharray="5,5" />
    </svg>
  );

  const renderEvolution = () => (
    <svg viewBox="0 0 900 600" style={{ width: '100%', height: 'auto' }}>
      <text x="450" y="40" textAnchor="middle" fill={colors.white} fontSize="24" fontWeight="bold">
        Context Evolution Path
      </text>
      <text x="450" y="65" textAnchor="middle" fill={colors.muted} fontSize="14">
        From Conversation to Enforced Standard
      </text>

      {/* Timeline */}
      <line x1="100" y1="300" x2="800" y2="300" stroke={colors.slate} strokeWidth="3" />

      {/* Stage 1: Conversation */}
      <circle cx="150" cy="300" r="40" fill={colors.darkBgAlt} stroke={colors.slate} strokeWidth="2" />
      <text x="150" y="295" textAnchor="middle" fill={colors.slate} fontSize="10" fontWeight="bold">
        Conversation
      </text>
      <text x="150" y="310" textAnchor="middle" fill={colors.muted} fontSize="8">
        Raw Input
      </text>
      <Box x={100} y={360} width={100} height={60} fill={colors.darkBg} stroke={colors.slate}>
        <text x="50" y="25" textAnchor="middle" fill={colors.muted} fontSize="9">Natural language</text>
        <text x="50" y="40" textAnchor="middle" fill={colors.muted} fontSize="9">patterns &</text>
        <text x="50" y="55" textAnchor="middle" fill={colors.muted} fontSize="9">corrections</text>
      </Box>

      {/* Stage 2: Captured */}
      <circle cx="275" cy="300" r="40" fill={colors.darkBgAlt} stroke={colors.blue} strokeWidth="2" />
      <text x="275" y="295" textAnchor="middle" fill={colors.blue} fontSize="10" fontWeight="bold">
        Captured
      </text>
      <text x="275" y="310" textAnchor="middle" fill={colors.muted} fontSize="8">
        Auto-detect
      </text>
      <Box x={225} y={360} width={100} height={60} fill={colors.darkBg} stroke={colors.blue}>
        <text x="50" y="25" textAnchor="middle" fill={colors.muted} fontSize="9">Signals detected</text>
        <text x="50" y="40" textAnchor="middle" fill={colors.muted} fontSize="9">Confidence 75%+</text>
        <text x="50" y="55" textAnchor="middle" fill={colors.muted} fontSize="9">Auto-stored</text>
      </Box>

      {/* Stage 3: Learning */}
      <circle cx="400" cy="300" r="40" fill={colors.darkBgAlt} stroke={colors.green} strokeWidth="2" />
      <text x="400" y="295" textAnchor="middle" fill={colors.green} fontSize="10" fontWeight="bold">
        Learning
      </text>
      <text x="400" y="310" textAnchor="middle" fill={colors.muted} fontSize="8">
        Validated
      </text>
      <Box x={350} y={360} width={100} height={60} fill={colors.darkBg} stroke={colors.green}>
        <text x="50" y="25" textAnchor="middle" fill={colors.muted} fontSize="9">Used 3+ times</text>
        <text x="50" y="40" textAnchor="middle" fill={colors.muted} fontSize="9">Helpful pattern</text>
        <text x="50" y="55" textAnchor="middle" fill={colors.muted} fontSize="9">learning/*.md</text>
      </Box>

      {/* Stage 4: Best Practice */}
      <circle cx="525" cy="300" r="40" fill={colors.darkBgAlt} stroke={colors.orange} strokeWidth="2" />
      <text x="525" y="295" textAnchor="middle" fill={colors.orange} fontSize="10" fontWeight="bold">
        Best Practice
      </text>
      <text x="525" y="310" textAnchor="middle" fill={colors.muted} fontSize="8">
        Promoted
      </text>
      <Box x={475} y={360} width={100} height={60} fill={colors.darkBg} stroke={colors.orange}>
        <text x="50" y="25" textAnchor="middle" fill={colors.muted} fontSize="9">Documented</text>
        <text x="50" y="40" textAnchor="middle" fill={colors.muted} fontSize="9">Team-reviewed</text>
        <text x="50" y="55" textAnchor="middle" fill={colors.muted} fontSize="9">SHOULD follow</text>
      </Box>

      {/* Stage 5: Standard */}
      <circle cx="650" cy="300" r="40" fill={colors.darkBgAlt} stroke={colors.purple} strokeWidth="2" />
      <text x="650" y="295" textAnchor="middle" fill={colors.purple} fontSize="10" fontWeight="bold">
        Standard
      </text>
      <text x="650" y="310" textAnchor="middle" fill={colors.muted} fontSize="8">
        Enforced
      </text>
      <Box x={600} y={360} width={100} height={60} fill={colors.darkBg} stroke={colors.purple}>
        <text x="50" y="25" textAnchor="middle" fill={colors.muted} fontSize="9">In CLAUDE.md</text>
        <text x="50" y="40" textAnchor="middle" fill={colors.muted} fontSize="9">MUST follow</text>
        <text x="50" y="55" textAnchor="middle" fill={colors.muted} fontSize="9">CI enforced</text>
      </Box>

      {/* Stage 6: Policy */}
      <circle cx="775" cy="300" r="40" fill={colors.safariRed} stroke={colors.safariRed} strokeWidth="2" />
      <text x="775" y="295" textAnchor="middle" fill={colors.white} fontSize="10" fontWeight="bold">
        Policy
      </text>
      <text x="775" y="310" textAnchor="middle" fill={colors.white} fontSize="8">
        Immutable
      </text>
      <Box x={725} y={360} width={100} height={60} fill={colors.darkBg} stroke={colors.safariRed}>
        <text x="50" y="25" textAnchor="middle" fill={colors.muted} fontSize="9">Enterprise-wide</text>
        <text x="50" y="40" textAnchor="middle" fill={colors.muted} fontSize="9">Non-negotiable</text>
        <text x="50" y="55" textAnchor="middle" fill={colors.muted} fontSize="9">Core principle</text>
      </Box>

      {/* Arrows between stages */}
      <Arrow x1={190} y1={300} x2={235} y2={300} color={colors.slate} animated />
      <Arrow x1={315} y1={300} x2={360} y2={300} color={colors.blue} animated />
      <Arrow x1={440} y1={300} x2={485} y2={300} color={colors.green} animated />
      <Arrow x1={565} y1={300} x2={610} y2={300} color={colors.orange} animated />
      <Arrow x1={690} y1={300} x2={735} y2={300} color={colors.purple} animated />

      {/* Confidence indicators */}
      <text x="150" y="240" textAnchor="middle" fill={colors.muted} fontSize="10">0%</text>
      <text x="275" y="240" textAnchor="middle" fill={colors.blue} fontSize="10">75%</text>
      <text x="400" y="240" textAnchor="middle" fill={colors.green} fontSize="10">85%</text>
      <text x="525" y="240" textAnchor="middle" fill={colors.orange} fontSize="10">95%</text>
      <text x="650" y="240" textAnchor="middle" fill={colors.purple} fontSize="10">99%</text>
      <text x="775" y="240" textAnchor="middle" fill={colors.safariRed} fontSize="10">100%</text>

      {/* Legend */}
      <g transform="translate(100, 480)">
        <text x="0" y="0" fill={colors.white} fontSize="12" fontWeight="bold">Promotion Criteria</text>
        <text x="0" y="25" fill={colors.muted} fontSize="10">• Usage frequency (3+ successful uses)</text>
        <text x="0" y="40" fill={colors.muted} fontSize="10">• Positive feedback (prevented errors)</text>
        <text x="0" y="55" fill={colors.muted} fontSize="10">• Team review and approval</text>
        <text x="300" y="25" fill={colors.muted} fontSize="10">• No conflicts with existing context</text>
        <text x="300" y="40" fill={colors.muted} fontSize="10">• Clear, actionable guidance</text>
        <text x="300" y="55" fill={colors.muted} fontSize="10">• Token-efficient expression</text>
      </g>
    </svg>
  );

  return (
    <div style={{
      minHeight: '100vh',
      background: `linear-gradient(135deg, ${colors.darkBg} 0%, ${colors.darkBgAlt} 50%, ${colors.darkBg} 100%)`,
      fontFamily: "'IBM Plex Sans', -apple-system, BlinkMacSystemFont, sans-serif",
      color: colors.white,
      padding: '24px',
    }}>
      {/* Tab Navigation */}
      <div style={{
        display: 'flex',
        gap: '8px',
        marginBottom: '24px',
        flexWrap: 'wrap',
        justifyContent: 'center',
      }}>
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              padding: '10px 20px',
              background: activeTab === tab.id ? colors.safariRed : colors.darkBgAlt,
              border: `1px solid ${activeTab === tab.id ? colors.safariRed : colors.slate}`,
              borderRadius: '8px',
              color: colors.white,
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: activeTab === tab.id ? 'bold' : 'normal',
              transition: 'all 0.2s ease',
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Diagram Container */}
      <div style={{
        background: colors.darkBg,
        borderRadius: '12px',
        padding: '20px',
        border: `1px solid ${colors.slate}`,
        maxWidth: '1000px',
        margin: '0 auto',
      }}>
        {activeTab === 'overview' && renderOverview()}
        {activeTab === 'safari-mcp' && renderSafariMCP()}
        {activeTab === 'hierarchy' && renderHierarchy()}
        {activeTab === 'governance' && renderGovernance()}
        {activeTab === 'compiler' && renderCompiler()}
        {activeTab === 'evolution' && renderEvolution()}
      </div>

      {/* Footer */}
      <div style={{
        textAlign: 'center',
        marginTop: '24px',
        color: colors.muted,
        fontSize: '12px',
      }}>
        Safari Circuits - Context Governance Architecture v1.0
        <br />
        Powering Safari Trace AI Context Management
      </div>
    </div>
  );
};

export default ContextGovernanceArchitecture;

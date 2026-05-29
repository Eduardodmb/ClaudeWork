/**
 * Context Governance Documentation Hub
 * Safari Circuits - Comprehensive Visualization & Navigation
 *
 * A React component that unifies all Context Governance documentation,
 * architecture diagrams, and provides interactive exploration of the system.
 *
 * To view: Open in a React environment (CodeSandbox, StackBlitz, or local CRA)
 */

import React, { useState } from 'react';

const ContextGovernanceHub = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [hoveredItem, setHoveredItem] = useState(null);
  const [expandedDoc, setExpandedDoc] = useState(null);

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

  const sections = [
    { id: 'home', label: 'Home', icon: '🏠' },
    { id: 'architecture', label: 'Architecture', icon: '🏗️' },
    { id: 'safari-mcp', label: 'Safari MCP', icon: '🔌' },
    { id: 'integration', label: 'Integration', icon: '🔗' },
    { id: 'industry', label: 'Industry Context', icon: '🌐' },
    { id: 'docs', label: 'Documents', icon: '📚' },
    { id: 'roadmap', label: 'Roadmap', icon: '🗺️' }
  ];

  const documents = [
    {
      id: 'strategy',
      title: 'IT Strategy',
      path: 'shared/strategy/context-governance-strategy.md',
      type: 'Strategy',
      status: 'Current',
      description: 'Technical strategy and ROI projections'
    },
    {
      id: 'whitepaper',
      title: 'Whitepaper',
      path: 'deliverables/internal/context-governance-whitepaper.html',
      type: 'Whitepaper',
      status: 'v1.0',
      description: 'Executive overview and business case'
    },
    {
      id: 'overview-svg',
      title: 'Overview Diagram',
      path: 'shared/assets/diagrams/context-governance-overview.svg',
      type: 'Diagram',
      status: 'Complete',
      description: 'Complete system architecture'
    },
    {
      id: 'hierarchy-svg',
      title: 'Memory Hierarchy',
      path: 'shared/assets/diagrams/context-governance-hierarchy.svg',
      type: 'Diagram',
      status: 'Complete',
      description: '4-layer memory model'
    },
    {
      id: 'mcp-svg',
      title: 'Safari MCP Architecture',
      path: 'shared/assets/diagrams/safari-mcp-architecture.svg',
      type: 'Diagram',
      status: 'Complete',
      description: 'MCP server components'
    },
    {
      id: 'model-svg',
      title: 'Governance Model',
      path: 'shared/assets/diagrams/context-governance-model.svg',
      type: 'Diagram',
      status: 'Complete',
      description: 'Six governance principles'
    },
    {
      id: 'compiler-svg',
      title: 'Compiler Pipeline',
      path: 'shared/assets/diagrams/context-compiler-pipeline.svg',
      type: 'Diagram',
      status: 'Complete',
      description: 'Context processing stages'
    },
    {
      id: 'evolution-svg',
      title: 'Evolution Path',
      path: 'shared/assets/diagrams/context-evolution.svg',
      type: 'Diagram',
      status: 'Complete',
      description: 'Knowledge promotion pipeline'
    },
    {
      id: 'arch-jsx',
      title: 'Interactive Architecture',
      path: 'shared/assets/diagrams/context-governance-architecture.jsx',
      type: 'Component',
      status: 'Complete',
      description: 'Multi-tab React visualization'
    }
  ];

  // Reusable components
  const Card = ({ children, highlight, onClick, style = {} }) => (
    <div
      onClick={onClick}
      style={{
        background: colors.darkBgAlt,
        border: `1px solid ${highlight ? colors.safariRed : colors.slate}`,
        borderRadius: '12px',
        padding: '20px',
        cursor: onClick ? 'pointer' : 'default',
        transition: 'all 0.2s ease',
        ...style
      }}
    >
      {children}
    </div>
  );

  const Badge = ({ color, children }) => (
    <span style={{
      background: color,
      color: color === colors.yellow ? colors.darkBg : colors.white,
      padding: '2px 8px',
      borderRadius: '4px',
      fontSize: '10px',
      fontWeight: 'bold',
      textTransform: 'uppercase'
    }}>
      {children}
    </span>
  );

  // Home Section
  const renderHome = () => (
    <div style={{ display: 'grid', gap: '24px' }}>
      {/* Hero */}
      <Card style={{
        background: `linear-gradient(135deg, ${colors.safariRed}22 0%, ${colors.darkBgAlt} 100%)`,
        border: `2px solid ${colors.safariRed}`,
        textAlign: 'center',
        padding: '40px'
      }}>
        <div style={{ fontSize: '48px', marginBottom: '16px' }}>🦁</div>
        <h1 style={{ color: colors.white, margin: '0 0 8px 0', fontSize: '32px' }}>
          Context Governance
        </h1>
        <p style={{ color: colors.muted, margin: '0 0 24px 0', fontSize: '18px' }}>
          Building Institutional Memory for AI Operations
        </p>
        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Badge color={colors.green}>Phase 1 Complete</Badge>
          <Badge color={colors.blue}>Phase 2 In Progress</Badge>
          <Badge color={colors.purple}>Safari MCP</Badge>
        </div>
      </Card>

      {/* Quick Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
        {[
          { label: 'Context Rot Reduction', value: '80%', color: colors.green },
          { label: 'Session Productivity', value: '+29%', color: colors.blue },
          { label: 'Annual Savings', value: '$21K', color: colors.orange },
          { label: 'Consistency', value: '95%', color: colors.purple }
        ].map(stat => (
          <Card key={stat.label} style={{ textAlign: 'center' }}>
            <div style={{ color: stat.color, fontSize: '32px', fontWeight: 'bold' }}>
              {stat.value}
            </div>
            <div style={{ color: colors.muted, fontSize: '12px' }}>{stat.label}</div>
          </Card>
        ))}
      </div>

      {/* Core Concepts Grid */}
      <h2 style={{ color: colors.white, margin: '0' }}>Core Concepts</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
        <Card onClick={() => setActiveSection('architecture')}>
          <div style={{ color: colors.safariRed, fontSize: '24px', marginBottom: '8px' }}>🏛️</div>
          <h3 style={{ color: colors.white, margin: '0 0 8px 0' }}>Three-Layer Architecture</h3>
          <p style={{ color: colors.muted, margin: 0, fontSize: '13px' }}>
            CPI (Contracts) + SCL (Language) + Governance (Principles)
          </p>
        </Card>
        <Card onClick={() => setActiveSection('safari-mcp')}>
          <div style={{ color: colors.blue, fontSize: '24px', marginBottom: '8px' }}>🔌</div>
          <h3 style={{ color: colors.white, margin: '0 0 8px 0' }}>Safari MCP</h3>
          <p style={{ color: colors.muted, margin: 0, fontSize: '13px' }}>
            Model Context Protocol server bridging governance to LLMs
          </p>
        </Card>
        <Card onClick={() => setActiveSection('integration')}>
          <div style={{ color: colors.green, fontSize: '24px', marginBottom: '8px' }}>🔗</div>
          <h3 style={{ color: colors.white, margin: '0 0 8px 0' }}>Integration</h3>
          <p style={{ color: colors.muted, margin: 0, fontSize: '13px' }}>
            Azure DevOps, GitHub, OpenMetadata, Kafka connections
          </p>
        </Card>
      </div>

      {/* Memory Hierarchy Preview */}
      <Card>
        <h3 style={{ color: colors.white, margin: '0 0 16px 0' }}>4-Layer Memory Hierarchy</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {[
            { layer: 'Enterprise Policy', path: '~/.claude/CLAUDE.md', color: colors.safariRed },
            { layer: 'Project Memory', path: '{repo}/.claude/CLAUDE.md', color: colors.blue },
            { layer: 'Skills & Commands', path: '~/.claude/skills/, commands/', color: colors.green },
            { layer: 'Session State', path: '~/.claude/state/', color: colors.purple }
          ].map((item, i) => (
            <div key={i} style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '12px 16px',
              background: colors.darkBg,
              borderRadius: '8px',
              borderLeft: `4px solid ${item.color}`
            }}>
              <Badge color={item.color}>L{i + 1}</Badge>
              <span style={{ color: colors.white, flex: 1 }}>{item.layer}</span>
              <code style={{ color: colors.muted, fontSize: '11px' }}>{item.path}</code>
            </div>
          ))}
        </div>
        <p style={{ color: colors.muted, fontSize: '12px', marginTop: '12px', marginBottom: 0 }}>
          Higher layers override lower layers when rules conflict
        </p>
      </Card>
    </div>
  );

  // Architecture Section with SVG
  const renderArchitecture = () => (
    <div style={{ display: 'grid', gap: '24px' }}>
      <h2 style={{ color: colors.white, margin: 0 }}>System Architecture</h2>

      <svg viewBox="0 0 900 550" style={{ width: '100%', height: 'auto', background: colors.darkBg, borderRadius: '12px' }}>
        <defs>
          <linearGradient id="hubGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={colors.darkBg} />
            <stop offset="100%" stopColor={colors.darkBgAlt} />
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
        <text x="450" y="35" textAnchor="middle" fill={colors.white} fontSize="20" fontWeight="bold">
          Context Governance Architecture
        </text>

        {/* LLM Layer */}
        <rect x="150" y="60" width="600" height="50" fill={colors.darkBgAlt} stroke={colors.slate} rx="8" />
        <text x="450" y="90" textAnchor="middle" fill={colors.white} fontSize="14" fontWeight="bold">
          LLM Interfaces (Claude Code, API, MCP Clients)
        </text>

        {/* Safari MCP */}
        <rect x="200" y="130" width="500" height="60" fill={colors.darkBg} stroke={colors.safariRed} strokeWidth="2" rx="8" />
        <text x="450" y="165" textAnchor="middle" fill={colors.safariRed} fontSize="16" fontWeight="bold">
          Safari MCP Server
        </text>
        <text x="300" y="180" textAnchor="middle" fill={colors.muted} fontSize="10">Resources</text>
        <text x="450" y="180" textAnchor="middle" fill={colors.muted} fontSize="10">Tools</text>
        <text x="600" y="180" textAnchor="middle" fill={colors.muted} fontSize="10">Prompts</text>

        {/* Three Layers */}
        <g transform="translate(100, 210)">
          {/* CPI */}
          <rect x="0" y="0" width="220" height="150" fill={colors.darkBgAlt} stroke={colors.safariRed} rx="8" />
          <rect x="0" y="0" width="220" height="30" fill={colors.safariRed} rx="8" />
          <text x="110" y="22" textAnchor="middle" fill={colors.white} fontSize="12" fontWeight="bold">CPI Layer</text>
          <text x="110" y="55" textAnchor="middle" fill={colors.muted} fontSize="10">Contracts</text>
          <rect x="20" y="70" width="80" height="30" fill={colors.darkBg} stroke={colors.blue} rx="4" />
          <text x="60" y="90" textAnchor="middle" fill={colors.blue} fontSize="9">Contracts</text>
          <rect x="120" y="70" width="80" height="30" fill={colors.darkBg} stroke={colors.green} rx="4" />
          <text x="160" y="90" textAnchor="middle" fill={colors.green} fontSize="9">Types</text>
          <rect x="70" y="110" width="80" height="30" fill={colors.darkBg} stroke={colors.purple} rx="4" />
          <text x="110" y="130" textAnchor="middle" fill={colors.purple} fontSize="9">Exports</text>
        </g>

        <g transform="translate(340, 210)">
          {/* SCL */}
          <rect x="0" y="0" width="220" height="150" fill={colors.darkBgAlt} stroke={colors.blue} rx="8" />
          <rect x="0" y="0" width="220" height="30" fill={colors.blue} rx="8" />
          <text x="110" y="22" textAnchor="middle" fill={colors.darkBg} fontSize="12" fontWeight="bold">SCL Layer</text>
          <text x="110" y="55" textAnchor="middle" fill={colors.muted} fontSize="10">Operations</text>
          {['SELECT', 'RESOLVE', 'OPTIMIZE', 'ALLOCATE'].map((op, i) => (
            <g key={op}>
              <rect x={15 + (i % 2) * 100} y={70 + Math.floor(i / 2) * 35} width="90" height="28"
                    fill={colors.darkBg} stroke={[colors.orange, colors.green, colors.pink, colors.yellow][i]} rx="4" />
              <text x={60 + (i % 2) * 100} y={88 + Math.floor(i / 2) * 35} textAnchor="middle"
                    fill={[colors.orange, colors.green, colors.pink, colors.yellow][i]} fontSize="9">{op}</text>
            </g>
          ))}
        </g>

        <g transform="translate(580, 210)">
          {/* Governance */}
          <rect x="0" y="0" width="220" height="150" fill={colors.darkBgAlt} stroke={colors.green} rx="8" />
          <rect x="0" y="0" width="220" height="30" fill={colors.green} rx="8" />
          <text x="110" y="22" textAnchor="middle" fill={colors.darkBg} fontSize="12" fontWeight="bold">Governance Layer</text>
          <text x="110" y="55" textAnchor="middle" fill={colors.muted} fontSize="10">OpenMetadata-Inspired</text>
          {['Owner', 'Class', 'Lineage', 'Quality', 'Discover', 'Access'].map((p, i) => (
            <g key={p}>
              <rect x={15 + (i % 3) * 68} y={70 + Math.floor(i / 3) * 35} width="60" height="28"
                    fill={colors.darkBg} stroke={colors.slate} rx="4" />
              <text x={45 + (i % 3) * 68} y={88 + Math.floor(i / 3) * 35} textAnchor="middle"
                    fill={colors.white} fontSize="8">{p}</text>
            </g>
          ))}
        </g>

        {/* Context Registry */}
        <rect x="250" y="380" width="400" height="60" fill={colors.darkBg} stroke={colors.safariRed} strokeWidth="2" rx="8" />
        <text x="450" y="415" textAnchor="middle" fill={colors.safariRed} fontSize="14" fontWeight="bold">
          Context Registry (context-registry.json)
        </text>

        {/* Context Sources */}
        <g transform="translate(100, 470)">
          {[
            { label: 'CLAUDE.md', color: colors.blue },
            { label: 'Skills', color: colors.green },
            { label: 'Commands', color: colors.purple },
            { label: 'Learning', color: colors.orange },
            { label: 'State', color: colors.pink }
          ].map((src, i) => (
            <g key={src.label}>
              <rect x={i * 140} y="0" width="120" height="45" fill={colors.darkBgAlt} stroke={src.color} rx="6" />
              <text x={60 + i * 140} y="28" textAnchor="middle" fill={src.color} fontSize="11" fontWeight="bold">
                {src.label}
              </text>
            </g>
          ))}
        </g>

        {/* Arrows */}
        <line x1="450" y1="110" x2="450" y2="130" stroke={colors.slate} strokeWidth="2" markerEnd="url(#arrow)" />
        <line x1="450" y1="190" x2="450" y2="210" stroke={colors.safariRed} strokeWidth="2" />
        <line x1="210" y1="360" x2="350" y2="380" stroke={colors.safariRed} strokeWidth="2" />
        <line x1="450" y1="360" x2="450" y2="380" stroke={colors.blue} strokeWidth="2" />
        <line x1="690" y1="360" x2="550" y2="380" stroke={colors.green} strokeWidth="2" />
        <line x1="450" y1="440" x2="450" y2="470" stroke={colors.safariRed} strokeWidth="2" />
      </svg>

      {/* Diagram Links */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
        {documents.filter(d => d.type === 'Diagram').map(doc => (
          <Card key={doc.id} onClick={() => setExpandedDoc(doc)} style={{ padding: '12px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ color: colors.white, fontSize: '13px' }}>{doc.title}</span>
              <Badge color={colors.green}>SVG</Badge>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );

  // Safari MCP Section
  const renderSafariMCP = () => (
    <div style={{ display: 'grid', gap: '24px' }}>
      <h2 style={{ color: colors.white, margin: 0 }}>Safari MCP Server</h2>
      <p style={{ color: colors.muted, margin: 0 }}>
        Bridging Context Governance with Model Context Protocol for universal LLM access
      </p>

      <svg viewBox="0 0 900 500" style={{ width: '100%', height: 'auto', background: colors.darkBg, borderRadius: '12px' }}>
        <text x="450" y="35" textAnchor="middle" fill={colors.white} fontSize="18" fontWeight="bold">
          Safari MCP Architecture
        </text>

        {/* Main Server Box */}
        <rect x="100" y="60" width="700" height="320" fill={colors.darkBgAlt} stroke={colors.safariRed} strokeWidth="2" rx="12" />
        <rect x="100" y="60" width="700" height="40" fill={colors.safariRed} rx="12" />
        <text x="450" y="88" textAnchor="middle" fill={colors.white} fontSize="16" fontWeight="bold">
          Safari MCP Server
        </text>

        {/* Three Columns */}
        {/* Resources */}
        <rect x="120" y="120" width="200" height="240" fill={colors.darkBg} stroke={colors.blue} rx="8" />
        <text x="220" y="145" textAnchor="middle" fill={colors.blue} fontSize="14" fontWeight="bold">Resources (Read)</text>
        <text x="220" y="165" textAnchor="middle" fill={colors.muted} fontSize="10">safari://context/*</text>
        {['enterprise-policy', 'project/{repo}', 'skill/{name}', 'command/{name}', 'registry'].map((r, i) => (
          <g key={r}>
            <rect x="130" y={180 + i * 35} width="180" height="28" fill={colors.darkBgAlt} stroke={colors.blue} rx="4" />
            <text x="220" y={198 + i * 35} textAnchor="middle" fill={colors.white} fontSize="10">{r}</text>
          </g>
        ))}

        {/* Tools */}
        <rect x="340" y="120" width="220" height="240" fill={colors.darkBg} stroke={colors.green} rx="8" />
        <text x="450" y="145" textAnchor="middle" fill={colors.green} fontSize="14" fontWeight="bold">Tools (Execute)</text>
        <text x="450" y="165" textAnchor="middle" fill={colors.muted} fontSize="10">SCL Operations</text>
        {[
          { op: 'SELECT', desc: 'Query', c: colors.orange },
          { op: 'RESOLVE', desc: 'Dependencies', c: colors.green },
          { op: 'OPTIMIZE', desc: 'Tokens', c: colors.pink },
          { op: 'ALLOCATE', desc: 'Route', c: colors.yellow },
          { op: 'CAPTURE', desc: 'Store', c: colors.blue },
          { op: 'LINK', desc: 'Lineage', c: colors.purple }
        ].map((t, i) => (
          <g key={t.op}>
            <rect x={350 + (i % 2) * 105} y={180 + Math.floor(i / 2) * 40} width="100" height="32"
                  fill={colors.darkBgAlt} stroke={t.c} rx="4" />
            <text x={400 + (i % 2) * 105} y={195 + Math.floor(i / 2) * 40} textAnchor="middle"
                  fill={t.c} fontSize="10" fontWeight="bold">{t.op}</text>
            <text x={400 + (i % 2) * 105} y={207 + Math.floor(i / 2) * 40} textAnchor="middle"
                  fill={colors.muted} fontSize="8">{t.desc}</text>
          </g>
        ))}

        {/* Prompts */}
        <rect x="580" y="120" width="200" height="240" fill={colors.darkBg} stroke={colors.purple} rx="8" />
        <text x="680" y="145" textAnchor="middle" fill={colors.purple} fontSize="14" fontWeight="bold">Prompts (Templates)</text>
        <text x="680" y="165" textAnchor="middle" fill={colors.muted} fontSize="10">Pre-built Queries</text>
        {['discover-context', 'explain-decision', 'suggest-learning', 'audit-context', 'resolve-conflict'].map((p, i) => (
          <g key={p}>
            <rect x="590" y={180 + i * 35} width="180" height="28" fill={colors.darkBgAlt} stroke={colors.purple} rx="4" />
            <text x="680" y={198 + i * 35} textAnchor="middle" fill={colors.white} fontSize="10">{p}</text>
          </g>
        ))}

        {/* Benefits */}
        <g transform="translate(100, 410)">
          {[
            { label: 'Universal Access', desc: 'Any MCP client' },
            { label: 'Governance', desc: 'Validated ops' },
            { label: 'Multi-LLM', desc: 'Claude, GPT, etc' },
            { label: 'Auditable', desc: 'Full logging' }
          ].map((b, i) => (
            <g key={b.label}>
              <rect x={i * 175} y="0" width="165" height="60" fill={colors.darkBgAlt} stroke={colors.slate} rx="6" />
              <text x={82 + i * 175} y="25" textAnchor="middle" fill={colors.white} fontSize="11" fontWeight="bold">
                {b.label}
              </text>
              <text x={82 + i * 175} y="45" textAnchor="middle" fill={colors.muted} fontSize="10">
                {b.desc}
              </text>
            </g>
          ))}
        </g>
      </svg>

      {/* URI Reference Table */}
      <Card>
        <h3 style={{ color: colors.white, margin: '0 0 16px 0' }}>MCP Resource URIs</h3>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: `1px solid ${colors.slate}` }}>
              <th style={{ color: colors.muted, textAlign: 'left', padding: '8px', fontSize: '12px' }}>URI Pattern</th>
              <th style={{ color: colors.muted, textAlign: 'left', padding: '8px', fontSize: '12px' }}>Content</th>
            </tr>
          </thead>
          <tbody>
            {[
              ['safari://context/enterprise-policy', '~/.claude/CLAUDE.md'],
              ['safari://context/project/{repo}', '{repo}/.claude/CLAUDE.md'],
              ['safari://context/skill/{name}', '~/.claude/skills/{name}/SKILL.md'],
              ['safari://context/command/{name}', '~/.claude/commands/{name}.md'],
              ['safari://context/registry', '~/.claude/state/context-registry.json']
            ].map(([uri, content]) => (
              <tr key={uri} style={{ borderBottom: `1px solid ${colors.darkBg}` }}>
                <td style={{ padding: '8px' }}>
                  <code style={{ color: colors.blue, fontSize: '12px' }}>{uri}</code>
                </td>
                <td style={{ padding: '8px' }}>
                  <code style={{ color: colors.muted, fontSize: '12px' }}>{content}</code>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );

  // Integration Section (NEW)
  const renderIntegration = () => (
    <div style={{ display: 'grid', gap: '24px' }}>
      <h2 style={{ color: colors.white, margin: 0 }}>System Integration</h2>
      <p style={{ color: colors.muted, margin: 0 }}>
        How Context Governance connects with Safari Circuits infrastructure
      </p>

      <svg viewBox="0 0 900 550" style={{ width: '100%', height: 'auto', background: colors.darkBg, borderRadius: '12px' }}>
        <text x="450" y="35" textAnchor="middle" fill={colors.white} fontSize="18" fontWeight="bold">
          Integration Architecture
        </text>

        {/* Central Hub */}
        <circle cx="450" cy="275" r="70" fill={colors.darkBgAlt} stroke={colors.safariRed} strokeWidth="3" />
        <text x="450" y="265" textAnchor="middle" fill={colors.safariRed} fontSize="14" fontWeight="bold">Context</text>
        <text x="450" y="285" textAnchor="middle" fill={colors.safariRed} fontSize="14" fontWeight="bold">Governance</text>

        {/* Azure DevOps */}
        <g transform="translate(100, 80)">
          <rect x="0" y="0" width="180" height="100" fill={colors.darkBgAlt} stroke={colors.blue} strokeWidth="2" rx="8" />
          <text x="90" y="30" textAnchor="middle" fill={colors.blue} fontSize="14" fontWeight="bold">Azure DevOps</text>
          <text x="90" y="55" textAnchor="middle" fill={colors.muted} fontSize="10">Work Items</text>
          <text x="90" y="70" textAnchor="middle" fill={colors.muted} fontSize="10">Iterations</text>
          <text x="90" y="85" textAnchor="middle" fill={colors.muted} fontSize="10">Sync Points</text>
        </g>
        <line x1="280" y1="130" x2="390" y2="220" stroke={colors.blue} strokeWidth="2" strokeDasharray="5,5">
          <animate attributeName="stroke-dashoffset" from="10" to="0" dur="1s" repeatCount="indefinite" />
        </line>

        {/* GitHub */}
        <g transform="translate(620, 80)">
          <rect x="0" y="0" width="180" height="100" fill={colors.darkBgAlt} stroke={colors.purple} strokeWidth="2" rx="8" />
          <text x="90" y="30" textAnchor="middle" fill={colors.purple} fontSize="14" fontWeight="bold">GitHub</text>
          <text x="90" y="55" textAnchor="middle" fill={colors.muted} fontSize="10">Version Control</text>
          <text x="90" y="70" textAnchor="middle" fill={colors.muted} fontSize="10">Branch Sync</text>
          <text x="90" y="85" textAnchor="middle" fill={colors.muted} fontSize="10">PRs / Commits</text>
        </g>
        <line x1="620" y1="130" x2="510" y2="220" stroke={colors.purple} strokeWidth="2" strokeDasharray="5,5">
          <animate attributeName="stroke-dashoffset" from="10" to="0" dur="1s" repeatCount="indefinite" />
        </line>

        {/* OpenMetadata */}
        <g transform="translate(50, 350)">
          <rect x="0" y="0" width="180" height="100" fill={colors.darkBgAlt} stroke={colors.green} strokeWidth="2" rx="8" />
          <text x="90" y="30" textAnchor="middle" fill={colors.green} fontSize="14" fontWeight="bold">OpenMetadata</text>
          <text x="90" y="55" textAnchor="middle" fill={colors.muted} fontSize="10">Governance Principles</text>
          <text x="90" y="70" textAnchor="middle" fill={colors.muted} fontSize="10">Lineage Tracking</text>
          <text x="90" y="85" textAnchor="middle" fill={colors.muted} fontSize="10">Quality Metrics</text>
        </g>
        <line x1="230" y1="400" x2="380" y2="310" stroke={colors.green} strokeWidth="2" strokeDasharray="5,5">
          <animate attributeName="stroke-dashoffset" from="10" to="0" dur="1s" repeatCount="indefinite" />
        </line>

        {/* Kafka */}
        <g transform="translate(670, 350)">
          <rect x="0" y="0" width="180" height="100" fill={colors.darkBgAlt} stroke={colors.orange} strokeWidth="2" rx="8" />
          <text x="90" y="30" textAnchor="middle" fill={colors.orange} fontSize="14" fontWeight="bold">Apache Kafka</text>
          <text x="90" y="55" textAnchor="middle" fill={colors.muted} fontSize="10">Context Events</text>
          <text x="90" y="70" textAnchor="middle" fill={colors.muted} fontSize="10">Audit Stream</text>
          <text x="90" y="85" textAnchor="middle" fill={colors.muted} fontSize="10">Change Capture</text>
        </g>
        <line x1="670" y1="400" x2="520" y2="310" stroke={colors.orange} strokeWidth="2" strokeDasharray="5,5">
          <animate attributeName="stroke-dashoffset" from="10" to="0" dur="1s" repeatCount="indefinite" />
        </line>

        {/* PostgreSQL */}
        <g transform="translate(360, 470)">
          <rect x="0" y="0" width="180" height="60" fill={colors.darkBgAlt} stroke={colors.pink} strokeWidth="2" rx="8" />
          <text x="90" y="25" textAnchor="middle" fill={colors.pink} fontSize="14" fontWeight="bold">PostgreSQL</text>
          <text x="90" y="45" textAnchor="middle" fill={colors.muted} fontSize="10">Registry Metadata Storage</text>
        </g>
        <line x1="450" y1="345" x2="450" y2="470" stroke={colors.pink} strokeWidth="2" strokeDasharray="5,5">
          <animate attributeName="stroke-dashoffset" from="10" to="0" dur="1s" repeatCount="indefinite" />
        </line>
      </svg>

      {/* Integration Details */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
        <Card>
          <h3 style={{ color: colors.blue, margin: '0 0 12px 0' }}>Azure DevOps Sync</h3>
          <ul style={{ color: colors.muted, margin: 0, paddingLeft: '20px', fontSize: '13px' }}>
            <li>Context assets tracked as work items</li>
            <li>Auto-sync on session checkpoints</li>
            <li>Learnings linked to tasks</li>
          </ul>
        </Card>
        <Card>
          <h3 style={{ color: colors.purple, margin: '0 0 12px 0' }}>GitHub Integration</h3>
          <ul style={{ color: colors.muted, margin: 0, paddingLeft: '20px', fontSize: '13px' }}>
            <li>Context changes version-controlled</li>
            <li>Auto-push after commits</li>
            <li>Conflict resolution strategies</li>
          </ul>
        </Card>
        <Card>
          <h3 style={{ color: colors.green, margin: '0 0 12px 0' }}>OpenMetadata Alignment</h3>
          <ul style={{ color: colors.muted, margin: 0, paddingLeft: '20px', fontSize: '13px' }}>
            <li>Governance principles adapted</li>
            <li>Ownership, lineage, quality</li>
            <li>Discovery and access control</li>
          </ul>
        </Card>
        <Card>
          <h3 style={{ color: colors.orange, margin: '0 0 12px 0' }}>Kafka Events</h3>
          <ul style={{ color: colors.muted, margin: 0, paddingLeft: '20px', fontSize: '13px' }}>
            <li>Context change events streamed</li>
            <li>Full audit trail</li>
            <li>Real-time notifications</li>
          </ul>
        </Card>
      </div>
    </div>
  );

  // Industry Context Section (NEW)
  const renderIndustry = () => (
    <div style={{ display: 'grid', gap: '24px' }}>
      <h2 style={{ color: colors.white, margin: 0 }}>Industry Context</h2>
      <p style={{ color: colors.muted, margin: 0 }}>
        How Safari's Context Governance relates to emerging industry patterns
      </p>

      {/* Gartner Context Engineering */}
      <Card highlight>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
          <div style={{ fontSize: '32px' }}>📊</div>
          <div>
            <h3 style={{ color: colors.safariRed, margin: 0 }}>Context Engineering (Gartner, 2025)</h3>
            <p style={{ color: colors.muted, margin: 0, fontSize: '13px' }}>
              "The discipline of designing and managing context as a first-class system component"
            </p>
          </div>
        </div>
        <p style={{ color: colors.white, margin: 0, fontSize: '14px' }}>
          Gartner's emerging term for the evolution beyond "Prompt Engineering" — recognizing that
          managing AI context is a systems architecture challenge, not just prompt optimization.
        </p>
      </Card>

      {/* Comparison Grid */}
      <h3 style={{ color: colors.white, margin: 0 }}>Industry Approaches Comparison</h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
        {[
          {
            name: 'MemGPT',
            desc: 'Hierarchical Memory',
            details: 'Long-term vs working memory tiers for LLMs',
            alignment: '4-Layer Hierarchy',
            color: colors.blue
          },
          {
            name: 'RAG',
            desc: 'Retrieval-Augmented Generation',
            details: 'External knowledge retrieval at runtime',
            alignment: 'Safari MCP Resources',
            color: colors.green
          },
          {
            name: 'Four Strategies',
            desc: 'Write, Select, Compress, Isolate',
            details: 'Core context management operations (Willison)',
            alignment: 'SCL Operations',
            color: colors.orange
          },
          {
            name: 'Context Windows',
            desc: 'Token Budget Management',
            details: 'Optimizing context to fit model limits',
            alignment: 'OPTIMIZE Operation',
            color: colors.purple
          }
        ].map(approach => (
          <Card key={approach.name}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
              <h4 style={{ color: approach.color, margin: 0 }}>{approach.name}</h4>
              <Badge color={approach.color}>{approach.alignment}</Badge>
            </div>
            <p style={{ color: colors.white, margin: '0 0 4px 0', fontSize: '13px' }}>{approach.desc}</p>
            <p style={{ color: colors.muted, margin: 0, fontSize: '12px' }}>{approach.details}</p>
          </Card>
        ))}
      </div>

      {/* Safari Differentiation */}
      <Card style={{ borderColor: colors.safariRed, borderWidth: '2px' }}>
        <h3 style={{ color: colors.safariRed, margin: '0 0 12px 0' }}>Safari's Differentiation</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
          <div>
            <h4 style={{ color: colors.white, margin: '0 0 8px 0', fontSize: '14px' }}>Others Focus On:</h4>
            <ul style={{ color: colors.muted, margin: 0, paddingLeft: '20px', fontSize: '13px' }}>
              <li>Retrieval OR memory management</li>
              <li>Technical optimization</li>
              <li>Single-session scope</li>
              <li>Manual context curation</li>
            </ul>
          </div>
          <div>
            <h4 style={{ color: colors.white, margin: '0 0 8px 0', fontSize: '14px' }}>Safari Adds:</h4>
            <ul style={{ color: colors.white, margin: 0, paddingLeft: '20px', fontSize: '13px' }}>
              <li style={{ color: colors.green }}>✓ Data governance principles</li>
              <li style={{ color: colors.green }}>✓ Ownership & lineage tracking</li>
              <li style={{ color: colors.green }}>✓ Cross-session persistence</li>
              <li style={{ color: colors.green }}>✓ Self-evolving institutional memory</li>
            </ul>
          </div>
        </div>
      </Card>

      {/* Four Core Strategies Mapping */}
      <Card>
        <h3 style={{ color: colors.white, margin: '0 0 16px 0' }}>Four Core Strategies → SCL Operations</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px' }}>
          {[
            { strategy: 'Write', scl: 'CAPTURE', desc: 'Store new context', color: colors.blue },
            { strategy: 'Select', scl: 'SELECT', desc: 'Query relevant context', color: colors.orange },
            { strategy: 'Compress', scl: 'OPTIMIZE', desc: 'Fit token budget', color: colors.pink },
            { strategy: 'Isolate', scl: 'ALLOCATE', desc: 'Route to storage', color: colors.yellow }
          ].map(s => (
            <div key={s.strategy} style={{ textAlign: 'center' }}>
              <div style={{
                background: colors.darkBg,
                border: `2px solid ${s.color}`,
                borderRadius: '8px',
                padding: '16px 8px'
              }}>
                <div style={{ color: colors.muted, fontSize: '11px', marginBottom: '4px' }}>Strategy</div>
                <div style={{ color: colors.white, fontSize: '16px', fontWeight: 'bold' }}>{s.strategy}</div>
                <div style={{ color: s.color, fontSize: '10px', margin: '8px 0' }}>↓</div>
                <div style={{ color: colors.muted, fontSize: '11px', marginBottom: '4px' }}>SCL</div>
                <div style={{ color: s.color, fontSize: '14px', fontWeight: 'bold' }}>{s.scl}</div>
              </div>
              <div style={{ color: colors.muted, fontSize: '10px', marginTop: '8px' }}>{s.desc}</div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );

  // Documents Section
  const renderDocs = () => (
    <div style={{ display: 'grid', gap: '24px' }}>
      <h2 style={{ color: colors.white, margin: 0 }}>Documentation</h2>
      <p style={{ color: colors.muted, margin: 0 }}>
        All Context Governance documentation in one place
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
        {documents.map(doc => (
          <Card key={doc.id} onClick={() => setExpandedDoc(doc)}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
              <h4 style={{ color: colors.white, margin: 0, fontSize: '14px' }}>{doc.title}</h4>
              <Badge color={
                doc.type === 'Strategy' ? colors.safariRed :
                doc.type === 'Whitepaper' ? colors.purple :
                doc.type === 'Diagram' ? colors.blue :
                colors.green
              }>{doc.type}</Badge>
            </div>
            <p style={{ color: colors.muted, margin: '0 0 8px 0', fontSize: '12px' }}>{doc.description}</p>
            <code style={{ color: colors.slate, fontSize: '10px' }}>{doc.path}</code>
          </Card>
        ))}
      </div>

      {/* Document Modal */}
      {expandedDoc && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0,0,0,0.8)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }} onClick={() => setExpandedDoc(null)}>
          <div style={{
            background: colors.darkBgAlt,
            border: `2px solid ${colors.safariRed}`,
            borderRadius: '16px',
            padding: '24px',
            maxWidth: '600px',
            width: '90%'
          }} onClick={e => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h3 style={{ color: colors.white, margin: 0 }}>{expandedDoc.title}</h3>
              <button
                onClick={() => setExpandedDoc(null)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: colors.muted,
                  cursor: 'pointer',
                  fontSize: '24px'
                }}
              >×</button>
            </div>
            <div style={{ marginBottom: '16px' }}>
              <Badge color={colors.blue}>{expandedDoc.type}</Badge>
              <Badge color={colors.green}>{expandedDoc.status}</Badge>
            </div>
            <p style={{ color: colors.white, marginBottom: '16px' }}>{expandedDoc.description}</p>
            <div style={{
              background: colors.darkBg,
              padding: '12px',
              borderRadius: '8px'
            }}>
              <code style={{ color: colors.muted, fontSize: '12px' }}>
                organizational-docs/{expandedDoc.path}
              </code>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  // Roadmap Section
  const renderRoadmap = () => (
    <div style={{ display: 'grid', gap: '24px' }}>
      <h2 style={{ color: colors.white, margin: 0 }}>Implementation Roadmap</h2>

      <div style={{ display: 'grid', gap: '16px' }}>
        {[
          {
            phase: 'Phase 1: Foundation',
            status: 'Complete',
            color: colors.green,
            items: [
              { task: 'Context management commands', done: true },
              { task: 'Context registry schema', done: true },
              { task: 'Architecture diagrams (SVG, JSX)', done: true },
              { task: 'IT strategy document', done: true },
              { task: 'Safari MCP specification', done: true },
              { task: 'Stakeholder whitepaper', done: true }
            ]
          },
          {
            phase: 'Phase 2: Safari MCP Implementation',
            status: 'In Progress',
            color: colors.blue,
            items: [
              { task: 'Safari MCP server scaffolding', done: false },
              { task: 'Resource handlers for context assets', done: false },
              { task: 'Core SCL tools (SELECT, RESOLVE, OPTIMIZE)', done: false },
              { task: 'Session tools (checkpoint, load)', done: false },
              { task: 'Quality metrics dashboard', done: false }
            ]
          },
          {
            phase: 'Phase 3: Integration',
            status: 'Planned',
            color: colors.orange,
            items: [
              { task: 'DevOps sync for context assets', done: false },
              { task: 'OpenMetadata integration', done: false },
              { task: 'Governance tools (CAPTURE, PROMOTE)', done: false },
              { task: 'Automated conflict resolution', done: false }
            ]
          },
          {
            phase: 'Phase 4: Optimization',
            status: 'Future',
            color: colors.purple,
            items: [
              { task: 'AI-assisted context curation', done: false },
              { task: 'Cross-project context sharing', done: false },
              { task: 'Context recommendations engine', done: false },
              { task: 'ROI measurement and reporting', done: false }
            ]
          }
        ].map(phase => (
          <Card key={phase.phase}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h3 style={{ color: phase.color, margin: 0 }}>{phase.phase}</h3>
              <Badge color={phase.color}>{phase.status}</Badge>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px' }}>
              {phase.items.map(item => (
                <div key={item.task} style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '8px',
                  background: colors.darkBg,
                  borderRadius: '4px'
                }}>
                  <span style={{ color: item.done ? colors.green : colors.slate }}>
                    {item.done ? '✓' : '○'}
                  </span>
                  <span style={{ color: item.done ? colors.white : colors.muted, fontSize: '12px' }}>
                    {item.task}
                  </span>
                </div>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );

  return (
    <div style={{
      minHeight: '100vh',
      background: `linear-gradient(135deg, ${colors.darkBg} 0%, ${colors.darkBgAlt} 50%, ${colors.darkBg} 100%)`,
      fontFamily: "'IBM Plex Sans', -apple-system, BlinkMacSystemFont, sans-serif",
      color: colors.white,
      padding: '24px'
    }}>
      {/* Header */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '24px',
        maxWidth: '1200px',
        margin: '0 auto 24px auto'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            background: colors.safariRed,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 'bold',
            fontSize: '20px'
          }}>S</div>
          <div>
            <div style={{ color: colors.white, fontWeight: 'bold' }}>Context Governance Hub</div>
            <div style={{ color: colors.muted, fontSize: '12px' }}>Safari Circuits Documentation Center</div>
          </div>
        </div>
        <div style={{ color: colors.muted, fontSize: '12px' }}>v1.0 | January 2026</div>
      </div>

      {/* Navigation */}
      <div style={{
        display: 'flex',
        gap: '8px',
        marginBottom: '24px',
        flexWrap: 'wrap',
        justifyContent: 'center',
        maxWidth: '1200px',
        margin: '0 auto 24px auto'
      }}>
        {sections.map(section => (
          <button
            key={section.id}
            onClick={() => setActiveSection(section.id)}
            style={{
              padding: '10px 20px',
              background: activeSection === section.id ? colors.safariRed : colors.darkBgAlt,
              border: `1px solid ${activeSection === section.id ? colors.safariRed : colors.slate}`,
              borderRadius: '8px',
              color: colors.white,
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: activeSection === section.id ? 'bold' : 'normal',
              transition: 'all 0.2s ease',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <span>{section.icon}</span>
            <span>{section.label}</span>
          </button>
        ))}
      </div>

      {/* Content */}
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        {activeSection === 'home' && renderHome()}
        {activeSection === 'architecture' && renderArchitecture()}
        {activeSection === 'safari-mcp' && renderSafariMCP()}
        {activeSection === 'integration' && renderIntegration()}
        {activeSection === 'industry' && renderIndustry()}
        {activeSection === 'docs' && renderDocs()}
        {activeSection === 'roadmap' && renderRoadmap()}
      </div>

      {/* Footer */}
      <div style={{
        textAlign: 'center',
        marginTop: '48px',
        padding: '24px 0',
        borderTop: `1px solid ${colors.slate}`,
        maxWidth: '1200px',
        margin: '48px auto 0 auto'
      }}>
        <div style={{ color: colors.muted, fontSize: '12px' }}>
          Safari Circuits, LLC — Context Governance Documentation Hub
        </div>
        <div style={{ color: colors.slate, fontSize: '11px', marginTop: '4px' }}>
          Because what your AI knows matters.
        </div>
      </div>
    </div>
  );
};

export default ContextGovernanceHub;

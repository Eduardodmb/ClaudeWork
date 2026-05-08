---
title: Information Theory Principles for Context Management
domain: context-engineering
created: 2026-01-24
source: BPE tokenization research
status: validated
tags: [information-theory, compression, context-routing, MDL, entropy]
---

# Information Theory Principles for Context Management

## Core Insight

**Compression ≡ Prediction ≡ Understanding**

This equivalence (Shannon → Hutter → modern LLMs) has direct implications for context management: the best context is that which maximally compresses the problem space for the model.

---

## Applicable Principles

### 1. Minimum Description Length (MDL) for Context Selection

**Principle**: Best context minimizes L(Context) + L(Task|Context)

| Component | Meaning | Implication |
|-----------|---------|-------------|
| L(Context) | Token cost of included context | Favor concise assets |
| L(Task\|Context) | Difficulty of task given context | Favor relevant assets |

**Application**: Context routing should optimize total description length, not just relevance. A highly relevant but verbose asset may cost more than it saves.

**Metric**: `efficiency = relevance_gain / token_cost`

### 2. Entropy-Based Relevance Scoring

**Principle**: Good context reduces uncertainty (entropy) about the task.

```
Relevance(asset, task) ∝ H(task) - H(task | asset)
                       = Mutual Information I(asset; task)
```

**Application**: Score context assets by how much they reduce task ambiguity, not just keyword overlap. An asset that resolves a key decision point has high mutual information even if lexically dissimilar.

### 3. The 40% Budget as Information Bottleneck

**Principle**: Beyond ~40% context utilization, LLM performance degrades (the "dumb zone").

**Information-theoretic view**: The model has finite channel capacity. Overloading context introduces noise that drowns signal. The bottleneck forces prioritization.

**Application**: Context routing must be *selective*, not comprehensive. Optimize for:
```
max I(Context; Task) subject to |Context| < 0.4 * window
```

### 4. Hierarchical Compression (BPE Analogy)

**Principle**: BPE merges frequent patterns into single tokens. Context can be similarly compressed.

| Level | BPE Analog | Context Analog |
|-------|------------|----------------|
| Raw | Characters | All available docs |
| Merged | Subwords | Domain summaries |
| High-level | Common tokens | Policy/governance docs |

**Application**: Context should be pre-compressed into hierarchical assets:
- **L1**: Full source documents (rarely loaded)
- **L2**: Summaries with key decisions/patterns
- **L3**: One-liner index entries for routing

Route at L3, load at L2, drill to L1 only when needed.

### 5. Zipf Distribution of Context Value

**Principle**: Context asset value follows power law—few assets provide most value.

**Implication**:
- Top 20% of assets likely cover 80% of needs
- Long tail of rarely-used assets still needed for coverage
- Caching/prioritization should reflect this distribution

**Application**: Track asset access frequency. Frequently accessed assets get:
- Higher cache priority
- Faster routing paths
- Consideration for promotion to always-on context

### 6. Freshness as Entropy Decay

**Principle**: Stale context has higher entropy (more uncertainty about accuracy).

**Model**:
```
effective_relevance = base_relevance * decay(age)
```

Where decay reflects domain volatility:
- Governance docs: slow decay (months)
- Project state: medium decay (days)
- Active work: fast decay (hours)

### 7. Context Conflicts as Entropy Increase

**Principle**: Contradictory context increases entropy rather than reducing it.

**Application**: Context routing must detect and resolve conflicts *before* loading. Loading conflicting assets is worse than loading neither—it consumes tokens while adding uncertainty.

**Resolution strategies**:
- Recency: prefer newer
- Specificity: prefer more specific to task
- Authority: prefer higher governance level
- Explicit: flag for human resolution

---

## Design Implications for Context Router

### Routing Algorithm Sketch

```
1. PARSE task → extract intent, domain, entities
2. QUERY index for candidate assets (L3 summaries)
3. SCORE candidates by:
   - Mutual information with task
   - Token efficiency (relevance / cost)
   - Freshness penalty
   - Conflict detection
4. SELECT top assets within budget constraint
5. RESOLVE any conflicts among selected
6. LOAD selected assets (L2, drill to L1 if needed)
7. COMPACT if total exceeds budget
```

### Key Metrics

| Metric | Formula | Target |
|--------|---------|--------|
| Coverage | I(loaded; task) / H(task) | > 0.8 |
| Efficiency | relevance / tokens | Maximize |
| Utilization | tokens_used / budget | 0.3-0.4 |
| Conflict rate | conflicts / loads | < 0.05 |

### Anti-Patterns

- **Kitchen sink**: Loading everything "just in case" (violates MDL)
- **Keyword matching**: High recall, low precision (misses semantic relevance)
- **Static priority**: Ignores task-specific mutual information
- **No compaction**: Raw assets without hierarchical compression

---

## Connection to Safari Context Architecture

| Safari Layer | Information-Theoretic Role |
|--------------|---------------------------|
| CPI (Packaging) | Compression into versioned, bounded assets |
| SCL (Operations) | Routing via mutual information optimization |
| Governance | Conflict resolution, authority hierarchy |

The SCL `OPTIMIZE` operation is precisely MDL: fit context to token budget while maximizing task-relevant information.

---

## Open Questions for Planning

1. How to estimate mutual information without loading full assets?
2. What's the right decay function for different asset types?
3. How to detect conflicts at routing time (before loading)?
4. Should routing be deterministic or probabilistic (explore/exploit)?

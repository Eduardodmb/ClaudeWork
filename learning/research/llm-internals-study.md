# LLM Internals Deep Dive - Research Study

> **Status:** Active research topic
> **Started:** 2026-01-24
> **Last session:** 2026-01-24
> **Invoke with:** "Let's continue my LLM internals study" or "Resume attention mechanism exploration"

---

## Learning Context

**Background:** Philosophy, psychology, 7 years data engineering
**Learning style:** Analogies, process diagrams, embraces complexity
**Connections sought:** Information theory, cognitive science, philosophy of mind

---

## Curriculum Overview

```
[x] Philosophical framing - completed
[x] Vector spaces foundation - completed
[~] Attention mechanism - IN PROGRESS (question posed)
[ ] Multi-head attention
[ ] Feed-forward networks as memories
[ ] Residual streams
[ ] Layer normalization
[ ] Tokenization deep dive
[ ] Positional encoding schemes
[ ] In-context learning
[ ] Interpretability approaches
[ ] Training dynamics
[ ] Philosophical synthesis
```

---

## Current Position: The Attention Design Question

### Technical Scaffolding Built

1. **Vectors as points in space** - each dimension is a feature
2. **Word embeddings** - meaning encoded as location in high-dimensional space
3. **Dot product** - measures directional similarity between vectors
4. **Cosine similarity** - normalized dot product, -1 to 1
5. **Q/K/V decomposition:**
   - Query (Q): "What am I looking for?"
   - Key (K): "What do I advertise to others?"
   - Value (V): "What information do I provide if selected?"

### The Database Analogy (Key Insight)

Attention is like a **soft/fuzzy join**:

```
HARD LOOKUP (hash table)          SOFT LOOKUP (attention)
─────────────────────────────────────────────────────────
Query matches one key exactly     Query matches all keys partially
Returns one value                 Returns weighted blend of all values
Discrete, not differentiable      Continuous, differentiable
```

### THE QUESTION TO PONDER

Given:
- Each token has a Query vector (what it's looking for)
- Each token has a Key vector (what it advertises)
- Each token has a Value vector (what it contributes if selected)
- The dot product measures similarity between vectors

**Design a mechanism where:**
1. A token's Query gets compared against all other tokens' Keys
2. The comparisons produce similarity scores
3. The scores determine how much of each token's Value to retrieve
4. The result is a weighted blend of all Values

**Sub-questions:**
- What's the sequence of operations?
- What might you need to do to make the similarity scores behave like "weights" that sum to 1 (like a probability distribution)?

### Hint When Ready

The operation that converts arbitrary scores into a probability distribution (positive values summing to 1) is called **softmax**. When you're ready to continue, try to work out why this specific transformation is useful.

---

## Philosophical Threads Opened

### Attention: Homonym, Analog, or Simulation?

Three positions on "attention" (biological) vs "attention" (computational):

1. **Homonym:** Accidental shared name, no meaningful relationship
2. **Functional analog:** Convergent solutions to similar information-routing problems (like bird wings vs. airplane wings)
3. **Weak simulation:** Approximates measurable aspects of human attention

Current lean: Position 2 (functional analog)

### The Penrose Question

Does the usefulness of attention for cognition-like tasks require it to be cognitive?

**Thermostat analogy:** A thermostat regulates temperature without "understanding" temperature. Does attention route information without "attending"?

### DNA/Weights Parallel

```
BIOLOGICAL                          COMPUTATIONAL
────────────────────────────────────────────────────────────
DNA encodes compressed              Weights encode compressed
survival heuristics                 prediction heuristics

Selection pressure over             Gradient descent over
generations                         training steps

Fitness = reproductive success      Loss = prediction error
```

Both are optimization processes accumulating "wisdom" in weighted structures. Timescales differ by ~10 orders of magnitude.

---

## Topic Dependency Map

```
                    ┌─────────────────────────────────────────┐
                    │         PHILOSOPHICAL DIMENSIONS        │
                    │  (can enter from any level, recursively)│
                    └─────────────────────────────────────────┘
                                        ▲
           ┌────────────────────────────┼────────────────────────────┐
           │                            │                            │
    ┌──────┴──────┐            ┌────────┴────────┐          ┌────────┴────────┐
    │  EMERGENT   │◄───────────│ INTERPRETABILITY│──────────►│    TRAINING     │
    │  BEHAVIORS  │            │                 │           │    DYNAMICS     │
    └──────┬──────┘            └────────┬────────┘           └────────┬────────┘
           │                            │                             │
           └────────────────────────────┼─────────────────────────────┘
                                        ▼
                         ┌──────────────────────────┐
                         │   TRANSFORMER INTERNALS  │  ← YOU ARE HERE
                         │  (the computational core)│
                         └────────────┬─────────────┘
                                      ▼
                         ┌──────────────────────────┐
                         │       FOUNDATIONAL       │
                         │ (input representation)   │
                         └──────────────────────────┘
```

---

## Full Topic Curriculum (Original Request)

### Foundational
- [ ] Tokenization algorithms (BPE, SentencePiece, WordPiece) and tradeoffs
- [x] Embedding spaces and geometric properties
- [ ] Positional encoding schemes (learned, sinusoidal, RoPE, ALiBi)

### Transformer Internals
- [~] Attention mechanism mathematics and intuition ← CURRENT
- [ ] Multi-head attention and what different heads learn
- [ ] Feed-forward networks as key-value memories
- [ ] Residual streams and the "residual stream" interpretation
- [ ] Layer normalization and why it matters

### Emergent Behaviors
- [ ] In-context learning and why it works
- [ ] Chain-of-thought reasoning
- [ ] Grokking and phase transitions in training
- [ ] Scaling laws and emergent capabilities

### Interpretability
- [ ] Mechanistic interpretability approaches
- [ ] Circuit analysis and feature detection
- [ ] Superposition and polysemanticity
- [ ] Probing classifiers and what they reveal

### Training Dynamics
- [ ] Pretraining objectives and their implications
- [ ] RLHF/Constitutional AI and alignment techniques
- [ ] Loss landscapes and optimization
- [ ] Memorization vs. generalization

### Philosophical Dimensions
- [ ] Representation vs. simulation of understanding
- [ ] The symbol grounding problem in LLMs
- [ ] Compression as intelligence hypothesis
- [ ] Implications for theories of mind and consciousness

---

## Session Log

### Session 1 (2026-01-24)
- Established philosophical framing (biological vs computational attention)
- Built vector space intuition
- Introduced Q/K/V decomposition
- Posed attention design question
- Paused for reflection

---

## Resources for Self-Study (Optional)

- [3Blue1Brown: Neural Networks](https://www.youtube.com/playlist?list=PLZHQObOWTQDNU6R1_67000Dx_ZCJB-3pi) - Visual intuition for vectors, matrices
- [Jay Alammar: The Illustrated Transformer](https://jalammar.github.io/illustrated-transformer/) - Visual attention walkthrough
- [Anthropic's Transformer Circuits Thread](https://transformer-circuits.pub/) - Mechanistic interpretability
- Neel Nanda's YouTube channel - Interpretability deep dives

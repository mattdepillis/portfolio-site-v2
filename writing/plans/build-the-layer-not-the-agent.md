# Essay Plan: Build the Layer, Not Just the Agent

## Working premise

While building Training Memory, Matt has to decide where the product's durable value should live: inside a proprietary AI coach, or in the memory, context, and capabilities that many agents could consume.

The essay will argue that companies often build an agent too quickly when their more durable product may be an agent-ready capability layer exposed through APIs and MCP.

This is not an argument that companies should never ship agents. A first-party agent can provide an opinionated experience, distribution, onboarding, and quality control. The architectural claim is that the agent should often be one consumer of the product rather than the only place where the product exists.

## Potential central thesis

> Do not build the agent when the context and capability layer every agent needs is the more durable product.

Alternative formulation:

> Many companies are putting their product inside an agent when their durable product is actually the context, capabilities, and interfaces that any agent should be able to consume.

## Main arguments

### 1. Owning the agent means owning the inference tax

Shipping a first-party agent can make the product company responsible for model inference, context consumption, orchestration, retries, latency, evaluations, safety behavior, and provider management.

An agent-ready capability layer can let the consuming system choose the model and bear more of the inference cost. Cheap models may handle simple operations while expensive reasoning is reserved for harder work.

Important nuance: externalizing the agent does not eliminate compute cost. The stronger question is whether every product company should independently own inference and orchestration when those layers are becoming shared infrastructure.

### 2. Bundling the product into one agent creates unnecessary lock-in

When a product exists only through its own agent, customers inherit the company's choices about model, interface, orchestration, governance, context limits, and update schedule.

APIs and MCP can let the same capability work through ChatGPT, Claude, an enterprise agent, a specialized vertical agent, or a deterministic workflow.

Important nuance: customers do not always care about model choice by name. The stronger benefit is freedom to consume a capability inside systems they already trust and the ability to change those systems later.

### 3. The capability layer may be more durable than the agent layer

Models, agent shells, and interaction patterns are changing quickly. Domain context, structured memory, permissions, actions, and reliable interfaces may change more slowly and provide a more durable source of differentiation.

The product should continue to matter when the preferred model or agent interface changes.

### 4. An open capability surface can become distribution

An agent-specific product asks users to adopt another destination. An agent-ready product can appear inside environments where users already work.

This can turn integrations from secondary features into a primary distribution strategy. The essay should investigate the counter-risk that exposing capabilities may also make the product easier to commoditize.

## Counterarguments to address

- Customers often want complete outcomes, not infrastructure or model choice.
- A first-party agent gives the company tighter control over UX, reliability, evaluation, and brand.
- Owning orchestration may be essential when workflow logic is the real differentiation.
- External agents may invoke tools poorly or inconsistently.
- MCP and similar protocols are still evolving and may not yet provide sufficient discovery, authentication, billing, or reliability guarantees.
- A capability-only product risks becoming an interchangeable backend unless its data, context, workflow, or network effects are genuinely differentiated.

The essay should concede that some companies should own both layers. Its argument is about identifying the durable layer first and preserving architectural separation.

## Proposed structure

1. **The decision inside Training Memory**
   - AI coach versus memory and capability layer
   - Why this is a product decision, not merely an implementation choice

2. **The layers companies keep collapsing**
   - domain data and memory
   - capabilities and actions
   - reasoning model
   - agent orchestration
   - user interface

3. **The inference tax**
   - cost and operational responsibility assumed by the agent owner
   - the case for letting consuming systems choose the appropriate intelligence

4. **The flexibility tax**
   - lock-in to model, interface, governance, and workflow
   - why portability matters even when users do not care about model brands

5. **The durability argument**
   - fast-changing agent shells versus longer-lived context and capabilities
   - where a defensible product may actually live

6. **The case against this thesis**
   - coherent UX, distribution, quality control, and outcome ownership
   - circumstances where the agent really is the product

7. **The architecture Training Memory is choosing**
   - the first-party coach can exist as a reference consumer
   - memory, context, and actions remain available to other agents

8. **A decision framework for builders**
   - questions companies should answer before committing to an agent-first product

## Potential decision-framework questions

- Is inference itself part of our differentiation?
- Is orchestration itself part of our differentiation?
- Does our durable advantage live in proprietary context, data, actions, or workflow?
- Do customers already operate inside agent environments we could serve?
- Does controlling the complete interface materially improve the outcome?
- Can the product remain valuable when models and agent shells change?
- Does exposing capabilities increase distribution or accelerate commoditization?
- Should a first-party agent be the product, a reference client, or both?

## Suggested visuals

- A layered diagram separating domain context, capability surface, reasoning model, agent orchestration, and interface
- A comparison of agent-first and capability-first cost/responsibility boundaries
- A decision tree for choosing agent-first, capability-first, or both

## Research needed before drafting

- credible evidence about inference and orchestration costs
- examples of companies exposing durable capabilities to multiple agent surfaces
- examples where owning the full agent clearly improves the product
- current MCP limitations around authentication, discovery, reliability, and monetization
- arguments that APIs/MCP commoditize the underlying provider
- precise description of Training Memory's intended architecture without overstating what has already been built

## Tone and boundaries

- Write as a builder explaining a product decision, not as an authority declaring a universal law.
- Prefer architectural and economic reasoning over protocol advocacy.
- Treat MCP as one important mechanism, not the entire thesis.
- Avoid claiming that external compute is free or that every customer actively wants to choose a model.
- Make the strongest opposing case before returning to the Training Memory decision.

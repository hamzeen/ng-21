# Angular 21 AI-Assisted Development Prompt Reference

Use this as a repeatable prompt playbook for building Angular 21 features with an AI-assisted workflow. The goal is to avoid jumping straight into code: first clarify the spec, then plan, then test, then implement, then review, then ship.

---

## Core Workflow

```txt
/spec → /plan → /tdd → implement → /review → /ship
```

Use this workflow when building a new component, page, service, route, store, or feature module.

---

# Reusable Prompt Blocks

## Feature clarification prompt

Use this when the feature request is vague.

```md
Before writing code, ask up to 5 clarification questions.
Focus only on decisions that affect architecture, UX, validation, data flow, or testing.
```

---

## Architecture-first prompt

```md
Act as a senior Angular architect.
Propose the architecture first.
Do not write code yet.
Include folder structure, component boundaries, state ownership, service boundaries, and testing strategy.
```

---

## Angular 21 implementation constraints

```md
Use Angular 21 conventions:

- standalone components
- signals for local state
- `input()` and `output()` instead of decorators where appropriate
- `inject()` instead of constructor injection
- `ChangeDetectionStrategy.OnPush`
- modern template control flow: `@if`, `@for`, `@switch`
- route-level lazy loading for feature areas
```

---

## Testing constraints

```md
Use Vitest.
Prefer tests that verify user-visible behavior.
Avoid testing implementation details unless there is a strong reason.
Include tests for loading, error, empty, and success states where relevant.
```

---

## Review prompt

```md
/review Review this change across five dimensions:

1. Correctness
2. Readability
3. Architecture
4. Accessibility
5. Test coverage

Group findings by severity:

- Blocking
- Important
- Nice to have
```

---

## Ship prompt

```md
/ship Run final readiness review.
Check:

- build status
- typecheck status
- test status
- accessibility risks
- security risks
- performance risks
- documentation gaps

Return:

- Go / no-go
- blocking issues
- recommended fixes
- suggested commit message
```

---

# Command Mapping Reference

| Command   | Purpose                                                                    |
| --------- | -------------------------------------------------------------------------- |
| `/spec`   | Convert an idea into a clear feature specification                         |
| `/plan`   | Create an implementation plan before coding                                |
| `/tdd`    | Generate failing tests before implementation                               |
| `/build`  | Implement the approved plan                                                |
| `/test`   | Run or improve test coverage                                               |
| `/review` | Review the implementation across quality dimensions                        |
| `/audit`  | Run deeper architecture, security, performance, and maintainability checks |
| `/a11y`   | Review accessibility specifically                                          |
| `/serve`  | Start or verify the local development server                               |
| `/ship`   | Run final merge/release readiness checks                                   |

---

# Recommended Feature Prompt Template

Copy and adapt this for any new feature.

```md
/spec Build [feature name].

User goal:
[What should the user be able to do?]

Core behavior:

- [Behavior 1]
- [Behavior 2]
- [Behavior 3]

Technical constraints:

- Angular 21
- standalone components
- signals for local UI state
- Vitest tests
- route-level lazy loading if this is a feature area

Quality expectations:

- accessible HTML
- empty state
- error state if data fetching is involved
- clear test coverage
```

---

# Recommended Review Prompt Template

```md
/review Review the current implementation against the approved spec.

Act as:

- Angular Specialist
- QA Engineer
- Senior Frontend Architect
- Code Reviewer

Check:

- Does the implementation satisfy the acceptance criteria?
- Are edge cases covered?
- Are tests meaningful?
- Is the state model simple?
- Are components properly separated?
- Is the UI accessible?
- Is anything over-engineered?

Return prioritized findings and concrete fixes.
```

---

# Recommended Final Ship Prompt Template

```md
/ship Prepare this feature for merge.

Run or verify:

- npm run typecheck
- npm run test
- npm run build

Then summarize:

- final status: go / no-go
- checks completed
- blocking issues
- remaining risks
- suggested commit message
```

---

# Notes for Better AI-Assisted Development

- Do not start with implementation.
- Always force the AI to produce a spec or plan first.
- Ask for failing tests before production code for important behavior.
- Keep prompts small and sequential.
- Prefer user-visible behavior tests over internal implementation tests.
- Ask the AI to explain tradeoffs before adding abstractions.
- Use `/review` before `/ship`.
- Treat `/ship` as a final readiness gate, not a coding command.

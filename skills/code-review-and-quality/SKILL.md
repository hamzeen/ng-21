---
name: code-review-and-quality
description: Conduct multi-axis code review before merging any change. Use when reviewing code written by yourself, another agent, or a human. Evaluate correctness, readability, architecture, security, and performance.
---

# Code Review & Quality

## Overview

Every change gets reviewed before merge. Review covers five axes: correctness, readability, architecture, security, and performance. Approve when change definitely improves code health.

## When to Use

- Before merging any PR or change
- After completing a feature implementation
- When another agent or model produced code
- When refactoring existing code
- After any bug fix

## The Five-Axis Review

### 1. Correctness

Does the code do what it claims?

- Does it match spec/task requirements?
- Are edge cases handled (null, empty, boundary values)?
- Are error paths handled (not just happy path)?
- Does it pass all tests? Are tests actually testing right things?
- Are there off-by-one errors, race conditions, state inconsistencies?

### 2. Readability & Simplicity

Can another engineer understand this without help?

- Are names descriptive and consistent? (No `temp`, `data`, `result`)
- Is control flow straightforward? (Avoid nested ternaries, deep callbacks)
- Is code organized logically? (Related code grouped, clear boundaries)
- Are there "clever" tricks that should be simplified?
- Could this be done in fewer lines? (1000 lines where 100 suffice is failure)
- Are abstractions earning their complexity? (Don't generalize until 3rd use case)
- Would comments help clarify non-obvious intent?
- Any dead code artifacts: `_unused` variables, backwards-compat shims?

### 3. Architecture

Does the change fit the system's design?

- Does it follow existing patterns or introduce new justified one?
- Does it maintain clean module boundaries?
- Is there code duplication that should be shared?
- Are dependencies flowing in right direction (no circular dependencies)?
- Is abstraction level appropriate?

### 4. Security

Does the change introduce vulnerabilities?

- Is user input validated and sanitized?
- Are secrets kept out of code, logs, version control?
- Is authentication/authorization checked where needed?
- Are SQL queries parameterized (no string concatenation)?
- Are outputs encoded to prevent XSS?
- Are dependencies from trusted sources with no known vulnerabilities?
- Is data from external sources treated as untrusted?

### 5. Performance

Does the change introduce performance problems?

- Any N+1 query patterns?
- Any unbounded loops or unconstrained data fetching?
- Any synchronous operations that should be async?
- Any unnecessary re-renders in UI components?
- Any missing pagination on list endpoints?
- Any large objects created in hot paths?

## Change Sizing

Small, focused changes are easier to review and safer to deploy:

```
~100 lines   → Good. Reviewable in one sitting.
~300 lines   → Acceptable if single logical change.
~1000 lines  → Too large. Split it.
```

**Splitting strategies**:

- **Stack**: Submit small change, base next on it (sequential dependencies)
- **By file**: Separate changes for different reviewer needs (cross-cutting)
- **Horizontal**: Create shared code first, then consumers (layered)
- **Vertical**: Break into full-stack slices (feature work)

**When large is acceptable**: Complete file deletions, automated refactoring.

**Separate refactoring from features**. A change that refactors AND adds behavior is two changes.

## The Review Process

### Step 1: Understand the Context

Before looking at code:

- What is this change trying to accomplish?
- What spec or task does it implement?
- What is expected behavior change?

### Step 2: Review the Tests First

Tests reveal intent and coverage:

- Do tests exist for the change?
- Do they test behavior (not implementation details)?
- Are edge cases covered?
- Do tests have descriptive names?
- Would tests catch regression if code changed?

### Step 3: Review the Implementation

Walk through code with five axes in mind:

```
For each file changed:
1. Correctness: Does this code do what test says?
2. Readability: Can I understand this without help?
3. Architecture: Does this fit the system?
4. Security: Any vulnerabilities?
5. Performance: Any bottlenecks?
```

### Step 4: Categorize Findings

Label every comment so author knows what's required:

| Prefix                        | Meaning         | Action                                    |
| ----------------------------- | --------------- | ----------------------------------------- |
| (no prefix)                   | Required change | Must address before merge                 |
| **Critical:**                 | Blocks merge    | Security, data loss, broken functionality |
| **Nit:**                      | Minor, optional | Author may ignore                         |
| **Optional:** / **Consider:** | Suggestion      | Worth considering, not required           |
| **FYI**                       | Informational   | No action needed                          |

### Step 5: Verify the Verification

Check author's verification story:

- What tests were run?
- Did build pass?
- Manual verification done?
- Screenshots for UI changes?
- Before/after comparison?

## The Review Checklist

```markdown
## Review: [PR/Change title]

### Context

- [ ] I understand what this change does and why

### Correctness

- [ ] Matches spec/task requirements
- [ ] Edge cases handled
- [ ] Error paths handled
- [ ] Tests cover the change adequately

### Readability

- [ ] Names are clear and consistent
- [ ] Logic is straightforward
- [ ] No unnecessary complexity

### Architecture

- [ ] Follows existing patterns
- [ ] No unnecessary coupling
- [ ] Appropriate abstraction level

### Security

- [ ] No secrets in code
- [ ] Input validated at boundaries
- [ ] No injection vulnerabilities
- [ ] Auth checks in place
- [ ] External data treated as untrusted

### Performance

- [ ] No N+1 patterns
- [ ] No unbounded operations
- [ ] Pagination on list endpoints

### Verification

- [ ] Tests pass
- [ ] Build succeeds
- [ ] Manual verification done

### Verdict

- [ ] **Approve** — Ready to merge
- [ ] **Request changes** — Issues must be addressed
```

## Review Speed

Slow reviews block entire teams:

- **Respond within one business day** (max)
- **Ideal**: Respond shortly after review request arrives
- **Typical change**: Complete multiple review rounds in single day
- **Large changes**: Ask author to split rather than review massive changeset

## Dead Code Hygiene

After refactoring or implementation, check for orphaned code:

```
DEAD CODE IDENTIFIED:
- formatLegacyDate() in src/utils/date.ts — replaced by formatDate()
- OldTaskCard component in src/components/ — replaced by TaskCard

→ Safe to remove these?
```

Don't leave dead code lying around, but don't silently delete things you're unsure about.

## Honesty in Review

- **Don't rubber-stamp.** "LGTM" without evidence of review helps no one.
- **Don't soften real issues.** Be direct about bugs.
- **Quantify problems when possible.** "This N+1 query will add ~50ms per item"
- **Push back on approaches with clear problems.** Sycophancy is a failure mode.
- **Accept override gracefully.** If author has full context and disagrees, defer.

## Red Flags

- PRs merged without any review
- Review that only checks if tests pass (ignoring other axes)
- "LGTM" without evidence of actual review
- Security-sensitive changes without security-focused review
- Large PRs that are "too big to review properly"
- No regression tests with bug fix PRs
- Review comments without severity labels
- Accepting "I'll fix it later" — it never happens

## Verification

- [ ] All Critical issues resolved
- [ ] All Important issues resolved or explicitly deferred
- [ ] Tests pass
- [ ] Build succeeds
- [ ] Verification story documented

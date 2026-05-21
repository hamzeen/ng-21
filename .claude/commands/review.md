---
description: Conduct multi-axis code review — correctness, readability, architecture, security, performance
---

Invoke the [code-review-and-quality](../../skills/code-review-and-quality/) skill.

## Five-Axis Review

Review staged or recent changes across all five dimensions:

1. **Correctness**
   - Does it match the spec/requirements?
   - Are edge cases handled?
   - Do tests adequately cover the change?
   - Are error paths handled?

2. **Readability**
   - Are names clear and consistent?
   - Is control flow straightforward?
   - Is code well-organized?
   - Could this be simpler?

3. **Architecture**
   - Does it follow existing patterns?
   - Are module boundaries clean?
   - Is abstraction level appropriate?
   - Any unnecessary coupling or dependencies?

4. **Security**
   - Is user input validated and sanitized?
   - Are secrets kept safe?
   - Is authentication/authorization checked?
   - Is external data treated as untrusted?

5. **Performance**
   - Any N+1 query patterns?
   - Any unbounded loops or data fetching?
   - Any unnecessary re-renders?
   - Missing pagination on list endpoints?

## Categorize Findings

- **Critical** — Blocks merge (security, data loss, broken functionality)
- **Important** — Must address before merge
- **Suggestion** — Worth considering but not required
- **Nit** — Optional, formatting/style preferences

## Output

Provide structured review with:

- Specific file:line references
- What the issue is
- How to fix it
- Severity level

## Related Skills

- [code-review-and-quality](../../skills/code-review-and-quality/)
- [angular-accessibility](../../skills/angular-accessibility/)
- [angular-performance](../../skills/angular-performance/)

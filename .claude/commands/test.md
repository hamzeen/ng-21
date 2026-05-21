---
description: Run unit tests with Vitest. Use TDD workflow — write failing tests, implement, verify. For bugs, use Prove-It pattern.
---

Invoke the [test-driven-development](../../skills/test-driven-development/) skill.

## For New Features

1. Write tests that describe expected behavior (they must FAIL)
2. Implement minimum code to make them pass
3. Refactor while keeping tests green
4. Run full test suite to check for regressions

## For Bug Fixes (Prove-It Pattern)

1. Write a test that reproduces the bug (must FAIL)
2. Confirm test fails
3. Implement the fix
4. Confirm test passes
5. Run full test suite for regressions

## Run Command

```bash
npm test
```

## What It Does

- Executes all unit tests in the project
- Watches for file changes and re-runs automatically
- Reports test coverage
- Displays any failures with stack traces

## Related Skills

- [test-driven-development](../../skills/test-driven-development/)
- [angular-testing](../../skills/angular-testing/)

# AI-Native Angular Starter

a production-ready Angular starter built around a complete Claude Code workflow — a full three-layer system: an always-on workspace context that enforces modern Angular conventions, slash commands covering the entire dev lifecycle, and specialist agent personas that bring role-specific depth to every stage of development.
Clone the repo and your team gets the entire AI workflow scaffolding on day one, with no prompting from scratch.

An opinionated Angular starter using standalone APIs, Signals, httpResource, Tailwind CSS, and Vitest. Every choice reflects current Angular best practices — no legacy patterns, no NgModules, no Zone.js.

---

# 🚀 Getting Started

## Install Dependencies

```bash
npm install
```

## Development Server

Start the local development server:

```bash
ng serve
```

Application runs at:

```txt
http://localhost:4200
```

### Available Routes

| Route       | Description               |
| ----------- | ------------------------- |
| `/`         | Home page                 |
| `/list`     | Example list view         |
| `/register` | Registration form example |

---

# 🤖 Claude Code Template

This repository includes a custom Claude Code setup focused on engineering quality, architectural consistency, and repeatable AI-assisted development workflows.

## Core AI-Assisted Workflow

```txt
/spec → /plan → /tdd → /build → /review → /ship
```

Use this workflow when building a new component, page, service, route, store, or feature area.

## Included Commands

| Command   | Purpose                                                                         |
| --------- | ------------------------------------------------------------------------------- |
| `/spec`   | Convert an idea into a clear feature specification before coding                |
| `/plan`   | Create an implementation plan without writing production code                   |
| `/tdd`    | Generate failing Vitest tests before implementation                             |
| `/build`  | Implement the approved plan or verify the production build                      |
| `/test`   | Run or improve tests                                                            |
| `/review` | Review correctness, readability, architecture, accessibility, and test coverage |
| `/audit`  | Run deeper security, performance, and maintainability checks                    |
| `/a11y`   | Review accessibility-specific concerns                                          |
| `/serve`  | Start or verify the local development server                                    |
| `/ship`   | Run final readiness checks before merge                                         |

## Template Highlights

- Enforces engineering-focused reviews
- Encourages architectural consistency
- Promotes performance and security awareness
- Supports test-first development with Vitest
- Helps standardize development workflows
- Designed for Angular-centric frontend projects
- Optimized for AI-assisted development sessions

## How the AI Workflow Fits Together

```txt
User prompt
   ↓
Claude command
   ↓
Specialist agent / role
   ↓
Relevant skill or checklist
   ↓
Angular code, tests, review output, or ship report
```

## Recommended Feature Flow

1. Start with `/spec` to define the feature clearly.
2. Use `/plan` to design the implementation before writing code.
3. Use `/tdd` to create failing tests first.
4. Use `/build` to implement the smallest solution that satisfies the spec and tests.
5. Use `/review` to inspect quality, architecture, and coverage.
6. Use `/ship` as the final readiness gate before merging.

Example:

```md
/spec Build a todo component where a user can add, complete, filter, and delete tasks.
```

```md
/plan Use Angular 21 signals and Vitest. Do not write production code yet.
```

```md
/tdd Write failing tests for initial render, adding a todo, completing a todo, deleting a todo, filtering tasks, and empty state.
```

```md
/build Implement the smallest Angular 21 solution to pass the tests.
```

```md
/review Review as Angular Specialist, QA Engineer, Senior Developer, and Code Reviewer.
```

```md
/ship Run final checks and summarize readiness.
```

## just need the skills?

```sh
npx skills add hamzeen/ng-21/skills/angular-developer
```

---

# 🛠️ Commands

## Angular CLI Commands

| Command                                | Description                         |
| -------------------------------------- | ----------------------------------- |
| `ng serve`                             | Start development server            |
| `ng build`                             | Create production build             |
| `ng test`                              | Run unit tests with Vitest          |
| `ng e2e`                               | Run end-to-end tests, if configured |
| `ng generate component component-name` | Generate a new component            |
| `ng generate --help`                   | List available schematics           |

## Recommended NPM Scripts

| Command             | Description                                             |
| ------------------- | ------------------------------------------------------- |
| `npm start`         | Start the development server                            |
| `npm run build`     | Create a production build                               |
| `npm test`          | Run unit tests                                          |
| `npm run test:run`  | Run tests once in CI-style mode                         |
| `npm run typecheck` | Run TypeScript checks                                   |
| `npm run verify`    | Run typecheck, tests, and build as a final quality gate |

---

# 🧪 Testing

Unit testing is powered by Vitest for fast and modern testing workflows.

Run tests:

```bash
ng test
```

Or, if the project includes a dedicated npm script:

```bash
npm run test:run
```

Recommended testing approach:

- Prefer user-visible behavior tests.
- Cover loading, error, empty, and success states where relevant.
- Avoid testing implementation details unless there is a strong reason.
- Use `/tdd` before implementation for important behavior.

---

# 📦 Building

Create a production build:

```bash
ng build
```

Build artifacts are generated in:

```txt
dist/
```

Production builds include Angular optimization for:

- Performance
- Tree shaking
- Bundle minimization
- Ahead-of-Time compilation

---

# 🐳 Local Infrastructure (Docker + Terraform)

This project uses Terraform to provision a local Docker container to serve the Angular app via Nginx.

### Prerequisites

- [OrbStack](https://orbstack.dev/) or Docker Desktop
- [Terraform](https://developer.hashicorp.com/terraform/install)

### Setup

**1. Build the Docker image**

```bash
docker build -t angular-app .
```

**2. Initialize Terraform**

```bash
cd terraform
terraform init
```

**3. Start the app**

```bash
terraform apply
```

Visit **http://localhost:4200** to see the app running.

### Useful Commands

| Command             | Description                   |
| ------------------- | ----------------------------- |
| `terraform apply`   | Start the container           |
| `terraform plan`    | Preview changes               |
| `terraform destroy` | Stop and remove the container |

### Infrastructure Overview

```
Terraform (IaC)
     │
     ▼
Docker Provider
     │
     ├── docker_image   → angular-app:latest
     └── docker_container → Nginx serving Angular (port 4200)
```

# ✅ Verification

For a production-ready change, run the full verification workflow before merging.

Recommended script:

```bash
npm run verify
```

A good `verify` script should include:

```txt
typecheck → tests → production build
```

This is the command that `/ship` should use as the final readiness gate.

---

# 🏗️ Tech Stack

| Technology     | Purpose                       |
| -------------- | ----------------------------- |
| Angular 21     | Frontend framework            |
| Tailwind CSS   | Utility-first CSS framework   |
| Vitest         | Vite-native testing framework |
| GitHub Actions | CI/CD platform                |
| Claude Code    | AI-assisted workflows         |

---

# 🚀 Deployment

This project is structured to support GitHub Actions-based CI/CD.

A typical deployment workflow should include:

1. Dependency installation
2. Type checking
3. Test execution
4. Production build
5. Deployment

If deployment automation is enabled, every push to the configured branch can trigger the build and deployment pipeline.

---

# 📁 Suggested Feature Structure

For larger features, prefer a feature-first structure:

```txt
src/app/features/feature-name/
  components/
  pages/
  services/
  models/
  feature-name.routes.ts
```

Example:

```txt
src/app/features/recipes/
  components/
    recipe-card/
    recipe-search/
    recipe-tag-filter/
  pages/
    recipe-list-page/
    recipe-detail-page/
  data/
    recipes.data.ts
  models/
    recipe.model.ts
  recipes.routes.ts
```

---

## ✨ Features

### Angular 21 Modern APIs

- Standalone Components
- Angular Signals
- `computed()` and `effect()`
- `input()` / `output()`
- `inject()`
- `httpResource()`
- Route-level lazy loading
- OnPush change detection
- Typed Reactive Forms

### UI & Styling

- Tailwind CSS integration
- Responsive layouts
- Gradient-based modern UI
- Reusable UI patterns
- Component-driven structure

### Developer Experience

- Hot reload development server
- AI-assisted development workflows
- Structured Claude Code commands
- Role-based agent templates
- Reusable engineering skills
- Pre-configured review and audit templates
- GitHub Actions-ready project structure

### Testing

- Unit testing with Vitest
- Angular Testing Utilities
- Fast test execution
- Modern Vite-powered testing workflow
- Test-first development support through `/tdd`

---

# 📚 Goals

This repository explores:

- Modern Angular architecture
- Signals-based state management
- Angular-native async patterns
- Frontend scalability patterns
- Developer tooling and automation
- Test-first frontend development
- AI-assisted engineering workflows
- Repeatable review and release-readiness practices

## Philosophy

> Structure over shortcuts — define the spec, plan, test, build, review, ship.

Designed to make AI-assisted development structured, reviewable, and aligned with senior level engineering practices.

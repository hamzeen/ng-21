# Samples: Angular 21

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 21.1.4.

### Async Data Fetching:

Mock Users are fetched from the RandomUser API using Angular’s `httpResource()`.  
The resource exposes `value`, `isLoading`, and `error` as signals, allowing the template to reactively render these states (without manual subscriptions or RxJS plumbing).

# JavaScript Concepts

### 1. Variable Scope

Variables declared with `let` or `const` are block-scoped.

```js
let x = 1;

{
  let x = 2;
  console.log(x); // 2
}

console.log(x); // 1
```

### 2. Closure

function remembers variables from its outer scope.

```js
function counter() {
  let count = 0;

  return function () {
    count++;
    console.log(count);
  };
}

const increment = counter();
increment(); // 1
increment(); // 2
```

### 3. Destructuring

Extract values from objects easily.

```js
const user = { name: 'Alex', age: 30 };

const { name, age } = user;

console.log(name); // Alex
console.log(age); // 30
```

### 4. Spread Operator

Expand elements of arrays or objects.

```js
const nums = [1, 2, 3];
const moreNums = [...nums, 4, 5];

console.log(moreNums); // [1, 2, 3, 4, 5]
```

### 5. Hoisting

Declarations move to the top during compilation.

```js
console.log(a); // undefined

var a = 5;
```

### 6. IIFE (Immediately Invoked Function Expression)

A function that runs immediately after it is defined.

```js
(function () {
  console.log('Runs immediately');
})();
```

## Development server

To start a local development server (with live reload), run:

```bash
ng serve
```

Once the server is running, navigate to `http://localhost:4200/`

- available routes: `/`, `/list`, `/register`

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Vitest](https://vitest.dev/) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Deployment

Deployment is automated via GitHub Actions.  
A push to `origin` triggers the build and deployment pipeline.

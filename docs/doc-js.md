# Samples: Angular 21

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 21.1.4.

### Async Data Fetching:

Mock Users are fetched from the RandomUser API using Angular’s `httpResource()`.  
The resource exposes `value`, `isLoading`, and `error` as signals, allowing the template to reactively render these states (without manual subscriptions or RxJS plumbing).

# JavaScript Concepts

### trivia

```js
for (var i = 0; i < 5; i++) {
  setTimeout(() => {
    console.log(i);
  }, 1000);
}
```

:// var is function scoped.

```js
for (let i = 0; i < 5; i++) {
  setTimeout(() => {
    console.log(i);
  }, 1000);
}
```

:// let is block scoped

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

### SOLID Principles

| Principle                 | Description                                                                    |
| ------------------------- | ------------------------------------------------------------------------------ |
| S — Single Responsibility | A class should have one responsibility; promotes separation of concerns.       |
| O — Open/Closed           | Open for extension, but closed for modification.                               |
| L — Liskov Substitution   | Subtypes should be replaceable for their base types without breaking behavior. |
| I — Interface Segregation | Clients should not be forced to depend on interfaces they do not use.          |
| D — Dependency Inversion  | Depend on abstractions, not on concrete implementations.                       |

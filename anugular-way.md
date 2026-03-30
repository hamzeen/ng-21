## property drilling

## icon system

## folder structure

## track

```js
@for (invoice of invoices(); track invoice.id) {
```

## option 1: Use a base + pick:

```js
interface ApiUser {
  id: string;
  name: string;
  email: string;
  role: string;
  createdAt: string;
}

type User = Pick<ApiUser, 'id' | 'name' | 'email' | 'role'>;
```

## Option 1: Omit

```js
type User = {
  id: number;
  name: string;
  email: string;
};

type UserWithoutEmail = Omit<User, 'email'>;

const user: UserWithoutEmail = {
  id: 1,
  name: 'Hamzeen',
};
```

## Option 2: When UI slightly differs (transform needed)

Example: rename / compute fields

```js
interface ApiUser {
 id: string;
 full_name: string;
}

interface User {
 id: string;
 name: string;
}

const toUser = (api: ApiUser): User => ({
 id: api.id,
 name: api.full_name,
});

```

👉 You must map if structure differs — no TS shortcut here.

## Linting

| Tool     | Purpose                                       |
| -------- | --------------------------------------------- |
| ESLint   | Code quality + bugs + best practices          |
| Prettier | Code formatting (style, spacing, consistency) |

## throttle | debounce

- throttle: regular intervals
- debounce: after an event

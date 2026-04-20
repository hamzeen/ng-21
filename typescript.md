# key-value json objects

```js
type KeyValue = {
  [key: string]: unknown;
};

// modern
type KeyValue = Record<string, unknown>;

const obj: KeyValue = {
  name: 'foster + partners',
  age: 20,
  anything: 'something',
};

```

# TS utility classes

| Scenario                       | Problem                                | TS utility type                         | Example                                           |
| ------------------------------ | -------------------------------------- | --------------------------------------- | ------------------------------------------------- |
| Backend has **1 extra field**  | API returns more than UI needs         | `Pick` or just assign compatible subset | `type UiUser = Pick<ApiUser, 'id' \| 'name'>`     |
| Backend is **missing 1 field** | UI needs an extra derived/manual field | `Omit` + extend                         | `type UiUser = ApiUser & { isSelected: boolean }` |
| Update call                    | Only some fields are sent in PATCH/PUT | `Partial`                               | `type UpdateUserDto = Partial<ApiUser>`           |

DEMO:

```js
type BackendUser = {
  id: number;
  name: string;
  email: string;
};

// picks only id and name
type UserListItem = Pick<BackendUser, 'id' | 'name'>;

// more tailored for UI with selected state
type UserWithUiState = BackendUser & {
  isSelected: boolean;
};

// update api call: allows `any 1` field to be passed
type UpdateUserPayload = Partial<BackendUser>;
```

| Use case                              | Utility type  | Result                              |
| ------------------------------------- | ------------- | ----------------------------------- |
| Need only some backend fields         | `Pick<T, K>`  | Keep selected fields                |
| Need everything except one field      | `Omit<T, K>`  | Remove unwanted fields              |
| Need optional update payload          | `Partial<T>`  | All fields become optional          |
| Need required UI-only extra field     | `T & { ... }` | Extend type                         |
| Need backend field to become required | `Required<T>` | All optional fields become required |

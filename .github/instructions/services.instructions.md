---
applyTo: "src/app/services/**"
---

# Angular v21 – Service Guidelines

## Philosophy

Services are **not** global singletons by default. A service should encapsulate the business logic of the component it belongs to and be provided directly on that component. This keeps state scoped, predictable and easy to destroy.

> **One service per component** is the recommended pattern.

## Providing a Service

### Default: provide on the component

The service lives and dies with the component. Its state is private to that component instance.

```ts
// my-feature.component.ts
@Component({
  selector: 'app-my-feature',
  providers: [MyFeatureService],   // ← scoped to this component
  ...
})
export class MyFeatureComponent {
  private readonly service = inject(MyFeatureService);
}
```

```ts
// my-feature.service.ts
@Injectable()   // no providedIn
export class MyFeatureService {
  private readonly count = signal(0);

  increment(): void {
    this.count.update(v => v + 1);
  }
}
```

---

### Scenario 1 – Shared state across multiple components

When two or more components under the same route **must share the same service instance and state**, provide the service on their **common parent route** via `providers` in the route definition:

```ts
// src/app/router/auth.routes.ts
{
  path: ROUTE.AUTH.DASHBOARD,
  providers: [DashboardService],   // ← shared instance for this subtree
  loadComponent: () => import('../pages/dashboard/dashboard.component'),
}
```

All components rendered under that route (including children) will inject the same instance. The instance is destroyed when the user navigates away from the route.

---

### Scenario 2 – Same service, independent state per component

When multiple components use the same service but **do not need to share state**, provide it on each component independently. Each component gets its own isolated instance:

```ts
// component-a.component.ts
@Component({ providers: [SearchService], ... })
export class ComponentA {
  private readonly search = inject(SearchService);
}

// component-b.component.ts
@Component({ providers: [SearchService], ... })
export class ComponentB {
  private readonly search = inject(SearchService);  // independent instance
}
```

In this scenario the service should be written as a collection of methods that operate on internal signals. There is no assumption of shared state between instances.

---

### Exception – `providedIn: 'root'`

Use `providedIn: 'root'` **only** when the service must hold state shared across the entire application for its full lifetime (e.g. authentication, theming, feature flags):

```ts
@Injectable({ providedIn: 'root' })
export class AuthService { ... }
```

## Scaffold

```ts
import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()   // provided by the component or route, not root
export class ExampleService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = '/api/example';

  // local signals for component-level state
  readonly isLoading = signal(false);

  getAll(): Observable<Example[]> {
    return this.http.get<Example[]>(this.apiUrl);
  }

  getById(id: number): Observable<Example> {
    return this.http.get<Example>(`${this.apiUrl}/${id}`);
  }

  create(payload: CreateExampleDto): Observable<Example> {
    return this.http.post<Example>(this.apiUrl, payload);
  }

  update(id: number, payload: UpdateExampleDto): Observable<Example> {
    return this.http.put<Example>(`${this.apiUrl}/${id}`, payload);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
```

## Rules

- **Default**: `@Injectable()` with no `providedIn`; provide on the component via `providers: []`.
- **Shared state in a subtree**: provide on the common route via `providers: []` in the route config.
- **Independent instances**: provide on each component separately; the service must not assume shared state.
- **App-wide shared state only**: use `providedIn: 'root'`.
- Always type request/response bodies with interfaces from `models/`.
- Services do not catch errors; error handling belongs in the consumer (component or store).
- Return `Observable` from HTTP methods; manage state with signals inside the service.

## Error Handling

```ts
// ❌ Wrong – swallowing errors in the service
getAll(): Observable<Example[]> {
  return this.http.get<Example[]>(this.apiUrl).pipe(catchError(() => of([])));
}

// ✅ Correct – let the consumer handle errors
getAll(): Observable<Example[]> {
  return this.http.get<Example[]>(this.apiUrl);
}
```

## HTTP Interceptors

Define interceptors as **functional interceptors** (no class):

```ts
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = inject(AuthService).token();
  const authReq = token
    ? req.clone({ setHeaders: { Authorization: `Bearer ${token}` } })
    : req;
  return next(authReq);
};
```

Register in `app.config.ts`:

```ts
provideHttpClient(withInterceptors([authInterceptor]))
```


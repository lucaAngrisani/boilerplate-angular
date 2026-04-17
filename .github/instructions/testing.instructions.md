---
applyTo: "**/*.spec.ts"
---

# Angular v21 – Testing Guidelines

## Stack

- **Vitest** with `jsdom` environment
- `TestBed` for component and service integration tests
- `vi.fn()` / `vi.spyOn()` for mocking
- Prefer `fakeAsync` / `tick` for async operations

Vitest globals (`describe`, `it`, `expect`, `beforeEach`, `afterEach`, `vi`) are available without imports thanks to `globals: true` in `vitest.config.ts`.

## Setup

```
vitest.config.ts          ← vitest configuration
src/test-setup.ts         ← imports @angular/compiler (required for TestBed)
```

Run tests:

```bash
npm test          # vitest (watch mode)
npm test -- --run # single run, no watch
```

## Component Test Scaffold

```ts
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ExampleComponent } from './example.component';

describe('ExampleComponent', () => {
  let component: ExampleComponent;
  let fixture: ComponentFixture<ExampleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExampleComponent], // standalone: import directly
    }).compileComponents();

    fixture = TestBed.createComponent(ExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
```

## Service Test Scaffold

```ts
import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { ExampleService } from './example.service';
import { Example } from '../models/example.model';

describe('ExampleService', () => {
  let service: ExampleService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(ExampleService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => httpMock.verify());

  it('should fetch all items', () => {
    const mockItems: Example[] = [{ id: 1, name: 'Test' }];
    service.getAll().subscribe(items => expect(items).toEqual(mockItems));
    httpMock.expectOne('/api/example').flush(mockItems);
  });
});
```

## Signal Store Test Scaffold

```ts
import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { of } from 'rxjs';
import { ExampleStore } from './example.store';
import { ExampleService } from '../services/example.service';

describe('ExampleStore', () => {
  let store: InstanceType<typeof ExampleStore>;

  const mockService = {
    getAll: vi.fn(),
    create: vi.fn(),
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ExampleStore,
        { provide: ExampleService, useValue: mockService },
      ],
    });
    store = TestBed.inject(ExampleStore);
  });

  it('should load items', fakeAsync(() => {
    const items = [{ id: 1, name: 'Test' }];
    mockService.getAll.mockReturnValue(of(items));
    store.load();
    tick();
    expect(store.entities()).toEqual(items);
  }));
});
```

## Mocking with `vi`

Vitest replaces Jasmine spies entirely:

```ts
// ❌ Jasmine (no longer used)
const spy = jasmine.createSpyObj('MyService', ['getAll']);
spy.getAll.and.returnValue(of([]));

// ✅ Vitest
const spy = { getAll: vi.fn().mockReturnValue(of([])) };

// Spy on a method of an existing object
vi.spyOn(service, 'getAll').mockReturnValue(of([]));

// Assert calls
expect(spy.getAll).toHaveBeenCalledOnce();
expect(spy.getAll).toHaveBeenCalledWith(expectedArg);
```

## Rules

- Test files are co-located with the file they test (`*.spec.ts`).
- Use `vi.fn()` / `vi.spyOn()` – never Jasmine spies.
- Never call real HTTP in tests; always use `HttpTestingController`.
- Prefer `fixture.debugElement.query(By.css(...))` over `document.querySelector`.
- Test **behaviour** and **outputs**, not implementation details.
- Always call `fixture.detectChanges()` after mutating inputs or signals.
- Use `fakeAsync` + `tick` instead of `done` callbacks.
- Reset mocks in `afterEach` if they are module-level: `vi.clearAllMocks()`.


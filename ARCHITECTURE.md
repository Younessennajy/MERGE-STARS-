# MERGE STARS — Scalable Architecture Reference

> Implementation-grade blueprint. Covers folder structure, module boundaries,
> data contracts, auth flow, scaling strategy, and observability.
> For vision, design principles, and tech-stack rationale see `readme.md`.

---

## 1. Repository Layout

```
merge-stars/
├── backend/                    # NestJS API
│   ├── src/
│   │   ├── modules/            # Feature modules (DDD)
│   │   ├── common/             # Shared pipes, guards, decorators
│   │   ├── config/             # Typed config with @nestjs/config
│   │   ├── database/           # TypeORM entities, migrations, seeds
│   │   └── main.ts
│   ├── test/
│   │   ├── unit/
│   │   └── e2e/
│   ├── Dockerfile
│   └── package.json
│
├── frontend/                   # React + Vite SPA
│   ├── src/
│   │   ├── features/           # Vertical slices (one folder per domain)
│   │   ├── shared/             # Reusable UI, hooks, utils
│   │   ├── lib/                # Third-party wrappers (axios, queryClient)
│   │   └── main.tsx
│   ├── public/
│   ├── Dockerfile
│   └── package.json
│
├── docker-compose.yml          # Local dev: app + postgres + redis
├── docker-compose.prod.yml     # Production overrides
├── .env.example                # Documented env template
├── readme.md                   # Vision, principles, tech stack
└── ARCHITECTURE.md             # ← This file
```

---

## 2. Backend — NestJS Module Map

### Module Boundary Rules

- Each module **owns** its database entities. No module imports another module's entity directly.
- Cross-module data is fetched via **service injection** (not raw repository access).
- Shared logic lives in `common/` — never in a feature module.

### Full `src/` Tree

```
src/
├── modules/
│   ├── auth/
│   │   ├── auth.module.ts
│   │   ├── auth.controller.ts
│   │   ├── auth.service.ts
│   │   ├── strategies/
│   │   │   ├── jwt.strategy.ts
│   │   │   └── refresh-token.strategy.ts
│   │   ├── guards/
│   │   │   ├── jwt-auth.guard.ts
│   │   │   └── roles.guard.ts
│   │   └── dto/
│   │       ├── login.dto.ts
│   │       └── register.dto.ts
│   │
│   ├── users/
│   │   ├── users.module.ts
│   │   ├── users.controller.ts
│   │   ├── users.service.ts
│   │   ├── entities/
│   │   │   └── user.entity.ts
│   │   └── dto/
│   │
│   ├── coins/                  # Merge Coin / application management
│   │   ├── coins.module.ts
│   │   ├── coins.controller.ts
│   │   ├── coins.service.ts
│   │   ├── entities/
│   │   │   ├── coin.entity.ts
│   │   │   └── coin-application.entity.ts
│   │   ├── dto/
│   │   └── events/             # Domain events (CoinApproved, etc.)
│   │
│   ├── investments/
│   │   ├── investments.module.ts
│   │   ├── investments.controller.ts
│   │   ├── investments.service.ts
│   │   └── entities/
│   │       └── investment.entity.ts
│   │
│   ├── orders/
│   │   ├── orders.module.ts
│   │   ├── orders.controller.ts
│   │   ├── orders.service.ts
│   │   └── entities/
│   │       └── order.entity.ts
│   │
│   ├── metals/                 # Live metal price feed
│   │   ├── metals.module.ts
│   │   ├── metals.service.ts   # Polls external price API
│   │   └── metals.gateway.ts   # WebSocket broadcast
│   │
│   ├── notifications/
│   │   ├── notifications.module.ts
│   │   ├── notifications.service.ts
│   │   └── notifications.gateway.ts
│   │
│   └── admin/
│       ├── admin.module.ts
│       ├── admin.controller.ts  # Guarded: Role.Admin | Role.Manager
│       └── admin.service.ts
│
├── common/
│   ├── decorators/
│   │   ├── roles.decorator.ts
│   │   ├── current-user.decorator.ts
│   │   └── api-response.decorator.ts
│   ├── filters/
│   │   └── http-exception.filter.ts
│   ├── interceptors/
│   │   ├── transform.interceptor.ts   # Wraps all responses in { data, meta }
│   │   └── logging.interceptor.ts
│   ├── pipes/
│   │   └── validation.pipe.ts
│   ├── guards/
│   │   └── throttler.guard.ts
│   └── enums/
│       ├── role.enum.ts
│       └── status.enum.ts
│
├── config/
│   ├── app.config.ts
│   ├── database.config.ts
│   ├── redis.config.ts
│   └── jwt.config.ts
│
└── database/
    ├── migrations/             # TypeORM migrations (never edit manually)
    ├── seeds/                  # Dev/staging seed data
    └── typeorm.config.ts       # Used by CLI: typeorm migration:run
```

---

## 4. API Contract Design


Every endpoint returns the same shape. The `TransformInterceptor` handles wrapping automatically.


// Error (HttpExceptionFilter)
{
  "error": {
    "code": "COIN_APPLICATION_NOT_FOUND",
    "message": "Coin application not found.",
    "statusCode": 404
  }
}
```

### Key Endpoints
http://localhost:3000/api/docs

| Method | Path | Guard | Description |
|--------|------|-------|-------------|
| `POST` | `/api/auth/register` | Public | Step 1-3 registration |
| `POST` | `/api/auth/login` | Public | Returns `accessToken` + `refreshToken` |
| `POST` | `/api/auth/refresh` | Public | Rotates refresh token |
| `GET` | `/api/users/me` | JWT | Current user profile |


| `GET` | `/api/coins/applications` | JWT | User's coin applications |
| `POST` | `/api/coins/applications` | JWT | Submit new application |
| `GET` | `/api/investments` | JWT | User's investments |
| `GET` | `/api/metals/live` | JWT | Latest metal prices |
| `GET` | `/api/admin/applications` | Manager+ | All applications with filters |
| `PATCH`| `/api/admin/applications/:id/status` | Manager+ | Approve / reject / send-to-crystal |

#admin auth : admin@mergestars.com / Admin@123456
# http://localhost:3000/api/admin/users?accessToken="" . users list 
# http://localhost:3000/api/admin/stats?  . stats roles 


### WebSocket Events

```typescript
// Client subscribes on connect
socket.on('metals:prices', (payload: MetalPricesPayload) => { ... })
socket.on('application:status', (payload: StatusUpdatePayload) => { ... })
socket.on('notification:new', (payload: NotificationPayload) => { ... })

// Server namespaces
/metals        — public, broadcasts every 30s
/dashboard     — authenticated, room = user_id
```

---

## 5. Authentication & Session Flow

```
┌─────────────┐      POST /auth/register       ┌─────────────┐
│   Browser   │ ─────────────────────────────► │  Auth Svc   │
│             │ ◄───────────────────────────── │             │
│             │   { userId, verificationCode }  │             │
│             │                                 │             │
│             │      POST /auth/login           │             │
│             │ ─────────────────────────────► │             │
│             │ ◄───────────────────────────── │             │
│             │   { accessToken(15m),           │             │
│             │     refreshToken(7d) }          │             │
│             │                                 │             │
│             │   API calls with                │             │
│             │   Authorization: Bearer {at}    │             │
│             │ ─────────────────────────────► │  Any Svc    │
│             │                                 │  (JWT guard)│
│             │   accessToken expired →         │             │
│             │   POST /auth/refresh            │             │
│             │ ─────────────────────────────► │  Auth Svc   │
│             │ ◄───────────────────────────── │             │
│             │   { new accessToken,            │             │
│             │     rotated refreshToken }      │             │
└─────────────┘                                 └─────────────┘
```

**Token Storage:**
- `accessToken` — in-memory only (Zustand store, never localStorage)
- `refreshToken` — `HttpOnly; Secure; SameSite=Strict` cookie

**JWT Payload:**
```typescript
interface JwtPayload {
  sub: string;       // user UUID
  roles: Role[];
  region: string;
  iat: number;
  exp: number;
}
```

---

## 6. Database Schema & Migrations

### Core Entities

```sql
-- users
CREATE TABLE users (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    first_name      VARCHAR(100) NOT NULL,
    last_name       VARCHAR(100) NOT NULL,
    email           VARCHAR(255) UNIQUE,
    phone           VARCHAR(30) UNIQUE,
    personal_id     VARCHAR(50) UNIQUE NOT NULL,
    password_hash   VARCHAR(255) NOT NULL,
    roles           TEXT[] DEFAULT '{user}',
    is_verified     BOOLEAN DEFAULT FALSE,
    region          VARCHAR(10) NOT NULL DEFAULT 'geo',
    created_at      TIMESTAMPTZ DEFAULT NOW(),
    updated_at      TIMESTAMPTZ DEFAULT NOW()
);

-- coin_applications
CREATE TABLE coin_applications (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id         UUID REFERENCES users(id) ON DELETE CASCADE,
    coin_type       VARCHAR(50) NOT NULL,    -- 'silver_1kg', 'gold_100g', etc.
    quantity        INT NOT NULL DEFAULT 1,
    metal_purity    NUMERIC(5,2) NOT NULL,   -- e.g. 99.9
    special_request TEXT,
    coin_value      NUMERIC(12,2),
    financing_term  INT,                     -- months
    monthly_payment NUMERIC(10,2),
    platform_fee    NUMERIC(10,2),
    status          VARCHAR(30) NOT NULL DEFAULT 'submitted',
    -- submitted → under_review → sent_to_crystal → approved | rejected
    -- → funds_received → production_queue → in_production → quality_check
    -- → ready → delivered
    rejection_note  TEXT,
    submitted_at    TIMESTAMPTZ DEFAULT NOW(),
    reviewed_at     TIMESTAMPTZ,
    approved_at     TIMESTAMPTZ,
    delivered_at    TIMESTAMPTZ
);

-- investments
CREATE TABLE investments (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id         UUID REFERENCES users(id) ON DELETE CASCADE,
    application_id  UUID REFERENCES coin_applications(id),
    amount_usd      NUMERIC(14,2) NOT NULL,
    created_at      TIMESTAMPTZ DEFAULT NOW()
);

-- metal_prices  (append-only time-series)
CREATE TABLE metal_prices (
    id              BIGSERIAL PRIMARY KEY,
    metal           VARCHAR(20) NOT NULL,  -- 'gold','silver','platinum','palladium'
    price_usd       NUMERIC(12,4) NOT NULL,
    change_pct      NUMERIC(6,4),
    recorded_at     TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX idx_metal_prices_latest ON metal_prices (metal, recorded_at DESC);

-- notifications
CREATE TABLE notifications (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id         UUID REFERENCES users(id) ON DELETE CASCADE,
    type            VARCHAR(50) NOT NULL,
    title           VARCHAR(255),
    body            TEXT,
    is_read         BOOLEAN DEFAULT FALSE,
    created_at      TIMESTAMPTZ DEFAULT NOW()
);
```

**Rule:** Never edit a migration file after it has been committed. Create a new one instead.


## 7. Error Handling Contract

### Backend — Global HTTP Exception Filter

All unhandled exceptions are caught and normalized to the envelope in §4.

```typescript
// Status code mapping
400 → VALIDATION_ERROR        (class-validator DTO failures)
401 → UNAUTHORIZED            (missing/expired token)
403 → FORBIDDEN               (insufficient role)
404 → NOT_FOUND               (resource not found)
409 → CONFLICT                (duplicate email/phone)
422 → UNPROCESSABLE_ENTITY    (business rule violation)
429 → TOO_MANY_REQUESTS       (throttler)
500 → INTERNAL_SERVER_ERROR   (unexpected — logged to Sentry)
```


### Roles Overview

| Role | Scope | Access Level |
|------|-------|-------------|
| `admin` | Full platform | All resources — users, content, settings, analytics, system config |
| `manager` | Operations | Orders, creators, products, reports — no system config |
| `developer` | Internal panel | Debug tools, logs, API explorer, feature flags — 2 developer seats |
| `user` | Public / Creator | Own profile, own products, orders, public showcase |

### Role Hierarchy

```
admin
  └── manager
        └── developer
              └── user
```

| Action | Admin | Manager | Developer | User |
|--------|:-----:|:-------:|:---------:|:----:|
| Manage users | ✅ | ❌ | ❌ | ❌ |
| Manage system config | ✅ | ❌ | ❌ | ❌ |
| View all orders | ✅ | ✅ | ❌ | ❌ |
| Manage products (any) | ✅ | ✅ | ❌ | ❌ |
| Access developer panel | ✅ | ❌ | ✅ | ❌ |
| View logs & debug tools | ✅ | ❌ | ✅ | ❌ |
| Manage own products | ✅ | ✅ | ✅ | ✅ |
| View own orders | ✅ | ✅ | ✅ | ✅ |
| Public showcase | ✅ | ✅ | ✅ | ✅ |


---

## 8. API Endpoints — Full Reference with Examples

> **Base URL:** `http://localhost:3000/api`  
> **Swagger UI:** `http://localhost:3000/api/docs`  
> **Auth header (protected routes):** `Authorization: Bearer <accessToken>`

### Response envelope

Every successful response is wrapped automatically:

```json
{
  "data": { ... },
  "meta": {
    "timestamp": "2026-05-19T14:00:00.000Z",
    "path": "/api/auth/login"
  }
}
```

Error responses:

```json
{
  "error": {
    "code": "UNAUTHORIZED",
    "message": "Login failed: incorrect password.",
    "statusCode": 401
  }
}
```

---

### Auth

#### `POST /api/auth/setup` — Create first admin (one-time)

```bash
curl -X POST http://localhost:3000/api/auth/setup \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "Super",
    "lastName": "Admin",
    "email": "admin@mergestars.com",
    "personalId": "ADMIN-001",
    "password": "Admin@123456"
  }'
```

```json
{
  "data": {
    "message": "Admin account created successfully. This endpoint is now permanently disabled.",
    "admin": {
      "id": "uuid",
      "email": "admin@mergestars.com",
      "roles": ["admin"]
    }
  }
}
```

#### `POST /api/auth/register` — User registration (3 steps)

```json
{
  "firstName": "John",
  "lastName": "Doe",
  "personalId": "GEO123456",
  "phone": "+33612345678",
  "email": "john@example.com",
  "password": "Password1!",
  "acceptedTerms": true,
  "acceptedFinancingAgreement": true,
  "confirmedAccuracy": true,
  "region": "geo"
}
```

```json
{
  "data": {
    "message": "Account created successfully.",
    "user": {
      "id": "uuid",
      "mergeId": "MS-782456",
      "firstName": "John",
      "lastName": "Doe",
      "email": "john@example.com",
      "roles": ["user"]
    }
  }
}
```

#### `POST /api/auth/login`

```json
{
  "login": "admin@mergestars.com",
  "password": "Admin@123456"
}
```

```json
{
  "data": {
    "message": "Login successful.",
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "expiresIn": "15m",
    "user": {
      "id": "uuid",
      "mergeId": "MS-782456",
      "firstName": "Super",
      "lastName": "Admin",
      "email": "admin@mergestars.com",
      "roles": ["admin"],
      "region": "geo"
    }
  }
}
```

#### `POST /api/auth/refresh` — Uses HttpOnly cookie (no body)

#### `POST /api/auth/logout` — Requires Bearer token

---

### Users

#### `GET /api/users/me`

```json
{
  "data": {
    "message": "Profile retrieved successfully.",
    "user": {
      "id": "uuid",
      "mergeId": "MS-782456",
      "firstName": "John",
      "lastName": "Doe",
      "email": "john@example.com",
      "roles": ["user"],
      "mergeCoinBalance": "0.00"
    }
  }
}
```

#### `GET /api/users/me/dashboard`

```json
{
  "data": {
    "message": "Dashboard retrieved successfully.",
    "mergeId": "MS-782456",
    "mergeCoinBalance": "12450.00",
    "totalInvestedUsd": "8500.00",
    "growthPct": 14.6,
    "latestApplication": { "id": "uuid", "status": "in_production", "coinType": "gold_100g" },
    "applications": [],
    "recentActivity": []
  }
}
```

#### `PATCH /api/users/me`

```json
{
  "firstName": "John",
  "lastName": "Smith",
  "email": "john.smith@example.com"
}
```

---

### Metals (public)

#### `GET /api/metals/live`

```json
{
  "data": {
    "message": "Live metal prices retrieved successfully.",
    "prices": [
      { "metal": "gold", "priceUsd": 85, "changePct": 0, "recordedAt": "2026-05-19T14:00:00.000Z" },
      { "metal": "silver", "priceUsd": 1.05, "changePct": 0, "recordedAt": "2026-05-19T14:00:00.000Z" }
    ]
  }
}
```

---

### Coins

#### `POST /api/coins/calculator` — Public price preview

```json
{
  "coinType": "gold_100g",
  "quantity": 1,
  "metalPurity": 99.9,
  "financingTerm": 12
}
```

```json
{
  "data": {
    "message": "Price calculated successfully.",
    "coinType": "gold_100g",
    "quantity": 1,
    "metalPurity": 99.9,
    "metalValueUsd": 8482.65,
    "manufacturingFeeUsd": 350,
    "platformFeeUsd": 88.33,
    "totalUsd": 8920.98,
    "downPaymentUsd": 1784.2,
    "monthlyPaymentUsd": 594.73,
    "financingTerm": 12
  }
}
```

#### `POST /api/coins/applications` — Submit application

```json
{
  "coinType": "silver_1kg",
  "quantity": 1,
  "specialRequest": "Engraving on reverse side",
  "financingTerm": 12
}
```

#### `GET /api/coins/applications` — My applications

#### `GET /api/coins/applications/:id` — Detail + timeline + documents

---

### Investments

#### `GET /api/investments`

#### `GET /api/investments/summary`

```json
{
  "data": {
    "message": "Investment summary retrieved successfully.",
    "totalInvestedUsd": "8500.00",
    "growthPct": 14.6,
    "investmentCount": 2
  }
}
```

---

### Catalog (public — homepage)

#### `GET /api/catalog/categories`

```json
{
  "data": {
    "message": "Categories retrieved successfully.",
    "categories": [
      { "id": "uuid", "name": "Jewelry", "slug": "jewelry", "tagline": "Luxury Redefined", "displayOrder": 1 }
    ]
  }
}
```

#### `GET /api/catalog/brands`

#### `GET /api/catalog/products?categoryId=uuid&brandId=uuid`

---

### Manager — Brands, Categories, Products

> Requires role: `admin` or `manager` + Bearer token

#### `POST /api/manager/brands`

```json
{
  "name": "Crystal Mint",
  "tagline": "Premium Gold Coins",
  "description": "Swiss refinery partner",
  "minPriceUsd": 2500,
  "isActive": true
}
```

#### `POST /api/manager/categories`

```json
{
  "name": "Jewelry",
  "tagline": "Luxury Redefined",
  "displayOrder": 1,
  "isActive": true
}
```

#### `POST /api/manager/products`

```json
{
  "categoryId": "category-uuid",
  "brandId": "brand-uuid",
  "name": "Gold Coin 100g",
  "sku": "GC-100G-001",
  "priceUsd": 8500,
  "metalType": "gold",
  "weightGrams": 100,
  "purity": 99.9,
  "stock": 50
}
```

#### CRUD routes (same pattern for all three)

| Method | Brands | Categories | Products |
|--------|--------|------------|----------|
| `GET` | `/api/manager/brands` | `/api/manager/categories` | `/api/manager/products` |
| `GET` | `/api/manager/brands/:id` | `/api/manager/categories/:id` | `/api/manager/products/:id` |
| `PATCH` | `/api/manager/brands/:id` | `/api/manager/categories/:id` | `/api/manager/products/:id` |
| `DELETE` | `/api/manager/brands/:id` | `/api/manager/categories/:id` | `/api/manager/products/:id` |

---

### Admin — Users

> Admin only unless noted

#### `GET /api/admin/users` — Admin & Manager

```bash
curl http://localhost:3000/api/admin/users \
  -H "Authorization: Bearer <accessToken>"
```

#### `GET /api/admin/stats` — Admin & Manager

```json
{
  "data": {
    "total": 42,
    "byRole": { "admin": 1, "manager": 3, "developer": 2, "user": 36 }
  }
}
```

#### `PATCH /api/admin/users/:id/roles` — Admin only

```json
{ "roles": ["manager"] }
```

#### `PATCH /api/admin/users/:id/email` — Admin only

```json
{ "email": "newemail@example.com" }
```

#### `PATCH /api/admin/users/:id/password` — Admin only

```json
{ "newPassword": "NewPass@2026" }
```

---

### Admin — Applications workflow

> Requires role: `admin` or `manager`

#### `GET /api/admin/applications?status=submitted&coinType=gold_100g`

#### `GET /api/admin/applications/:id`

#### `PATCH /api/admin/applications/:id/status`

```json
{
  "status": "under_review",
  "note": "Documents verified, moving to review."
}
```

Valid status flow:

```
submitted → under_review → sent_to_crystal → approved | rejected
→ funds_received → production_queue → in_production → quality_check → ready → delivered
```

Reject example:

```json
{
  "status": "rejected",
  "rejectionNote": "Incomplete personal documentation."
}
```

#### `POST /api/admin/applications/:id/documents`

```json
{
  "name": "ID Verification",
  "fileUrl": "https://storage.example.com/docs/id-scan.pdf",
  "type": "identity"
}
```

#### `PATCH /api/admin/applications/:id/production`

```json
{
  "assignedFactory": "Factory #2",
  "progressPercent": 45,
  "startDate": "2026-05-19T00:00:00.000Z",
  "expectedCompletion": "2026-06-15T00:00:00.000Z"
}
```

---

### Quick test credentials

| Role | Login | Password |
|------|-------|----------|
| Admin | `admin@mergestars.com` | `Admin@123456` |

Create admin first via `POST /api/auth/setup` if not seeded yet.


*Last updated: May 2026 — aligned with Phase 1 implementation.*

# 🌌 MERGE ⭐ STARS

**Luxury Creative Technology Infrastructure — v1.0**

> This is not a website. This is a Digital Manufacturing Ecosystem, an AI-assisted 3D Creation Platform, and the foundation of a Future Physical-Digital Identity Network.

---

## Table of Contents

1. [Vision](#i-vision)
2. [Infrastructure & Cloud](#ii-infrastructure--cloud)
3. [Microservice Architecture](#iii-microservice-architecture)
4. [Frontend Architecture](#iv-frontend-architecture)
5. [Real-Time Configuration Engine](#v-real-time-configuration-engine)
6. [Creator Workspace](#vi-creator-workspace)
7. [Database Architecture](#vii-database-architecture)
8. [3D Asset Pipeline](#viii-3d-asset-pipeline)
9. [Mobile & Future Ecosystem](#ix-mobile--future-ecosystem)
10. [Security & Performance](#x-security--performance)
11. [Development Phases](#xi-development-phases)
12. [Tech Stack Summary](#xii-technology-stack-summary)
13. [Roles & Guards](#xiii-roles--guards)
14. [Luxury Principles](#xiv-luxury-principles)
15. [Docker](#docker)
16. [Git Workflow](#git-workflow)

---

## I. Vision

The goal is to build a technological infrastructure that does not merely serve demand, but creates a new category — **Luxury Creative Infrastructure**.

---

## II. Infrastructure & Cloud

**Stack:** Terraform / Kubernetes (EKS or GKE)

```
┌─────────────────────────────────────────────────────────────┐
│                    GLOBAL LOAD BALANCER                      │
│              (Cloudflare / AWS ALB / GCP LB)                 │
├─────────────────────────────────────────────────────────────┤
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐       │
│  │   us-east    │  │   eu-west    │  │   asia-east  │       │
│  │  (Virginia)  │  │  (Frankfurt) │  │  (Singapore) │       │
│  └──────────────┘  └──────────────┘  └──────────────┘       │
├─────────────────────────────────────────────────────────────┤
│              KUBERNETES CLUSTER (EKS/GKE)                    │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐       │
│  │ Web Pod  │ │ API Pod  │ │Worker Pod│ │  3D Pod  │       │
│  │(Next.js) │ │(NestJs)  │(Bull/    │ │(Three/   │       │
│  │          │ │          │ Redis)   │ │ WebGPU)  │       │
│  └──────────┘ └──────────┘ └──────────┘ └──────────┘       │
├─────────────────────────────────────────────────────────────┤
│  SERVICE MESH: Istio/Linkerd (mTLS, Traffic Management)      │
├─────────────────────────────────────────────────────────────┤
│  DATA TIER:                                                  │
│  PostgreSQL (primary) │ Redis (cache/session) │ S3 (assets)  │
│  ClickHouse (analytics) │ MongoDB (3D metadata)              │
└─────────────────────────────────────────────────────────────┘
```

**Key Decisions:**
- **Multi-region from Day 1** — Each region is an independent Kubernetes cluster connected to a Global Control Plane
- **Service Mesh** — All inter-service communication is encrypted and observable
- **GPU Nodes** — Auto-scaling GPU node pool for WebGPU and Compute shaders

---

## III. Microservice Architecture

**Pattern:** Domain-Driven Design

| Service | Language | Responsibility | Database |
|---------|----------|----------------|----------|
| Identity Service | Go / Rust | Auth, JWT, OAuth2, Web3 wallet | PostgreSQL |
| Creator Service | Node.js / TS | Profiles, portfolios, stats | PostgreSQL + Redis |
| Product Service | Node.js / TS | 3D assets, versions, metadata | PostgreSQL + S3 |
| Config Engine | Rust / Go | Real-time material calculation | Redis + In-Memory |
| Render Service | Rust / C++ | 3D rendering, WebGPU compute | GPU Memory |
| Order Service | Node.js / TS | Manufacturing pipeline | PostgreSQL |
| Analytics Service | Go | Events, metrics, creator stats | ClickHouse |
| Notification Service | Node.js / TS | Email, Push, WebSocket | Redis |
| Payment Service | Node.js / TS | Multi-currency, crypto | PostgreSQL |
| Asset CDN | Rust / Go | Image optimization, 3D streaming | S3 + CloudFront |

### API Gateway

```yaml
gateway:
  routes:
    - path: /api/v1/auth
      service: identity-service
      rate_limit: 100/min

    - path: /api/v1/creators/*
      service: creator-service
      auth_required: true
      caching: redis(300s)

    - path: /api/v1/products/*
      service: product-service
      auth_required: true

    - path: /api/v1/config/realtime
      service: config-engine
      protocol: websocket
      # Critical: sub-50ms response for material updates

    - path: /graphql
      service: graphql-federation
      # Unified schema across all microservices
```

---

## IV. Frontend Architecture

```
┌─────────────────────────────────────────┐
│           PRESENTATION LAYER            │
│  Framework:  React.js (TypeScript)      │
│  Styling:    Tailwind CSS + CSS Houdini │
│  State:      Zustand + Jotai (atomic)   │
│  Query:      TanStack Query + GraphQL   │
├─────────────────────────────────────────┤
│           3D & VISUAL LAYER             │
│  Engine:     Three.js + React Three Fiber │
│  Physics:    Rapier.js / Cannon-es      │
│  Shaders:    GLSL / WGSL (WebGPU)       │
│  Post-Proc:  EffectComposer             │
│  Particles:  Custom compute shaders     │
│  GLTF:       Draco + KTX2 compression   │
├─────────────────────────────────────────┤
│           PERFORMANCE LAYER             │
│  Rendering:  React Server Components    │
│  Streaming:  Suspense boundaries        │
│  Assets:     CDN + Intersection Observer│
│  GPU:        OffscreenCanvas + Workers  │
│  Animation:  GSAP + Framer Motion       │
└─────────────────────────────────────────┘
```

### Landing Scene — "The Coin Awakens"

```typescript
interface HeroSceneConfig {
  camera: {
    type: 'cinematic-rig';
    path: bezierCurve3D;
    fov: 45;
    focus: 'coin-center';
  };
  lighting: {
    key: 'studio-3-point';
    envMap: 'hdr-luxury-studio-4k';
    dynamic: true; // Follows mouse cursor
  };
  coin: {
    geometry: 'procedural-coin';
    material: 'physical-gold-pbr';
    roughness: 0.15;
    metalness: 1.0;
    envMapIntensity: 1.5;
    animations: ['float', 'subtle-rotation', 'particle-aura'];
  };
  particles: {
    count: 50000;
    behavior: 'golden-dust';
    interaction: 'mouse-repulsion';
    shader: 'compute-particle-system';
  };
  postProcessing: ['bloom', 'chromatic-aberration', 'vignette', 'film-grain'];
}
```

**Scroll Storytelling:**
- Lenis for smooth scroll interpolation (`lerp: 0.1`)
- GSAP ScrollTrigger for scene pinning and transitions
- WebGL distortion shaders between sections
- Scroll velocity affects particle speed and light intensity

---

## V. Real-Time Configuration Engine

**Goal:** Zero-Latency Material System

```
┌─────────────────────────────────────────────────────────┐
│                  BROWSER (Client)                        │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  │
│  │  UI Panel    │  │  3D View     │  │  Preview     │  │
│  │  (React)     │  │  (Three.js)  │  │  (Canvas)    │  │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘  │
│         └─────────────────┼──────────────────┘          │
│                    WebSocket (binary)                    │
├───────────────────────────┼─────────────────────────────┤
│         EDGE SERVER (Cloudflare Workers / Vercel)        │
│                  Durable Object / Redis                  │
├───────────────────────────┼─────────────────────────────┤
│              CONFIG ENGINE (Rust / Go)                   │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  │
│  │  Material    │  │  Physics     │  │  Price       │  │
│  │  Calculator  │  │  Engine      │  │  Calculator  │  │
│  └──────────────┘  └──────────────┘  └──────────────┘  │
└─────────────────────────────────────────────────────────┘
```

**Update Pipeline:**
```
User Action
  → Zustand Store        (atomic update,    ~1ms)
  → WebWorker            (geometry recalc, ~16ms)
  → Three.js Material    (immediate)
  → Canvas Preview       (async,           ~50ms)
  → Price Recalculation  (WebSocket,      ~100ms)
  → Visual Feedback      (holographic flash)
```

**Performance Targets:**

| Event | Target |
|-------|--------|
| Material appearance update | < 16ms (1 frame @ 60fps) |
| Weight / dimension calculation | < 50ms |
| Price update | < 100ms |
| Full preview render | < 200ms |

---

## VI. Creator Workspace

**URL:** `app.merge-stars.com/creator`

**Features:**
- Drag-and-drop product organization
- Version control (Git-like system for 3D assets)
- Private asset library (S3 + presigned URLs)
- QR-linked identity (unique QR per creator)
- Real-time analytics (WebSocket + ClickHouse)
- Modular collections (nested folders, tags)

```typescript
interface CreatorIdentity {
  qr: {
    publicUrl: string;    // merge-stars.com/c/{handle}
    svg: string;
    branded: boolean;
    colors: { primary: string; background: string };
  };
  showcase: {
    template: 'minimal' | 'editorial' | 'gallery' | 'immersive';
    customDomain?: string;
    products: Product[];
    theme: ThemeConfig;
  };
  stats: {
    views: TimeSeries;
    conversions: TimeSeries;
    revenue: TimeSeries;
    topProducts: Product[];
  };
}
```

---

## VII. Database Architecture

### PostgreSQL — Primary

```sql
-- Multi-tenant, partitioned by region
CREATE TABLE creators (
    id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    handle      VARCHAR(30) UNIQUE NOT NULL,
    identity    JSONB NOT NULL,
    tier        VARCHAR(20) DEFAULT 'standard',
    region      VARCHAR(10) NOT NULL,
    created_at  TIMESTAMPTZ DEFAULT NOW()
) PARTITION BY LIST (region);

-- Product versioning (Git-like)
CREATE TABLE products (
    id              UUID PRIMARY KEY,
    creator_id      UUID REFERENCES creators(id),
    slug            VARCHAR(100) UNIQUE,
    current_version INT NOT NULL DEFAULT 1,
    config          JSONB NOT NULL,
    status          VARCHAR(20) DEFAULT 'draft',
    created_at      TIMESTAMPTZ,
    updated_at      TIMESTAMPTZ
);

CREATE TABLE product_versions (
    id             UUID PRIMARY KEY,
    product_id     UUID REFERENCES products(id),
    version_number INT NOT NULL,
    config         JSONB NOT NULL,
    change_summary TEXT,
    created_at     TIMESTAMPTZ,
    UNIQUE(product_id, version_number)
);
```

### Redis — Cache & Sessions

```redis
# Session & Auth
HSET session:{token} user_id 123 expires_at 1715899200

# Real-time config cache (TTL: 1h)
HSET config:{product_id} material "gold" finish "polished"

# Rate limiting
INCR   rate_limit:{ip}:{endpoint}
EXPIRE rate_limit:{ip}:{endpoint} 60

# Leaderboard (Sorted Sets)
ZADD creator:leaderboard:weekly 2300 "creator:uuid-2"
```

### ClickHouse — Analytics

```sql
CREATE TABLE events (
    timestamp   DateTime64(3),
    user_id     UUID,
    session_id  UUID,
    event_type  Enum('view','click','config_change','purchase','share'),
    product_id  UUID,
    creator_id  UUID,
    metadata    JSON,
    region      LowCardinality(String),
    device      LowCardinality(String)
) ENGINE = MergeTree()
ORDER BY (timestamp, event_type);
```

---

## VIII. 3D Asset Pipeline

```
Creator Uploads GLTF / OBJ / FBX
         ↓
  Validate → Optimize (Draco + KTX2) → Generate LODs + Thumbnails
         ↓
S3 Structure:
/assets/{creator_id}/{asset_id}/
  ├── original.gltf
  ├── optimized.glb
  ├── textures/
  │   ├── albedo.ktx2
  │   ├── normal.ktx2
  │   └── roughness.ktx2
  ├── lods/
  │   ├── lod-0.glb  (high)
  │   ├── lod-1.glb  (medium)
  │   └── lod-2.glb  (low)
  └── preview.webp
```

**Streaming Strategy:**
- **LOD** — Model detail level adjusts based on viewer distance
- **Texture Streaming** — KTX2 format with mipmaps and progressive loading
- **Binary GLTF** — Minimum file size, maximum load speed

---

## IX. Mobile & Future Ecosystem

```
┌─────────────────────────────────────────────────────────┐
│              SHARED CORE (Rust / C++)                    │
│  • 3D Engine core (portable)                            │
│  • Material calculation logic                           │
│  • Asset optimization algorithms                        │
│  • Cryptographic identity                               │
├─────────────────────────────────────────────────────────┤
│  WEB (React)   │  iOS (Swift)    │  Android (Kotlin)    │
│  ├─ R3F        │  ├─ Metal       │  ├─ Vulkan           │
│  ├─ Three.js   │  ├─ RealityKit  │  ├─ Filament         │
│  └─ WebGPU     │  └─ SwiftUI     │  └─ Jetpack Compose  │
├─────────────────────────────────────────────────────────┤
│  FUTURE:                                                 │
│  • Tablet Creator Studio (iPad Pro + Apple Pencil)       │
│  • AR Preview (ARKit / ARCore — see product in space)    │
│  • Apple Watch — notifications and quick stats           │
│  • Vision Pro — spatial computing product showcase       │
└─────────────────────────────────────────────────────────┘
```

**API Design for Mobile:**
- **GraphQL** — Single endpoint, precise data requests
- **Protobuf** — Binary serialization for 3D data sync
- **Offline Support** — SQLite + sync engine (CRDTs for conflict resolution)

---

## X. Security & Performance

### Security

```yaml
security:
  authentication:
    primary: JWT + Refresh Tokens (HttpOnly)
    secondary: OAuth2 (Google, Apple, MetaMask)
    mfa: TOTP + WebAuthn (FaceID / TouchID)

  authorization:
    model: RBAC + ABAC (Resource-based)
    creators: Can only access own assets
    admin: Full platform access

  encryption:
    at_rest: AES-256 (S3, RDS)
    in_transit: TLS 1.3
    sensitive_fields: Application-level encryption

  cdn:
    signed_urls: true
    geo_restriction: optional
    hotlink_protection: true
```

### Performance Targets

| Metric | Target | Strategy |
|--------|--------|----------|
| First Contentful Paint | < 1.0s | RSC, Edge caching, Critical CSS |
| Time to Interactive | < 2.5s | Code splitting, Lazy loading |
| 3D Scene Load | < 3.0s | LOD, Texture streaming, Draco |
| Config Update Latency | < 50ms | WebWorker, Optimistic UI |
| API Response (p99) | < 100ms | Redis, Connection pooling |
| Global Availability | 99.99% | Multi-region, Health checks |

---

## XI. Development Phases

| Phase | Timeline | Focus |
|-------|----------|-------|
| **Phase 1 — Foundation** | Months 1–3 | K8s, CI/CD, Auth, basic dashboard, 3D viewer, storage |
| **Phase 2 — Cinematic Experience** | Months 4–6 | WebGL landing, particles, scroll storytelling, config engine v1 |
| **Phase 3 — Creator Power** | Months 7–9 | Advanced workspace, asset library, versioning, analytics, QR identity |
| **Phase 4 — Scale & Future** | Months 10–12 | Multi-region, caching, iOS/Android foundations, AR prototype, enterprise |

---

## XII. Technology Stack Summary

| Layer | Technology | Why |
|-------|------------|-----|
| Frontend | React.js, TypeScript, Tailwind CSS | Component-based UI, utility-first styling |
| Backend | NestJS (Node.js / TypeScript) | Modular, scalable, decorator-driven architecture |
| 3D Engine | Three.js + React Three Fiber | Industry standard, React integration |
| State | Zustand + Jotai | Atomic, performant, simple |
| Database | PostgreSQL + Redis + ClickHouse | Relational + Cache + Analytics |
| Queue | BullMQ (Redis) | Reliable job processing |
| Storage | S3 + CloudFront | Global CDN |
| Infra | Kubernetes (EKS/GKE) | Scalable, portable |
| Observability | Grafana, Prometheus, Jaeger | Metrics, logs, traces |
| CI/CD | GitHub Actions + ArgoCD | Automation, GitOps |

---

## XIII. Roles & Guards

The platform uses **Role-Based Access Control (RBAC)** enforced via NestJS Guards.

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

> Higher roles inherit access from roles below them. An `admin` can do everything a `manager`, `developer`, or `user` can.

### NestJS Guard Implementation

```typescript
// roles.enum.ts
export enum Role {
  Admin     = 'admin',
  Manager   = 'manager',
  Developer = 'developer',
  User      = 'user',
}

// roles.decorator.ts
import { SetMetadata } from '@nestjs/common';
export const Roles = (...roles: Role[]) => SetMetadata('roles', roles);

// roles.guard.ts
@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>('roles', [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) return true;

    const { user } = context.switchToHttp().getRequest();
    return requiredRoles.some((role) => user.roles?.includes(role));
  }
}
```

### Usage on Controllers

```typescript
// Admin only
@Roles(Role.Admin)
@UseGuards(JwtAuthGuard, RolesGuard)
@Delete('/users/:id')
deleteUser(@Param('id') id: string) { ... }

// Admin + Manager
@Roles(Role.Admin, Role.Manager)
@UseGuards(JwtAuthGuard, RolesGuard)
@Get('/orders')
getAllOrders() { ... }

// Admin + Developer (internal panel)
@Roles(Role.Admin, Role.Developer)
@UseGuards(JwtAuthGuard, RolesGuard)
@Get('/panel/logs')
getLogs() { ... }

// All authenticated users
@UseGuards(JwtAuthGuard)
@Get('/profile')
getProfile(@Request() req) { ... }
```

### Permission Matrix

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

### Developer Panel Access

The `developer` role is limited to **2 seats** and grants access to:
- `/panel/*` — internal dashboard routes
- API explorer and endpoint testing
- Application logs and error traces
- Feature flag management
- Database query inspector (read-only)

> Developer seats are assigned manually by an `admin` and stored as a scoped claim in the JWT payload.

---

## XIV. Luxury Principles

> Every interaction must feel like a premium product, not a website.

1. **No generic components** — Every UI element is custom-designed
2. **Micro-interactions** — Every hover, click, and scroll has feedback (haptic on mobile)
3. **Typography** — Variable fonts, optical sizing, premium typefaces
4. **Color & Light** — Dark mode default, golden accents, cursor-responsive dynamic lighting
5. **Sound Design** — Subtle UI sounds, spatial audio for 3D scenes
6. **Loading States** — No spinners. Skeletons, progressive reveals, or artistic transitions
7. **Error States** — Even errors feel premium (poetic copy, beautiful illustrations)

---

## Docker

| Action | Command |
|--------|---------|
| First run (with build) | `docker compose -f docker-compose.yaml up --build` |
| Normal run | `docker compose -f docker-compose.yaml up` |
| Stop | `docker compose -f docker-compose.yaml down` |

---

## Git Workflow

### Branch Structure

| Branch | Purpose |
|--------|---------|
| `main` | Latest stable release on production |
| `staging` | Pre-production / staging environment |
| `uat` | User Acceptance Testing |
| `develop` | Current development work |
| `feature/xxxx` | New app features — tracks `origin/develop` |
| `fix/xxxx` | Bug fixes on develop/uat/staging — tracks `origin/develop` |
| `hotfix/xxxx` | Urgent production bugs — tracks `main` |

> Replace `xxxx` with the ticket number and a short descriptive title.

### Daily Commitment

Work in progress **must be committed and pushed every day**.

### Merge Requests

**Feature / Fix → `develop`:**
```
[WIP|RFR][FEATURE|FIX][DEVELOP][FRONTEND|API|SOCLE] : Short description
```

**Hotfix → `staging`:**
```
[WIP|RFR][HOTFIX][MAIN][FRONTEND|API|SOCLE] : Short description
```

> Always integrate hotfixes back into `develop` to keep new developments up to date.

---

*This is not a project. This is the future. 🌟*




## PHASE 2 — Frontend Core (Mois 2–4)


### 🎨 Design System & Setup

### Architecture Pattern: Vertical Slices

Each `features/` subdirectory is a **self-contained vertical slice** — its own components, hooks, API calls, and types. Nothing inside a feature imports from another feature. Shared code goes to `shared/`.

```
src/
├── features/
│   ├── auth/
│   │   ├── components/
│   │   │   ├── LoginForm.tsx
│   │   │   ├── RegisterSteps.tsx
│   │   │   └── TermsAgreement.tsx
│   │   ├── hooks/
│   │   │   └── useAuth.ts
│   │   ├── api/
│   │   │   └── auth.api.ts
│   │   ├── store/
│   │   │   └── auth.store.ts       # Zustand slice
│   │   └── types.ts
│   │
│   ├── dashboard/
│   │   ├── components/
│   │   │   ├── MergeCoinBalance.tsx
│   │   │   ├── ApplicationStatus.tsx
│   │   │   ├── InvestmentCard.tsx
│   │   │   └── QuickActions.tsx
│   │   ├── hooks/
│   │   │   └── useDashboard.ts
│   │   └── api/
│   │       └── dashboard.api.ts
│   │
│   ├── coins/
│   │   ├── components/
│   │   │   ├── CoinApplicationForm.tsx
│   │   │   ├── PriceCalculator.tsx
│   │   │   └── CoinViewer3D.tsx    # Three.js component
│   │   ├── hooks/
│   │   │   └── useLiveMetalPrice.ts  # WebSocket subscription
│   │   └── api/
│   │       └── coins.api.ts
│   │
│   ├── investments/
│   ├── orders/
│   ├── profile/
│   │
│   └── admin/
│       ├── components/
│       │   ├── ApplicationsTable.tsx
│       │   ├── ApplicationDetail.tsx
│       │   └── CrystalWorkflow.tsx
│       └── api/
│           └── admin.api.ts
│
├── shared/
│   ├── components/
│   │   ├── ui/                     # Base design system (Button, Input, Modal…)
│   │   ├── layout/                 # Sidebar, Header, PageWrapper
│   │   └── 3d/                     # Reusable Three.js primitives
│   ├── hooks/
│   │   ├── useWebSocket.ts
│   │   └── useDebounce.ts
│   ├── utils/
│   │   ├── format.ts               # Currency, date, weight formatters
│   │   └── validators.ts
│   └── types/
│       └── api.types.ts            # Shared API response types
│
├── lib/
│   ├── axios.ts                    # Axios instance + interceptors
│   ├── queryClient.ts              # TanStack Query config
│   └── socket.ts                  # Socket.io-client singleton
│
├── router/
│   ├── index.tsx                   # React Router v6 setup
│   ├── guards/
│   │   ├── AuthGuard.tsx           # Redirects to /login if no token
│   │   └── RoleGuard.tsx           # Redirects if missing role
│   └── routes.ts                  # Route constants
│
└── main.tsx
```

---


- [ ] 🔴 Configurer Tailwind CSS v4 avec les tokens de design (couleurs, typographie, espacements)
  - Palette : 
  `#0a0a0a` (fond)
   `#D4AF37` (or)
   `#FFFFFF` (texte)
---

### 🏠 Landing Page

- [ ] 🟠 Section Hero — "The Next Era of Luxury Is Here" avec le `HeroScene3D`

- [ ] 🟠 Barre de navigation responsive avec liens `HOME`, `COLLECTION`, `TECHNOLOGY`, `PRODUCTS`, `PARTNERSHIP`, `ABOUT US`
- [ ] 🟠 Bouton `LOGIN / REGISTER` en haut à droite
- [ ] 🟠 Section "Explore by Category" — cards : Jewelry, Accessories, Souvenirs, Sanitaryware, Stationery, Construction Materials
- [ ] 🟠 Section "Revolutionary 3D Filament Technology"
- [ ] 🟠 Section "Invest in the Future"
- [ ] 🟡 Barre live des prix métaux en bas de page (gold, silver, platinum, palladium)
- [ ] 🟡 Footer complet (Company, Support, Contact, Follow Us)
- [ ] 🟢 Sélecteur de langue `EN / GE` en haut à droite

---

### 🔑 Auth — Login / Register

- [ ] 🔴 Page `LoginForm` — Email ou Phone + Password + Remember Me + Forgot Password
- [ ] 🔴 Page `RegisterSteps` — 3 étapes :
  - Étape 1 : First Name, Last Name, Personal ID Number, Phone Number
  - Étape 2 : Email, Password, Confirm Password, Verification Code (`SEND CODE`)
  - Étape 3 : Checkboxes Terms + `ACTIVATE MY MERGE COIN`
- [ ] 🔴 Page `TermsAgreement` — 5 checkboxes légales + `I AGREE & CONTINUE`
- [ ] 🟠 Gestion des erreurs formulaires (class-validator → affichage inline)
- [ ] 🟡 Persistance "Remember Me" — refresh token cookie survit à la fermeture du navigateur

---

### 📱 Dashboard Utilisateur

- [ ] 🔴 Layout sidebar gauche : Dashboard, My Profile, My Applications, My Orders, My Coins, My Investments, Messages, Support, Settings, Logout
- [ ] 🔴 Widget `MergeCoinBalance` — solde MMS + statut Application (Approved / Under Review)
- [ ] 🔴 Widget `TotalInvestments` — montant total + variation %
- [ ] 🔴 Widget `ApplicationStatus` — badge de statut + `VIEW DETAILS`
- [ ] 🟠 Widget `MyCoin` — image de la pièce + type + quantité + statut
- [ ] 🟠 Widget `RecentActivity` — 4 dernières actions horodatées
- [ ] 🟠 Widget `QuickActions` — NEW APPLICATION, INVEST NOW, BROWSE PRODUCTS, CONTACT SUPPORT
- [ ] 🟠 Affichage du `MERGE ID` utilisateur avec bouton copier
- [ ] 🟡 Barre live des prix métaux en pied de dashboard

---

### 📋 Application Form (Coin Application)

- [ ] 🔴 Étape 1 — Coin Details : type de coin (Select), quantité, poids calculé
- [ ] 🔴 Étape 2 — Personal Info : récapitulatif / confirmation
- [ ] 🟠 Étape 3 — Additional Info : demande spéciale
- [ ] 🟠 Étape 4 — Review & Submit
- [ ] 🟠 Calcul live du prix basé sur le prix du métal (WebSocket)

---

### 💰 Price Calculator

- [ ] 🟠 Select du type de coin
- [ ] 🟠 Affichage du prix live du métal avec variation %
- [ ] 🟠 Slider de quantité → coin value calculée en temps réel
- [ ] 🟠 Récapitulatif Financing Preview : Down Payment, Amount to Finance, Monthly Payment, Platform Fee
- [ ] 🟠 Bouton `APPLY FOR FINANCING`
- [ ] 🟡 Avertissement "Price may change based on live market conditions"

---

### 📈 Application Status (Timeline)

- [ ] 🟠 Timeline horizontale des étapes : Submitted → Under Review → Sent to Crystal → Approved → Funds Received → In Production → Delivered
- [ ] 🟠 Affichage de la date et heure de chaque transition
- [ ] 🟠 Section `STATUS HISTORY` — log des changements
- [ ] 🟡 Notifications en temps réel quand le statut change (WebSocket)

---

### 🛡️ Panel Admin

- [ ] 🔴 Table des applications avec colonnes : ID, User, Coin Type, Qty, Value, Status, Send to Crystal, Actions
- [ ] 🔴 Filtres : statut, type de coin, plage de dates, recherche par User
- [ ] 🔴 Page détail d'une application : tabs DETAILS / DOCUMENTS / HISTORY / NOTES
- [ ] 🟠 Section PAYMENT & FINANCING — récapitulatif financier
- [ ] 🟠 Workflow Crystal (manual) — boutons SEND TO CRYSTAL / APPROVE / REJECT
- [ ] 🟠 Log de communication Crystal (timestamps, réponses)
- [ ] 🟠 Production Flow — étapes de production avec % avancement
- [ ] 🟡 Export CSV des applications

---

### 📊 Admin Dashboard KPIs

- [ ] 🟠 Total Applications + variation mensuelle
- [ ] 🟠 Approved / Rejected / In Production — compteurs
- [ ] 🟠 Total Funds Received
- [ ] 🟡 Graphique d'activité hebdomadaire

---

## PHASE 3 — 3D & Expérience Cinématique (Mois 4–6)

### 🎭 3D Scene — Landing

- [ ] 🟠 Installer Three.js + React Three Fiber + Drei
- [ ] 🟠 Créer `HeroScene3D.tsx` — coin procédural gold PBR flottant
- [ ] 🟠 Système de particules dorées (50 000 points, interaction souris)
- [ ] 🟠 Éclairage dynamique 3 points qui suit le curseur
- [ ] 🟡 Post-processing : bloom, chromatic aberration, vignette, film grain
- [ ] 🟡 Smooth scroll avec Lenis + GSAP ScrollTrigger
- [ ] 🟢 Transitions WebGL entre les sections (distortion shaders)

---

### 🪙 Coin Viewer 3D (Application)

- [ ] 🟠 Créer `CoinViewer3D.tsx` — viewer interactif de la pièce configurée
- [ ] 🟠 Changement de métal (gold/silver/platinum) → mise à jour du matériau PBR en < 16ms
- [ ] 🟡 Rotation orbitale + zoom tactile
- [ ] 🟢 AR Preview (WebXR) — voir la pièce dans l'espace réel

---

### 🎨 Assets 3D Pipeline

- [ ] 🟡 Configurer le pipeline d'optimisation : GLTF → Draco + KTX2 + LODs
- [ ] 🟡 Structure S3 : `/assets/{creator_id}/{asset_id}/original, optimized, lods/, textures/`
- [ ] 🟡 CDN CloudFront avec signed URLs

---

## PHASE 4 — Scale & Production (Mois 7–12)

### 🔒 Sécurité

- [ ] 🟠 Audit de sécurité complet (OWASP Top 10)
- [ ] 🟠 Rate limiting par IP + par utilisateur
- [ ] 🟠 Chiffrement AES-256 des champs sensibles en DB (personal_id, phone)
- [ ] 🟠 Rotation automatique des secrets JWT
- [ ] 🟡 MFA — TOTP (Google Authenticator) + WebAuthn (FaceID / TouchID)
- [ ] 🟡 Audit log de toutes les actions admin

---

### 📱 Mobile Responsiveness

- [ ] 🔴 Toutes les pages responsive (Mobile First, breakpoints: 375 / 768 / 1280 / 1920)
- [ ] 🟠 Sidebar drawer sur mobile
- [ ] 🟠 Formulaires optimisés mobile (keyboards natifs, PhoneInput)
- [ ] 🟡 PWA — manifest + service worker (offline landing page)

---

### 🌍 Internationalisation

- [ ] 🟡 Configurer `i18next` — langues : EN (défaut) + GE (Georgian)
- [ ] 🟡 Traduction de tous les textes UI
- [ ] 🟢 Détection automatique de la langue du navigateur

---

### ☁️ Kubernetes / Multi-région

- [ ] 🟢 Écrire les manifests K8s (`Deployment`, `Service`, `HPA`, `Ingress`)
- [ ] 🟢 Configurer 3 régions : `us-east`, `eu-west`, `asia-east`
- [ ] 🟢 Service Mesh Istio — mTLS inter-services
- [ ] 🟢 ClickHouse — analytics events (`view`, `click`, `config_change`, `purchase`)

---

## Tâches transversales (tout au long du projet)

### 🧪 Tests

- [ ] 🟠 Tests unitaires : guards, pipes, transformers, utils — cible 80% de coverage
- [ ] 🟠 Tests d'intégration : services + vraie DB (transactions rollback)
- [ ] 🟠 Tests E2E : 20 parcours critiques (register → login → apply → admin approve)
- [ ] 🟡 Tests composants React (Vitest + RTL + MSW)
- [ ] 🟡 Storybook — catalogue des composants `shared/ui/`

### 📄 Documentation

- [ ] 🟡 Swagger / OpenAPI auto-généré depuis les DTOs NestJS (`@nestjs/swagger`)
- [ ] 🟡 Documenter chaque variable dans `.env.example`
- [ ] 🟢 Storybook déployé sur staging pour les designers

### 🔁 Git & Process

- [ ] 🔴 Créer la branche `develop` depuis `main`
- [ ] 🔴 Protéger `main` (PR obligatoire + CI vert + 1 reviewer)
- [ ] 🟠 Configurer les templates de PR (`.github/pull_request_template.md`)
- [ ] 🟠 Configurer le linter commit message (Commitlint + Conventional Commits)

---

## Résumé du statut par phase

| Phase | Durée | Livrables clés |
|-------|-------|----------------|
| **Phase 1 — Foundation** | Mois 1–3 | Docker, DB, Auth, APIs core, Admin CRUD |
| **Phase 2 — Frontend Core** | Mois 2–4 | Landing, Login/Register, Dashboard, Calculateur, Admin panel |
| **Phase 3 — Cinematic 3D** | Mois 4–6 | Three.js hero, Coin viewer, Scroll storytelling |
| **Phase 4 — Scale & Prod** | Mois 7–12 | Sécurité, Mobile, i18n, K8s multi-région |

---
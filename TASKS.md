# MERGE STARS — Task Board



## PHASE 1 — Foundation 

### ⚙️ Infrastructure & DevOps

- [ ] 🔴 Configurer le `docker-compose.yml` (postgres, redis, backend, frontend)
- [ ] 🔴 Créer le fichier `.env.example` avec toutes les variables documentées
- [ ] 🔴 Vérifier que `docker compose up --build` fonctionne de bout en bout
- [ ] 🟠 Configurer `pg_bouncer` pour la gestion du pool de connexions PostgreSQL
- [ ] 🟠 Mettre en place GitHub Actions — pipeline CI (lint + tests + build)
- [ ] 🟠 Configurer ArgoCD pour le déploiement continu sur staging
- [ ] 🟡 Mettre en place les health checks `/api/health` (DB + Redis + MetalAPI)
- [ ] 🟡 Configurer Sentry (backend + frontend) pour la capture d'erreurs
- [ ] 🟢 Ajouter Prometheus + Grafana pour les métriques

---

### 🗄️ Backend — Socle

- [ ] 🔴 Initialiser la structure des modules NestJS (`auth`, `users`, `coins`, `metals`, `notifications`, `admin`)
- [ ] 🔴 Configurer TypeORM avec `typeorm.config.ts` et les scripts de migration
- [ ] 🔴 Créer les entités : `User`, `CoinApplication`, `Investment`, `MetalPrice`, `Notification`
- [ ] 🔴 Générer et exécuter la migration initiale
- [ ] 🔴 Implémenter `TransformInterceptor` — enveloppe universelle `{ data, meta }`
- [ ] 🔴 Implémenter `HttpExceptionFilter` — format d'erreur unifié `{ error: { code, message, statusCode } }`
- [ ] 🟠 Configurer `@nestjs/config` avec les fichiers typés (`app.config.ts`, `database.config.ts`, `redis.config.ts`, `jwt.config.ts`)
- [ ] 🟠 Configurer le `ThrottlerGuard` global (rate limiting)
- [ ] 🟠 Configurer le `ValidationPipe` global (class-validator)
- [ ] 🟡 Ajouter `helmet` et `cors` avec la whitelist des origines
- [ ] 🟡 Configurer le `LoggingInterceptor` — logs structurés JSON

---

### 🔐 Module Auth

- [ ] 🔴 `POST /api/v1/auth/register` — inscription en 3 étapes (Personal Info → Security → Agreement)
- [ ] 🔴 `POST /api/v1/auth/login` — retourne `accessToken` (15m) + `refreshToken` cookie HttpOnly (7j)
- [ ] 🔴 `POST /api/v1/auth/refresh` — rotation du refresh token
- [ ] 🔴 `POST /api/v1/auth/logout` — invalide le refresh token
- [ ] 🟠 Implémenter `JwtStrategy` et `JwtAuthGuard`
- [ ] 🟠 Implémenter `RolesGuard` + décorateur `@Roles()`
- [ ] 🟠 Implémenter le décorateur `@CurrentUser()`
- [ ] 🟡 Envoi du code de vérification par SMS/Email à l'inscription
- [ ] 🟡 `POST /api/v1/auth/forgot-password` et `POST /api/v1/auth/reset-password`
- [ ] 🟢 OAuth2 Google / Apple (login social)

---

### 👤 Module Users

- [ ] 🔴 `GET /api/v1/users/me` — profil de l'utilisateur connecté
- [ ] 🟠 `PATCH /api/v1/users/me` — mise à jour du profil
- [ ] 🟠 `GET /api/v1/users/me/notifications` — liste des notifications
- [ ] 🟡 `PATCH /api/v1/users/me/notifications/:id/read` — marquer comme lue

---

### 🪙 Module Coins (Applications)

- [ ] 🔴 `GET /api/v1/coins/applications` — liste des applications de l'utilisateur
- [ ] 🔴 `POST /api/v1/coins/applications` — soumettre une nouvelle application
- [ ] 🔴 `GET /api/v1/coins/applications/:id` — détail d'une application
- [ ] 🟠 Implémenter les transitions de statut : `submitted → under_review → sent_to_crystal → approved | rejected → funds_received → production_queue → in_production → quality_check → ready → delivered`
- [ ] 🟠 Émettre un événement de domaine `CoinApplicationStatusChanged` à chaque transition
- [ ] 🟡 Calcul de prix côté serveur basé sur les prix des métaux live

---

### 📊 Module Metals (Prix live)

- [ ] 🔴 `GET /api/v1/metals/live` — derniers prix (gold, silver, platinum, palladium)
- [ ] 🔴 Créer un `CronJob` (BullMQ) qui fetch les prix toutes les 30 secondes
- [ ] 🟠 Créer le `MetalsGateway` WebSocket — broadcast sur `/metals` toutes les 30s
- [ ] 🟡 Persister les prix dans `metal_prices` (time-series)

---

### 🏦 Module Investments

- [ ] 🟠 `GET /api/v1/investments` — liste des investissements de l'utilisateur
- [ ] 🟠 `GET /api/v1/investments/summary` — total investi + variation

---

### 🛠️ Module Admin

- [ ] 🔴 `GET /api/v1/admin/applications` — toutes les applications avec filtres (statut, type, date)
- [ ] 🔴 `GET /api/v1/admin/applications/:id` — détail complet + historique
- [ ] 🔴 `PATCH /api/v1/admin/applications/:id/status` — changer le statut (approve, reject, send-to-crystal)
- [ ] 🟠 `GET /api/v1/admin/users` — liste des utilisateurs
- [ ] 🟠 `GET /api/v1/admin/stats` — KPIs du tableau de bord admin (total apps, approved, rejected, en production)
- [ ] 🟡 Export CSV des applications (`GET /api/v1/admin/applications/export`)

---

### 🔔 Module Notifications

- [ ] 🟠 Créer le `NotificationsGateway` WebSocket — room par `user_id`
- [ ] 🟠 Processor BullMQ `notification.processor.ts` — persiste en DB puis push via WebSocket
- [ ] 🟡 Processor BullMQ `email.processor.ts` — envoi email via SendGrid aux transitions clés

--


*Mis à jour : Mai 2026*

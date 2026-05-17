# 🌌 MERGE ⭐ STARS

**Luxury Creative Technology Infrastructure — v1.0**

> This is not a website. This is a Digital Manufacturing Ecosystem, an AI-assisted 3D Creation Platform, and the foundation of a Future Physical-Digital Identity Network.

---

## URLs (Docker)

| Service | URL |
|---------|-----|
| **Frontend** | `http://localhost:8080` |
| **Backend** | `http://localhost:3000` |
| **API** | `http://localhost:3000/api/v1` |

---


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
---

*This is not a project. This is the future. 🌟*



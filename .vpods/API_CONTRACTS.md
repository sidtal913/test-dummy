# API contract registry

Provisional stubs are allowed so frontend is never frozen waiting on backend.
When a published contract exists, wire to it — do not ship a parallel mock store.

API CONTRACT REGISTRY:

| Route | Method | Owner | Spec | Notes |
|-------|--------|-------|------|-------|
| `/api/someone-create-branch-vpods-hire-was-not-found-o` | GET, POST | Knox / TAXI-19 | `spec/api.openapi.yaml` | GET reports `vpods/hire` on delivery repo; POST creates from `main` when `GITHUB_TOKEN` is set. |

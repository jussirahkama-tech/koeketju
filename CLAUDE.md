# CLAUDE.md

Persistent rules for this project. They apply in every session and to every task.

Product context: `docs/PRODUCT_BRIEF.md`
Architecture (once approved): `docs/ARCHITECTURE.md` is the source of truth for structure. When an approved change alters the architecture, update that file in the same change.
Legal/GDPR review list: `docs/LEGAL_REVIEW.md`

---

## 0. Current phase: single-user pilot

The application has one user: the owner. Sign-ups are disabled.

The goal of this phase is to find out whether the core concept works. It is not to build a multi-user platform.

The code must not prevent two possible later directions:
- a hosted multi-user service
- a local-first app where the user's data stays on their own device

Section 3 lists what is required now to keep both open. Do not build multi-user features beyond that unless explicitly asked.

## 1. AI never invents information about the user

AI may retrieve, summarize, combine, structure, rewrite, categorize, rank relevance and highlight evidence.

AI may not invent or infer experience, achievements, numbers, skills, responsibilities or career facts that are not supported by the user's own material.

This is a code-level requirement, not a prompt-level wish (see section 2).

## 2. Provenance is enforced in code

- Every AI operation that produces statements about the user returns structured output: a list of claims, each with one or more source references (entity type + id, or document chunk id).
- Claims without source references are rejected by validation. They are not shown as normal content.
- Numbers, percentages, dates, company names and job titles in generated text must appear in the cited source. Implement an automated check for this.
- Every generation is stored as a generation record: provider, model, prompt version, input source ids, output, timestamp.
- The user must be able to ask "why does it say this?" for any generated claim and see the cited sources.

## 3. Privacy and data handling in this phase

**Required now (cheap now, expensive to add later):**
- Every table containing user data has a `user_id` column and Row Level Security enabled, even though there is one user.
- Every vault item and every generated item has a visibility field. Values in this phase: `private` (default) and `published`. Store it so it can later be extended to a set of independent permissions (e.g. matching, profiles, public, share-on-request) without losing information.
- Generated content is `private` until the user explicitly publishes it.
- Published profiles are immutable, versioned snapshots. Public pages read only from snapshots, never from vault tables.
- All AI calls go through the internal AI service layer. It sends only what the task requires and logs which source items were sent.
- Full data export to a single portable package (structured data as JSON + original files). This doubles as backup and keeps a later move to local-first possible.
- Server-side permission checks for every read and write. Frontend checks are UX only.
- Private storage buckets and signed URLs for files.
- Secrets only in environment variables; never committed.

**Public endpoints (profile page and recruiter question form):**
- Expose only published snapshot data.
- The question form has rate limiting and basic spam protection.
- Recruiter data collected is minimal: name, email, organisation, question. Nothing else.

**Not built in this phase (unless explicitly asked):**
pseudonymisation, separation of identity and professional data, consent workflows, recruiter accounts, multi-user administration, matching across users.

## 4. Modular architecture

Modules (minimum): auth, profile, career-vault, documents, ingestion, retrieval, jobs, job-analysis, profile-generation, publishing, recruiter-questions, export, audit-log, ai-provider.

- Business logic lives in services, never in UI components.
- Modules talk to each other through typed service interfaces. No module reads another module's tables directly.
- All external input is validated (e.g. zod) at the boundary.
- All schema changes go through migrations.
- No duplicated logic. Shared needs go into a shared service or are exposed by one module.
- The AI provider is behind an interface. No provider SDK is imported outside the ai-provider module.
- Data access goes through a repository layer, so the storage backend could later be swapped (e.g. to local SQLite) without rewriting business logic.

## 5. Working process

For every task or phase:

1. Explain what will change.
2. List dependencies and which existing modules are affected.
3. Implement only that scope.
4. Write or update tests.
5. Run the full test suite and confirm existing functionality still works.
6. Stop for review.

Rules:
- Do not expand scope on your own. If you see something that should be done, list it as a suggestion.
- Do not rewrite working modules unless the task requires it.
- Prefer small changes.
- When requirements are unclear, ask. Do not fill gaps with assumptions and present them as decisions.

## 6. Tests that must always exist and pass

- Authentication (sign-ups disabled; unauthenticated access to private data fails)
- RLS: verified with a second test user that it cannot read the owner's data
- Public endpoints return only published snapshot data
- Publishing (nothing published without explicit action; snapshots immutable)
- Recruiter questions (no answer delivered without user approval)
- Provenance validation (uncited claims rejected; numbers checked against sources)
- Job analysis and evidence retrieval
- Data export produces a complete package

AI output quality is tested against an evaluation set built from the owner's own material (`tests/eval/`). It checks at least: invented facts, wrong numbers, missing citations, private content appearing in published output.

## 7. Legal and GDPR

Do not give legal conclusions. When a feature has legal or GDPR implications, add it to `docs/LEGAL_REVIEW.md` with a short description and mark the related code or doc section with `LEGAL_REVIEW:`.

## 8. Language

- The UI supports Finnish and English (i18n).
- User material and job postings may be in either language. Retrieval must work across languages; choose embedding models accordingly.
- Code, comments, commit messages and technical docs are in English.

## 9. Tech stack

- Next.js, React, TypeScript
- Tailwind CSS, component library where useful
- Supabase (PostgreSQL, Auth, Storage), EU region
- pgvector for embeddings
- AI through an internal provider-abstraction layer
- Git / GitHub
- Deployment kept provider-independent where reasonable

# Product Brief

Working name: Professional Knowledge Vault
Concept: a private professional knowledge base + an AI that presents the relevant parts of it for each opportunity, without inventing anything.

This document describes what the product is and why. Architecture decisions live in `docs/ARCHITECTURE.md`. Persistent working rules live in `CLAUDE.md`.

---

## 1. Current phase

Single-user pilot. The only user is the owner.

The pilot answers one question: does an opportunity-specific, evidence-based profile work better than a CV alone, and do recruiters use the follow-up question feature?

Only after the pilot is the direction decided:
- **A. Personal tool for many users** — each user manages their own vault. Could be hosted or local-first (data on the user's device, a small server only for published profiles and questions).
- **B. Talent platform** — recruiters search across users. Requires centrally searchable data, pseudonymisation and a consent model.

The pilot must not make either direction impossible (see `CLAUDE.md`, section 3).

## 2. Vision

This is not primarily a CV builder, job board, ATS or cover-letter generator.

A person builds a deep professional knowledge base about themselves once. AI uses it to present the relevant parts of their experience, knowledge and thinking depending on context.

Long-term shift:
job posting → CV → application → interview
towards:
need → evidence-based matching → dialogue → refined fit → connection.

## 3. Career Vault

The user can store much more than a CV contains: career history, roles, responsibilities, projects, achievements, KPIs, education, certifications, skills, leadership experience, industry and systems knowledge, articles, LinkedIn posts, presentations, documents, professional opinions, leadership philosophy, problem-solving examples, lessons learned, ambitions, working style, values, interests and reflections relevant to professional behaviour.

"Soft" material is allowed because a future question may make it relevant.

Everything is private by default.

Storage combines structured relational data, original documents, normalized knowledge items and semantic embeddings. Not everything as unstructured text.

## 4. Job application flow

1. User adds a job posting as pasted text. (URL import and document upload: later.)
2. AI extracts: role, responsibilities, required and preferred skills, leadership expectations, industry and technical requirements, behavioural expectations, business challenges, keywords, possible underlying needs.
3. AI compares requirements against the Career Vault and creates evidence matches.
4. For each match, AI explains why the evidence is relevant, with source references.

Example:
Requirement: "Experience developing automotive aftersales operations"
Evidence: aftersales management role; workshop sales +165%; parts sales +170%; hourly revenue +160%; NPS +26 points. Each item links to its source.

## 5. Opportunity-specific profile

A landing page generated for one opportunity. Not a reproduction of the CV.

It answers: who is this person, why are they relevant to this role, what evidence supports that, how do they think about the key issues of this role, what have they achieved.

Possible sections: introduction, why this opportunity, key experience, selected achievements, relevant projects, relevant thinking, selected writing, timeline, skills, contact / next step.

The user reviews and edits everything before publishing. Nothing is published automatically. Published versions are immutable snapshots.

## 6. Recruiter questions

A recruiter viewing a published profile can submit a limited number of follow-up questions through a form (no account).

1. System searches the Career Vault for relevant material.
2. If material is found, the user is told so and receives a draft answer built only from that material, with sources.
3. If nothing is found, the user is asked to answer.
4. In both cases the user approves, edits, rewrites, declines or answers from scratch.
5. Only an approved answer is delivered to the recruiter.

Found material is never disclosed automatically.

Open for architecture phase: how the answer is delivered (e.g. email or a private answer link), and how abuse is limited.

## 7. Profile learning

After answering a new question, the user is asked whether to save the answer to the Career Vault. If yes: store, tag, embed, record source. AI-generated assumptions are never silently added.

## 8. Pilot scope

Included:
sign in → profile → upload career material → Career Vault → add job (pasted text) → job analysis → evidence retrieval → opportunity-specific profile → review → publish shareable link → recruiter submits question → vault search → draft answer → user approves/edits → recruiter receives answer → optionally save answer to vault. Plus full data export.

Excluded: other users, sign-ups, recruiter accounts, matching across users, pseudonymisation, consent workflows, recruiter challenges, conversational onboarding, URL/document job import.

## 9. Views

Dashboard · My Profile · Career Vault (Documents, Career Experiences, Skills & Expertise, Achievements, Thoughts & Insights) · Job Opportunities · Job Analysis · Evidence Matches · Profile Builder · Public Opportunity Profile · Recruiter Questions · Answer Review · Data Export

Keep the UI simple.

## 10. UX principle

"Tell the system who you really are once", not "fill out another form".

Later: conversational onboarding where AI asks, the user answers naturally, AI proposes extracted company / project / role / challenge / action / result / skills, and the user confirms. Not in the pilot.

## 11. Later directions (not built now)

Recruiter challenges, pseudonymous talent discovery, recruiter and company accounts, career recommendations, AI-assisted interview preparation, career path exploration, skills gap analysis.

Known risk for direction B: detailed achievements can identify a person even without a name, especially in a small market. This must be solved before any recruiter search is built.

## 12. Items requiring legal review

Flagged, not concluded. They go into `docs/LEGAL_REVIEW.md`.

Relevant to the pilot:
- AI provider terms: whether data sent through the API is retained or used for training; data location.
- Recruiter personal data collected through the question form: what is stored, for how long, and what the recruiter is told.

Relevant before opening to other users:
- Service provider responsibilities for user data (hosted model), or for published data only (local-first model).
- GDPR special categories in free-form reflections (e.g. health, religion).
- EU AI Act classification, especially for any recruiter-side matching or candidate evaluation.
- Pseudonymisation vs. re-identification risk.
- Deletion: effect on published snapshots and on answers already delivered to recruiters.

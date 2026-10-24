# Legal and GDPR Review List

Items flagged for legal review. **No legal conclusions are made here.** Each item describes the question and where it appears in the product or code. Code and docs related to an item carry a `LEGAL_REVIEW:` marker.

Status values: `open` (not reviewed), `reviewed` (reviewer's outcome recorded separately).

---

## A. Relevant to the pilot

### A1. AI provider terms — generation
Status: open
Source: PRODUCT_BRIEF §12
Whether data sent through the API is retained, for how long, whether it is used for training, where it is processed and stored, and what contractual terms (DPA) apply. Concerns every flow in `ARCHITECTURE.md` §6.4.

### A2. AI provider terms — embeddings
Status: open
Source: new (ARCHITECTURE §3, §7.3)
The embedding provider may be a different company from the generation provider. Same questions as A1. All vault text and document chunks are sent to it during ingestion.

### A3. Recruiter personal data collected through the question form
Status: open
Source: PRODUCT_BRIEF §12, ARCHITECTURE §5.5, §6.3
Fields stored: name, email, organisation, question. Questions: what the recruiter is told (privacy notice on the form), legal basis, retention period, who the controller is (the owner as a private individual, or a service provider), and how a recruiter can request access/deletion.

### A4. IP-derived data for rate limiting
Status: open
Source: new (ARCHITECTURE §6.3, open question Q8)
Rate limiting requires processing a transient key derived from the visitor's IP address. CLAUDE.md limits recruiter data to four fields. Question: whether and how this processing is acceptable, and for how long the key may be kept.

### A5. Third-party CAPTCHA (if used)
Status: open
Source: new (ARCHITECTURE §6.3)
A third-party CAPTCHA service would process visitor data and possibly set cookies.

### A6. Transactional email provider
Status: open
Source: new (ARCHITECTURE §4 `mailer`, §11 Q14, Q15)
Recruiter email addresses and possibly answer content pass through an email provider. Data location and terms. Whether the answer text should be in the email or only behind a link affects how many copies exist.

### A7. Hosting and database location, sub-processors
Status: open
Source: new (ARCHITECTURE §3)
Supabase (EU region) and the Next.js hosting provider. Where data and logs are processed, sub-processor lists, transfers outside the EU (including provider support access and logs).

### A8. Third-party personal data inside the owner's material
Status: open
Source: new (ARCHITECTURE §6.4)
Documents (CVs, presentations, posts) can contain names and details of colleagues, references or clients. These are stored, chunked, embedded and may be sent to AI providers and appear in published profiles.

### A9. Generation records and logs containing personal data
Status: open
Source: new (ARCHITECTURE §5.3)
`ai_generations` stores model output (which contains vault content) and source references. Retention period and whether outputs must be redacted when a source item is deleted.

### A10. Public profile pages: indexing and visibility
Status: open
Source: new (ARCHITECTURE §6.3, Q10)
Published pages are reachable by anyone with the link. Whether they should be excluded from search engines, and what the page must disclose.

### A11. Disclosure of AI-generated content on the public page
Status: open
Source: new
Whether the public profile or recruiter answers must state that text was drafted with AI assistance (EU AI Act transparency provisions, or other rules).

### A12. Pilot measurement / analytics
Status: open
Source: new (ARCHITECTURE Q11)
Any view counting or analytics on public pages processes visitor data and may require cookie consent.

### A13. Data export contents
Status: open
Source: new (ARCHITECTURE §11, export format)
The export includes recruiter questions and personal data of recruiters. Whether including it is appropriate and how it should be handled.

### A14. Evaluation set containing the owner's personal data
Status: open
Source: new (ARCHITECTURE §9, Q12, Q17)
The eval set is built from the owner's real material and is sent to AI providers during eval runs. Storage location and whether any of it may be committed to the repository.

### A15. Deletion in the pilot
Status: open
Source: PRODUCT_BRIEF §12 (listed there for later; partly relevant now), ARCHITECTURE §5.8
Effect of deleting a source item on published snapshots and on answers already delivered to recruiters; deletion of recruiter data on request; backups held by the database provider after deletion.

## B. Relevant before opening to other users

### B1. Service provider responsibilities
Status: open
Source: PRODUCT_BRIEF §12
Hosted model: responsibilities for all user data. Local-first model: responsibilities for published data and recruiter questions only. Controller/processor roles in each case.

### B2. GDPR special categories in free-form reflections
Status: open
Source: PRODUCT_BRIEF §12
Thoughts, values and reflections may contain health, religion, political opinions, union membership, etc.

### B3. EU AI Act classification
Status: open
Source: PRODUCT_BRIEF §12
Especially for recruiter-side matching or candidate evaluation (direction B). Also whether the pilot's job analysis / evidence matching falls under any category.

### B4. Pseudonymisation vs. re-identification risk
Status: open
Source: PRODUCT_BRIEF §11–12
Detailed achievements can identify a person without a name, especially in a small market.

### B5. Deletion at scale
Status: open
Source: PRODUCT_BRIEF §12
Effect on published snapshots and delivered answers for many users; account deletion; retention in backups.

### B6. Consent model for recruiter search
Status: open
Source: PRODUCT_BRIEF §1 (direction B)
Required before any cross-user search is built.

### B7. Terms of service and privacy notice for users
Status: open
Source: new
Needed when anyone other than the owner uses the service.

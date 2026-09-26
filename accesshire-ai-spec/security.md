# AccessHire AI — Security Requirements

## Authentication
- hash passwords with Argon2id or bcrypt
- secure HTTP-only cookies
- CSRF protection where applicable
- rate limit login

## Authorization
Every protected resource must verify ownership.

A user must not access another user's:
- resume
- application
- accessibility profile
- saved jobs
- AI conversations

## File Uploads
- allow PDF/DOCX only for MVP
- enforce size limits
- validate MIME/type
- generate safe filenames
- never execute uploaded files
- store outside executable paths

## AI Security
- treat model output as untrusted
- never let AI output directly execute database commands
- validate tool/action parameters
- prevent prompt injection from job descriptions/resumes from changing system policy
- isolate system instructions from user/job content

## Privacy
- minimize stored personal information
- do not store raw voice recordings by default
- provide deletion capability for resumes and application data
- do not expose private resume content in URLs or logs

## Secrets
Never commit:
- API keys
- JWT secrets
- database passwords

Use `.env`.

## Logging
Log:
- request ID
- endpoint
- status
- latency
- non-sensitive error code

Do not log:
- passwords
- tokens
- full resumes
- application answers
- raw AI conversations unless explicitly needed for the demo

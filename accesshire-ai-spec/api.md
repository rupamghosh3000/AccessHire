# AccessHire AI — API Contract

Base:
`/api/v1`

## Auth
`POST /auth/register`
`POST /auth/login`
`POST /auth/logout`
`GET /auth/me`

## Accessibility
`GET /accessibility-profile`
`PUT /accessibility-profile`

## Jobs
`GET /jobs`
`GET /jobs/:id`
`POST /jobs/:id/save`
`DELETE /jobs/:id/save`
`GET /jobs/saved`

## AI
`POST /ai/job-explain`
`POST /ai/job-match`
`POST /ai/translate`
`POST /ai/assistant`

## Resume
`POST /resumes`
`GET /resumes`
`GET /resumes/:id`
`DELETE /resumes/:id`

## BarrierLens
`GET /jobs/:id/barrier-report`
`POST /jobs/:id/barrier-report/refresh`

## Application Preview
`GET /jobs/:id/application-preview`

## Applications
`POST /applications`
`GET /applications`
`GET /applications/:id`
`PATCH /applications/:id`
`POST /applications/:id/confirm-submit`

## Response Format

Success:
```json
{
  "success": true,
  "data": {}
}
```

Error:
```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Human-readable message",
    "details": {}
  }
}
```

Never return secrets, password hashes, internal stack traces, or provider keys.

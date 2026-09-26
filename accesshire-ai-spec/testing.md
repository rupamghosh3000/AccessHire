# AccessHire AI — Testing Strategy

## Unit
Test:
- validators
- accessibility preference logic
- job matching logic
- barrier scoring
- application state transitions
- AI response parsing

## Component
Test:
- job cards
- search
- accessibility controls
- application fields
- BarrierLens
- voice control states
- modals

## Integration
Test:
- auth
- job search
- resume upload
- AI endpoints
- application persistence
- accessibility profile persistence

## E2E
Critical path:

1. Register
2. Configure accessibility
3. Search job
4. Open job
5. Explain job
6. Upload resume
7. Match job
8. Open BarrierLens
9. Try application
10. Complete fields
11. Review
12. Confirm submission
13. Verify tracker

## Accessibility E2E
- keyboard-only flow
- focus order
- dialog focus
- form errors
- reduced motion
- screen-reader-friendly names
- responsive reflow

## 3D
Test:
- WebGL available
- WebGL unavailable
- reduced motion
- 3D disabled
- slow connection/loading
- mobile viewport

## Failure Cases
- AI unavailable
- job API unavailable
- resume parsing fails
- malformed resume
- network interruption
- expired session
- invalid application field
- duplicate submission attempt

## Definition of Done
No critical path should depend on a successful AI response.
Every AI-dependent feature has a useful fallback state.

# AccessHire AI — Accessibility Requirements

## Target
WCAG 2.2 AA.

## Keyboard
- all interactive elements reachable
- logical order
- no keyboard traps
- skip-to-content link
- visible focus
- dialog focus management

## Screen Reader
- semantic landmarks
- headings
- labels
- button names
- status announcements
- errors associated with fields
- meaningful link text

## Visual
- sufficient contrast
- no color-only meaning
- text resizable
- responsive reflow
- large click/tap targets

## Forms
Every field:
- label
- instructions when needed
- required/optional state
- validation
- accessible error message

## Voice
Voice features:
- have visual alternatives
- show listening state
- provide stop/cancel
- never submit automatically

## Motion
Respect `prefers-reduced-motion`.
Disable:
- auto camera movement
- looping decorative motion
- parallax-heavy transitions

## 3D
Every important 3D concept must have an equivalent HTML/SVG representation.

## Testing
Test with:
- keyboard only
- Chrome accessibility tree
- NVDA or equivalent screen reader where available
- reduced motion
- high contrast
- mobile viewport

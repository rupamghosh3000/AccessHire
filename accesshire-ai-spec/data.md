# AccessHire AI — Data Model

## User
```text
id: ObjectId
name: string
email: string
passwordHash: string
accessibilityProfileId: ObjectId
createdAt: Date
updatedAt: Date
```

## AccessibilityProfile
```text
id: ObjectId
userId: ObjectId
voiceEnabled: boolean
keyboardFirst: boolean
screenReaderOptimized: boolean
highContrast: boolean
reducedMotion: boolean
fontScale: number
voiceSpeed: number
preferredLanguage: string
updatedAt: Date
```

## Job
```text
id: ObjectId
title: string
company: string
location: string
workMode: "remote" | "hybrid" | "onsite"
experienceLevel: string
description: string
requiredSkills: string[]
preferredSkills: string[]
salaryRange?: object
applicationUrl?: string
source: string
createdAt: Date
updatedAt: Date
```

## Resume
```text
id: ObjectId
userId: ObjectId
fileName: string
fileType: string
fileUrl: string
extractedText: string
skills: string[]
education: object[]
experience: object[]
createdAt: Date
updatedAt: Date
```

## JobMatch
```text
id: ObjectId
userId: ObjectId
jobId: ObjectId
matchedRequirements: object[]
potentialGaps: object[]
uncertainRequirements: object[]
explanation: string
createdAt: Date
```

## BarrierReport
```text
id: ObjectId
jobId: ObjectId
voiceSupport: "supported" | "not_detected" | "unknown"
keyboardSupport: "supported" | "not_detected" | "unknown"
screenReaderSupport: "supported" | "not_detected" | "unknown"
formComplexity: "low" | "medium" | "high" | "unknown"
externalDependencies: string[]
detectedBarriers: object[]
suggestedWorkarounds: object[]
confidence: number
generatedAt: Date
```

## Application
```text
id: ObjectId
userId: ObjectId
jobId: ObjectId
status: "saved" | "started" | "submitted" | "under_review" | "interview" | "offer" | "rejected" | "withdrawn"
accessibilityMode: "standard" | "simplified" | "voice" | "keyboard"
applicationData: object
startedAt?: Date
submittedAt?: Date
updatedAt: Date
```

## SavedJob
```text
id: ObjectId
userId: ObjectId
jobId: ObjectId
createdAt: Date
```

## AIConversation
```text
id: ObjectId
userId: ObjectId
contextType: string
messages: object[]
createdAt: Date
updatedAt: Date
```

## ApplicationPreview
This is simulated data and must be clearly separated from real employer application data.

```text
id: ObjectId
jobId: ObjectId
steps: object[]
complexityScore: number
detectedBarriers: object[]
createdAt: Date
```

## Data Rules
- Use ObjectId references consistently.
- Never create duplicate fields for the same concept.
- Store normalized enums where possible.
- Never store raw secrets.
- Do not store sensitive voice recordings by default.
- Do not store AI prompts containing unnecessary personal information.

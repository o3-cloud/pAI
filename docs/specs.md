# pAI Specs System: Structured AI Output Framework

## Overview

The pAI specs system is a comprehensive framework for extracting structured, actionable insights from unstructured content using AI. It provides 14 specialized extractors that transform raw text into structured JSON data, enabling automated analysis, decision support, and workflow integration.

## Table of Contents

- [What are Specs?](#what-are-specs)
- [System Architecture](#system-architecture)
- [Available Extractors](#available-extractors)

## What are Specs?

Specs are JSON Schema-based templates that define how to extract specific types of information from content. They consist of two main components:

1. **Extractors**: Low-level schemas that extract specific data types (summaries, action items, risks, etc.)
2. **Artifacts**: High-level business document templates that combine multiple extractors

The specs system turns this:
```
"The new authentication system needs to be implemented by Q2. There are security concerns about the current approach, and we should consider OAuth 2.0 integration."
```

Into this:
```json
{
  "summary": "Implementation of new authentication system with OAuth 2.0 consideration",
  "action_items": ["Implement new auth system by Q2", "Evaluate OAuth 2.0 integration"],
  "risks": ["Current authentication approach has security vulnerabilities"],
  "timeline": "Q2 deadline"
}
```

## System Architecture

### Two-Layer Design

```
┌─────────────────────────────────────────┐
│            Artifacts Layer              │
│   (Business Documents & Reports)        │
│ ┌─────────────┐ ┌─────────────────────┐ │
│ │   PRD       │ │   Status Report     │ │
│ │  Meeting    │ │   Risk Assessment   │ │
│ │  Minutes    │ │   Action Plan       │ │
│ └─────────────┘ └─────────────────────┘ │
└─────────────────────────────────────────┘
                    │
                    ▼
┌─────────────────────────────────────────┐
│           Extractors Layer              │
│      (Analytical Components)            │
│ ┌─────┐ ┌─────┐ ┌─────┐ ┌─────────────┐ │
│ │Sum- │ │Act- │ │Risk │ │   Tags      │ │
│ │mary │ │ions │ │Anal │ │ Critique    │ │
│ │     │ │     │ │ysis │ │ Reasoning   │ │
│ └─────┘ └─────┘ └─────┘ └─────────────┘ │
└─────────────────────────────────────────┘
```

### Directory Structure

```
specs/
├── extractors/          # 14 analytical extractors
│   ├── summary.json
│   ├── action-items.json
│   ├── risks.json
│   └── ...
└── artifacts/           # 30+ business templates
    ├── prd.json
    ├── meeting-minutes.json
    └── ...
```

## Available Extractors

### Simple Extractors
| Extractor | Purpose | Use Cases |
|-----------|---------|-----------|
| `summary` | Content summarization | Executive briefings, status updates |
| `action-items` | Task identification | Project management, meeting follow-ups |
| `tags` | Content categorization | Organization, search optimization |

### Medium Complexity Extractors
| Extractor | Purpose | Use Cases |
|-----------|---------|-----------|
| `pros-cons` | Decision analysis | Technology evaluation, strategic choices |
| `risks` | Risk identification | Project planning, security assessment |
| `reasoning` | Justification extraction | Decision documentation, rationale capture |
| `improvements` | Enhancement suggestions | System optimization, process refinement |
| `followup-questions` | Inquiry generation | Requirements gathering, investigation |
| `missing-info` | Gap identification | Requirement validation, completeness checks |

### Complex Extractors
| Extractor | Purpose | Use Cases |
|-----------|---------|-----------|
| `plan` | Step-by-step planning | Implementation roadmaps, procedures |
| `critique` | Critical evaluation | Code reviews, proposal analysis |
| `instructions` | Procedure extraction | Documentation, training materials |
| `ideation` | Creative brainstorming | Innovation workshops, feature planning |
| `reframe` | Perspective shifting | Stakeholder analysis, alternative viewpoints |

The specs system transforms unstructured content into structured, actionable data—making your pAI agents more analytical, precise, and valuable for complex workflows.
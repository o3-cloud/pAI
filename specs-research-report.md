# pAI Specs System Research Report

## Executive Summary

This report documents the specifications (specs) system in the pAI (Personal AI) project, focusing on the structured data extraction capabilities provided by JSON Schema-based extractors. The specs system consists of two main components: **artifacts** (high-level business documents) and **extractors** (analytical operations for structured data extraction).

## What Are Specs?

The **specs** system in pAI is a collection of JSON Schema definitions that standardize how AI agents structure their outputs. Located in the `/specs/` directory, it serves two primary functions:

1. **Data Structure Standardization**: Ensures consistent output formats across different AI agents
2. **Structured Information Extraction**: Enables systematic analysis and processing of text content

## System Architecture

### Directory Structure

```
specs/
├── artifacts/          # High-level business document schemas
│   ├── meeting_summary.schema.json
│   ├── prd.schema.json
│   ├── incident_report.schema.json
│   └── [28+ other business artifacts]
└── extractors/         # Analytical operation schemas  
    ├── summary.schema.json
    ├── action-items.schema.json
    ├── risks.schema.json
    └── [11+ other extractors]
```

### Two-Tier Design

1. **Artifacts** (`specs/artifacts/`): Complex business documents
   - Meeting summaries, PRDs, incident reports
   - Multi-field structured documents
   - Domain-specific templates

2. **Extractors** (`specs/extractors/`): Fundamental analytical operations
   - Simple information extraction patterns
   - Reusable across different contexts
   - Building blocks for more complex analysis

## Extractor Categories

### Simple List Extractors
- **summary**: Extract brief summaries of content
- **action-items**: Extract actionable items from text
- **risks**: Extract potential risks or concerns
- **tags**: Extract keywords and categorization labels
- **critique**: Extract critical assessments
- **ideation**: Extract brainstormed ideas
- **improvements**: Extract improvement suggestions
- **followup-questions**: Extract follow-up questions
- **missing-info**: Extract missing information gaps
- **reasoning**: Extract reasons and justifications

### Complex Structured Extractors
- **plan**: Extract structured plans with ordered steps
- **pros-cons**: Extract advantages and disadvantages
- **instructions**: Extract instructions with confidence levels
- **reframe**: Reframe content from different perspectives

## Schema Standards

All extractors follow JSON Schema Draft-07 specification with:

- **Consistent Structure**: Standard `$schema`, `title`, `type`, `description` fields
- **Required Fields**: Clearly defined mandatory properties
- **Type Safety**: Explicit data type definitions
- **Documentation**: Descriptive text for all properties

### Example Schema Structure

```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "ActionItemList", 
  "type": "object",
  "description": "A list of action items extracted from a text.",
  "properties": {
    "action_items": {
      "type": "array",
      "items": {
        "type": "string",
        "description": "A single action item extracted from the text."
      }
    }
  },
  "required": ["action_items"]
}
```

## Usage Patterns (Intended)

Based on the system architecture, extractors are designed for:

### 1. Structured AI Output
- Integration with OpenAI's structured output features
- Consistent response formatting across agents
- Reliable downstream processing

### 2. Multi-Step Analysis
- Chain different extractors together
- Progressive information refinement
- Comprehensive content analysis

### 3. Agent Workflow Integration
- FastAgent framework compatibility
- MCP protocol standardization
- Cross-agent data exchange

## Demonstration: Extractor Usage

Using the task description as sample input: *"Research this project to document what specs. Use the specs/extractors to extract useful info as json. Compile the extracted json onto a markdown formatted report for review and approval"*

### Applied Extractors

**Summary Extractor:**
```json
{
  "summary": "Research project specs system, use extractors to generate JSON data, and compile findings into a markdown report"
}
```

**Action Items Extractor:**
```json
{
  "action_items": [
    "Research and document the specs functionality in the project",
    "Use specs/extractors to extract information as JSON", 
    "Compile extracted JSON data into a markdown report",
    "Present report for review and approval"
  ]
}
```

**Plan Extractor:**
```json
{
  "plan_steps": [
    {"step": "Explore project structure to understand what 'specs' are"},
    {"step": "Research specs/extractors functionality and implementation"},
    {"step": "Execute extractors to generate JSON data"},
    {"step": "Compile findings into a comprehensive markdown report"},
    {"step": "Present for review and approval"}
  ]
}
```

## Current Implementation Status

### ✅ Completed
- **Schema Design**: All 14 extractors are well-defined with proper JSON Schema
- **Business Artifacts**: 30+ artifact schemas for various business documents
- **Documentation**: Schema files include clear descriptions and examples

### ❌ Missing/Not Implemented
- **Integration Code**: No Python/JavaScript implementations found
- **Agent Integration**: Current agents don't use these schemas
- **Usage Documentation**: No guides on how to apply extractors
- **Validation Tools**: No schema validation utilities
- **Examples**: Limited working examples of extractor usage

### 🔄 Recent Activity
- Added in commit `7b5e524` (Merge pull request #26)
- Schemas are complete but integration pending

## Integration Opportunities

### With Existing Agents

1. **Gmail Curator**: Could extract action items, risks, and summaries from emails
2. **Newsletter Processor**: Could extract summaries, tags, and key insights
3. **PR Diff Auditor**: Could extract risks, improvements, and critique points

### With FastAgent Framework

```python
# Proposed integration pattern
@fast.agent(
    name="content_analyzer",
    instruction="Extract structured information using predefined schemas",
    output_schema="specs/extractors/summary.schema.json"
)
async def analyze_content(text: str) -> dict:
    # Agent implementation using schema
    pass
```

## Recommendations

### Immediate Actions
1. **Create Integration Library**: Develop Python utilities to load and validate schemas
2. **Update Agent Templates**: Modify existing agents to use extractor schemas
3. **Add Usage Examples**: Create comprehensive examples for each extractor
4. **Documentation**: Write integration guides and best practices

### Medium-Term Enhancements
1. **Validation Framework**: Build schema validation and testing tools
2. **Chaining System**: Create workflows that chain multiple extractors
3. **Performance Optimization**: Optimize for token usage and response time
4. **Custom Extractors**: Allow users to define domain-specific extractors

### Long-Term Vision
1. **Agent Marketplace**: Shareable extractors and agents using standard schemas
2. **Automatic Discovery**: AI-driven selection of appropriate extractors
3. **Multi-Modal Support**: Extend schemas for image and audio processing
4. **Cross-Platform Integration**: Support for multiple AI providers and frameworks

## Technical Specifications

### Schema Compliance
- **Standard**: JSON Schema Draft-07
- **Validation**: All schemas are syntactically valid
- **Consistency**: Uniform structure and naming conventions

### File Naming Convention
- **Format**: `{extractor-name}.schema.json`
- **Examples**: `action-items.schema.json`, `pros-cons.schema.json`
- **Consistency**: Kebab-case naming throughout

### Integration Requirements
- **Python 3.8+**: For FastAgent framework compatibility
- **JSON Schema Library**: For validation and processing
- **OpenAI API**: For structured output capabilities

## Conclusion

The pAI specs system represents a well-designed foundation for structured AI output, with particular strength in the extractor schemas. While the current implementation focuses on schema definition, the next phase should prioritize practical integration with existing agents and workflows.

The extractor system has significant potential to:
- Standardize AI agent outputs across the pAI ecosystem
- Enable sophisticated multi-step analysis workflows  
- Improve reliability and processing of AI-generated content
- Support the development of more intelligent and capable personal AI systems

**Status**: Foundation complete, implementation phase needed
**Priority**: High - critical for advancing pAI agent capabilities
**Next Steps**: Begin integration with FastAgent framework and existing agents

---

*This report was generated as part of issue #27 research into the pAI specs system.*
# Shared Code

This directory contains code shared between openclaw (content generation) and webapp (frontend).

## Files

- **types.ts** - TypeScript type definitions for Post, ContentType, and Agent
- **config.ts** - Shared configuration constants

## Usage

### In webapp (TypeScript)
```typescript
import type { Post } from '@/shared/types';
```

### In openclaw (JavaScript)
```javascript
// Use JSDoc for type hints
/**
 * @typedef {import('../../shared/types').Post} Post
 */
```

Or just import directly:
```javascript
import { Post } from '../../shared/types.js';
```

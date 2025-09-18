# Technology Stack

## Core Technologies
- **Runtime**: Node.js
- **Language**: TypeScript (ES2016 target, CommonJS modules)
- **Web Framework**: Express.js 4.x
- **File Upload**: Multer middleware
- **Testing**: Jest with ts-jest preset

## Build System & Commands

### Essential Commands
```bash
# Install dependencies
npm install

# Build the project (TypeScript compilation)
npm run build
# or directly: tsc

# Run tests
npm test

# Start the application
npm start

# Full build and test cycle
npm run build && npm test
```

### Build Process
- TypeScript files compile to `dist/` directory
- Test assets (PDF/JPG files) are copied to `dist/tests/` during build
- Uploads directory is cleaned after tests

## Development Dependencies
- TypeScript compiler and type definitions
- Jest testing framework with TypeScript support
- Supertest for HTTP endpoint testing
- Type definitions for Express, Multer, Node.js

## File Structure Conventions
- Source files: `.ts` extension in project root
- Compiled output: `dist/` directory
- Static assets: `public/` directory
- Test files: `tests/` directory with `.test.ts` suffix
- Uploads: `uploads/` directory (created at runtime)

## TypeScript Configuration
- Strict mode enabled
- ES2016 target with CommonJS modules
- Force consistent casing in file names
- Skip lib check for faster compilation
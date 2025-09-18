# Project Structure

## Root Level Organization
```
├── index.ts          # Main application logic (Express routes, middleware)
├── server.ts         # Server entry point (port configuration, app.listen)
├── package.json      # Dependencies and npm scripts
├── tsconfig.json     # TypeScript compiler configuration
├── jest.config.js    # Jest testing configuration
└── README.md         # Project documentation and demo instructions
```

## Directory Structure
```
├── public/           # Static web assets served by Express
│   └── index.html    # Frontend HTML with upload form
├── tests/            # Test files and test assets
│   ├── *.test.ts     # Jest test files
│   ├── test.pdf      # Test PDF file for upload tests
│   └── test.jpg      # Test image file for validation tests
├── uploads/          # Runtime directory for uploaded files
├── dist/             # Compiled TypeScript output (generated)
└── node_modules/     # npm dependencies (generated)
```

## Architecture Patterns

### Separation of Concerns
- `index.ts`: Application logic, routes, and middleware configuration
- `server.ts`: Server startup and port binding
- `public/`: Frontend presentation layer
- `tests/`: Test suite with comprehensive coverage

### File Upload Flow
1. Frontend form submits to `/upload` endpoint
2. Multer middleware processes multipart/form-data
3. File validation (PDF mimetype only)
4. Files stored in `uploads/` directory
5. Download via `/download/:filename` endpoint

### Testing Strategy
- Unit tests for all endpoints (upload, download, error cases)
- Binary file handling for PDF upload/download verification
- Temporary directories for test isolation
- Cleanup after test runs

## Code Organization Principles
- Export app instance from `index.ts` for testing
- Use TypeScript strict mode for type safety
- Minimal dependencies (Express, Multer, testing tools)
- Clear separation between server startup and application logic
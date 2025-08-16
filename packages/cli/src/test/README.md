# Error Handling Test Suite

This directory contains comprehensive tests for the error handling
implementation in the SAP DevSpace CLI.

## Test Suites

### 1. Error Boundary Tests (`errorBoundaryTests.tsx`)

Tests React Error Boundaries with different error scenarios:

- **Synchronous errors**: Errors thrown directly in render
- **Async errors**: Promise rejections and setTimeout errors
- **useEffect errors**: Errors thrown in useEffect hooks
- **Interactive errors**: User-triggered errors

**Run with:**

```bash
# Node.js (tsx)
npm run test:error-boundaries

# Bun
npm run test:bun:error-boundaries

# Deno
npm run test:deno:error-boundaries
```

### 2. Error Scenario Tests (`errorScenarios.tsx`)

Tests different error types and custom error classes:

- **DevSpaceError**: Custom error with DevSpace context
- **AuthenticationError**: Custom error with auth context
- **NetworkError**: Custom error with network context
- **Generic Error**: Standard JavaScript Error
- **Async/Promise errors**: Global handler testing
- **Nested Error Boundaries**: Multi-level error handling

**Run with:**

```bash
# Node.js (tsx)
npm run test:error-scenarios

# Bun
npm run test:bun:error-scenarios

# Deno
npm run test:deno:error-scenarios
```

### 3. PostHog Integration Tests (`posthogTest.tsx`)

Tests PostHog error tracking integration:

- **Client initialization**: Verifies PostHog client setup
- **Basic error capture**: Tests simple error logging
- **Custom error capture**: Tests DevSpace/Auth error logging
- **Rich context capture**: Tests detailed context data
- **Event flushing**: Tests PostHog event delivery

**Run with:**

```bash
# Node.js (tsx)
npm run test:posthog

# Bun
npm run test:bun:posthog

# Deno
npm run test:deno:posthog
```

### 4. Comprehensive Test Suite (`testSuite.tsx`)

Interactive menu to run all test suites:

- **Environment info**: Shows current configuration
- **Test selection**: Choose which tests to run
- **Navigation**: Easy switching between test suites

**Run with:**

```bash
# Node.js (tsx)
npm run test:errors

# Bun
npm run test:bun:errors

# Deno
npm run test:deno:errors
```

## Development Mode Testing

### DevSpaceCreate Component Testing

The `DevSpaceCreate` component includes built-in error testing in development
mode:

1. **Enable development mode:**
   ```bash
   npm run dev:test
   ```

2. **Navigate to DevSpace creation**

3. **Press 't' to cycle through error tests:**
   - `none`: Normal operation
   - `sync`: Synchronous error
   - `async`: Asynchronous error
   - `devspace`: DevSpaceError
   - `auth`: AuthenticationError

## Environment Setup

### Required Environment Variables

```bash
# PostHog integration (optional)
POSTHOG_API_KEY=your_posthog_api_key

# Disable tracking (optional)
DO_NOT_TRACK=1
DS_TELEMETRY=0

# Development mode
NODE_ENV=development
```

### PostHog Testing

To test PostHog integration:

1. Set `POSTHOG_API_KEY` in your environment
2. Ensure `DO_NOT_TRACK` is not set to `1`
3. Run PostHog tests
4. Check your PostHog dashboard for test events

## Test Coverage

### What Gets Tested

✅ **React Error Boundaries** - Component error catching\
✅ **Global Error Handlers** - Uncaught exceptions\
✅ **Promise Rejection Handlers** - Unhandled rejections\
✅ **Custom Error Classes** - DevSpace-specific errors\
✅ **PostHog Integration** - Error tracking and context\
✅ **Error Context** - Rich debugging information\
✅ **Nested Error Boundaries** - Multi-level error handling\
✅ **Development Mode** - Built-in component testing

### Error Types Covered

- **Synchronous errors**: Direct throws in render/functions
- **Asynchronous errors**: Promise rejections, setTimeout
- **useEffect errors**: Lifecycle hook errors
- **User interaction errors**: Event handler errors
- **Network errors**: API call failures
- **Authentication errors**: Auth flow failures
- **DevSpace errors**: DevSpace operation failures

## Usage Examples

### Running All Tests

#### Node.js (tsx)

```bash
# Interactive test suite
npm run test:errors

# Individual test suites
npm run test:error-boundaries
npm run test:error-scenarios
npm run test:posthog
npm run test:quick
```

#### Bun

```bash
# Interactive test suite
npm run test:bun:errors

# Individual test suites
npm run test:bun:error-boundaries
npm run test:bun:error-scenarios
npm run test:bun:posthog
npm run test:bun:quick
```

#### Deno

```bash
# Interactive test suite
npm run test:deno:errors

# Individual test suites
npm run test:deno:error-boundaries
npm run test:deno:error-scenarios
npm run test:deno:posthog
npm run test:deno:quick
```

### Development Testing

```bash
# Start in development mode
npm run dev:test

# Navigate to any component and test error handling
# Press 't' in DevSpaceCreate to test errors
```

### Debugging

```bash
# Enable verbose logging
DEBUG=* npm run test:errors

# Check PostHog events
# Visit your PostHog dashboard after running tests
```

## Troubleshooting

### Common Issues

**PostHog tests fail:**

- Check `POSTHOG_API_KEY` is set
- Ensure `DO_NOT_TRACK` is not `1`
- Verify network connectivity

**Error boundaries don't catch errors:**

- Async errors need global handlers
- useEffect errors may not bubble up
- Check React version compatibility

**Development mode not working:**

- Ensure `NODE_ENV=development`
- Check console for error messages
- Verify component is properly wrapped

### Getting Help

1. Check console output for detailed error messages
2. Verify environment variables are set correctly
3. Test with minimal reproduction cases
4. Check PostHog dashboard for captured events

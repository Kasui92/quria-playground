# Quria Playground

A testing project to explore and demonstrate the functionalities of [Quria](https://github.com/FraWolf/quria), a TypeScript wrapper for the Destiny 2 API.

## Project Structure

This project is organized as a monorepo managed with PNPM, and contains:

- **packages/quria**: The Destiny 2 API wrapper
- **apps/nextjs**: A Next.js application that uses Quria

## Available Commands

### Root Commands

These commands can be executed from the main directory:

```bash
# Format all code using Prettier
pnpm format

# Run commands in the quria package
pnpm quria <command>

# Run commands in the nextjs app
pnpm nextjs <command>
```

### Quria Commands

To be executed with `pnpm quria <command>` or by navigating to the `packages/quria` directory:

```bash
# Build the Quria package
pnpm build
```

### Next.js Commands

To be executed with `pnpm nextjs <command>` or by navigating to the `apps/nextjs` directory:

```bash
# Start the development server
pnpm dev

# Build the application for production
pnpm build

# Start the compiled application
pnpm start

# Run code linting
pnpm lint
```

## Quria Configuration

To use Quria with the Destiny 2 API, you need to configure the following environment variables in the `apps/nextjs/.env.local` file:

```
QURIA_API_KEY=your_api_key
QURIA_CLIENT_ID=your_client_id
QURIA_CLIENT_SECRET=your_client_secret
```

You can obtain these values by registering an application on the [Bungie Developer Portal](https://www.bungie.net/en/Application).

## License

The Quria package is released under the MIT license.

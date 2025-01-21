# Step-by-Step Guide to Setting Up Express with TypeScript (Simple Version)

## Prerequisites

- [Node.js](https://nodejs.org/en/)

## Step 1: Create a new project

First, create new project with the following command:

```bash
mkdir express-typescript-simple-starter
cd express-typescript-simple-starter
npm init -y
```

## Step 2: Install Dependencies

```bash
npm i express@^5.0.1 cors morgan helmet ts-patch typescript-transform-paths helmet zod
npm i typescript ts-node eslint @types/express @types/node @types/morgan @types/cors @eslint/js -D
```

## Step 3: Configure TypeScript

To initialize TypeScript, run this command:

```bash
npx tsc --init
```

Then, update the **tsconfig.json** file with the following content:

```json
{
  "ts-node": {
    "transpileOnly": true,
    "require": ["typescript-transform-paths/register"]
  },
  "compilerOptions": {
    "target": "ESNext",
    "module": "commonjs",
    "outDir": "./dist",
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true,
    "skipLibCheck": true,
    "baseUrl": "./",
    "paths": {
      "@/*": ["./src/*"]
    },
    "plugins": [
      { "transform": "typescript-transform-paths" },
      { "transform": "typescript-transform-paths", "afterDeclarations": true }
    ]
  }
}
```

## Step 4: ESLint Config

```ts
import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";

/** @type {import('eslint').Linter.Config[]} */
export default [
  { files: ["**/*.{js,mjs,cjs,ts}"] },
  { languageOptions: { globals: globals.node } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  {
    rules: {
      "@typescript-eslint/no-empty-object-type": "off",
    },
  },
];
```

## Step 5: Update package.json scripts

```json
 "scripts": {
    "build": "tsc --build",
    "start": "node ./dist/server.js",
    "dev": "node -r ts-node/register --watch --env-file=.env ./src/server.ts",
    "format": "prettier --write .",
    "lint": "eslint .",
    "lint:fix": "eslint . --fix"
  },
```

## Step 6: Create a .env file

Create a new file named **.env** with the following content:

```bash
APP_ORIGIN=http://localhost:5173 # The URL of your frontend app
PORT=3000 # The port your Express app is running on
NODE_ENV=development # Set to "production" in a production environment
```

## Step 10: Create env.ts file

Create a new file named **src/lib/env.ts** with the following code:

```ts
import { z } from "zod";

const envSchema = z.object({
  APP_ORIGIN: z.string().url(),
  PORT: z.coerce.number().min(3000).max(5000),
  NODE_ENV: z
    .union([z.literal("development"), z.literal("production")])
    .default("development"),
});

const env = envSchema.parse(process.env);

export default env;
```

## Step 12: Create a app.ts file

Create a new file named **src/app.ts** with the following code:

```ts
import { Request, Response } from "express";
import cors from "cors";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import env from "./lib/env";

const app = express();

// Middlewares
app.use(morgan("dev"));
app.use(helmet());
app.use(
  cors({
    origin: env.APP_ORIGIN,
  })
);
app.use(express.json());
app.use(express.urlencoded());

// Routes
app.get("/", (req: Request, res: Response) => {
  res.send("Hello, from Express!");
});

export default app;
```

## Step 13: Create a server.ts file

Create a new file named **src/server.ts** with the following code:

```ts
import app from "./app";
import env from "./lib/env";

const PORT = env.PORT || 5000;
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
```

## Step 14: Run your application

Run the following command to run your application:

```bash
npm run dev
```

Visit `http://localhost:3000` in your browser, and you should see _Hello, from Express!_.

## Final project structure

```css
express-typescript-simple-starter
├── src
│   ├── lib
│   │   └── env.ts
│   ├── app.ts
│   └── server.ts
├── .env
├── .env.example
├── .gitignore
├── eslint.config.mjs
├── package-lock.json
├── package.json
└── tsconfig.json
```

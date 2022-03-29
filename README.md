# Self Learning

## Development

**Site**:

```
nx serve site
```

**CMS (Strapi)**:

```
nx serve cms
```

## Testing

```
nx test
```

## Recommended VS Code Extensions

In VS Code, press `F1` to open the command palette and search for `Extensions: Show Recommended Extensions`. Afterwards, the following plugins will appear in your sidebar with an `Install` button.

-   [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode): Code formatter
-   [ESLint](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode): Static analysis and coding style guidelines
-   [Tailwind CSS IntelliSense](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss): IntelliSense for Tailwind CSS classes
-   [Nx Console](https://marketplace.visualstudio.com/items?itemName=nrwl.angular-console): UI for Nx commands
-   [Jest Runner](https://marketplace.visualstudio.com/items?itemName=firsttris.vscode-jest-runner): Simple way to run or debug a single (or multiple) tests from context-menu or via code lens
-   [Prisma](https://marketplace.visualstudio.com/items?itemName=Prisma.prisma): Adds syntax highlighting, formatting, auto-completion, jump-to-definition and linting for .prisma files
-   [GraphQL](https://marketplace.visualstudio.com/items?itemName=GraphQL.vscode-graphql): Adds syntax highlighting, validation, and language features like go to definition, hover information and autocompletion for graphql projects

## Database

This project uses [Prisma](https://www.prisma.io/) for database access.

To interact with the database, you can use code like the following:

```ts
import type { User } from "@prisma/client"; // User is generated by Prisma
import { database } from "@self-learning/database";

function getUserById(id: string): Promise<User> {
	// all properties (user, id, ...) are type-safe!
	return database.user.findUnique({
		where: {
			id: id
		}
	});
}
```

**Development only**: After making changes to the database schema ([libs/data-access//database/prisma/schema.prisma](libs/data-access//database/prisma/schema.prisma)), use the following command to push these changes to the database:

```
npm run prisma db push
```

Prisma generates code according to the defined database schema. After making changes to the schema, you must trigger the code generation via the following command:

```
npm run prisma generate
```

Fill database with demo data, which is defined in [seed.ts](libs/data-access/database/src/lib/seed.ts):

```
npm run prisma seed
```

## Graphql API

[Strapi](https://strapi.io/), the headless CMS used in this project, provides a Graphql API that we can use to access its data.
To create a query or mutation, create a `.graphql` file or wrap the it in a `gql` template string. If the API is online (locally), you should also receive IntelliSense for available attributes. Afterwards, you can invoke the following command to generate a type-safe query:

```
npm run graphql-codegen
```

The query/mutation will now be available on the following object:

````ts
import { cmsGraphqlClient } from "@self-learning/cms-api";
// authors is a query called "authors"
cmsGraphqlClient.authors();
```
````
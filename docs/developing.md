# Developing

## Requirements

This project requires you have installed [Node.js 20 LTS](https://nodejs.org/en/download). We recommend using [nvm](https://github.com/nvm-sh/nvm) to install multiple versions of node if necessary.

## VSCode extensions

We recommend using the following vscode extensions for the best experience.
- [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
- [GraphQL: Syntax Highlighting](https://marketplace.visualstudio.com/items?itemName=GraphQL.vscode-graphql-syntax)
- [Tailwind CSS IntelliSense](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss)

## Running the project

To install all requirements simply do the following from the project root:

`npm i && cd ./frontend && npm i && cd ../backend && npm i && cd ..` This will run npm install in all the folders necessary.

Goto `/backend` and copy the `.env.example` file and paste it as a `.env`.

Then do `npm run dev` from the root dir to run both the client and the server at the same time.

If this doesn't work you might have to enter and build the backend (strapi) first.
`cd backend` then `npm run build`

-   The frontend should be accessible at http://localhost:3000

-   The backend should be accesible at http://localhost:1337/admin
    -   Here, you can create an admin user.

## Strapi First time boot

Goto `Settings > Users & Permissions plugin > Roles > Public > Article`, and enable `find` and `findOne`. You need to do this for every publically available content type. Theese include but are not limited to:

-   Article
-   Author
-   Hero
-   Featured-image
-   Hero
-   Project
-   Satellite

The following should **NOT** be made publicly available:

-   Email
-   i18n
-   Upload
-   User-permissions

## GraphQL Type generation

If you're using GraphQL, then you need to run `npm run compile` from `/frontend` whenever you update a schema or define a new graphQL request in the code. Make sure to import the correct `gql` as

```
import { gql } from"@/generated/gql";
```

> Any errors in your code other than the GraphQL types, can result in the codegen not working, so make sure to fix all other errors before running the codegen.

> [https://www.apollographql.com/docs/react/development-testing/static-typing/](https://www.apollographql.com/docs/react/development-testing/static-typing/)

## Strapi invite others

You can invite new admin users in `Settings > Administration panel > Users > Invite new user`

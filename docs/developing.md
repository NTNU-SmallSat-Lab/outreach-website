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

## GraphQL

To explore the schema, use the [apollo sandbox](https://studio.apollographql.com/sandbox/explorer/) with `http://localhost:1337/graphql` as the url.

Generation of types types is done with [gql.tada](https://github.com/0no-co/gql.tada). All you need to do is accept using the workspace typescript version.


## Strapi invite others

You can invite new admin users in `Settings > Administration panel > Users > Invite new user`

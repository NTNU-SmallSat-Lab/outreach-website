# Developing

## Requirements

This project requires you have installed [Node.js 20 LTS](https://nodejs.org/en/download). We recommend using [nvm](https://github.com/nvm-sh/nvm) to install multiple versions of node if necessary.

## Running the project

To install all requirements simply do the following from the project root:

`npm i && cd ./frontend && npm i && cd ../backend && npm i && cd ..` This will run npm install in all the folders necessary.

Then do `npm run dev` from the root dir to run both the client and the server at the same time.

If this doesn't work you might have to enter and build the backend (strapi) first.
`cd backend` then `npm run build`

-   The frontend should be accessible at http://localhost:3000

-   The backend should be accesible at http://localhost:1337/admin
    -   Here, you can create an admin user.

## Strapi First time boot

Goto Settings > Users & Permissions plugin > Roles > Public > Article, and enable `find` and `findOne`. You need to do this for every publically available content type. Theese include but are not limited to:

-   Article
-   Author
-   Hero
-   Most-recent-image
-   Project
-   Satellite

The following should **NOT** be made publicly available:

-   Email
-   i18n
-   Upload
-   User-permissions

## GraphQL

To explore the schema, use the [apollo sandbox](https://studio.apollographql.com/sandbox/explorer/) with `http://localhost:1337/graphql` as the url.

Generation of types types is done with [gql.tada](https://github.com/0no-co/gql.tada)


## Strapi invite others

You can invite new admin users in `Settings > Administration panel > Users > Invite new user`

### Type generation

###### REST

When updating a schema in Strapi, you have to run `npm run generateTypes` in the root directory to generate the proper types for the frontend.

> This uses Strapi's official [documentation plugin](https://docs.strapi.io/dev-docs/plugins/documentation) to generate documentation matching the [OpenAPI specification](https://swagger.io/specification/). It then uses the [@openapi-typescript](https://www.npmjs.com/package/openapi-typescript) package to generate the typescript types.
>
> The generated documentation can be found at [http://localhost:1337/documentation/v1.0.0](http://localhost:1337/documentation/v1.0.0) when running the dev server.

###### GraphQL

If you're using GraphQL, then you need to run `npm run compile` from `/frontend` whenever you update a schema or define a new graphQL request in the code.

> [https://www.apollographql.com/docs/react/development-testing/static-typing/](https://www.apollographql.com/docs/react/development-testing/static-typing/)

### Strapi First time boot

Goto Settings > Users & Permissions plugin > Roles > Public > Article, and enable `find` and `findOne`

### Heroku

Heroku is currently configured to run on [https://small-sat-lab-6ad3da13947b.herokuapp.com/](https://small-sat-lab-6ad3da13947b.herokuapp.com/)

with the admin panel at [https://small-sat-lab-6ad3da13947b.herokuapp.com/admin](https://small-sat-lab-6ad3da13947b.herokuapp.com/admin)

You can invite new admin users in `Settings > Administration panel > Users > Invite new user`

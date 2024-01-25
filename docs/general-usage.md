### Type generation

When updating a schema in Strapi, you have to run `npm run generateTypes` in the root directory to generate the proper types for the frontend.

> This uses Strapi's official [documentation plugin](https://docs.strapi.io/dev-docs/plugins/documentation) to generate documentation matching the [OpenAPI specification](https://swagger.io/specification/). It then uses the [@openapi-typescript](https://www.npmjs.com/package/openapi-typescript) package to generate the typescript types.
>
> The generated documentation can be found at [http://localhost:1337/documentation/v1.0.0](http://localhost:1337/documentation/v1.0.0) when running the dev server.



## Strapi First time boot

Goto Settings > Users & Permissions plugin > Roles > Public > Article, and enable `find` and `findOne`

# Developing

### GraphQL Type generation

If you're using GraphQL, then you need to run `npm run compile` from `/frontend` whenever you update a schema or define a new graphQL request in the code. Make sure to import the correct `gql` as

```
import { gql } from"@/generated/gql";
```

> Any errors in your code other than the GraphQL types, can result in the codegen not working, so make sure to fix all other errors before running the codegen.

> [https://www.apollographql.com/docs/react/development-testing/static-typing/](https://www.apollographql.com/docs/react/development-testing/static-typing/)

### Strapi First time boot

Goto Settings > Users & Permissions plugin > Roles > Public > Article, and enable `find` and `findOne`. You need to do this for every publically available content type. Theese include but are not limited to:
- Article
- Author
- Hero
- Most-recent-image
- Project
- Satellite

The following should **NOT** be made publicly available:
- Email
- i18n
- Upload
- User-permissions




You can invite new admin users in `Settings > Administration panel > Users > Invite new user`

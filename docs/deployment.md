### Strapi (backend)

[https://docs.strapi.io/dev-docs/deployment](https://docs.strapi.io/dev-docs/deployment)

The `.env.example` file should be copied to a `.env` file.

The keys should all be filled in and generated using `openssl rand -base64 32`

We use [`pm2`](https://www.npmjs.com/package/pm2) as our process manager to run our node.js frontend and backend.

### After pulling on server

`cd frontend/`
then
`pm2 start npm --name "nextfrontend" -- start`

Go back up
`cd ..`
`cd backend/`
build with
`NODE_ENV=production npm run build`
and run using
`NODE_ENV=production pm2 start server.js --name "strapibackend"`

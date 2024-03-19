See the following docs for more info about strapi deployment:
[https://docs.strapi.io/dev-docs/deployment](https://docs.strapi.io/dev-docs/deployment)

We use [`pm2`](https://www.npmjs.com/package/pm2) as our process manager to run our node.js frontend and backend.

### Setting up ntnu halfadministrated server

###### SSH

We have created a firewall rule to allow remote ssh connections, such that we can remote in form a github runner and autodeploy. First we create a firewall rule:

`/etc/local/firewall.d $ touch ipv4-magnastr-docker-website-git-autodeply.conf`

do `sudo nano ipv4-magnastr-docker-website-git-autodeply.conf` to enter the file and edit the content

paste the lines

```
-I INPUT -p tcp -m tcp --dport 22 -j ACCEPT
-I INPUT -p tcp -m tcp --dport 3000 -j ACCEPT
```

###### PKGSYNC

Make sure docker compose is installed on the server.

Can be checked by running `docker compose version`

Also make sure to install `pm2`

###### Github Runner

Setup a self hosted GitHub runner for the repository.

`sudo useradd -r -s /bin/nologin outreach-github-runner`

`cd /actions-runner/`

`./svc.sh install outreach-github-runner`

`sudo ./svc.sh start`

`sudo journalctl -u actions.runner.ITP2-SmallSatLab-Hypso-IT2901-SmallSatLab-Hypso.smallsat01.service -f`

###### Secrets and variables

The secrets should all be filled in and generated using `openssl rand -base64 32`

The GitHub repo should define the following secrets:

-   ADMIN_JWT_SECRET
-   API_TOKEN_SALT
-   APP_KEYS
-   JWT_SECRET
-   TRANSFER_TOKEN_SALT

And the following variables:

-   DATABASE_CLIENT=sqlite
-   DATABASE_FILENAME=/var/data/strapi.db
-   HOST=0.0.0.0
-   HOST_URL=http://backend-app:1337
-   PORT=1337

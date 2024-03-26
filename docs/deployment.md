See the following docs for more info about strapi deployment:
[https://docs.strapi.io/dev-docs/deployment](https://docs.strapi.io/dev-docs/deployment)

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

###### Github Runner

Setup a self hosted GitHub runner for the repository.

> Ansible (our current configuration system) will manage users and groups with UID/GID above 300. If you need to create local system users or groups, use free UID/GID between 100 and 299.

Create a user with UID 200:  
`sudo useradd -u 200 outreach-github-runner`  
Add it to the docker group so it can run docker commands without sudo:  
`sudo usermod -a -G docker outreach-github-runner`

Now follow the official guide on github to add the runner to a repository, but only do theese steps

-   Create the folder
-   Download latest runner package
-   Validate the hash
-   Extract the installer
-   Create the runner and start config experience. Just press enter for all options.

No need to run it manually. We will install it as a service running as the user we created previously.

`./svc.sh install outreach-github-runner`

`sudo ./svc.sh start`

`sudo chown outreach-github-runner /actions-runner/ -R`

`sudo chown outreach-github-runner /home/outreach-github-runner/ -R`

##### Logs and errors

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

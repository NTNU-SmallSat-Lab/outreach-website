See the following docs for more info about strapi deployment:
[https://docs.strapi.io/dev-docs/deployment](https://docs.strapi.io/dev-docs/deployment)

### Setting up ntnu halfadministrated server

#### Firewall

We have created firewall rules to access website and api.

`/etc/local/firewall.d $ touch ipv4-magnastr-docker-website-git-autodeply.conf`

do `sudo nano ipv4-magnastr-docker-website-git-autodeply.conf` to enter the file and edit the content

paste the lines

```
-I INPUT -p tcp -m tcp --dport 3000 -j ACCEPT

# Frontend (next.js node) Open TCP port 3000 for the world:
-I DOCKER-USER -p tcp -m conntrack --ctorigdstport 3000 -j ACCEPT

# Backend (strapi) Open TCP port 1337 for world:
-I DOCKER-USER -p tcp -m conntrack --ctorigdstport 1337 -j ACCEPT

```

#### PKGSYNC

Make sure docker compose is installed on the server.

Can be checked by running `docker compose version`

#### Github Runner

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

#### Secrets and variables

The secrets should all be filled in and generated using `openssl rand -base64 32`

The GitHub repo should define the following secrets:

-   ADMIN_JWT_SECRET
-   API_TOKEN_SALT
-   APP_KEYS
-   JWT_SECRET
-   TRANSFER_TOKEN_SALT

And the following variables:

-   DATABASE_CLIENT=sqlite
-   DATABASE_FILENAME=/var/data/outreach-strapi.db
-   HOST=0.0.0.0
-   STRAPI_URL=http://backend-app:1337
-   PORT=1337


#### Logs and errors

##### Action runner
If the action runner is having issues, try running this command to check out its logs.

`sudo journalctl -u actions.runner.ITP2-SmallSatLab-Hypso-IT2901-SmallSatLab-Hypso.smallsat01.service -f`

If the command does not work, try reading this [Monitoring and troubleshooting self-hosted runners](https://docs.github.com/en/actions/hosting-your-own-runners/managing-self-hosted-runners/monitoring-and-troubleshooting-self-hosted-runners).  
Keep in mind, the name might be something else than what is shown in the command.

##### Docker

If there are any issues with docker. You can run the following commands to see logs:  
- `sudo docker ps -a` to see all running conatiners.
- `sudo docker logs <hash>`, with the hash of the container (you usually only need to type in the first few letters), to see the logs printed to console.   

Log `outreach:backend` for strapi, and `outreach:frontend` for next.js.

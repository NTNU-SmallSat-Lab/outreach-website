# Deployment

See the Strapi [docs](https://docs.strapi.io/dev-docs/deployment) for more info about deployment

See [here](https://nextjs.org/docs/app/building-your-application/deploying) for information regarding Next.js deployment with app router.

## Setting up ntnu semi-managed server

Look [here](https://www.ntnu.no/wiki/display/ntnuitubuntu/Semi-managed+Linux+servers) for more info about semi-managed servers

### Firewall

We have created firewall rules to make the website accesible.

1. Goto
   `cd /etc/local/firewall.d`

2. If they don't exist yet, do `touch ipv4-outreach.conf`

3. do `sudo nano ipv4-outreach.conf` to enter the file and edit the content to the following:

    ```
    # Open port 80 for HTTP
    -I INPUT -p tcp -m tcp --dport 80 -j ACCEPT

    # Open port 443 for HTTPS
    -I INPUT -p tcp -m tcp --dport 443 -j ACCEPT
    ```

4. then run `sudo /local/admin/bin/install-firewall.sh`

5. and `sudo iptables-save`

### PKGSYNC

Make sure docker compose is installed on the server.

Can be checked by running `docker compose version`

### Github Runner

Setup a self hosted GitHub runner for the repository.

We first need to create a user that our action runner will run as.

> Ansible (our current configuration system) will manage users and groups with UID/GID above 300. If you need to create local system users or groups, use free UID/GID between 100 and 299.

1. Create a user with UID 200:
   `sudo useradd -u 200 outreach-github-runner`
2. Add it to the docker group so it can run docker commands without sudo:
   `sudo usermod -a -G docker outreach-github-runner`

You might also have to give it permission to access the runner folder and home dircetory.

1. `sudo chown outreach-github-runner /actions-runner/ -R`
2. `sudo chown outreach-github-runner /home/outreach-github-runner/ -R`

To add an action runner to the repo, goto the github repository then `Settings > Actions > Runners > New self-hosted runner`.

Now follow the official guide on github to add the runner to a repository, **but don't run it manually**

1. Create the folder
2. Download latest runner package
3. Validate the hash
4. Extract the installer
5. Create the runner and start config experience. Just press enter for all options.

**There is no need to run it manually.** We will install it as a service running as the user we created previously.

1. `./svc.sh install outreach-github-runner` install it as a service
2. `sudo ./svc.sh start` start the service

### Secrets and variables

The secrets should all be filled in and generated using `openssl rand -base64 32`

The GitHub repo should define the following secrets:

-   APP_KEYS="toBeModified1,toBeModified2"
-   API_TOKEN_SALT=tobemodified
-   ADMIN_JWT_SECRET=tobemodified
-   TRANSFER_TOKEN_SALT=tobemodified
-   JWT_SECRET=tobemodified

And the following variables:

-   DATABASE_CLIENT=sqlite
-   DATABASE_FILENAME=/var/data/outreach-strapi.db
-   HOST=0.0.0.0
-   STRAPI_URL=http://backend-app:1337
-   PORT=1337

### Apache

TODO @madshermansen

## Troubleshooting

### Action runner

If the action runner is having issues, try running this command to check out its logs.

`sudo journalctl -u actions.runner.NTNU-SmallSat-Lab-outreach-website.smallsat01.service -f`

If the command does not work, try reading this [Monitoring and troubleshooting self-hosted runners](https://docs.github.com/en/actions/hosting-your-own-runners/managing-self-hosted-runners/monitoring-and-troubleshooting-self-hosted-runners).
Keep in mind, the name might be something else than what is shown in the command. You can run `cat /actions-runner/.service` to check the name

### Logs and errors

1. Run `cd /actions-runner/_work/outreach-website/outreach-website`
2. Then `sudo docker compose logs` to see the logs from each container.

If the above doesn't work, you can run the following commands to see logs:

1.  `sudo docker ps -a` to see all running conatiners.
2.  `sudo docker logs <hash>`, with the hash of the container (you usually only need to type in the first few letters), to see the logs printed to console.
    -   Log `outreach:backend` for strapi, and `outreach:frontend` for next.js.

## SSL Certification

TODO @madshermansen

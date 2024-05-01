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

```yaml
APP_KEYS="toBeGenerated1,toBeGenerated2"
API_TOKEN_SALT=toBeGenerated
ADMIN_JWT_SECRET=toBeGenerated
TRANSFER_TOKEN_SALT=toBeGenerated
JWT_SECRET=toBeGenerated
```

And the following variables:

```shell
BACKEND_INTERNAL_URL=http://backend:1337
DATABASE_CLIENT=sqlite
DATABASE_FILENAME=/var/data/outreach-strapi.db
HOST=0.0.0.0
OUTWARD_FACING_URL=https://hypso.space
PORT=1337
STRAPI_URL=https://hypso.space/strapi
```

### Apache

Assuming there is an exisiting apache server running on the server, we need to add a new virtual host for the website.

1.  `cd /etc/apache2/sites-available`
2.  `sudo touch outreach.conf`
3.  `sudo nano outreach.conf` to edit the file and add the following content:

```apache
<VirtualHost hypso.space:80>
   ServerName hypso.space
   DocumentRoot /var/www/html/outreach

   RewriteEngine on
   RewriteCond %{REQUEST_URI} !^/.well-known/acme-challenge/
   RewriteRule ^/(.*)$ https://hypso.space/$1 [L,R=301]

</VirtualHost>

<IfModule ssl_module>
   <VirtualHost hypso.space:443>
   ServerName hypso.space

   SSLEngine on
   ProxyRequests off
   ProxyPreserveHost On
   SSLCertificateFile "/etc/letsencrypt/live/hypso.space/fullchain.pem"
   SSLCertificateKeyFile "/etc/letsencrypt/live/hypso.space/privkey.pem"

<Location />
   ProxyPass http://127.0.0.1:3000/
   ProxyPassReverse http://127.0.0.1:3000/
</Location>

<Location /strapi>
   ProxyPass http://127.0.0.1:1337
   ProxyPassReverse http://127.0.0.1:1337
   ProxyPreserveHost On
   </Location>
   Header always set Strict-Transport-Security "max-age=63072000; includeSubDomains"
   </VirtualHost>
</IfModule>
```
This will redirect all traffic to the https version of the website and proxy the traffic to the correct ports as well as supporting SSL renewal on port 80

4.  Make sure to replace all relevant information with the correct values. Check port numbers, domain names, and paths.
5.  `sudo a2ensite outreach.conf` to create a symlink to the sites-enabled folder
6.  `sudo systemctl reload apache2`
7. Make sure firewall rules are set up correctly, services are running as intended on the right ports and that the DNS is set up correctly.
8. Make sure the SSL certificate is set up correctly more info [here](#ssl-certification)
9. Make sure the website is running on the correct port and that the proxy is set up correctly.


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
    - Log `outreach:backend` for strapi, and `outreach:frontend` for next.js.

## SSL Certification

The SSL certificate is managed by certbot. The certificate is renewed automatically every 3 months. The certificate is stored in `/etc/letsencrypt/live/hypso.space/` and is used by the apache server to serve the website over HTTPS.

To renew the certificate manually, run `sudo certbot renew` or `sudo certbot renew --dry-run` to test the renewal process.

To set up the certificate, follow the instructions on [certbot](https://certbot.eff.org/lets-encrypt/). Or follow the quick guide below specific for NTNUS semi-managed servers.

1. Follow the guide [here](https://www.ntnu.no/wiki/display/ntnuitubuntu/Semi-managed+Linux+servers) to install the nessecary software packages. These should include `certbot`, `python3-certbot-apache` or `python3-certbot-nginx` depending on the server setup.
2. Run `sudo certbot certonly --apache` to generate the certificate.
3. Make sure the certificate is set up correctly in the apache configuration file.
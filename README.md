Cannmart Admin
==============

Make sure to install:
- PHP mcrypt extension : http://www.coolestguidesontheplanet.com/how-to-install-mcrypt-for-php-on-mac-osx-lion-10-7-development-server/

- setup your apache virtual host file. located in /etc/apache2/extra/httpd-vhosts.conf
e.g.:
<VirtualHost *:80>
    ServerAdmin admin@restful.com
    DocumentRoot "/projects/laravel-restful/public"
    ServerName restful.dev
    <Directory "/projects/laravel-restful/public">
        Options Indexes FollowSymLinks MultiViews
        AllowOverride All
        Order allow,deny
        Allow from all
    </Directory>
    ErrorLog "/private/var/log/apache2/restful.dev-error_log"
    CustomLog "/private/var/log/apache2/restful.dev-access_log" common
</VirtualHost>

- add the local host to /etc/hosts
e.g.: 
127.0.0.1   restful.dev

- make sure root folder is owned by apache2 user / group
- make sure /app/storage folder is writable to web server user / group
- go to app/config 
$ cp database.php.example database.php
- edit the database configuration file, and fill up the password for mysql entry
- create database called restful_db in your local mysql server

- run migration
$ php artisan migrate
- run seeds
$ php artisan db:seed

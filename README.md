Laravel Restul with AngularJS
=============================

# Backend Application #

Make sure to install:
- PHP mcrypt extension : http://www.coolestguidesontheplanet.com/how-to-install-mcrypt-for-php-on-mac-osx-lion-10-7-development-server/

- setup your apache virtual host file. located in /etc/apache2/extra/httpd-vhosts.conf  
e.g.:  
```  
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
```  
  
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

# Javascript Single Page Application #

A javascript single page application (SPA).

## Stack ##
- NodeJS for development platform  
- GruntJS for tooling  
- JSHint for code quality  
- LESS for CSS preprocessor and framework  
- Bower for package management  
    - JQuery for DOM helper  
    - UnderscoreJS for utility helper  
    - AngularJS for MVW framework 
    - RequireJS for module loader  

## Setting Up ##
- Install NodeJS and NPM - (http://www.nodejs.org)  
- Install LESS  
``  
    $ npm install -g less  
``  
- Install Bower  
``  
    $ npm install -g bower  
``  
- Install grunt-cli  
``  
    $ npm install -g grunt-cli  
``  
``  
    $ npm install -g grunt-init  
``  
- Install Node modules dependencies from package.json 
``  
    $ npm install  
``  
- Install components dependencies from components.json  
``  
    $ bower install  
``  

## Run application ##  
``  
    $ grunt run  
``  







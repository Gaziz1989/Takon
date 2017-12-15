# Takon

Commands for starting the project: 

sudo -u postgres psql

The above command gets you the psql command line interface in full admin mode.

In the following commands, keep in mind the < angular brackets > are to denote variables you have to set yourself. In the actual command, omit the <>

## Creating user

sudo -u postgres createuser <username>

## Creating Database

sudo -u postgres createdb <dbname>

## Giving the user a password

sudo -u postgres psql

alter user <username> with encrypted password '<password>';

## Granting privileges on database

grant all privileges on database <dbname> to <username> ;
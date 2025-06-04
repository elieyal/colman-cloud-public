#!/bin/bash
yum update -y
yum install httpd -y
service httpd start
chkconfig httpd on
cd /var/www/html
echo "<html><H1>this is one of many. this server ip is `curl ident.me --silent`</h1></html>" > /var/www/html/index.html
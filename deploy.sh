#!/bin/sh
HOST='ftp.javascripteverything.com'
USER='gatsbydeploy@javascripteverything.com'
PASSWD='-------'
LOCAL_FOLDER='~/Code/gatsby-blog/public/'

#rm -rf ./public
#mkdir public
gatsby build

echo "😎  Everything is packaged, let's try to FTP it"

ftp -n $HOST <<END_SCRIPT
quote USER $USER
quote PASS $PASSWD
binary
cd public_html
lcd $LOCAL_FOLDER
prompt
mput ./**/*.*
quit
END_SCRIPT
exit 0

echo "💓  Site is uploaded and ready to go!"
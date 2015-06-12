#!/bin/bash -c

#set -e

cd /usr/src/app

if [ -e "./realapp" ]
then
    echo "Application already exists; git clone is not required."
    rm -rf realapp
else
    echo -n Cloning from git repo...
    git clone -q $GIT realapp
    echo done
    echo -n Installing packages...
    (cd realapp && npm install)
    echo done
fi

cd realapp
git checkout -q $CHECKOUT
exec node $SCRIPT

#END

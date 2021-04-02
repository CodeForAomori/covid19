#!/bin/bash

cd `dirname $0`
git pull
date > static/update.txt
git add -A
git commit -m "update to update.txt"
git push


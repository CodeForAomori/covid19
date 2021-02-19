#!/bin/bash

cd `dirname $0`
date > static/update.txt
git add -A
git commit -m "update to update.txt"
git push


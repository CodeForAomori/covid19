#!/bin/bash

date > static/update.txt
git add -A
git commit -m "update to update.txt"
git push


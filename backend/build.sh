#!/bin/bash

# Build the project
echo "Building the project..."
py -m pip install -r requirements.txt
echo "Make Migration..."
py manage.py makemigrations --noinput
py manage.py makemigrations scraper
py manage.py migrate --noinput
py manage.py migrate scraper
echo "Collect Static..."
py manage.py collectstatic --noinput --clear
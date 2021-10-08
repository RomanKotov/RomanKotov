#!/bin/bash

set -e

REPO="https://x-access-token:${GITHUB_TOKEN}@github.com/${GITHUB_REPOSITORY}.git"
BRANCH="gh-pages"

echo "Installing dependencies..."

npm install

echo "Building site..."

npm run docs:build

echo "Publishing..."

cd docs/.vuepress/dist/

git init
git config user.name "${GITHUB_ACTOR}"
git config user.email "${GITHUB_ACTOR}@users.noreply.github.com"
git add .
git commit -m "published by GitHub Actions"
git push --force ${REPO} master:${BRANCH}

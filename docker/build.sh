#!/usr/bin/env bash
$(cd .. &&
rm -rf out &&
mkdir out &&
cp -R dist ./out/dist &&
cp Dockerfile ./out/Dockerfile &&
cp nginx.conf ./out/nginx.conf)

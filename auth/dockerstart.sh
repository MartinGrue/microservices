#!/bin/sh
printf "\n@scope:registry=${REGISTRY}\n" >> .npmrc
npm config set @scope/common:registry ${REGISTRY}}
/bin/sh
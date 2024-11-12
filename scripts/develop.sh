#!/usr/bin/env bash

set -eo pipefail

sf org create scratch -f config/project-scratch-def.json \
  --alias "mdapi-issues-namespaceprefix" \
  --set-default
sf package install --package "Dummy Package 2nd gen" --publish-wait 10 --wait 10

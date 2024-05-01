#!/bin/bash

IP=$(hostname -i)

REVERSE_LOOKUP=$(dig -x "$IP" +short)
HOSTNAME=$(echo "$REVERSE_LOOKUP" | cut -d'.' -f1)
SERVER_NUMBER=$(echo "$HOSTNAME" | awk -F'-' '{print $NF}')

# Set the environment variables
export SERVER_NAME="$HOSTNAME"
export SERVER_NUMBER="$SERVER_NUMBER"

# Run index.js
node index.js

#!/usr/bin/env bash

# ==============================================================================
# Oracle Cloud Let's Encrypt SSL Bootstrap Script
# Domains:
# - gusresearchlab.is-a.bot
# - kundali.gusresearchlab.is-a.bot
# ==============================================================================

set -euo pipefail

# Color codes
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
RED='\033[0;31m'
NC='\033[0m'

DOMAINS=("gusresearchlab.is-a.bot" "kundali.gusresearchlab.is-a.bot")
EMAIL="${1:-paresh.mishra23@gmail.com}"
STAGING=0 # Set to 1 if testing to avoid hitting request limits

echo -e "${CYAN}==============================================================================${NC}"
echo -e "${CYAN}     ORACLE CLOUD LET'S ENCRYPT SSL CERTIFICATE BOOTSTRAP                      ${NC}"
echo -e "${CYAN}==============================================================================${NC}"
echo "Email: ${EMAIL}"
echo ""

# Create volume mount directories if not existing
mkdir -p ./certbot/conf ./certbot/www

for domain in "${DOMAINS[@]}"; do
    echo -e "${BLUE}--> Checking dummy SSL certificate for ${domain}...${NC}"
    path="./certbot/conf/live/${domain}"
    if [ ! -d "$path" ]; then
        echo -e "${YELLOW}--> Creating dummy certificate for ${domain} so Nginx can start...${NC}"
        mkdir -p "${path}"
        openssl req -x509 -nodes -newkey rsa:2048 -days 1 \
            -keyout "${path}/privkey.pem" \
            -out "${path}/fullchain.pem" \
            -subj "/CN=localhost"
    fi
done

echo -e "${BLUE}--> Starting Nginx proxy container...${NC}"
docker compose up -d proxy

for domain in "${DOMAINS[@]}"; do
    echo -e "${CYAN}==============================================================================${NC}"
    echo -e "${BLUE}--> Requesting real Let's Encrypt SSL certificate for ${domain}...${NC}"
    echo -e "${CYAN}==============================================================================${NC}"

    # Delete dummy certificate
    echo "--> Removing temporary dummy certificate..."
    rm -rf "./certbot/conf/live/${domain}"
    rm -rf "./certbot/conf/archive/${domain}"
    rm -rf "./certbot/conf/renewal/${domain}.conf"

    # Select staging or production arg
    STAGING_ARG=""
    if [ "$STAGING" != "0" ]; then
        STAGING_ARG="--staging"
    fi

    # Run Certbot
    docker run --rm \
        -v "$(pwd)/certbot/conf:/etc/letsencrypt" \
        -v "$(pwd)/certbot/www:/var/www/certbot" \
        certbot/certbot certonly --webroot \
        --webroot-path=/var/www/certbot \
        ${STAGING_ARG} \
        --email "${EMAIL}" \
        --rsa-key-size 4096 \
        --agree-tos \
        --force-renewal \
        --non-interactive \
        -d "${domain}"

done

echo -e "${BLUE}--> Reloading Nginx configuration...${NC}"
docker compose exec proxy nginx -s reload

echo -e "${GREEN}==============================================================================${NC}"
echo -e "${GREEN}  SSL CERTIFICATES INSTALLED & NGINX RELOADED SUCCESSFULLY!                   ${NC}"
echo -e "${GREEN}==============================================================================${NC}"

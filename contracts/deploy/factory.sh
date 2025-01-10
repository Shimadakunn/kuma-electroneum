export $(cat .env | xargs) && forge script DeployFactory \
    --private-key $PRIVATE_KEY --rpc-url $RPC_URL \
    --etherscan-api-key $EXPLORER_API_KEY \
    --verify --slow --broadcast --via-ir
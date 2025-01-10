export $(cat .env | xargs) && forge script DeployEntryPoint \
    --private-key $PRIVATE_KEY --rpc-url $RPC_URL \
    --etherscan-api-key $EXPLORER_API_KEY \
    --verify --slow --broadcast --via-ir
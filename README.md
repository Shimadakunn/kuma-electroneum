<div align="center">
<img src="https://kuma-app.vercel.app/favicon.ico" width="100"/>
<h1 align="center" style="margin-bottom: 0">KUMA</h1>
<p align="center">Kuma is an ERC-4337 Smart Wallet controlled with WebAuthn</a></p>
</div>

<a href="https://kuma-hedera.vercel.app/" target="_blank" style="font-size: 32px;">Demo Site</a>

<div align="center">
  <a href="https://youtube.com/shorts/zV-sOk5zlfI">
    <img src="https://img.youtube.com/vi/zV-sOk5zlfI/maxresdefault.jpg" width="400" alt="Demo Video"/>
  </a>
  <p><i>Click to watch the demo video</i></p>
</div>

# Pain Point

Wallets on Electroneum Blockchain are all EOA and are not shaped to onboard the next 1 billions users.

# Solution

Kuma is the first ERC-4337 Smart Wallet on Electroneum Blockchain. \
It allows users to create a wallet on the blockchain with a web2 experience.

# Main Features

- Passkey Signature with WebAuthn
- Gasless Transactions
- Transaction Batching
- Wallet Recovery with Guardians

# Code

### contracts folder

The smart contracts are based on the [ERC-4337 standard](https://github.com/eth-infinitism/account-abstraction).

The implementation of the WebAuthn signature verification is based on the [Daimo](https://github.com/daimo-eth/p256-verifier) implementation.

The bundler is based on the [Alchemy Rundler](https://github.com/alchemyplatform/rundler).

```bash
git submodule update --init --recursive
cd contracts
cp .env.example .env
```

Then setup the `.env` file with the correct values.

```bash
source deploy/[contract].sh
```

### kuma folder

```bash
cd kuma
pnpm i
cp .env.example .env
```

Then setup the `.env` file with the correct values.

- NEXT_PUBLIC_RELAYER_PRIVATE_KEY: Private key of wallet that deploy the user wallet
- NEXT_PUBLIC_BUNDLER_API_KEY: API key of the Alchemy bundler node

```bash
pnpm dev
```

# Smart Contracts

### [EntryPoint](https://hashscan.io/testnet/contract/0.0.4755335)

```
0x48d2642087dd86f86ed205ab204fd10a5cb076f8
```

### [Factory](https://hashscan.io/testnet/contract/0.0.4755395)

```
0xc71a8181b63dcb39015e05391747d8de505f37ba
```

### [Paymaster](https://hashscan.io/testnet/contract/0.0.4755408)

```
0xd0a0dccc866b650a2db92434bc3ded773f417d2e
```

### [P256 Verifier](https://hashscan.io/testnet/contract/0.0.4755408)

```
0xd0a0dccc866b650a2db92434bc3ded773f417d2e
```

# Docs

Onboarding new users into blockchain applications is a challenge. Current solutions revolves around mnemonics that need to be stored to recover accounts on users wallets, effectively introducing security risks. By using passkeys to control accounts, we abstract away the need for users to store mnemonics and we allow users to use a familiar interface to control their accounts (biometric authentication) in one click UX.

Our wallet is meant to be an implementation of the [ERC-4337 standard](https://github.com/eth-infinitism/account-abstraction), that allow users to have an account in the form of a smart contract. In this case, we use passkeys to let users control their account thanks to the onchain P256 signature verification developed by [Daimo](https://github.com/daimo-eth/p256-verifier).

</br>

![image](https://i.imgur.com/yqsyRgn.png)

## Why Passkeys?

Passkeys are a new way to authenticate users, that are more secure than passwords, and more user friendly than mnemonics. Our aim is to make blockchain applications more accessible to the general public, and we believe that passkeys are a great way to do so. Our UI strives in making it easy for users to create, retrieve existing accounts and sign transactions via Passkeys. As a user, all notion of passkeys are abstracted and you just need to remember a simple username to access your account.

## Mobile first?

While being built with NextJS for ease of development, our wallet is designed to be easy to use on mobile. Grab your phone, proceed to a biometric authentication, and you can start using your account in a few seconds.

## Wallet Connect support?

We support Wallet Connect in a very minimal way. We only allow you to connect to your account and send transactions.

---

# How does it work?

## Passkey Generation

When you create an account, a passkey is generated and stored in your device or your password manager. This passkey is tied to an id. This is worth noting that the passkey is never managed by the wallet itself, the wallet only uses the browser API to interact with it. Basically, the wallet asks for signatures and your device/password manager handles the rest. This is a very important security feature, as it means that the wallet never has access to your passkey, and cannot be compromised to steal it.

## User creation

Once the passkey is generated, the passkeys browser API returns a public key and an id. These public information are stored onchain and used to identify your account.

## Smart Account creation

The Smart Account is the contract implementing the ERC-4337 standard. Its address is deterministically computed from the public key of the user. This contract implements all the logic to verify signatures, effectively allowing the user to operate onchain actions thanks to their passkey. The contract is not deployed when the passkey is generated to avoid paying huge gas fees for a contract that might never be used. Instead, it is deployed when the user first interacts with the contract.

</br>

![image](https://i.imgur.com/4PxmDaH.png)

## Onchain interactions via UserOperations

The ERC-4337 standard revolves around UserOperations, which are basically objects replacing transactions and that are sent on behalf of the user by nodes known as [`Bundlers`](https://docs.stackup.sh/docs/erc-4337-bundler#:~:text=In%20ERC%2D4337%2C%20a%20Bundler,work%20on%20any%20EVM%20network.). UserOperations are signed by the user with their passkey and the bundler's job is to include them in a block while taking a little fee for the work. In our case, we use the [StackUp Bundler node implementation](https://docs.stackup.sh/).
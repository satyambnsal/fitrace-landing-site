'use client';
import {
  useAccount,
  useBalance,
  useConnect,
  useInjectedConnectors,
  argent,
  braavos,
  Abi,
  useNetwork,
  useContract,
  useSendTransaction,
  useProvider,
} from '@starknet-react/core';
import { Account, CallData, Contract, ec, stark } from 'starknet';
import compiledAAaccount from '@/app/abi/FRTCoin.json' assert { type: 'json' };

const abi = [
  {
    type: 'function',
    name: 'transfer',
    state_mutability: 'external',
    inputs: [
      {
        name: 'recipient',
        type: 'core::starknet::contract_address::ContractAddress',
      },
      {
        name: 'amount',
        type: 'core::integer::u256',
      },
    ],
    outputs: [],
  },
  {
    type: 'constructor',
    name: 'constructor',
    inputs: [
      {
        name: 'owner',
        type: 'core::starknet::contract_address::ContractAddress',
      },
    ],
  },
] as const satisfies Abi;

const SECOND_ADDRESS =
  '0x06cf28a72f9da6d7de39f2c7ea3862a7a76d1fa3b72d8fccf1cf3704091da559';

const MASTER_ADDRESS =
  '0x06cf28a72f9da6d7de39f2c7ea3862a7a76d1fa3b72d8fccf1cf3704091da559' ||
  process.env.NEXT_PUBLIC_MASTER_ADDRESS ||
  'MY_MASTER_ADDRESS';
const MASTER_KEY = process.env.NEXT_PUBLIC_MASTER_KEY || 'MY_KEY';

const ETH_ADDRSS =
  '0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7';

export const MyStarkApp = () => {
  const { provider } = useProvider();
  const masterAccount = new Account(provider, MASTER_ADDRESS, MASTER_KEY);
  const myEthContract = new Contract(abi, ETH_ADDRSS, provider);
  myEthContract.connect(masterAccount);

  const { connectors } = useInjectedConnectors({
    // Show these connectors if the user has no connector installed.
    recommended: [argent(), braavos()],
    // Hide recommended connectors if the user has any connector installed.
    includeRecommended: 'onlyIfNoConnectors',
    // Randomize the order of the connectors.
    order: 'alphabetical',
  });

  const { connect, error } = useConnect();
  const { account, status } = useAccount();
  const { data, error: balanceError } = useBalance({
    address: ETH_ADDRSS,
  });
  console.log('error', error);
  console.log('statsu', status);
  console.log('data', data, balanceError);

  const { chain } = useNetwork();
  const { contract } = useContract({
    abi,
    address: ETH_ADDRSS,
  });

  const { send, error: transferError } = useSendTransaction({
    calls: contract
      ? [contract.populate('transfer', [SECOND_ADDRESS, 1n])]
      : undefined,
  });

  console.log('send error', transferError);

  const sendFromMaster = async (recipientAddress) => {
    const myCall = myEthContract.populate('transfer', [recipientAddress, 1n]);
    const res = await myEthContract.transfer(myCall.calldata);
    await provider.waitForTransaction(res.transaction_hash);
    console.log('tx hash', res.transaction_hash);
    return res.transaction_hash;
  };

  const createAccount = async () => {
    // Generate public and private key pair.
    const privateKeyAX = stark.randomAddress();
    console.log('AX_ACCOUNT_PRIVATE_KEY=', privateKeyAX);
    const starkKeyPubAX = ec.starkCurve.getStarkKey(privateKeyAX);
    console.log('AX_ACCOUNT_PUBLIC_KEY=', starkKeyPubAX);
    const transactionHash = await sendFromMaster(starkKeyPubAX);
    console.log('hash', transactionHash);

    // Calculate future address of the account
    const AAaccountConstructorCallData = CallData.compile({
      super_admin_address: masterAccount.address,
      publicKey: starkKeyPubAX,
    });
    const deployCall = new Account(provider, starkKeyPubAX, privateKeyAX);
    const { transaction_hash: declTH, class_hash: decCH } =
      await deployCall.declare({
        contract: compiledAAaccount,
      });
    console.log('Customized account class hash =', decCH);
    await provider.waitForTransaction(declTH);

    // Deploy the account.

    const { transaction_hash, contract_address } =
      await deployCall.deployAccount({
        classHash: transactionHash,
        constructorCalldata: AAaccountConstructorCallData,
        addressSalt: starkKeyPubAX,
      });
    await provider.waitForTransaction(transaction_hash);

    console.log('New account address=', contract_address);
  };

  return (
    <div>
      <button
        onClick={() => {
          console.log('clicked');
          connect({ connector: connectors[1] });
        }}
        className="text-white"
      >
        Connect Wallet
      </button>
      <h1 className="text-white">{account?.address}</h1>

      <button
        className="text-red"
        onClick={() => {
          send();
        }}
      >
        Send Fund
      </button>

      <button
        className="text-white p-8 bg-pink-300"
        onClick={() => {
          sendFromMaster(SECOND_ADDRESS);
        }}
      >
        Send From Master
      </button>
      <button
        className="text-white p-8 bg-yellow-300"
        onClick={() => {
          createAccount();
        }}
      >
        Create Account
      </button>
    </div>
  );
};

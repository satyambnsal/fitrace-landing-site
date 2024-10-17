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
import { Account, Contract } from 'starknet';

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
] as const satisfies Abi;

const SECOND_ADDRESS =
  '0x041b27f006d01a9d2c468e33a05f1951b6a7cd0ac562b928a8e0728d4e5627dc';

const MASTER_ADDRESS =
  '0x0541b1f940b8da68bcc8f6a84805c3ab5e6f447aa78d015449179d423db94066';
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
    address:
      '0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7',
  });
  console.log('error', error);
  console.log('statsu', status);
  console.log('data', data, balanceError);

  const { chain } = useNetwork();
  const { contract } = useContract({
    abi,
    address:
      '0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7',
  });

  const { send, error: transferError } = useSendTransaction({
    calls: contract
      ? [contract.populate('transfer', [SECOND_ADDRESS, 1n])]
      : undefined,
  });

  console.log('send error', transferError);

  const sendFromMaster = async () => {
    const myCall = myEthContract.populate('transfer', [SECOND_ADDRESS, 1n]);
    const res = await myEthContract.transfer(myCall.calldata);
    await provider.waitForTransaction(res.transaction_hash);
    console.log('tx hash', res.transaction_hash);
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
          sendFromMaster();
        }}
      >
        Send From Master
      </button>
    </div>
  );
};

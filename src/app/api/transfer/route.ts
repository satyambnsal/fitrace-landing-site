import { NextRequest } from 'next/server';
import { supabaseServiceClient as supabase } from '@/db/config/server';
import { Abi, Account, Contract } from 'starknet';
import { useProvider } from '@starknet-react/core';

export async function POST(request: NextRequest) {
  const payload = await request.json();
  console.log('payload', payload);
  const { recipientAddress } = payload;
  console.log({ recipientAddress });

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

  const MASTER_ADDRESS =
    '0x06cf28a72f9da6d7de39f2c7ea3862a7a76d1fa3b72d8fccf1cf3704091da559' ||
    process.env.NEXT_PUBLIC_MASTER_ADDRESS ||
    'MY_MASTER_ADDRESS';
  const MASTER_KEY = process.env.NEXT_PUBLIC_MASTER_KEY || 'MY_KEY';
  const ETH_ADDRSS =
    '0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7';

  const { provider } = useProvider();
  const masterAccount = new Account(provider, MASTER_ADDRESS, MASTER_KEY);
  const myEthContract = new Contract(abi, ETH_ADDRSS, provider);
  myEthContract.connect(masterAccount);

  try {
    const myCall = myEthContract.populate('transfer', [recipientAddress, 1n]);
    const res = await myEthContract.transfer(myCall.calldata);
    await provider.waitForTransaction(res.transaction_hash);
    console.log('tx hash', res.transaction_hash);
    return Response.json(
      { success: true, tx_hash: res.transaction_hash },
      { status: 200 }
    );
  } catch (error: any) {
    console.error(error);
    return Response.json({ success: false }, { status: 500 });
  }
}

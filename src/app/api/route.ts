import { NextRequest } from 'next/server';

const IMAGE_BASE_URL = 'https://www.fitrace.xyz/img/';

export function GET(req: NextRequest) {
  const data = {
    name: 'Fitrace Sneaker ',
    description:
      'Fitrace Sneakers: Revolutionary NFT footwear that rewards you for staying active. Equip these digital kicks and earn as you walk, jog, or run. Step into the future of fitness and blockchain technology!',
    image: IMAGE_BASE_URL,
    attributes: [
      {
        trait_type: 'Type',
        value: 'Runner',
      },
      {
        trait_type: 'Rarity',
        value: 'Rare',
      },
      {
        trait_type: 'Boost',
        value: 'Speed',
      },
      {
        trait_type: 'Durability',
        value: 'High',
      },
      {
        trait_type: 'Color',
        value: 'Neon Green',
      },
      {
        trait_type: 'Reward Multiplier',
        value: 1.5,
      },
    ],
  };
  const id = parseInt(req.nextUrl.searchParams.get('id')!);
  const payload = data;
  payload.name += ` #${id}`;
  if (id < 6) {
    payload.image = `${IMAGE_BASE_URL}${id}.jpeg`;
  } else {
    payload.image = `${IMAGE_BASE_URL}default.jpeg`;
  }
  return Response.json(payload);
}

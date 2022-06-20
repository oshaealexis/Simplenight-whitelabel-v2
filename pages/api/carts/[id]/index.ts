/* eslint-disable indent */
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { ServerCartGetter } from 'core/server/ServerCartGetter';
import { ServerCartUpdate } from 'core/server/ServerCartUpdate';
import type { NextApiRequest, NextApiResponse } from 'next';
import { CartResponse } from '../../../../types/cart/CartType';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<CartResponse>,
) {
  return new Promise((resolve) => {
    const method = req.method ?? 'GET';
    const cartOption = {
      name: 'cart',
      value: 'cart',
    };
    const cartGetter = new ServerCartGetter(cartOption);
    const cartUpdate = new ServerCartUpdate(cartOption);
    const getMethod = (method: string) => {
      switch (method) {
        case 'GET':
          return cartGetter;
        case 'PUT':
          return cartUpdate;
        default:
          return cartGetter;
      }
    };
    const cartMethod = getMethod(method);
    cartMethod.handle(req, res).then(() => {
      return resolve(null);
    });
  });
}

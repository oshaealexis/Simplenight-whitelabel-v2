// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { applySimplenightApiKey } from 'apiCalls/config/middlewares/authHeaderMiddleware';
import type { NextApiRequest, NextApiResponse } from 'next';
import { applyApiBaseUrl } from 'apiCalls/config/responseHelpers';

type Data = {
  name: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  applySimplenightApiKey(req, res);
  const { prefix, lang } = req.query;

  const endpoint = `/locations/prefix?prefix=${prefix}&lang_code=${
    lang ?? 'en'
  }`;
  const url = applyApiBaseUrl(req, endpoint);

  res.redirect(url);
}

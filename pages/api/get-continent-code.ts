import type { NextApiRequest, NextApiResponse } from "next";

// NOTE: `x-vercel-ip-continent` is set by Vercel's edge network. It is not
// present when this runs on Cloudflare Workers, so continentCode will
// resolve to undefined there (same as in local dev today) until this is
// replaced with a Cloudflare-specific geo signal.
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const header = req.headers["x-vercel-ip-continent"];
  const continentCode = Array.isArray(header) ? header[0] : header;

  res
    .status(200)
    .setHeader("Content-Type", "application/json")
    .json({ continentCode: continentCode || undefined });
}

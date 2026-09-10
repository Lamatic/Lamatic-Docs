import type { NextApiRequest, NextApiResponse } from "next";

// Reads the raw body ourselves so this behaves like the previous edge
// handler's `req.json()`: the frontend calls in
// components/MainContentWrapper.tsx don't set a Content-Type header, so
// Next's default (Content-Type-driven) body parser would not treat the
// body as JSON.
export const config = {
  api: {
    bodyParser: false,
  },
};

async function readJsonBody(req: NextApiRequest) {
  const chunks: Uint8Array[] = [];
  for await (const chunk of req) {
    chunks.push(chunk);
  }
  const raw = Buffer.concat(chunks).toString("utf-8");
  return raw ? JSON.parse(raw) : {};
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method !== "POST") {
      return res.status(400).json({});
    }
    if (!process.env.SLACK_WEBHOOK_FEEDBACK_URL)
      throw new Error("SLACK_WEBHOOK_FEEDBACK_URL is not set");

    const body = await readJsonBody(req);

    const slackResponse = await fetch(process.env.SLACK_WEBHOOK_FEEDBACK_URL, {
      method: "POST",
      body: JSON.stringify({
        rawBody: JSON.stringify(
          {
            type: "docs-feedback",
            ...body,
          },
          null,
          2
        ),
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (slackResponse.status === 200) {
      return res.status(200).json({ status: "OK" });
    } else {
      console.error(slackResponse);
      return res.status(500).json({});
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({});
  }
}

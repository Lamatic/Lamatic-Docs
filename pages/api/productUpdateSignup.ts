import type { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";

// Reads the raw body ourselves so this behaves like the previous edge
// handler's `req.json()`, independent of the request's Content-Type.
export const config = {
  api: {
    bodyParser: false,
  },
};

const emailSchema = z.string().email();

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
  if (req.method !== "POST") {
    return res.status(400).json({});
  }

  const body = await readJsonBody(req);
  const { email, source } = body;

  // Validate email using zod
  if (!emailSchema.safeParse(email).success) {
    return res.status(400).json({ error: "Invalid email address" });
  }

  try {
    const [slackResponse, loopsResponse] = await Promise.all([
      fetch(process.env.SLACK_WEBHOOK_URL, {
        method: "POST",
        body: JSON.stringify({ rawMessage: JSON.stringify(body, null, 2) }),
        headers: {
          "Content-Type": "application/json",
        },
      }),
      fetch("https://app.loops.so/api/v1/contacts/create", {
        method: "POST",
        body: JSON.stringify({
          email,
          source,
          receiveProductUpdates: true,
        }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.LOOPS_API_KEY}`,
        },
      }),
    ]);

    if (
      slackResponse.status === 200 &&
      (loopsResponse.status === 200 || loopsResponse.status === 409)
    ) {
      return res.status(200).json({ status: "OK" });
    } else {
      console.error("Slack", JSON.stringify(slackResponse));
      console.error("Loops", JSON.stringify(loopsResponse));
      return res.status(500).json({});
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({});
  }
}

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const method = req.method;
  if (method === "GET") {
    return res.send(method);
  } else if (method === "POST") {
    return res.send(method);
  } else if (method === "PUT") {
    return res.send(method);
  } else if (method === "DELETE") {
    return res.send(method);
  }

  return res.status(405).send("Method Not Allowed");
}

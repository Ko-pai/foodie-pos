import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const method = req.method;

  if (method === "GET") {
    return res.send("Hello get response");
  } else if (method === "POST") {
const {tableId , cartItem} = req.body

    return res.send(req.body);
  } else if (method === "PUT") {
  } else if (method === "DELETE") {
  } else {
    return res.status(500).send("Method not allowed");
  }
}

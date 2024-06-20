import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  let method = req.method;
  if (method === "GET") {
    return res.send("Get order");
  } else if (method === "POST") {
    return res.send("Post order");
  } else if (method === "PUT") {
    return res.send("Put order");
  } else if (method === "DELETE") {
    return res.send("Delete order");
  }

  return res.status(405).send("Method Not Allowed");
}

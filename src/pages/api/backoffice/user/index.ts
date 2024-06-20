import { NextApiRequest, NextApiResponse } from "next";
import { useSession } from "next-auth/react";

export default function user(req: NextApiRequest, res: NextApiResponse) {
  const method = req.method;
  switch (method) {
    case "GET":
      res.status(200).send("Get method");
      break;
    case "POST":
      res.status(200).send("Post method");

      break;
    case "PUT":
      res.status(200).send("Put method");
      break;
    case "DELETE":
      res.status(200).send("Delete method");
      break;

    default:
      res.status(501).send("Method Not Allowed");
      break;
  }
}

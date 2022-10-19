import prisma from "../../../lib/prisma";
import { User } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { serialize } from "cookie";
export default async function login(req: NextApiRequest, res: NextApiResponse) {
  const dataReq = req.body;
  console.log("data", dataReq.email);
  const userLogin = await prisma.user.findFirst({
    where: {
      email: dataReq.email,
    },
  });

  const secret = "12333";
  const passwordLogin = await bcrypt.compareSync(
    req.body.password,
    userLogin?.password || ""
  );
  if (!passwordLogin) res.status(400).send("Password incorrect");
  else { 
    if(userLogin?.admin === true) {
      const token = jwt.sign(
        { 
          id: userLogin?.id, 
          email: userLogin?.email,
          authorities: userLogin?.admin
      },
        secret
      );
      console.log("token", token);
      res.setHeader("Set-Cookie", serialize("token", token));
      res.status(200).send(userLogin);
    } else 
      console.log("you don't allow to access")
    }
}

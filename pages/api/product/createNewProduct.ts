import prisma from "../../../lib/prisma";
import type { NextApiRequest, NextApiResponse } from "next";
import { Product } from "@prisma/client";

export default async function createNewProduct(
    req: NextApiRequest,
    res: NextApiResponse 
) {
    const dataReq = req.body
    console.log("newProduct", dataReq)
}
import prisma from "../../../lib/prisma";
import type { NextApiRequest, NextApiResponse } from "next"

export default async function getAllProduct(
    req: NextApiRequest,
    res: NextApiResponse<any>
) {
    const itemProduct = await prisma.product.findMany();
    res.status(200).json(itemProduct)
}
import prisma from "../../../lib/prisma";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function deleteProduct(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const dataReq = req.body;
  try {
    const deleteProduct = await prisma.product.delete({
      where: {
        id: JSON.parse(JSON.stringify(dataReq.id)),
      },
    });
  } catch (error) {
    res.status(500).json("error")
  }
}

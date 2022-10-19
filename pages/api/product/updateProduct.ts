import prisma from "../../../lib/prisma";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function (req: NextApiRequest, res: NextApiResponse<any>) {
  const dataReq = req.body;
  try {
    if(
      dataReq.nameProduct === null || 
      dataReq.price === null || 
      dataReq.color === null || 
      dataReq.material === null||
      dataReq.color === null ||
      dataReq.description === null ||
      dataReq.urlImg === null ||
      dataReq.detail === null
      ) {
        console.log("missing data")
      } else {
        const upDateProduct = await prisma.product.update({
          where: {
            id: dataReq.id,
          },
          data: {
            nameProduct: dataReq.nameProduct,
            price: dataReq.price,
            material: dataReq.material,
            color: dataReq.color,
            description: dataReq.description,
            image: dataReq.urlImg,
            detailProduct: dataReq.detail,
          },
        });
      }
  } catch (error) {
    console.log("error");
  }
}

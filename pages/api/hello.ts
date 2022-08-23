// import type { NextApiRequest, NextApiResponse } from 'next'
// import prisma from '../../lib/prisma'
// import {User} from "@prisma/client"
// type Data = {
//   name: string
// }

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse<Data>
// ) {
//     const newUser = await prisma.user.create({
//       name: "123",
//       password: "123123",
//       phone: 123123,
//       admin: true
//     })
//     res.status(200).json(newUser)
// }

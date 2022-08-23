import { User } from '@prisma/client';
import prisma from "../../../lib/prisma";
import type { NextApiRequest, NextApiResponse } from "next";
import bcrypt, { compare, hash } from 'bcrypt'
const saltRounds = 10;
export default async function register(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const dataReq = req.body as User;
    console.log("data", dataReq);
    const password = dataReq.password;

    var salt = bcrypt.genSaltSync(10);
    var hashPassword = bcrypt.hashSync(dataReq.password, salt);
    console.log("encodePass", hashPassword);
    try {
        console.log("vao day")
        const newUser = await prisma.user.create({
            data: {
                name: dataReq.name,
                email: dataReq.email,
                phone: dataReq.phone,
                password: hashPassword
            }
        })
        res.status(200).json(newUser)
    } catch (error) {
        console.log("err")
    }
}
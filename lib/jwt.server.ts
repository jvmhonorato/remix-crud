import { sign, verify }  from "jsonwebtoken"

const secret = "dasdsadasdsadadasdasa"

export const signToken = (payload) => sign(payload , secret)
export const verifyToken = (token: string) => verify(token, secret)


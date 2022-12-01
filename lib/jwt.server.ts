import { sign, verify }  from "jsonwebtoken"
import {User} from "models/User"

const secret = "dasdsadasdsadadasdasa"

type UserAuth = Pick<User , 'id'| 'email'>

export const signToken = (payload:UserAuth ) => sign(payload , secret)
export const verifyToken = (token: string)  => verify(token, secret)


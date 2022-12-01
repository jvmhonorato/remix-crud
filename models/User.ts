import {  z } from 'zod'


// schema ZOD validation
export const UserSchema = z.object({
    id:z.number(),
    email: z.string().email( {message: 'informe um email válido'}),
    passwd: z.string().min(5, {message: 'A senha precisa ter mais de 5 caracteres'})
})

//use QuoteSchema as a type model interface
export type User = z.infer<typeof UserSchema>

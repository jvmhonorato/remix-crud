import { z } from 'zod'

// schema ZOD validation
export const QuoteSchema = z.object({
    quote: z.string().min(10, {message: 'A citação precisa ter mais de 10 caracteres'}),
    author: z.string().min(5, {message: 'O autor precisa ter mais de 5 caracteres'})
})

//use QuoteSchema as a type model interface
export type Quote = z.infer<typeof QuoteSchema>

export type QuoteErrors = inferSafeParseErrors<typeof QuoteSchema>

export type inferSafeParseErrors<T extends z.ZodType<any, any, any>, U = string> = {

    formErrors: U[],
    fieldErrors: {
        [P in keyof z.infer<T>]? :U[]
    }
}
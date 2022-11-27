import { ActionFunction, json, LoaderFunction, redirect } from "@remix-run/node";
import { Form, useActionData, useLoaderData } from "@remix-run/react";
import { getModels } from "lib/db.server";
import { z } from 'zod'

const QuoteSchema = z.object({
    quote: z.string().min(10),
    author: z.string().min(5)
})

export const action: ActionFunction = async ({request, params}) => {
    try{
    const formData = await request.formData()
    const id = params.id
    const quote = formData.get('quote')
    const author = formData.get('author')
    const quoteObj = QuoteSchema.parse({
        quote,author
    })

    const { Quote } = await getModels()
   await Quote.update({
        id,
    },
    quoteObj
    )
    return redirect("/")
}catch(err){
    console.log(err.issues)
    const issues = err.issues
    const issuesObj = issues.reduce((prev: any, curr: { path: any[]; message: any; })=> {
        return {...prev, [curr.path[0]]: curr.message}
    },{})
    return json({
        errors: issuesObj
    })
}
}

export const loader : LoaderFunction = async({params}) => {
    const id = params.id
    const { Quote } = await getModels()
    const quote = await Quote.findOne({ id })
    return json({quote})
}


export default function QuoteEdit(){
    const {quote} = useLoaderData()
    const action = useActionData()
    return (
        <>
         <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
      <h1>Quotes</h1>
      <pre>{JSON.stringify(quote, null, 2)}</pre>
      <pre>{JSON.stringify(action, null, 2)}</pre>
      <Form method="post" action="?index">
        <input type="text" name="quote" placeholder="quote" defaultValue={quote.quote} />
        {action?.errors?.quote && <p>{action?.errors?.quote}</p>}
        <input type="text" name="author" placeholder="author" defaultValue={quote.author} />
        {action?.errors?.author && <p>{action?.errors?.author}</p>}
        <button>Update Quote</button>
      </Form >
      </div>
      </>
    )
}
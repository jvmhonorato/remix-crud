import { ActionFunction, json, LoaderFunction, redirect } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import { getModels } from "lib/db.server";

export const action: ActionFunction = async ({request, params}) => {
    const formData = await request.formData()
    const id = params.id
    const quote = formData.get('quote')
    const author = formData.get('author')
    const { Quote } = await getModels()
   await Quote.update({
        id,
    },{quote, author,}
    )
    return redirect("/")
}

export const loader : LoaderFunction = async({params}) => {
    const id = params.id
    const { Quote } = await getModels()
    const quote = await Quote.findOne({ id })
    return json({quote})
}


export default function QuoteEdit(){
    const {quote} = useLoaderData()
    return (
        <>
         <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
      <h1>Quotes</h1>
      <pre>{JSON.stringify(quote, null, 2)}</pre>
      <Form method="post" action="?index">
        <input type="text" name="quote" placeholder="quote" defaultValue={quote.quote} />
        <input type="text" name="author" placeholder="author" defaultValue={quote.author} />
       
        <button>Update Quote</button>
      </Form >
      </div>
      </>
    )
}
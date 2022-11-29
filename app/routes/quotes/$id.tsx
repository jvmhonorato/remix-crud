import {type ActionFunction, json,type LoaderFunction, redirect } from "@remix-run/node";
import { Form, Link, useActionData, useLoaderData } from "@remix-run/react";
import { getModels } from "lib/db.server";
import {QuoteSchema, type Quote, type QuoteErrors } from "models/Quote";





type LoaderDataType ={
    quote:Quote
}
type ActionDataType = {
    errors: QuoteErrors
}



export const action: ActionFunction = async ({request, params}) => {
    
    const formData = await request.formData()
    const id = params.id
    const quote = formData.get('quote')
    const author = formData.get('author')

     //validation condition update
    const quoteObj = QuoteSchema.safeParse({
        quote,
        author,
    })
    if(quoteObj.success){
        const { Quote } = await getModels() 
        await Quote.update(
            {
             id,
            },
         quoteObj
         )
         return redirect("/")
    }
   
    return json({
        errors:  quoteObj.error.flatten()
    })
}


export const loader : LoaderFunction = async({params}) => {
    const id = params.id
    const { Quote } = await getModels()
    const quote = await Quote.findOne({ id })
    return json({quote})
}

export const handle = {
    breadcrumb: (data: LoaderDataType) => (<Link to={`/quotes${data.quote.id}` }> {data.quote.quote}</Link>),
    // other: "test"
}

export default function QuoteEdit(){
    const {quote} = useLoaderData<LoaderDataType>()
    const action = useActionData< ActionDataType>()
    return (
        <>
        
      <pre>{JSON.stringify(quote, null, 2)}</pre>
      <pre>{JSON.stringify(action, null, 2)}</pre>
      <Form method="post" action="?index">
        <input type="text" name="quote" placeholder="quote" defaultValue={quote.quote} />
        {action?.errors?.fieldErrors?.quote && <p>{action?.errors?.fieldErrors?.quote.map((errMessage) => errMessage)}</p>}
        <input type="text" name="author" placeholder="author" defaultValue={quote.author} />
        {action?.errors?.fieldErrors?.author && <p>{action?.errors?.fieldErrors?.author.map((errMessage) => errMessage)}</p>}
        <button>Update Quote</button>
      </Form >
      
      </>
    )
}
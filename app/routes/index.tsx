import { json, LoaderFunction,  ActionFunction } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import { getModels } from '../../lib/db.server'

interface Quote{
    id:Number,
    quote: String,
    author: String

  }

export const action : ActionFunction = async({ request }) => {
 const formData = await request.formData()
const quote = formData.get('quote')
const author = formData.get('author')

const  { Quote } = await getModels()
await Quote.create({
  quote,
  author
})

 return json({
  quote,
  author
 })
} 


export const loader : LoaderFunction = async() => {
  const { Quote } = await getModels()
  const quotes = await Quote.find()
  return json({ quotes })
}

export default function Index() {
  const {quotes} = useLoaderData() as {quotes: Quote[]}
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
      <h1>Quotes</h1>
      <Form method="post" action="?index">
        <input type="text" name="quote" placeholder="quote" />
        <input type="text" name="author" placeholder="author" />
        <button>Create Quote</button>
      </Form >
      <ul>
        { quotes.map(quote => {
          return (
            <li key={quote.id.toString()}>
          {quote.quote} - {quote.author}
            
        </li>)
        })}
       
      </ul>
    </div>
  );
}

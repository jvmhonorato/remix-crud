import { json, LoaderFunction,  ActionFunction } from "@remix-run/node";
import { Form, Link, useActionData, useLoaderData, useTransition } from "@remix-run/react";
import { QuoteErrors, QuoteSchema } from "models/Quote";
import { getModels } from '../../lib/db.server'

const sleep = (time : number) => 
new Promise((resolve) =>  {
  setTimeout(resolve, time) 
    
  });

interface Quote{
    id:Number,
    quote: String,
    author: String

  }
  type ActionDataType = {
    errors: QuoteErrors
}

export const action : ActionFunction = async({ request }) => {
  await sleep(3000)
 const formData = await request.formData()
 const  { Quote } = await getModels()
 const action = formData.get('action')
if(action === 'delete'){
   //excluir
   const id = formData.get('id') as string
   await Quote.remove({ id })

   return json({
    success: true
   })
}

  const quote = formData.get('quote') as string
  const author = formData.get('author') as string

  //validation condition to create
  const quoteObj = QuoteSchema.safeParse({
    quote,author
})
if(quoteObj.success){
  await Quote.create({
    quote,
    author
    
  })
  return json({
    quote,
    author
   })
  }
  //errors
  return json({
    errors:  quoteObj.error.flatten()
})
}




export const loader : LoaderFunction = async() => {
  const { Quote } = await getModels()
  const quote = await Quote.find()
  return json({ quote })
}

export const handle = {
  breadcrumb: () => (<Link to='/'>Home</Link>)
}

export default function Index() {
  const {quote} = useLoaderData() as {quote: Quote[]}
  const action = useActionData<ActionDataType>()
  const transition = useTransition()
  const isSaving = transition.state === "submitting" && transition.submission?.formData?.get('action') === 'create'
  return (
    <div  className='flex items-center justify-center min-h-screen from-red-100 via-red-300 to-blue-500 bg-gradient-to-br'>
    <div>
      <div  className='flex items-center justify-center '>
         <img   src="https://icon-icons.com/downloadimage.php?id=144400&root=2385/PNG/512/&file=comment_bubble_icon_144400.png" width="300px" height="300px" alt="bubble" />
      </div>
   
      {/* <h1 className="font-sans md:font-serif flex items-center justify-center ">Comentário</h1> */}
      {transition.state === "submitting" && <p>Processando...</p>}
      <Form className='mt-10 flex  items-center justify-center ;  ' method="post" action="?index">
      <input type="hidden" name="action" value="create"/>
      {/* <pre>{JSON.stringify(action, null, 2)}</pre>
      <pre>{JSON.stringify(isSaving, null, 2)}</pre> */}
        <input type="text" name="quote" placeholder="Comentário" />
        {action?.errors?.fieldErrors?.quote && <p>{action?.errors?.fieldErrors?.quote.map((errMessage) => errMessage)}</p>}
        <input type="text" name="author" placeholder="Autor" />
        {action?.errors?.fieldErrors?.author && <p>{action?.errors?.fieldErrors?.author.map((errMessage) => errMessage)}</p>}
        <button disabled={isSaving}>{isSaving ? "Salvando..." : "Criar Comentário"}</button>
      </Form >
      <ul className=" mt-10  p-4 items-center justify-center w-[680px] rounded-xl group sm:flex space-x-6 bg-white bg-opacity-50 shadow-xl hover:rounded-2xl" >
        { quote.map(quote => {
          return (
            <li  key={quote.id.toString()}>
              <div className="flex justify-start">
              <div>{quote.quote} </div> - <div>{quote.author}</div>
              </div>
         
          <Link to={`quotes/${quote.id}`}>Edit</Link>
              <Form action="?index" method="post">
                <input type="hidden" name="id" value={quote.id.toString()}/>
                <input type="hidden" name="action" value="delete"/>
                <button>Excluir</button>
              </Form>

        </li>)
        })}
       
      </ul>
    </div>
    </div>
  );
}

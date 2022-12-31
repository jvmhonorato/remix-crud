import { ActionFunction, json,  redirect } from "@remix-run/node"
import { Form } from "@remix-run/react"
import { auth } from "../../lib/cookies.server"
import { getModels } from '../../lib/db.server'
import { User} from 'models/User'

import { signToken } from "lib/jwt.server"

//action to setting cookie 
export const   action: ActionFunction = async({ request }) => {
    //use formData to grab input name im Form
   const formData = await   request.formData()
   const email = formData.get('email') as string ||''
   const passwd = formData.get('passwd') as string || ''  
   console.log(email, passwd)

//grab model interface em db.server
const  { User } = await getModels()
//take input data in Form
const user = await User.findOne({ email })
console.log({user})
// if be user in databank fall in second condition
if(user){
    //if passwd is correct
    if(user.passwd === passwd){
        //put data in  object payload
        const payload = {
            id: user.id,
            email:user.email
            
        }
            //turn data from input in token auth
    const token = signToken(payload)
    //use token auth as a password access
    const cookie = {id:user.id,user:user.email, token:token}
    return redirect('/admin', {
        headers: {
           'Set-Cookie': await auth.serialize(cookie)
        }
    })
    }
}

    

    


    

    return json({})
}

const SignIn = () => {
    return (
        <>
        
        <div className='flex items-center justify-center min-h-screen from-red-100 via-red-300 to-blue-500 bg-gradient-to-br'>
         <Form className="mt-8 space-y-6" action="#" method="post">
         {/* <input name='email' type="email" placeholder="email"/>
         <input name= 'passwd' type="password" placeholder="password"/>
         <button type='submit'>Sign-in</button> */}


         <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
  <div className="w-full max-w-md space-y-8">
    <div>
      
      <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">Sign in to your Remix Crud</h2>
      
    </div>
    
      
      <div className="-space-y-px rounded-md shadow-sm">
        <div>
          
          <input name='email' type="email" className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm" placeholder="Email address"/>
        </div>
        <div>
          
          <input  name= 'passwd' type="password" placeholder="Password" className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"/>
        </div>
      </div>

     

      <div>
        <button type="submit" className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3">
            
            <svg className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fill-rule="evenodd" d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z" clip-rule="evenodd" />
            </svg>
          </span>
          Sign in
        </button>
      </div>
    
  </div>
</div>


         </Form>
         </div>
        </>
    )
}
export default SignIn
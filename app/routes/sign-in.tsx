import { redirect } from "@remix-run/node"
import { Form } from "@remix-run/react"
import { auth } from "../../lib/cookies.server"


//action to setting cookie 
export async function action({request}) {
    const cookie = {user:'Victor Honorato', token:'<token>'}

    
    return redirect('/admin', {
        headers: {
           'Set-Cookie': await auth.serialize(cookie)
        }
    })
}

const SignIn = () => {
    return (
        <>
        <h1>Sign-in</h1>
        
         <Form method="post">
         <input type="email" placeholder="email"/>
         <input type="password" placeholder="password"/>
         <button type='submit'>Sign-in</button>


         </Form>
        </>
    )
}
export default SignIn
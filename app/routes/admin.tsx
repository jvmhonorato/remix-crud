import { json, redirect } from "@remix-run/node"
import { Outlet, useLoaderData } from "@remix-run/react"
import { auth } from "lib/cookies.server"
import { verifyToken } from "lib/jwt.server"

export async function loader({request}){
    const cookieHeader = request.headers.get('Cookie')
    const cookie = (await auth.parse(cookieHeader)) || {}

    const {token} = cookie
    try{
        const decoded = verifyToken(token)
        return json({
            cookie,
            token,
            decoded
        })
    }catch(err){
        
    }
    return redirect("sign-in")

  
}


const AdminLayout = () => {
    const data = useLoaderData()
    return(
        <>
        <h1>Admin Layout</h1>
        <pre>{JSON.stringify(data, null,2)}</pre>
        <Outlet/>
        </>
    )
}

export default AdminLayout
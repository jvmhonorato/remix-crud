import { json, LoaderFunction, redirect } from "@remix-run/node"
import { Link, Outlet, useLoaderData } from "@remix-run/react"
import { auth } from "lib/cookies.server"
import { verifyToken } from "lib/jwt.server"

export  const loader: LoaderFunction = async({request}) => {
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
        <Link to='/sign-out'>Log out</Link>
        <pre>{JSON.stringify(data, null,2)}</pre>
        <Outlet/>
        </>
    )
}

export default AdminLayout
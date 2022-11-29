import { json, redirect } from "@remix-run/node"
import { Outlet } from "@remix-run/react"
import { auth } from "lib/cookies.server"

export async function loader({request}){
    const cookieHeader = request.headers.get('Cookie')
    const cookie = (await auth.parse(cookieHeader)) || {}
    
    if(!cookie || !cookie.token ){
        return redirect('/sign-in')
    }

    return json({
        cookie,
    })
}


const AdminLayout = () => {
    return(
        <>
        <h1>Admin Layout</h1>
        <Outlet/>
        </>
    )
}

export default AdminLayout
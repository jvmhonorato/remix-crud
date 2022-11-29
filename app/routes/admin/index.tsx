
import { useLoaderData } from "@remix-run/react"




const AdminHome = () => {
    const data = useLoaderData()
    return(
        <>
           <h1>Admin</h1>   
           <pre>{JSON.stringify(data, null, 2)}</pre>
        </>
    )
}
export default AdminHome
import { useLoaderData } from "@remix-run/react"




const AdminQuotes = () => {
    const data = useLoaderData()
    return(
        <>
           <h1>AdminQuotes</h1>   
           <pre>{JSON.stringify(data, null, 2)}</pre>
        </>
    )
}
export default AdminQuotes
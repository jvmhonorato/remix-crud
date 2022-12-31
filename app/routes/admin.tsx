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
        <div className='flex items-center justify-center min-h-screen from-red-100 via-red-300 to-blue-500 bg-gradient-to-br'>
        
        
         <div className="relative flex justify-center items-center">
 
  

  <div >
    <div className="2xl:container  2xl:mx-auto py-48 px-4 md:px-28 flex justify-center items-center h-5">
      <div className="w-96 md:w-auto bg-white bg-opacity-20 shadow-xl hover:rounded-xl relative flex flex-col justify-center items-center bg-white py-16 px-4 md:px-24 xl:py-24 xl:px-36">
      <div  className='flex items-center justify-center '>
         <img   src="https://icon-icons.com/downloadimage.php?id=144400&root=2385/PNG/512/&file=comment_bubble_icon_144400.png" width="300px" height="300px" alt="bubble" />
      </div>
        <div className="mt-12">
          <h1 role="main" className="text-3xl dark:text-white lg:text-4xl font-semibold leading-7 lg:leading-9 text-center text-gray-800">Remix Crud</h1>
        </div>
        <div className="mt">
          <p className="mt-6 sm:w-80 text-base dark:text-white leading-7 text-center text-gray-800 font-bold text-xs leading-tight uppercase rounded">Grave mensagens, comentários, citações e etc! </p>
        </div>
        <Link className="w-full dark:text-gray-800 font-bold text-xs leading-tight uppercase rounded dark:hover:bg-gray-100 dark:bg-white sm:w-auto mt-14 text-base leading-4 text-center text-white py-6 px-16 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 bg-gray-800 hover:bg-black" to='/main'>Comentar Agora</Link>
        <Link className="inline-block m-6 p-6 px-6 py-2.5 bg-transparent text-blue-600 font-bold text-xs leading-tight uppercase rounded hover:text-blue-700 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none focus:ring-0 active:bg-gray-200 transition duration-150 ease-in-out" to='/sign-out'>Log out</Link>
        
        
        
      </div>
    </div>
  </div>
</div>


        {/* <pre>{JSON.stringify(data, null,2)}</pre> */}
        

        
        </div>
        </>
    )
}

export default AdminLayout
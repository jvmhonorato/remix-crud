import { Link, Outlet } from "@remix-run/react"


const AboutLayout = () => {
    return(
        <>
        <div>
            <h1>Sobre</h1>
            <ul>
                <li><Link to='/'>Home</Link></li> 
                <li><Link to='/about'>Sobre</Link></li>
                <li><Link to='/career'>Carreira</Link></li>
            </ul>
            <Outlet/>
        </div>
        </>
    )
}
export default AboutLayout
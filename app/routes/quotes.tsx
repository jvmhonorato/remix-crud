import { Link, Outlet, useMatches } from "@remix-run/react"

const QuotesLayout = () => {
   const matches = useMatches()
    return(  <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
    <h1><Link to='/'>Quotes</Link></h1>
    <Outlet/>
    {matches.map((match)=> {
    if(match.handle){
        const handleElement = match.handle.breadcrumb(match.data)
        return <li>{handleElement}</li>
    }
    return(
      null
    )})}
   
    </div>
    )
}

export default QuotesLayout
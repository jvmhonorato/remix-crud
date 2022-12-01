import { json, LoaderFunction, redirect } from "@remix-run/node";
import {  deleteAuth } from "lib/cookies.server";

export  const loader:LoaderFunction = async({request}) => {
  
    return redirect("/sign-in", {
        headers: {
            "Set-Cookie": await deleteAuth.serialize({})
        }
 
    })
}
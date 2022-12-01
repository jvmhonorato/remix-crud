import { json, redirect } from "@remix-run/node";
import { auth, deletAuth } from "lib/cookies.server";

export async function loader({request}) {
  
    return redirect("/sign-in", {
        headers: {
            "Set-Cookie": await auth.serialize({})
        }
 
    })
}
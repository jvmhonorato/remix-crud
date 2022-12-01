import {createCookie} from '@remix-run/node'

export const auth = createCookie("auth",{
    maxAge: 604_800,
    
})

export const deleteAuth = createCookie("auth",{
    maxAge: -604_800,
    
})
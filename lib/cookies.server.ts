import {createCookie} from '@remix-run/node'

export const auth = createCookie("auth",{
    maxAge: 604_800,
    
})

export const deletAuth = createCookie("auth",{
    maxAge: -604_800,
    
})
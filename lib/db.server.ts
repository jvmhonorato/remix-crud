import { connect } from 'trilogy'
import { User } from  'models/User'
import { Quote } from 'models/Quote'
const db = connect('./file.db', {
    client:'sql.js'
})

export const getModels = async() => {
    const  Quote = await db.model<Quote>('Quote', {
        
        quote: String,
        author: String,
        id: 'increments',
        
    })
    const  User = await db.model<User>('users', {
        
        email: String,
        passwd: String,
        id: 'increments',
        
    })

    //initial seed
    const userRoot = await User.findOne({id: 1})
    if(!userRoot){
        await User.create({
             email:'vituhonorato@teste.com', 
             passwd:'abc123',
             id : 1 
            })
    }
     console.log({userRoot})


    return { Quote, User}
}
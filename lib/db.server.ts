import { connect } from 'trilogy'

const db = connect('./file.db', {
    client:'sql.js'
})

export const getModels = async() => {
    const  Quote = await db.model('Quote', {
        id: 'increments',
        quote: String,
        author: String,
        
    })
    return { Quote }
}
import { connect } from 'trilogy'

const db = connect('./file.db', {
    client:'sql.js'
})

export const getModels = async() => {
    const  Quote = await db.model('Quote', {
        quote: String,
        author: String,
        id: 'increments'
    })
    return { Quote }
}
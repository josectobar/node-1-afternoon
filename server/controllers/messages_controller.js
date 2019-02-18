let messages = []
let id = 0

module.exports = {
    createMessage: (req, res) => {
        const { text, time } = req.body
        messages.push({ id, text, time })
        id++
        res.status(200).send( messages )
    },

    readMessages: (req, res) => {
        res.status(200).send(messages)
    },
    updateMessage: (req, res) => {
        const { text } = req.body
        const { id } = req.params

        const updatedMessages = messages.map(message => {

            if (message.id == id) {
                message.text = text 
                return message
            }
            return message
        })
        
        messages = [...updatedMessages]
        res.status(200).send(messages)
    },
    deleteMessage: (req, res) => {
        const { id } = req.params
        const updatedMessages = messages.filter(message => message.id != id)
        messages = [...updatedMessages]
        res.status(200).send(messages)
    }
}
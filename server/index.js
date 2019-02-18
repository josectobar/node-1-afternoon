const express = require('express')
const bodyParser = require('body-parser')
const ctrl = require('./controllers/messages_controller')

const app = express()

massive('postgres://ruqkbkfrlvwdnj:842a385529736b9946845cc32fb527547feecc860d652190eb6e31a15d44f8b3@ec2-54-204-41-109.compute-1.amazonaws.com:5432/d6fiejgqo477pu?ssl=true').then((dbInstance) => {
    app.set('db', dbInstance)
    console.log("We're connected!");
    
})

app.use( bodyParser.json() )
app.use(express.static(__dirname + './../public/build'))

const messageBaseUrl = '/api/messages'

app.get(messageBaseUrl, ctrl.readMessages)
app.post(messageBaseUrl, ctrl.createMessage)
app.put(messageBaseUrl + "/:id", ctrl.updateMessage)
app.delete(messageBaseUrl+ "/:id", ctrl.deleteMessage)

const port = 3001

app.listen(3001, () => console.log('We are live on 3001!'))
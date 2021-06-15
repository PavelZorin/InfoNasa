const options = {
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    useCreateIndex: true
}
    
const DB_HOST = 'localhost'
const DB_NAME = 'space'
const DB_PORT = 27017

const dbConnectionURL = `mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`

const serverURL = 'http://localhost:3000'

module.exports = {options, dbConnectionURL, serverURL}
const path = require('path')
const app = require(path.join(__dirname,'src','app.js'))
const dotenv = require('dotenv')

dotenv.config()

const PORT = process.env.PORT || 5000

app.listen(PORT, ()=> {
    console.log("server running ....")
})
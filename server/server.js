const express = require("express")
const cookieParser = require("cookie-parser")

// DB connection (Mongoose)
require('./init_db')

const app = express()
app.use(cookieParser())

// models
// const BlogSchema = require('./blog.model')

// Routes
app.use('/api/blog', require('./blog.route'))


//use this to show the image you have in node js server to client (react js)
//https://stackoverflow.com/questions/48914987/send-image-path-from-node-js-express-server-to-react-client
app.use('/uploads', express.static('uploads'));


const PORT = 5000
app.listen(PORT, () => {
  console.log(`Server Running at ${PORT}`)
});
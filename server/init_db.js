const mongoose = require("mongoose")

const MONGO_URI = 'mongodb://localhost:27017/Blog'
const connect = mongoose
            .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
            .then(() => console.log('MongoDB ON'))
            .catch(err => console.log(err))

module.exports = connect
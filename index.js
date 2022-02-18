const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const logger = require('morgan');
const express = require('express');
const app = express();
const http = require("http");
const mainRoutes = require("./server/routes/main");
var cors = require('cors');
const server = http.createServer(app);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(logger('dev'));
app.use(cors());
// Connect to MongoDB
const connectDB = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/education',
            {
                useNewUrlParser: true,
                useUnifiedTopology: true
            });
        console.log("MongoDB connect")
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}
const io = (module.exports.io = require('socket.io')(server, {
    cors: {
        origin: '*',
    }
}));
const socketManager = require("./server/meet/socketManager");
io.on("connection", socketManager);
connectDB()
const port = 4000;

app.use('/api/', mainRoutes);
app.listen({ port }, () => {
    console.log(`Server ready at http://localhost:${port}`);
})
const express = require('express')
const { ApolloServer } = require('apollo-server-express')
const mongoose = require('mongoose')
const typeDefs = require('./schema/schema')
const resolvers = require('./resolver/resolver')

// Load db methods
const mongoDataMethods = require('./data/db')

// Connect to MongoDB
const connectDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://huyen:nguyenhuyennd1211@cluster0.lbw2l.mongodb.net/Cluster0?retryWrites=true&w=majority',
            {
                useCreateIndex: true,
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useFindAndModify: true,
            });
        console.log("MongoDB connect")
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}
connectDB()
const port = 4000;
const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ()=> ({mongoDataMethods})
})
const app = express()
server.applyMiddleware({ app })

app.listen({ port }, () => {
    console.log(`Server ready at http://localhost:${port}${server.graphqlPath}`);
})
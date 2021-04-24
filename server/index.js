require('dotenv').config() // lay du lieu tu .env
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')

const authRouter = require('./routes/auth')
const postRouter = require('./routes/post')

const connectDB = async () => {
    try{
        await mongoose.connect(
            `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.ggvdu.mongodb.net/mern-hulk?retryWrites=true&w=majority`,
            {
                useCreateIndex:true,
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useFindAndModify: false,
            }
        )
        console.log('Mongodb connected')
    }catch (error){
        console.log(error.message)
        process.exit(1)//thoat khoi connect
    }
}

connectDB()

const app = express();
app.use(express.json())//doc dc du lieu gui o body
app.use(cors())
app.use('/api/auth', authRouter)
app.use('/api/posts', postRouter)

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server start on port  ${PORT}`))

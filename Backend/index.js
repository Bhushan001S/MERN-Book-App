import express, { request, response } from 'express';
import { PORT , mongoDBURL} from './config.js'
import mongoose from 'mongoose';
import { Book } from './models/bookModel.js';
import booksRoute from './routes/booksRoute.js'
import cors from 'cors';
// const cors = require('cors');
const app= express();


//Middleware for parsing request body
app.use(express.json());

//Middleware for parsing request body
//Option 1:Allow All Origins with Default of cors(*)
app.use(cors());

app.get('/',(request,response) =>{
    console.log(request);
    return response.status(234).send('Welcome To Book Store Website')
})

app.use('/books',booksRoute);

mongoose
    .connect(mongoDBURL)
    .then(() =>{
        console.log('App connected to database');
        app.listen(PORT, () => {
            console.log(`App is listenning to port: ${PORT}`);
        })
    })
    .catch((error) =>{
        console.log(error);
    })

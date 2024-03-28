import  express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import './DBConfig.js'
import user from './controller/User.js'
let app = express()
const port = 3002
app.use(bodyParser.urlencoded({extended:true}))
// app.use(express.urlencoded({extended:true}))
app.use(cors())
app.use(express.json());

app.use('/User', user)

app.listen(port,()=>{
    console.log(`Server Running at port ${port}`);
})
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
// import Role from './model/role.js'
// import jwt from "jsonwebtoken"
import dotenv from 'dotenv';
let n = 0
dotenv.config()
import { jwtGenerate, jwtRefreshTokenGenerate, jwtValidate } from './jwtfn.js'
import { login } from './model/login.js'
import sequelize from './DBConfig.js'
let app = express()
const port = 3002

app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())
app.use(express.json());
// app.post("/register", async (req, res) => {
//   try {
//     const savedata = await login.create(req.body)
//     res.send({ savedata, status: "register sucessfull" })
//   } catch (error) {
//     res.send(error.errors)
//   }
// })
app.post("/login", async (req, res) => {
  console.log('login round ', n++);

  const { username, password } = await req.body
  // if (!username || !password) res.send('no Login data')
  const user = await login.findOne({
    where: { username, password },
    attributes: ['username', 'password', 'Role'],
    raw: true
  })
  console.log(' user ',  !!user);
  if (!user) {
    res.send({message:'User not found!',status:false})
  }else {    user.token = {}
  let access_token = await jwtGenerate(user)
  const refresh_token = await jwtRefreshTokenGenerate(user)
  user.token.access_token = access_token
  user.token.refresh_token = refresh_token
  res.send(user)}

})
app.get("/a", async (req, res, next) => {
  // const q=   await (await sequelize.query("select  header ,json_agg(json_build_object('comment', comment)) commentlist from tests group by header")).at(0)
  const q = await (await sequelize.query("select p.header,json_agg(json_build_object('comment',c.text)) from tests p join comments c on  p.id = c.PostId group by p.header")).at(0)
  console.log('q', q)
  res.send(q)
})
// app.use(jwtValidate)
// app.use('/api', couselist)
// app.use('/post', test)
app.listen(port, () => {
  console.log(`Server Running at port ${port}`);
})
// import { Sequelize, Model, DataTypes, where } from "sequelize";
// import sequelize from "../DBConfig.js";
import { QueryTypes }  from 'sequelize'
import express from "express";
const router = express.Router();
// import {Sequelize, DataTypes,Model } from 'sequelize'
import sequelize from "../DBConfig.js";
import {savePost , saveComment ,findby,getPostbyUser,GetPostList} from '../model/Usermodel.js'
// import from '../model/Usermodel.js'
router.get("/test", async (req, res) => {
    let data = req.body
    console.log('data  ',data);
  res.send(data)
});
router.post("/topic", async (req, res) => {
  res.send(await savePost(req.body))
});

router.post("/comment", async (req, res) => {
  res.send(await saveComment(req.body));
});
router.get("/GetPostList", async (req, res) => {
  res.json(await GetPostList());
});
router.get("/getpost/:id",async (req, res) => {
  res.send(await findby(req.params));
});

router.get("/getpostlistbyuser", async (req, res) => {
  res.send(await getPostbyUser());
});

export default router;

// import { Sequelize, Model, DataTypes, where } from "sequelize";
// import sequelize from "../DBConfig.js";
import { QueryTypes } from 'sequelize'
import { GetCourseList } from '../model/CourseList.js'
import express from "express";
const router = express.Router();
// import {Sequelize, DataTypes,Model } from 'sequelize'
import { BookingCourse,booking ,getbookinglist,Delbooking} from '../model/BookingCourse.js'
router.get("/GetCourseList", async (req, res) => {
    let data = req.body
    console.log('data  ', data);
    res.send(await GetCourseList())
});
router.post("/booking", async (req, res) => {
    res.send(await booking(req))
});
router.get("/GetbookingList", async (req, res) => {
    res.send(await getbookinglist(req.query))
});
router.post("/Delbooking", async (req, res) => {
    res.send(await Delbooking(req.body))
});
export default router;

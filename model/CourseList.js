import sequelize from "../DBConfig.js";
import { Sequelize, Model, DataTypes, Op } from "sequelize";

export const Course = sequelize.define('Course', {
    CourseName: {
        type: DataTypes.STRING(55),
    },
    Price: { type: DataTypes.INTEGER(5), },
    imgPath: DataTypes.STRING(255),
}, { timestamps: false, })

export async function GetCourseList() {
    return Course.findAll()
}




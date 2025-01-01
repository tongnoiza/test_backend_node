// import { login } from './login.js'
import sequelize from "../DBConfig.js";
import { DataTypes } from "sequelize";
export const BookingCourse = sequelize.define('BookingCourse', {
    coursename: {
        type: DataTypes.STRING(55),
    },
    price: {
        type: DataTypes.INTEGER(20)
    },
    Bookinguser: {
        type: DataTypes.STRING(55),
    },
}, { timestamps: false, })

// BookingCourse.sync({force:true})
export async function booking(req) {
    const { obj, user } = req.body
    console.log('req.body ', req.body);

    // const userdata = JSON.parse(user)
    return await BookingCourse.create({
        coursename: obj.CourseName,
        Bookinguser: user.username,
        UserLoginId: user.id,
        price: obj.Price
    })
}
export async function getbookinglist({ id }) {
    console.log('getbookinglist ', id);
    return await BookingCourse.findAll({
        where: {
            UserLoginId: id
        }
    })
}
export async function Delbooking({ id }) {
    console.log('Delbooking ', id);
    try {
        await BookingCourse.destroy({
            where: { id: id }
        })
    } catch (error) {
        return { error, delstatus: false}
    }
    return { delstatus: true }
}



import sequelize from "../DBConfig.js";
import { Sequelize, Model, DataTypes,Op } from "sequelize";
import {BookingCourse} from './BookingCourse.js'


export const login = sequelize.define('UserLogin', {
  username: {
    type: DataTypes.STRING(20),
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING(15),
    allowNull: false,
  },
  Role: {
    type: DataTypes.STRING(20),
    allowNull: false,
}}, 
{
  indexes: [
    {
      unique: true,
      fields: ['username'],
    }]
}, { timestamp: false })

try {
//  await sequelize.sync({ force: true })
//  login.create({
//   username: 'user',
//   password: '1111',
//   Role: 'user'
// })
} catch (error) {
  
}
// product.bulkCreate([
//   { ProDuctname: 'milk', ProDuctCount: 20, Price: 10 },
//   { ProDuctname: 'chokolate', ProDuctCount: 20, Price: 90 },
//   { ProDuctname: 'smell good medicine', ProDuctCount: 980, Price: 50 }
// ])
// const productlist = [{ ProDuctname: 'milk', ProDuctCount: 520, Price: 10 },
// { ProDuctname: 'chokolate', ProDuctCount: 10, Price: 90 },
// { ProDuctname: 'smell good medicine', ProDuctCount: 1980, Price: -1}
// ]
// productlist.forEach(v => {
//   product.increment({ ProDuctCount: v.ProDuctCount, Price: v.Price }, { where: { ProDuctname: v.ProDuctname } })
// })


// productlist.forEach(v => {
//   product.decrement({ ProDuctCount: v.ProDuctCount, Price: v.Price }, { where: { ProDuctname: v.ProDuctname } })
// })
// login.increment({ password:10},{where:{id:1}})
// login.decrement({ password:10},{where:{id:1}})

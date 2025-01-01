import express from "express";
const router = express.Router();
import sequelize from "../DBConfig.js";
import { Sequelize, Model, DataTypes } from "sequelize";
const User = sequelize.define("User", {
  // Model attributes are defined here
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastname: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  desc: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

(async () => {
  await sequelize.sync();
})();

router.get("/findall", async (req, res) => {
  const findall = await User.findAll();
  console.log(findall);
  res.send(findall);
});

router.post("/findByPk", async (req, res) => {
  console.log('findByPk ', req.body.id);
  const findByPk = await User.findByPk(req.body.id, { raw: true })
  console.log(findByPk);
  res.send(findByPk);
});

router.post("/update", async (req, res) => {
  const resualt = await User.update(req.body, {
    where: {
      id: req.body.id
    }
  })
  res.send(resualt);
});

router.post("/save", async (req, res) => {
  const resualt = await User.create(req.body);
  resualt.addProfile()
  const data = resualt.save();
  res.send(data);
});

router.delete('/delete', (req, res) => {
  let ans = User.destroy({
    where: {
      id: req.body.id
    }
  });
  res.send(ans)
})
export default router;

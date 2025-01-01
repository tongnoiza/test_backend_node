// import { DataTypes, Sequelize, Model } from 'sequelize';
import { DataTypes, Sequelize, Model } from "sequelize";
import { PostgresDialect } from "@sequelize/postgres";
// import { PostgresDialect } from '@sequelize/postgres';
import { Attribute, NotNull, Default } from "@sequelize/core/decorators-legacy";
import { fileURLToPath } from "node:url";
import { dirname } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));

const sequelize = new Sequelize("test", "postgres", "1234", {
  host: "localhost",
  dialect:
    "postgres" /* one of 'mysql' |  | 'sqlite' | 'mariadb' | 'mssql' | 'db2' | 'snowflake' | 'oracle' */,
});

class equipment extends Model {}
const t = await sequelize.transaction();

equipment.init(
  {
    equipmentname: DataTypes.STRING,
    catagory: DataTypes.STRING,
    // equipmentdetail: DataTypes.STRING,
    equipmentcount: {
      type: DataTypes.INTEGER,
      // set(value) {
      //   const compare = +this.getDataValue("equipmentcount") - value < 0;
      //   console.log("compare", compare);

      //   if (!compare) {
      // throw new Error("Quantity cannot be less than zero.");
      //   } else {
      //     this.setDataValue("cequipmentcount",this.getDataValue("equipmentcount") - value);
      //   }
      // },
      validate: {
        min: 0,
      },
    },
  },
  { sequelize, modelName: "equipment_tb" }
);

try {
  // await sequelize.sync({force:true});
  await sequelize.authenticate();
  const data = await equipment.findAll({
    where: { equipmentname: ["ประแจแหวนข้างปากตาย เบอร์ 16","ไขควงแฉก เบอร์ 10"] },
    attributes: ["equipmentname", "equipmentcount"],
    raw: true,
  })
  
  let obj = [
    {
      equipmentname: "ไขควงแฉก เบอร์ 10",
      equipmentcoun: 20,
    },
    {
      equipmentname: "ประแจแหวนข้างปากตาย เบอร์ 16",
      equipmentcoun: 20,
    },
  ];
  const g = {};
  obj.forEach((v) => {
    g[v.equipmentname] = v.equipmentcoun;
  });
  // console.log(g['ไขควงแฉก เบอร์ 10']);

  // for (let d of obj) {
  //   console.log('data ', d.equipmentname);
  //   // console.log('data ', data[d.equipmentname]);
  // }
  // console.table(data);
  console.log(data);

  // equipment.increment("equipmentcount", { where: { equipmentname: "test" }, by: 500 },{transaction:t});
  const arr = [
    { equipmentname: "ไขควงแฉก เบอร์ 10", equipmentcount: 10 },

    {
      equipmentname: "ประแจแหวนข้างปากตาย เบอร์ 6",
      catagory: "ประแจแหวนข้างปากตาย",
      equipmentcount: 10,
    },
    {
      equipmentname: "ประแจแหวนข้างปากตาย เบอร์ 7",
      catagory: "ประแจแหวนข้างปากตาย",
      equipmentcount: 10,
    },
    {
      equipmentname: "ประแจแหวนข้างปากตาย เบอร์ 8",
      catagory: "ประแจแหวนข้างปากตาย",
      equipmentcount: 10,
    },
    {
      equipmentname: "ประแจแหวนข้างปากตาย เบอร์ 9",
      catagory: "ประแจแหวนข้างปากตาย",
      equipmentcount: 10,
    },
    {
      equipmentname: "ประแจแหวนข้างปากตาย เบอร์ 10",
      catagory: "ประแจแหวนข้างปากตาย",
      equipmentcount: 10,
    },
    {
      equipmentname: "ประแจแหวนข้างปากตาย เบอร์ 11",
      catagory: "ประแจแหวนข้างปากตาย",
      equipmentcount: 10,
    },
    {
      equipmentname: "ประแจแหวนข้างปากตาย เบอร์ 12",
      catagory: "ประแจแหวนข้างปากตาย",
      equipmentcount: 10,
    },
    {
      equipmentname: "ประแจแหวนข้างปากตาย เบอร์ 13",
      catagory: "ประแจแหวนข้างปากตาย",
      equipmentcount: 10,
    },
    {
      equipmentname: "ประแจแหวนข้างปากตาย เบอร์ 14",
      catagory: "ประแจแหวนข้างปากตาย",
      equipmentcount: 10,
    },
    {
      equipmentname: "ประแจแหวนข้างปากตาย เบอร์ 15",
      catagory: "ประแจแหวนข้างปากตาย",
      equipmentcount: 10,
    },
    {
      equipmentname: "ประแจแหวนข้างปากตาย เบอร์ 16",
      catagory: "ประแจแหวนข้างปากตาย",
      equipmentcount: 10,
    },
  ];
  // equipment.bulkCreate(arr)
  // equipment.create({ equipmentname: "ไขควง", equipmentdetail: "ไขควงแฉก เบอร์ 9", equipmentcount: 10 });
  console.log("Connection has been established successfully.");
  // t.commit()
} catch (error) {
  t.rollback();
  console.error("Unable to connect to the database:", error);
  // sequelize.
}
export default sequelize;

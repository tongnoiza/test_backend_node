import { Sequelize, DataTypes, Model, where } from "sequelize";
import sequelize from "../DBConfig.js";
const user = sequelize.define(
  "user",
  {
    Username: DataTypes.STRING,
  },
  { timestamps: false }
);
const Post = sequelize.define(
  "Post",
  {
    Username: DataTypes.STRING,
    PostHeader:DataTypes.STRING,
    PostMsg: DataTypes.STRING,
    // states: DataTypes.JSON,
    // states: {
    //   type: DataTypes.JSON,
    //   get() {
    //     return JSON.parse(this.getDataValue("states"));
    //   },
    // },
  },
  { timestamps: true }
);
// user.belongsToMany(Post);
const comment = sequelize.define(
  "Comment",
  {
    commentby:DataTypes.STRING,
    msg: DataTypes.STRING,
  },
  { timestamps: true }
);
Post.hasMany(comment);
comment.belongsTo(Post);
// user.hasMany(comment);
// Post.hasMany(user);
// comment.belongsTo(user);

(() => {
  // Post.sync({force:true})
   sequelize.sync();
})();

export async function savePost(val) {
  console.log('savePost ',val);
  const p = await Post.create(val)
  return p
}


export const saveComment = async (val) => await comment.create(val);
export const findby = async (val) => {
  console.log({val});
  const { id, limit } = val
  return await Post.findOne({
    where: {
      id: id,
    }, 
    include: {
      limit: limit || 10,
      model: comment,
      through: {
        attributes: [[sequelize.fn('COUNT', sequelize.col('msg')), 'Comment_count']],
      },
    },
  });
};

export async function GetPostList() {
  return await Post.findAll({
    order:[['createdAt', 'DESC']]
//  limit: 20 
  });
}
export async function getPostbyUser() {
  return await user.findOne({
    attributes: ["name"],
    where: { PostId: 1 },
    include: { attributes: ["Username", "PostMsg"], model: Post, limit: 20 },
  });
}



const { DataTypes, Model } = require('sequelize');
const {sequelize} = require("./connectDB");

class Todo extends Model {

   static async addTask(params) {
     return await Todo.create(params);
   }

   displayableString(){
   return ` ${this.completed ===true ?"[X]" :"[]"} ${this.id}. ${this.title} - ${this.dueDate}`;
   }
 
}

Todo.init(
    {
      // Model attributes are defined here
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      dueDate: {
        type: DataTypes.DATEONLY,
        // allowNull defaults to true
      },
      completed:{
        type:DataTypes.BOOLEAN,
      }
    },
    {
      // Other model options go here
      sequelize, // We need to pass the connection instance
    // We need to choose the model name
    },
  );

Todo.sync();
module.exports = Todo;
 

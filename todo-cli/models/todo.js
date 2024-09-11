"use strict";
const { Model, Op } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Todo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */

    static async addTask(params) {
      return await Todo.create(params);
    }

    static associate(models) {
      // define association here
    }

    static async showList() {
      console.log("My Todo list \n");

      console.log("Overdue");
      // FILL IN HERE
      const overdueItems = await this.overdue();
      const todoOverdueList = overdueItems
        .map((todo) => todo.displayableString())
        .join("\n");
      console.log(todoOverdueList);

      console.log("\n");

      console.log("Due Today");
      // FILL IN HERE

      const dueTodayItems = await this.dueToday();
      const tododuetodayList = dueTodayItems
        .map((todo) => todo.displayableString())
        .join("\n");
      console.log(tododuetodayList);

      console.log("\n");
      console.log("Due Later");

      // FILL IN HERE

      const dueLaterItems = await this.dueLater();
      const tododuelaterList = dueLaterItems
        .map((todo) => todo.displayableString())
        .join("\n");
      console.log(tododuelaterList);
    }

    static async overdue() {
      // FILL IN HERE TO RETURN OVERDUE ITEMS
      try {
        const overdueItems = await this.findAll({
          where: {
            dueDate: {
              [Op.lt]: new Date().toISOString().split("T")[0],
            },
          },
        });
        return overdueItems;
      } catch (error) {
        console.log(error);
      }
    }

    static async dueToday() {
      // FILL IN HERE TO RETURN ITEMS DUE tODAY

      try {
        const dueToday = await this.findAll({
          where: {
            dueDate: {
              [Op.eq]: new Date().toISOString().split("T")[0],
            },
          },
        });
        return dueToday;
      } catch (error) {
        console.log(error);
      }
    }

    static async dueLater() {
      // FILL IN HERE TO RETURN ITEMS DUE LATER
      try {
        const dueLater = await this.findAll({
          where: {
            dueDate: {
              [Op.gt]: new Date().toISOString().split("T")[0],
            },
          },
        });
        return dueLater;
      } catch (error) {
        console.log(error);
      }
    }

    static async markAsComplete(id) {
      // FILL IN HERE TO MARK AN ITEM AS COMPLETE
      await Todo.update(
        { completed: true },
        {
          where: {
            id: id,
          },
        }
      );
    }

    displayableString() {
      let checkbox = this.completed ? "[x]" : "[ ]";
      let TodayOrNot =
        this.dueDate === new Date().toISOString().split("T")[0]
          ? ""
          : this.dueDate;

      // item.dueDate === new Date().toISOString().split("T")[0]
      //       ? ""
      //       : `${item.dueDate}`;
      return `${this.id}. ${checkbox} ${this.title} ${TodayOrNot}`.trim();
    }
  }

  Todo.init(
    {
      title: DataTypes.STRING,
      dueDate: DataTypes.DATEONLY,
      completed: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "Todo",
    }
  );
  return Todo;
};

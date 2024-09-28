"use strict";
const { Model, Op } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Todo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    // eslint-disable-next-line no-unused-vars
    static associate(models) {
      // define association here
      Todo.belongsTo(models.User, {
        foreignKey: "userId",
      });
    }
    static getTodos() {
      return this.findAll();
    }

    static addTodo({ title, dueDate }) {
      return this.create({
        title: title,
        dueDate: dueDate,
        completed: false,
      });
    }
    static async overdue() {
      // FILL IN HERE TO RETURN OVERDUE ITEMS
      try {
        const overdueItems = await this.findAll({
          where: {
            dueDate: {
              [Op.lt]: new Date().toISOString().split("T")[0],
            },
            completed: false,
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
            completed: false,
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
            completed: false,
          },
        });
        return dueLater;
      } catch (error) {
        console.log(error);
      }
    }
    static async CompletedItems() {
      // FILL IN HERE TO RETURN ITEMS DUE LATER
      try {
        const CompletedItems = await this.findAll({
          where: {
            completed: true,
          },
        });
        return CompletedItems;
      } catch (error) {
        console.log(error);
      }
    }

    setCompletionStatus(value) {
      return this.update({ completed: value });
    }

    deleteTodo() {
      return this.destroy();
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

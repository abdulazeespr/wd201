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

    static addTodo({ title, dueDate, userId }) {
      return this.create({
        title: title,
        dueDate: dueDate,
        completed: false,
        userId: userId,
      });
    }
    static async overdue(userId) {
      // FILL IN HERE TO RETURN OVERDUE ITEMS
      try {
        const overdueItems = await this.findAll({
          where: {
            dueDate: {
              [Op.lt]: new Date().toISOString().split("T")[0],
            },
            completed: false,
            userId,
          },
        });
        return overdueItems;
      } catch (error) {
        console.log(error);
      }
    }

    static async dueToday(userId) {
      // FILL IN HERE TO RETURN ITEMS DUE tODAY

      try {
        const dueToday = await this.findAll({
          where: {
            dueDate: {
              [Op.eq]: new Date().toISOString().split("T")[0],
            },
            completed: false,
            userId,
          },
        });
        return dueToday;
      } catch (error) {
        console.log(error);
      }
    }
    static async dueLater(userId) {
      // FILL IN HERE TO RETURN ITEMS DUE LATER
      try {
        const dueLater = await this.findAll({
          where: {
            dueDate: {
              [Op.gt]: new Date().toISOString().split("T")[0],
            },
            completed: false,
            userId,
          },
        });
        return dueLater;
      } catch (error) {
        console.log(error);
      }
    }
    static async CompletedItems(userId) {
      // FILL IN HERE TO RETURN ITEMS DUE LATER
      try {
        const CompletedItems = await this.findAll({
          where: {
            completed: true,
            userId,
          },
        });
        return CompletedItems;
      } catch (error) {
        console.log(error);
      }
    }

    setCompletionStatus(value, userId) {
      return this.update(
        { completed: value },
        {
          where: {
            userId,
          },
        }
      );
    }

    deleteTodo(userId) {
      return this.destroy({
        where: {
          userId,
        },
      });
    }
  }
  Todo.init(
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: true,
          len: 5,
        },
      },
      dueDate: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        validate: {
          notNull: true,
        },
      },
      completed: { type: DataTypes.BOOLEAN, defaultValue: false },
    },
    {
      sequelize,
      modelName: "Todo",
    }
  );
  return Todo;
};

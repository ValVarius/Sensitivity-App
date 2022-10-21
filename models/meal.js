module.exports = function(sequelize, DataTypes) {
    const Meal = sequelize.define("Meal", {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1]
        }
      },
      food: {
        type: DataTypes.TEXT,
        allowNull: false,
        len: [1]
      },
      time: {
        type: DataTypes.TIME
      },
      bloating: {
        type: DataTypes.BOOLEAN
      },
      headache: {
        type: DataTypes.BOOLEAN
      },
      gas: {
        type: DataTypes.BOOLEAN
      },
      itchiness: {
        type: DataTypes.BOOLEAN
      },
      reflux: {
        type: DataTypes.BOOLEAN
      },
      reedness: {
        type: DataTypes.BOOLEAN
      },
      noseRunning: {
        type: DataTypes.BOOLEAN
      },
      howLong: {
        type: DataTypes.STRING
      },
      other: {
        type: DataTypes.TEXT,
        len: [1]
      }
    });
  
    Meal.associate = function(models) {
      // We're saying that a Meal should belong to an Day
      // A Meal can't be created without a Day due to the foreign key constraint
      Meal.belongsTo(models.Day, {
        foreignKey: {
          allowNull: false
        }
      });
    };
  
    return Meal;
};
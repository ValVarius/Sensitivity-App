module.exports = function(sequelize, DataTypes) {
    const Meal = sequelize.define("Meal", {
      date: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      weight: {
        type: DataTypes.FLOAT,
        allowNull: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1]
        }
      },
      food: {
        type: DataTypes.TEXT,
        len: [1]
      },
      time: {
        type: DataTypes.STRING
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
      redness: {
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
  
    // Meal.associate = function(models) {
    //   // We're saying that a Meal should belong to an Day
    //   // A Meal can't be created without a Day due to the foreign key constraint
    //   Meal.belongsTo(models.Day, {
    //     foreignKey: {
    //       allowNull: true
    //     }
    //   });
    // };
  
    return Meal;
};
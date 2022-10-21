module.exports = function(sequelize, DataTypes) {
    const Day = sequelize.define("Day", {
      // Giving the Day model a name of type date
      title: {
        type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
      },
      weight: {
        type: DataTypes.FLOAT
      }
    });
  
    Day.associate = function(models) {
      // Associating Author with Posts
      // When an Author is deleted, also delete any associated Posts
      Day.hasMany(models.Meal, {
        onDelete: "cascade"
      });
    };
  
    return Day;
  };
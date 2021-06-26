const { DataTypes } = require('sequelize')

module.exports.QuestionSchema = (sequelize) => {

    const QuestionSchema = sequelize.define('questions', {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            question: {
                type: DataTypes.TEXT,
                allowNull: false
            },
            options: {
                type: DataTypes.TEXT,
                allowNull: false
            },
            answer : {
                type:DataTypes.TINYINT,
                allowNull: false,
            },
            duration : {
                type:DataTypes.INTEGER(8),
                allowNull: false,
            },
            negative : {
                type:DataTypes.TINYINT,
                allowNull: false,
            },
            negative_mark : {
                type:DataTypes.FLOAT(4, 2),
                allowNull: false,
            }
        },
        {
            tableName: 'questions',
            createdAt: false,
            updatedAt: false,
            deletedAt: false,
            // paranoid: true
        })

    return QuestionSchema
}



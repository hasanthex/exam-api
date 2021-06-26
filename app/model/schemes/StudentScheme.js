const { DataTypes } = require('sequelize')

module.exports.StudentScheme = (sequelize) => {

    const StudentScheme = sequelize.define('students', {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            name: {
                type: DataTypes.STRING(32),
                allowNull: false
            },
            email: {
                type: DataTypes.STRING(32),
                allowNull: false
            },
            start_time : {
                type:DataTypes.BIGINT(20),
                default: 0,
                allowNull: false,
            },
            end_time : {
                type:DataTypes.BIGINT(20),
                default: 0,
                allowNull: false,
            },
            question_set : {
                type:DataTypes.TINYINT,
                default: 1,
                allowNull: false,
            },
            answered : {
                type:DataTypes.BIGINT(20),
                default: 0,
                allowNull: false,
            },
            mark : {
                type:DataTypes.FLOAT(6, 2),
                default: 0.00,
                allowNull: false,
            }
        },
        {
            tableName: 'students',
            createdAt: false,
            updatedAt: false,
            deletedAt: false,
        })

    return StudentScheme
}



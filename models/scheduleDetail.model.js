const { Model, DataTypes, Sequelize } = require("sequelize");
const sequelize = new Sequelize("mysql://root:Hiep2410@127.0.0.1/DLCT");

// Import Staff and Schedule model
const Staff = require("../models/staff.model");
const Schedule = require("../models/schedule.model");

class ScheduleDetail extends Model {}

ScheduleDetail.init(
    {
        Schedule_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            references: {
                model: Schedule,
                key: "Schedule_id",
            },
        },
        Staff_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            references: {
                model: Staff,
                key: "Staff_id",
            },
        },
        Date: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        Status: {
            type: DataTypes.TINYINT,
            allowNull: true,
        },
    },
    {
        sequelize,
        modelName: "ScheduleDetail",
        tableName: "scheduledetail",
        timestamps: false,
    }
);

Staff.hasMany(ScheduleDetail, { foreignKey: "Staff_id" });
Schedule.hasMany(ScheduleDetail, { foreignKey: "Schedule_id" });

ScheduleDetail.belongsTo(Staff, { foreignKey: "Staff_id" });
ScheduleDetail.belongsTo(Schedule, { foreignKey: "Schedule_id" });

module.exports = ScheduleDetail;

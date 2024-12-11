import { DataTypes, Model } from "sequelize";
import { sequelize } from "../db.js";

export class PlatosXPedidos extends Model {}

PlatosXPedidos.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },

        cantidad: {
            type: DataTypes.INTEGER,
        },
    },
    {
        sequelize,
        modelName: "platosxpedidos",
        timestamps: false,
    }
);

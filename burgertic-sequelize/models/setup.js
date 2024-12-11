import { Pedido } from "./pedidos.model.js";
import {Plato} from "./platos.model.js"
import { PlatosXPedidos } from "./platosxpedidos.js";
import { Usuario } from "./usuarios.model.js";
import { sequelize } from "../db.js";

export const setupDB = async() => {

    Pedido.belongsTo(Usuario);
    Usuario.hasMany(Plato);
    Pedido.belongsToMany(Plato, {through:PlatosXPedidos});
    Plato.belongsToMany(Pedido, {through:PlatosXPedidos});
    await sequelize.sync({alter:true})
}
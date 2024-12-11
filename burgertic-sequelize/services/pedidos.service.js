import { config } from "../db.js";
import pkg from "pg";
const { Client } = pkg;
import { Pedido } from "../models/pedidos.model.js";
import { Plato } from "../models/platos.model.js";

const getPlatosByPedido = async (idPedido) => {
    const client = new Client(config);
    await client.connect();

    try {
        const { rows } = await client.query(
            "SELECT * FROM pedidos_platos WHERE id_pedido = $1",
            [idPedido]
        );

        if (rows.length < 1) throw new Error("Pedido no encontrado");

        const result = await Promise.all(
            rows.map(async (plato) => {
                const { rows } = await client.query(
                    "SELECT * FROM platos WHERE id = $1",
                    [plato.id_plato]
                );

                if (rows.length < 1) throw new Error("Plato no encontrado");

                return {
                    ...rows[0],
                    cantidad: plato.cantidad,
                };
            })
        );

        await client.end();
        return result;
    } catch (error) {
        await client.end();
        throw error;
    }
};

const getPedidos = async () => {


    try {
        const pedidos  = await Pedido.findAll({include: Plato})

        if (pedidos.length < 1) return [];
        return pedidos;

    } catch (error) {
        throw error;
    }
};

const getPedidoById = async (id) => {

    try {
        const pedidos  = await Pedido.findByPk(id, {include: Plato})
        if (!pedidos) return null;

        return pedidos;
    } catch (error) {
        throw error;
    }
};

const getPedidosByUser = async (idUsuario) => {

    try {
        const pedidos  = await Pedido.findAll({where : {usuarioId:idUsuario}, include: Plato})
        if (pedidos.length < 1) return [];
        return pedidos;
    } catch (error) {
        throw error;
    }
};


const createPedido = async (idUsuario, platos) => {
    try {
        const pedido_new = await Pedido.create({usuarioId:idUsuario,estado:'pendiente', fecha:new Date()})
        for (const plato of platos) {
            const platoInstance = await Plato.findByPk(plato.id)
            if (!platoInstance)  {
                pedido_new.destroy()
                throw new Error('No existe el plato id:' +  plato.id);            }
            await pedido_new.addPlato(platoInstance,{ through: { cantidad:plato.cantidad } });
        }
        return pedido_new;
    } catch (error) {
        console.log("not ok", error)
        throw error;
    }

};

const updatePedido = async (id, estado) => {
    if (
        estado !== "aceptado" &&
        estado !== "en camino" &&
        estado !== "entregado"
    )
        throw new Error("Estado inválido");

    try {
        const pedido =await Pedido.update({estado}, {where : {id}})

        return pedido;
    } catch (error) {
        throw error;
    }
};

const deletePedido = async (id) => {


    try {
        const pedido =await Pedido.destroy({where : {id}})
        return pedido;
    } catch (error) {
        throw error;
    }
};

export default {
    getPedidos,
    getPedidoById,
    getPedidosByUser,
    createPedido,
    updatePedido,
    deletePedido,
};

import { Usuario } from "../models/usuarios.model.js";

const getUsuarioByEmail = async (email) => {

    try {
        const usuario = await Usuario.findOne({ where: { email } });
        if (usuario === null) {
            return null;
        } else {
            console.log(usuario.nombre);  
            return usuario
        }
    } catch (error) {
        throw error;
    }
};

const getUsuarioById = async (id) => {
    try {
        const usuario = await Usuario.findByPk(id)
        if (usuario === null) 
            return null;
         else 
            return usuario
    } catch (error) {
        throw error;
    }
};

const createUsuario = async (usuario) => {
    try {
        const usuario_new = await Usuario.create(usuario)
        return usuario_new;
    } catch (error) {
        throw error;
    }
};

export default { getUsuarioByEmail, getUsuarioById, createUsuario };

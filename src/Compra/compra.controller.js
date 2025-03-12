

import mongoose from 'mongoose';
import Carrito from '../Carrito/carrito.model.js';
import Producto from '../Productos/productos.model.js';
import Factura from '../Factura/factura.model.js';
import Compra from './compra.model.js';

export const realizarCompra = async (req, res) => {
  try {
   
    const idUsuarioString = req.user._id || req.user.id;

    if (!mongoose.Types.ObjectId.isValid(idUsuarioString)) {
      return res.status(400).json({ error: 'ID de usuario inválido' });
    }
    const idUsuario = new mongoose.Types.ObjectId(idUsuarioString);

   
    const carrito = await Carrito.findOne({ usuario: idUsuario }).populate('items.producto');
    if (!carrito || carrito.items.length === 0) {
      return res.status(400).json({ error: 'El carrito está vacío' });
    }

    let total = 0;

    for (const item of carrito.items) {
      const producto = item.producto;
      if (producto.stock < item.cantidad) {
        return res.status(400).json({ error: `Stock insuficiente para el producto ${producto.nombre}` });
      }
      total += producto.precio * item.cantidad;
    }

    for (const item of carrito.items) {
      const producto = item.producto;
      producto.stock -= item.cantidad;
      await producto.save();
    }

    const datosCompra = {
      usuario: idUsuario, 
      items: carrito.items.map(item => ({
        producto: item.producto._id,
        cantidad: item.cantidad,
        precio: item.producto.precio
      })),
      total,
      fecha: new Date()
    };


    const factura = await Factura.create(datosCompra);
    const nuevaCompra = await Compra.create(datosCompra);

  
    carrito.items = [];
    await carrito.save();

    res.json({
      mensaje: 'Compra realizada exitosamente',
      factura,
      compra: nuevaCompra
    });
  } catch (error) {
    console.error('Error en el proceso de compra:', error);
    res.status(500).json({ error: 'Error en el proceso de compra', error });
  }
};


export const listarCompras = async (req, res) => {
  try {
    const idUsuario = req.user._id || req.user.id;
    const compras = await Compra.find({ usuario: idUsuario }).populate('items.producto');
    res.json(compras);
  } catch (error) {
    console.error('Error al listar compras:', error);
    res.status(500).json({ error: 'Error al listar compras', error });
  }
};

export const obtenerCompraPorId = async (req, res) => {
  try {
    const { id } = req.params;
    const compra = await Compra.findById(id).populate('items.producto');
    if (!compra) return res.status(404).json({ error: 'Compra no encontrada' });
    res.json(compra);
  } catch (error) {
    console.error('Error al obtener la compra:', error);
    res.status(500).json({ error: 'Error al obtener la compra', error });
  }
};

export const editarCompra = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedCompra = await Compra.findByIdAndUpdate(id, req.body, { new: true }).populate('items.producto');
    if (!updatedCompra) return res.status(404).json({ error: 'Compra no encontrada' });
    res.json({ mensaje: 'Compra actualizada exitosamente', compra: updatedCompra });
  } catch (error) {
    console.error('Error al actualizar la compra:', error);
    res.status(500).json({ error: 'Error al actualizar la compra', error });
  }
};

export const eliminarCompra = async (req, res) => {
  try {
    const { id } = req.params;
    const compraEliminada = await Compra.findByIdAndDelete(id);
    if (!compraEliminada) return res.status(404).json({ error: 'Compra no encontrada' });
    res.json({ mensaje: 'Compra eliminada exitosamente' });
  } catch (error) {
    console.error('Error al eliminar la compra:', error);
    res.status(500).json({ error: 'Error al eliminar la compra', error });
  }
};

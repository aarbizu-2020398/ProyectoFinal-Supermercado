<<<<<<< HEAD

import mongoose from 'mongoose';
import Carrito from './carrito.model.js';
import Producto from '../Productos/productos.model.js';

export const obtenerCarrito = async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ error: 'No autenticado' });
    }

    if (!mongoose.Types.ObjectId.isValid(req.user.id)) {
      return res.status(400).json({ error: 'ID de usuario inválido' });
    }
    const idUsuario = new mongoose.Types.ObjectId(req.user.id);

=======
import Carrito from '../Carrito/carrito.model.js';
import Producto from '../Productos/productos.model.js'

export const obtenerCarrito = async (req, res) => {
  try {
    const idUsuario = req.user._id;
>>>>>>> 6cbb8ab0144e1222b846c9c67f40a8ac072458ad
    let carrito = await Carrito.findOne({ usuario: idUsuario }).populate('items.producto');
    if (!carrito) {
      carrito = await Carrito.create({ usuario: idUsuario, items: [] });
    }
    res.json(carrito);
  } catch (error) {
<<<<<<< HEAD
    console.error('Error obteniendo el carrito:', error);
=======
>>>>>>> 6cbb8ab0144e1222b846c9c67f40a8ac072458ad
    res.status(500).json({ error: 'Error obteniendo el carrito' });
  }
};

<<<<<<< HEAD
export const agregarProductoAlCarrito = async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ error: 'No autenticado' });
    }
    if (!mongoose.Types.ObjectId.isValid(req.user.id)) {
      return res.status(400).json({ error: 'ID de usuario inválido' });
    }
    const idUsuario = new mongoose.Types.ObjectId(req.user.id);
    const { productoId, cantidad } = req.body;

    if (!productoId || !cantidad || cantidad <= 0) {
      return res.status(400).json({ error: 'Se requiere productoId y cantidad mayor a 0' });
    }


    const producto = await Producto.findById(productoId);
    if (!producto) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }

=======
// Agregar un producto al carrito
export const agregarProductoAlCarrito = async (req, res) => {
  try {
    const idUsuario = req.user._id;
    const { productoId, cantidad } = req.body;
    
>>>>>>> 6cbb8ab0144e1222b846c9c67f40a8ac072458ad
    let carrito = await Carrito.findOne({ usuario: idUsuario });
    if (!carrito) {
      carrito = await Carrito.create({ usuario: idUsuario, items: [] });
    }
<<<<<<< HEAD


=======
    
>>>>>>> 6cbb8ab0144e1222b846c9c67f40a8ac072458ad
    const itemExistente = carrito.items.find(item => item.producto.toString() === productoId);
    if (itemExistente) {
      itemExistente.cantidad += cantidad;
    } else {
      carrito.items.push({ producto: productoId, cantidad });
    }
<<<<<<< HEAD

    await carrito.save();
    carrito = await Carrito.findOne({ usuario: idUsuario }).populate('items.producto');
    res.json(carrito);
  } catch (error) {
    console.error('Error agregando producto al carrito:', error);
=======
    
    await carrito.save();
    res.json(carrito);
  } catch (error) {
>>>>>>> 6cbb8ab0144e1222b846c9c67f40a8ac072458ad
    res.status(500).json({ error: 'Error agregando producto al carrito' });
  }
};

<<<<<<< HEAD
export const actualizarProductoDelCarrito = async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ error: 'No autenticado' });
    }
    if (!mongoose.Types.ObjectId.isValid(req.user.id)) {
      return res.status(400).json({ error: 'ID de usuario inválido' });
    }
    const idUsuario = new mongoose.Types.ObjectId(req.user.id);
    const { productoId, cantidad } = req.body;

    if (!productoId || !cantidad || cantidad < 0) {
      return res.status(400).json({ error: 'Se requiere productoId y una cantidad válida' });
    }

    let carrito = await Carrito.findOne({ usuario: idUsuario });
    if (!carrito) {
      return res.status(404).json({ error: 'Carrito no encontrado' });
    }

    const item = carrito.items.find(item => item.producto.toString() === productoId);
    if (!item) {
      return res.status(404).json({ error: 'Producto no encontrado en el carrito' });
    }


    if (cantidad === 0) {
      carrito.items = carrito.items.filter(item => item.producto.toString() !== productoId);
    } else {
      item.cantidad = cantidad;
    }

    await carrito.save();
    carrito = await Carrito.findOne({ usuario: idUsuario }).populate('items.producto');
    res.json(carrito);
  } catch (error) {
    console.error('Error actualizando producto en el carrito:', error);
=======
// Actualizar la cantidad de un producto en el carrito
export const actualizarProductoDelCarrito = async (req, res) => {
  try {
    const idUsuario = req.user._id;
    const { productoId, cantidad } = req.body;
    
    let carrito = await Carrito.findOne({ usuario: idUsuario });
    if (!carrito) return res.status(404).json({ error: 'Carrito no encontrado' });
    
    const item = carrito.items.find(item => item.producto.toString() === productoId);
    if (!item) return res.status(404).json({ error: 'Producto no encontrado en el carrito' });
    
    item.cantidad = cantidad;
    await carrito.save();
    res.json(carrito);
  } catch (error) {
>>>>>>> 6cbb8ab0144e1222b846c9c67f40a8ac072458ad
    res.status(500).json({ error: 'Error actualizando el producto en el carrito' });
  }
};

<<<<<<< HEAD
export const eliminarProductoDelCarrito = async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ error: 'No autenticado' });
    }
    if (!mongoose.Types.ObjectId.isValid(req.user.id)) {
      return res.status(400).json({ error: 'ID de usuario inválido' });
    }
    const idUsuario = new mongoose.Types.ObjectId(req.user.id);
    const { productoId } = req.params;

    if (!productoId) {
      return res.status(400).json({ error: 'Se requiere productoId' });
    }

    let carrito = await Carrito.findOne({ usuario: idUsuario });
    if (!carrito) {
      return res.status(404).json({ error: 'Carrito no encontrado' });
    }

    const initialLength = carrito.items.length;
    carrito.items = carrito.items.filter(item => item.producto.toString() !== productoId);

    if (carrito.items.length === initialLength) {
      return res.status(404).json({ error: 'Producto no encontrado en el carrito' });
    }

    await carrito.save();
    carrito = await Carrito.findOne({ usuario: idUsuario }).populate('items.producto');
    res.json(carrito);
  } catch (error) {
    console.error('Error eliminando producto del carrito:', error);
=======
// Eliminar un producto del carrito
export const eliminarProductoDelCarrito = async (req, res) => {
  try {
    const idUsuario = req.user._id;
    const { productoId } = req.params;
    
    let carrito = await Carrito.findOne({ usuario: idUsuario });
    if (!carrito) return res.status(404).json({ error: 'Carrito no encontrado' });
    
    carrito.items = carrito.items.filter(item => item.producto.toString() !== productoId);
    await carrito.save();
    res.json(carrito);
  } catch (error) {
>>>>>>> 6cbb8ab0144e1222b846c9c67f40a8ac072458ad
    res.status(500).json({ error: 'Error eliminando el producto del carrito' });
  }
};

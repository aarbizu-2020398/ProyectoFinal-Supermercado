<<<<<<< HEAD

import Factura from './factura.model.js';
import ExcelJS from 'exceljs';
import fs from 'fs';
import path from 'path';
import mongoose from 'mongoose';

export const crearFactura = async (req, res) => {
  try {

    const { usuario, items, total } = req.body;

   
    if (!mongoose.Types.ObjectId.isValid(usuario)) {
      return res.status(400).json({ message: 'El usuario debe ser un ObjectId válido' });
    }
    
    const usuarioObjectId = new mongoose.Types.ObjectId(usuario);
    
    const nuevaFactura = await Factura.create({
      usuario: usuarioObjectId,
      items,
      total
    });

    res.status(201).json({
      message: 'Factura creada exitosamente',
      factura: nuevaFactura
    });
  } catch (error) {
    console.error('Error al crear factura:', error);
=======
import Factura from './factura.model.js';

export const crearFactura = async (req, res) => {
  try {
    // Lógica para crear la factura (a implementar)
    res.status(201).json({ message: 'Factura creada exitosamente' });
  } catch (error) {
>>>>>>> 6cbb8ab0144e1222b846c9c67f40a8ac072458ad
    res.status(500).json({ message: 'Error al crear la factura', error });
  }
};

<<<<<<< HEAD

export const obtenerFacturas = async (req, res) => {
  try {
    const facturas = await Factura.find()
      .populate('usuario', 'nombre email')
      .populate('items.producto', 'nombre precio');
    res.status(200).json(facturas);
  } catch (error) {
    console.error('Error al obtener facturas:', error);
=======
export const obtenerFacturas = async (req, res) => {
  try {
    // Lógica para obtener facturas (a implementar)
    res.status(200).json({ message: 'Facturas obtenidas exitosamente' });
  } catch (error) {
>>>>>>> 6cbb8ab0144e1222b846c9c67f40a8ac072458ad
    res.status(500).json({ message: 'Error al obtener las facturas', error });
  }
};

<<<<<<< HEAD

export const obtenerFacturaPorId = async (req, res) => {
  try {
    const { id } = req.params;
    const factura = await Factura.findById(id)
      .populate('usuario', 'nombre email')
      .populate('items.producto', 'nombre precio');
    if (!factura) {
      return res.status(404).json({ message: 'Factura no encontrada' });
    }
    res.status(200).json(factura);
  } catch (error) {
    console.error('Error al obtener la factura:', error);
=======
export const obtenerFacturaPorId = async (req, res) => {
  try {
    // Lógica para obtener una factura por su ID (a implementar)
    res.status(200).json({ message: 'Factura obtenida exitosamente' });
  } catch (error) {
>>>>>>> 6cbb8ab0144e1222b846c9c67f40a8ac072458ad
    res.status(500).json({ message: 'Error al obtener la factura', error });
  }
};

<<<<<<< HEAD

export const editarFactura = async (req, res) => {
  try {
    const { id } = req.params;
   
    const facturaActualizada = await Factura.findByIdAndUpdate(id, req.body, { new: true })
      .populate('usuario', 'nombre email')
      .populate('items.producto', 'nombre precio');
    if (!facturaActualizada) {
      return res.status(404).json({ message: 'Factura no encontrada' });
    }
    res.status(200).json({
      message: 'Factura actualizada exitosamente',
      factura: facturaActualizada
    });
  } catch (error) {
    console.error('Error al actualizar la factura:', error);
    res.status(500).json({ message: 'Error al actualizar la factura', error });
  }
};


export const eliminarFactura = async (req, res) => {
  try {
    const { id } = req.params;
    const facturaEliminada = await Factura.findByIdAndDelete(id);
    if (!facturaEliminada) {
      return res.status(404).json({ message: 'Factura no encontrada' });
    }
    res.status(200).json({ message: 'Factura eliminada exitosamente' });
  } catch (error) {
    console.error('Error al eliminar la factura:', error);
    res.status(500).json({ message: 'Error al eliminar la factura', error });
  }
};


export const exportarFactura = async (req, res) => {
  try {
    const { id } = req.params;
    const factura = await Factura.findById(id)
      .populate('usuario', 'nombre email')
      .populate('items.producto', 'nombre precio');

    if (!factura) {
      return res.status(404).json({ message: 'Factura no encontrada' });
    }


    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Factura');


    worksheet.columns = [
      { header: 'Producto', key: 'producto', width: 30 },
      { header: 'Cantidad', key: 'cantidad', width: 10 },
      { header: 'Precio Unitario', key: 'precio', width: 15 },
      { header: 'Subtotal', key: 'subtotal', width: 15 }
    ];


    factura.items.forEach(item => {
      const subtotal = item.cantidad * item.precio;
      worksheet.addRow({
        producto: item.producto.nombre,
        cantidad: item.cantidad,
        precio: item.precio,
        subtotal
      });
    });


    worksheet.addRow({});
    worksheet.addRow({ producto: 'Total', subtotal: factura.total });


    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', `attachment; filename=factura_${factura._id}.xlsx`);

   
    await workbook.xlsx.write(res);
    res.end();
  } catch (error) {
    console.error('Error exportando la factura:', error);
    res.status(500).json({ message: 'Error exportando la factura', error });
=======
export const obtenerHistorialDeCompras = async (req, res) => {
  try {
    const idUsuario = req.user._id;
    const facturas = await Factura.find({ usuarioId: idUsuario });
    res.json(facturas);
  } catch (error) {
    res.status(500).json({ error: 'Error obteniendo el historial de compras', error });
>>>>>>> 6cbb8ab0144e1222b846c9c67f40a8ac072458ad
  }
};

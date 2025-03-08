import Factura from './factura.model.js';

export const crearFactura = async (req, res) => {
  try {
    // Lógica para crear la factura (a implementar)
    res.status(201).json({ message: 'Factura creada exitosamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al crear la factura', error });
  }
};

export const obtenerFacturas = async (req, res) => {
  try {
    // Lógica para obtener facturas (a implementar)
    res.status(200).json({ message: 'Facturas obtenidas exitosamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener las facturas', error });
  }
};

export const obtenerFacturaPorId = async (req, res) => {
  try {
    // Lógica para obtener una factura por su ID (a implementar)
    res.status(200).json({ message: 'Factura obtenida exitosamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener la factura', error });
  }
};

export const obtenerHistorialDeCompras = async (req, res) => {
  try {
    const idUsuario = req.user._id;
    const facturas = await Factura.find({ usuarioId: idUsuario });
    res.json(facturas);
  } catch (error) {
    res.status(500).json({ error: 'Error obteniendo el historial de compras', error });
  }
};

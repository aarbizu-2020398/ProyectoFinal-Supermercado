<<<<<<< HEAD

import mongoose from 'mongoose';

const itemFacturaSchema = new mongoose.Schema({
  producto: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Producto', 
    required: true
  },
  cantidad: {
    type: Number,
    required: true
  },
  precio: {
    type: Number,
    required: true
  }
});

const facturaSchema = new mongoose.Schema({
  usuario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuario', 
    required: true
  },
  items: [itemFacturaSchema],
=======
import mongoose from 'mongoose';

const facturaSchema = new mongoose.Schema({
  usuarioId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  productos: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  }],
>>>>>>> 6cbb8ab0144e1222b846c9c67f40a8ac072458ad
  total: {
    type: Number,
    required: true
  },
  fechaEmision: {
    type: Date,
    default: Date.now
  }
});

const Factura = mongoose.model('Factura', facturaSchema);
<<<<<<< HEAD
=======

>>>>>>> 6cbb8ab0144e1222b846c9c67f40a8ac072458ad
export default Factura;

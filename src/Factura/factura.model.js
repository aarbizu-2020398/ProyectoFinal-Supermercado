
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
export default Factura;

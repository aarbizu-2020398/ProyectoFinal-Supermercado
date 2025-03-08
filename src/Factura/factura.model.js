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

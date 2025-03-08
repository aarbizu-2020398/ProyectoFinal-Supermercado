import mongoose from 'mongoose';

const itemCompraSchema = new mongoose.Schema({
  producto: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Producto',
    required: true
  },
  cantidad: {
    type: Number,
    required: true,
    default: 1
  },
  precio: {
    type: Number,
    required: true
  }
});

const CompraSchema = new mongoose.Schema({
  usuario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuario',
    required: true
  },
  items: [itemCompraSchema],
  total: {
    type: Number,
    required: true
  },
  fecha: {
    type: Date,
    default: Date.now
  }
});

const Compra = mongoose.model('Compra', CompraSchema);
export default Compra;

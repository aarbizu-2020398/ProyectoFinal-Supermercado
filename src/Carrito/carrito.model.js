import mongoose from 'mongoose';

const itemCarritoSchema = new mongoose.Schema({
  producto: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Producto',
    required: true
  },
  cantidad: {
    type: Number,
    required: true,
    default: 1
  }
});

const carritoSchema = new mongoose.Schema(
  {
    usuario: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Usuario',
      required: true
    },
    items: [itemCarritoSchema]
  },
  { timestamps: true }
);

const Carrito = mongoose.model('Carrito', carritoSchema);
export default Carrito;

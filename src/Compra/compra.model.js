<<<<<<< HEAD

=======
>>>>>>> 6cbb8ab0144e1222b846c9c67f40a8ac072458ad
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
<<<<<<< HEAD
  usuario: { 
=======
  usuario: {
>>>>>>> 6cbb8ab0144e1222b846c9c67f40a8ac072458ad
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

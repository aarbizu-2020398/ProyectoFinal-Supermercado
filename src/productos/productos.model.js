
import mongoose from 'mongoose';

const productoSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true
  },
  descripcion: {
    type: String,
    required: true
  },
  precio: {
    type: Number,
    required: true
  },
  stock: {
    type: Number,
    required: true
  },
  categoria: {
    type: mongoose.Schema.Types.ObjectId,
<<<<<<< HEAD
    ref: 'Category',
=======
    ref: 'Categoria',
>>>>>>> 6cbb8ab0144e1222b846c9c67f40a8ac072458ad
    required: true
  },
  imagen: {
    type: String,
    required: false
  }
});

const Producto = mongoose.model('Producto', productoSchema);


export default Producto;

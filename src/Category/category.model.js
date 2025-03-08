
import mongoose from 'mongoose';  

const categorySchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true
  },
  descripcion: {
    type: String,
    required: true
  }
});

const Category = mongoose.model('Category', categorySchema);


export default Category;

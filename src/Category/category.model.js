
<<<<<<< HEAD
import mongoose from 'mongoose';
=======
import mongoose from 'mongoose';  
>>>>>>> 6cbb8ab0144e1222b846c9c67f40a8ac072458ad

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
<<<<<<< HEAD
=======


>>>>>>> 6cbb8ab0144e1222b846c9c67f40a8ac072458ad
export default Category;

<<<<<<< HEAD

=======
// src/User/user.model.js
>>>>>>> 6cbb8ab0144e1222b846c9c67f40a8ac072458ad
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
<<<<<<< HEAD
    nombre: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
=======
  nombre: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
>>>>>>> 6cbb8ab0144e1222b846c9c67f40a8ac072458ad
  contraseña: {
    type: String,
    required: true
  },
  rol: {
    type: String,
    enum: ['ADMIN', 'CLIENT'],
    default: 'CLIENT'
  },
  fechaCreacion: {
    type: Date,
    default: Date.now
  }
});

userSchema.pre('save', async function(next) {
  if (this.isModified('contraseña')) {
    this.contraseña = await bcrypt.hash(this.contraseña, 10);
  }
  next();
});

<<<<<<< HEAD

=======
>>>>>>> 6cbb8ab0144e1222b846c9c67f40a8ac072458ad
userSchema.methods.comparePassword = async function(contraseña) {
  return await bcrypt.compare(contraseña, this.contraseña);
};

<<<<<<< HEAD

const Usuario = mongoose.model('Usuario', userSchema);
=======
const Usuario = mongoose.model('User', userSchema);

>>>>>>> 6cbb8ab0144e1222b846c9c67f40a8ac072458ad
export default Usuario;

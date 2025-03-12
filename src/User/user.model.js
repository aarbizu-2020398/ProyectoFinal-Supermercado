
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
    nombre: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
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


userSchema.methods.comparePassword = async function(contraseña) {
  return await bcrypt.compare(contraseña, this.contraseña);
};


const Usuario = mongoose.model('Usuario', userSchema);
export default Usuario;

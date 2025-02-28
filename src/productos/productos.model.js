const mongoose = require('mongoose');

const ProductoSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        trim: true
    },
    descripcion: {
        type: String,
        required: true
    },
    precio: {
        type: Number,
        required: true,
        min: 0

    },
    stock: {
        type: Number,
        required: true,
        min: 0
    },
    categoria: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Categoria',
        required: true
    },
    imagen: {
        type: String,
        default: ''

    },
    ventas: {
        type: Number,
        default: 0
    }
}, { timestamps: true });

module.exports = mongoose.model('Producto', ProductoSchema);

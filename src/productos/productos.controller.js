

import Producto from '../Productos/productos.model.js';
import Categoria from '../Category/category.model.js';

const productoControlador = {
    crearProducto: async (req, res) => {
        try {
            const { nombre, descripcion, precio, stock, categoria, imagen } = req.body;

            const categoriaExiste = await Categoria.findById(categoria);
            if (!categoriaExiste) return res.status(400).json({ mensaje: "La categoría no existe" });

            const nuevoProducto = new Producto({ nombre, descripcion, precio, stock, categoria, imagen });
            await nuevoProducto.save();

            res.status(201).json({ mensaje: "Producto agregado exitosamente", producto: nuevoProducto });
        } catch (error) {
            res.status(500).json({ mensaje: "Error al crear el producto", error });
        }
    },

    obtenerProductos: async (req, res) => {
        try {
<<<<<<< HEAD

            const productos = await Producto.find();
            res.json(productos);
        } catch (error) {
            console.error('Error al obtener productos:', error);
=======
            const productos = await Producto.find().populate('categoria', 'nombre');
            res.json(productos);
        } catch (error) {
>>>>>>> 6cbb8ab0144e1222b846c9c67f40a8ac072458ad
            res.status(500).json({ mensaje: "Error al obtener productos", error });
        }
    },

<<<<<<< HEAD

=======
>>>>>>> 6cbb8ab0144e1222b846c9c67f40a8ac072458ad
    obtenerProductoPorId: async (req, res) => {
        try {
            const producto = await Producto.findById(req.params.id).populate('categoria', 'nombre');
            if (!producto) return res.status(404).json({ mensaje: "Producto no encontrado" });

            res.json(producto);
        } catch (error) {
            res.status(500).json({ mensaje: "Error al obtener el producto", error });
        }
    },

    editarProducto: async (req, res) => {
        try {
            const { nombre, descripcion, precio, stock, categoria, imagen } = req.body;

            const productoActualizado = await Producto.findByIdAndUpdate(
                req.params.id,
                { nombre, descripcion, precio, stock, categoria, imagen },
                { new: true }
            );

            if (!productoActualizado) return res.status(404).json({ mensaje: "Producto no encontrado" });

            res.json({ mensaje: "Producto actualizado", producto: productoActualizado });
        } catch (error) {
            res.status(500).json({ mensaje: "Error al actualizar el producto", error });
        }
    },

    eliminarProducto: async (req, res) => {
        try {
            const productoEliminado = await Producto.findByIdAndDelete(req.params.id);
            if (!productoEliminado) return res.status(404).json({ mensaje: "Producto no encontrado" });

            res.json({ mensaje: "Producto eliminado exitosamente" });
        } catch (error) {
            res.status(500).json({ mensaje: "Error al eliminar el producto", error });
        }
    },

    obtenerProductosAgotados: async (req, res) => {
        try {
            const productos = await Producto.find({ stock: 0 });
            res.json(productos);
        } catch (error) {
            res.status(500).json({ mensaje: "Error al obtener productos agotados", error });
        }
    },

    obtenerProductosMasVendidos: async (req, res) => {
        try {
            const productos = await Producto.find().sort({ ventas: -1 }).limit(5);
            res.json(productos);
        } catch (error) {
            res.status(500).json({ mensaje: "Error al obtener productos más vendidos", error });
        }
    }
};

export default productoControlador;

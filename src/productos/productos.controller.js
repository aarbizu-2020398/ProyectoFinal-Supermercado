const Producto = require('../modelos/Producto');
//const Categoria = require('../modelos/Categoria');

exports.crearProducto = async (req, res) => {
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
};

// Listar todos los productos
exports.obtenerProductos = async (req, res) => {
    try {
        const productos = await Producto.find().populate('categoria', 'nombre');
        res.json(productos);
    } catch (error) {
        res.status(500).json({ mensaje: "Error al obtener productos", error });
    }
};

exports.obtenerProductoPorId = async (req, res) => {
    try {
        const producto = await Producto.findById(req.params.id).populate('categoria', 'nombre');
        if (!producto) return res.status(404).json({ mensaje: "Producto no encontrado" });

        res.json(producto);
    } catch (error) {
        res.status(500).json({ mensaje: "Error al obtener el producto", error });
    }
};

exports.editarProducto = async (req, res) => {
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
};


exports.eliminarProducto = async (req, res) => {
    try {
        const productoEliminado = await Producto.findByIdAndDelete(req.params.id);
        if (!productoEliminado) return res.status(404).json({ mensaje: "Producto no encontrado" });

        res.json({ mensaje: "Producto eliminado exitosamente" });
    } catch (error) {
        res.status(500).json({ mensaje: "Error al eliminar el producto", error });
    }
};

exports.obtenerProductosAgotados = async (req, res) => {
    try {
        const productos = await Producto.find({ stock: 0 });
        res.json(productos);
    } catch (error) {
        res.status(500).json({ mensaje: "Error al obtener productos agotados", error });
    }
};

exports.obtenerProductosMasVendidos = async (req, res) => {
    try {
        const productos = await Producto.find().sort({ ventas: -1 }).limit(5);
        res.json(productos);
    } catch (error) {
        res.status(500).json({ mensaje: "Error al obtener productos más vendidos", error });
    }
};

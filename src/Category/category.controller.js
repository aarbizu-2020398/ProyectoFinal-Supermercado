
import mongoose from 'mongoose';
import Category from './category.model.js';

const { ObjectId } = mongoose.Types;

export const createCategory = async (req, res) => {
  const { nombre, descripcion } = req.body;
  try {
    const newCategory = new Category({ nombre, descripcion });
    await newCategory.save();
    return res.status(201).json({ message: 'Categoría creada exitosamente', category: newCategory });
  } catch (error) {
    console.error('Error al crear categoría:', error);
    res.status(500).json({ message: 'Error en el servidor', error });
  }
};


export const getCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    return res.status(200).json(categories);
  } catch (error) {
    console.error('Error al obtener categorías:', error);
    res.status(500).json({ message: 'Error en el servidor', error });
  }
};


export const updateCategory = async (req, res) => {
  const { categoryId } = req.params;
  const { nombre, descripcion } = req.body;
  try {
    if (!ObjectId.isValid(categoryId)) {
      return res.status(400).json({ message: 'ID inválido: se requiere un ObjectId de 24 caracteres hexadecimales' });
    }

    const category = await Category.findById(categoryId);
    if (!category) {
      return res.status(404).json({ message: 'Categoría no encontrada' });
    }

    category.nombre = nombre || category.nombre;
    category.descripcion = descripcion || category.descripcion;
    await category.save();

    return res.status(200).json({ message: 'Categoría actualizada exitosamente' });
  } catch (error) {
    console.error('Error al actualizar categoría:', error);
    res.status(500).json({ message: 'Error en el servidor', error });
  }
};

export const deleteCategory = async (req, res) => {
  try {
    await Category.deleteOne({ _id: req.params.categoryId });
    res.status(200).json({ message: 'Categoría eliminada exitosamente' });
  } catch (error) {
    console.error('Error al eliminar categoría:', error);
    res.status(500).json({ message: 'Error en el servidor', error });
  }
};
<<<<<<< HEAD

import mongoose from 'mongoose';
import Category from './category.model.js';

const { ObjectId } = mongoose.Types;

export const createCategory = async (req, res) => {
  const { nombre, descripcion } = req.body;
=======
// src/Category/category.controller.js
export const createCategory = async (req, res) => {
  const { nombre, descripcion } = req.body;

>>>>>>> 6cbb8ab0144e1222b846c9c67f40a8ac072458ad
  try {
    const newCategory = new Category({ nombre, descripcion });
    await newCategory.save();
    return res.status(201).json({ message: 'Categoría creada exitosamente', category: newCategory });
  } catch (error) {
<<<<<<< HEAD
    console.error('Error al crear categoría:', error);
=======
>>>>>>> 6cbb8ab0144e1222b846c9c67f40a8ac072458ad
    res.status(500).json({ message: 'Error en el servidor', error });
  }
};

<<<<<<< HEAD

=======
>>>>>>> 6cbb8ab0144e1222b846c9c67f40a8ac072458ad
export const getCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    return res.status(200).json(categories);
  } catch (error) {
<<<<<<< HEAD
    console.error('Error al obtener categorías:', error);
=======
>>>>>>> 6cbb8ab0144e1222b846c9c67f40a8ac072458ad
    res.status(500).json({ message: 'Error en el servidor', error });
  }
};

<<<<<<< HEAD

export const updateCategory = async (req, res) => {
  const { categoryId } = req.params;
  const { nombre, descripcion } = req.body;
  try {
    if (!ObjectId.isValid(categoryId)) {
      return res.status(400).json({ message: 'ID inválido: se requiere un ObjectId de 24 caracteres hexadecimales' });
    }

=======
export const updateCategory = async (req, res) => {
  const { categoryId } = req.params;
  const { nombre, descripcion } = req.body;

  try {
>>>>>>> 6cbb8ab0144e1222b846c9c67f40a8ac072458ad
    const category = await Category.findById(categoryId);
    if (!category) {
      return res.status(404).json({ message: 'Categoría no encontrada' });
    }

    category.nombre = nombre || category.nombre;
    category.descripcion = descripcion || category.descripcion;
<<<<<<< HEAD
    await category.save();

    return res.status(200).json({ message: 'Categoría actualizada exitosamente' });
  } catch (error) {
    console.error('Error al actualizar categoría:', error);
=======

    await category.save();
    return res.status(200).json({ message: 'Categoría actualizada exitosamente' });
  } catch (error) {
>>>>>>> 6cbb8ab0144e1222b846c9c67f40a8ac072458ad
    res.status(500).json({ message: 'Error en el servidor', error });
  }
};

export const deleteCategory = async (req, res) => {
<<<<<<< HEAD
  try {
    await Category.deleteOne({ _id: req.params.categoryId });
    res.status(200).json({ message: 'Categoría eliminada exitosamente' });
  } catch (error) {
    console.error('Error al eliminar categoría:', error);
    res.status(500).json({ message: 'Error en el servidor', error });
  }
};
=======
  const { categoryId } = req.params;

  try {
    const category = await Category.findById(categoryId);
    if (!category) {
      return res.status(404).json({ message: 'Categoría no encontrada' });
    }

    await category.remove();
    return res.status(200).json({ message: 'Categoría eliminada exitosamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error en el servidor', error });
  }
};
>>>>>>> 6cbb8ab0144e1222b846c9c67f40a8ac072458ad

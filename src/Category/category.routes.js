
<<<<<<< HEAD
import { Router } from 'express';
import { createCategory, getCategories, updateCategory, deleteCategory } from './category.controller.js';

const router = Router();
=======
import express from 'express';
import { createCategory, getCategories, updateCategory, deleteCategory } from './category.controller.js';
import { crearFactura, obtenerFacturas, obtenerFacturaPorId } from '../Factura/factura.controller.js'; 

const router = express.Router();
>>>>>>> 6cbb8ab0144e1222b846c9c67f40a8ac072458ad


router.post('/', createCategory);
router.get('/', getCategories);
router.put('/:categoryId', updateCategory);
router.delete('/:categoryId', deleteCategory);


<<<<<<< HEAD
=======
router.post('/factura', crearFactura);
router.get('/facturas', obtenerFacturas);
router.get('/factura/:id', obtenerFacturaPorId);

>>>>>>> 6cbb8ab0144e1222b846c9c67f40a8ac072458ad
export default router;

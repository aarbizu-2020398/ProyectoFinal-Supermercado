
import express from 'express';
import { createCategory, getCategories, updateCategory, deleteCategory } from './category.controller.js';
import { crearFactura, obtenerFacturas, obtenerFacturaPorId } from '../Factura/factura.controller.js'; 

const router = express.Router();


router.post('/', createCategory);
router.get('/', getCategories);
router.put('/:categoryId', updateCategory);
router.delete('/:categoryId', deleteCategory);


router.post('/factura', crearFactura);
router.get('/facturas', obtenerFacturas);
router.get('/factura/:id', obtenerFacturaPorId);

export default router;

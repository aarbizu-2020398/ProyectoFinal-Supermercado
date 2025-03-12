
import { Router } from 'express';
import { createCategory, getCategories, updateCategory, deleteCategory } from './category.controller.js';

const router = Router();


router.post('/', createCategory);
router.get('/', getCategories);
router.put('/:categoryId', updateCategory);
router.delete('/:categoryId', deleteCategory);


export default router;

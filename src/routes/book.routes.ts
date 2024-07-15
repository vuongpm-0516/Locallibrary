import express from 'express';
import * as bookController from '../controllers/book.controller';

const router = express.Router();

// GET request for creating a Book. NOTE This must come before route that displays Book (uses id).
router.get('/create', bookController.bookCreateGet);

// POST request for creating Book.
router.post('/create', bookController.bookCreatePost);

// GET request to delete Book.
router.get('/:id/delete', bookController.bookDeleteGet);

// POST request to delete Book.
router.post('/:id/delete', bookController.bookDeletePost);

// GET request to update Book.
router.get('/:id/update', bookController.bookUpdateGet);

// POST request to update Book.
router.post('/:id/update', bookController.bookUpdatePost);

// GET request for Book detail.
router.get('/:id', bookController.bookDetail);

// GET request for list of all Book items.
router.get('/', bookController.bookList);

export default router;

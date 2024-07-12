import express from 'express';
import * as bookinstanceController from '../controllers/bookinstance.controller';

const router = express.Router();

// GET request for creating a BookInstance. NOTE This must come before route that displays BookInstance (uses id).
router.get('/create', bookinstanceController.bookinstanceCreateGet);

// POST request for creating BookInstance.
router.post('/create', bookinstanceController.bookinstanceCreatePost);

// GET request to delete BookInstance.
router.get('/:id/delete', bookinstanceController.bookinstanceDeleteGet);

// POST request to delete BookInstance.
router.post('/:id/delete', bookinstanceController.bookinstanceDeletePost);

// GET request to update BookInstance.
router.get('/:id/update', bookinstanceController.bookinstanceUpdateGet);

// POST request to update BookInstance.
router.post('/:id/update', bookinstanceController.bookinstanceUpdatePost);

// GET request for BookInstance detail.
router.get('/:id', bookinstanceController.bookinstanceDetail);

// GET request for list of all BookInstance items.
router.get('/', bookinstanceController.bookinstanceList);

export default router;

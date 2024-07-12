import express from 'express';
import * as genreController from '../controllers/genre.controller';

const router = express.Router();

// GET request for creating a Genre. NOTE This must come before route that displays Genre (uses id).
router.get('/create', genreController.genreCreateGet);

// POST request for creating Genre.
router.post('/create', genreController.genreCreatePost);

// GET request to delete Genre.
router.get('/:id/delete', genreController.genreDeleteGet);

// POST request to delete Genre.
router.post('/:id/delete', genreController.genreDeletePost);

// GET request to update Genre.
router.get('/:id/update', genreController.genreDetail);

// POST request to update Genre.
router.post('/:id/update', genreController.genreUpdatePost);

// GET request for one Genre.
router.get('/:id', genreController.genreDetail);

// GET request for list of all Genre items.
router.get('/', genreController.genreList);

export default router;

import express from 'express';
import authorRouter from './author.routes';
import bookRouter from './book.routes';
import bookinstanceRouter from './bookinstance.routes';
import genreRouter from './genre.routes';

import { index, error } from '../controllers/home.controller';

const router = express.Router();

/* GET home page. */
router.get('/', index);
router.get('/error', error);

router.use('/authors', authorRouter);
router.use('/books', bookRouter);
router.use('/bookinstances', bookinstanceRouter);
router.use('/genres', genreRouter);

export default router;

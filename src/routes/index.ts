import express, { Request, Response, NextFunction } from 'express';
import authorRouter from './author.routes';
import bookRouter from './book.routes';
import bookinstanceRouter from './bookinstance.routes';
import genreRouter from './genre.routes';

const router = express.Router();

/* GET home page. */
router.get('/', function (req: Request, res: Response, next: NextFunction) {
    res.render('index', { title: 'Express' });
});

router.use('/authors', authorRouter);
router.use('/books', bookRouter);
router.use('/bookinstances', bookinstanceRouter);
router.use('/genres', genreRouter);

export default router;

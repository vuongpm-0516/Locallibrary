import { Request, Response, NextFunction } from 'express';
import asyncHandler from 'express-async-handler';

import * as services from '../services';

export const index = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const [numBooks, numBookInstances, availableBookInstances, numAuthors, numGenres] =
        await Promise.all([
            services.getNumBooks(),
            services.getNumBookInstances(),
            services.getNumAvailableBookInstances(),
            services.getNumAuthors(),
            services.getNumGenres(),
        ]);

    res.render('index', {
        title: req.t('sidebar.home'),
        book_count: numBooks,
        book_instance_count: numBookInstances,
        book_instance_available_count: availableBookInstances[1], // count available bookInstance
        author_count: numAuthors,
        genre_count: numGenres,
    });
});

export const error = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    res.render('flash_error', { title: req.t('error.title', { ns: 'error' }) });
});

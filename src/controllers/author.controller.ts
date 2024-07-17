import { Request, Response, NextFunction } from 'express';
import asyncHandler from 'express-async-handler';

import * as authorServices from '../services/author.services';

// Display list of all Authors.
export const authorList = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const authors = await authorServices.getAuthorList();
    res.render('authors/index', { authors, title: req.t('list.author') });
});

// Display detail page for a specific Author.
export const authorDetail = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
        res.send(`NOT IMPLEMENTED: Author detail: ${req.params.id}`);
    }
);

// Display Author create form on GET.
export const authorCreateGet = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
        res.send('NOT IMPLEMENTED: Author is created with method GET');
    }
);

// Handle Author create on POST.
export const authorCreatePost = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
        res.send('NOT IMPLEMENTED: Author is created with method POST');
    }
);

// Display Author delete form on GET.
export const authorDeleteGet = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
        res.send(`NOT IMPLEMENTED: Author ${req.params.id} is deleted with method GET`);
    }
);

// Handle Author delete on POST.
export const authorDeletePost = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
        res.send(`NOT IMPLEMENTED: Author ${req.params.id} is deleted with method POST`);
    }
);

// Display Author update form on GET.
export const authorUpdateGet = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
        res.send(`NOT IMPLEMENTED: Author ${req.params.id} is updated with method GET `);
    }
);

// Handle Author update on POST.
export const authorUpdatePost = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
        res.send(`NOT IMPLEMENTED: Author ${req.params.id} is updated with method POST`);
    }
);

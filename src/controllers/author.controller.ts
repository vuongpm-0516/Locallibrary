import { Request, Response, NextFunction } from 'express';
import asyncHandler from 'express-async-handler';

import * as authorServices from '../services/author.services';

async function validateGetAuthorById(req: Request, res: Response, next: NextFunction) {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
        // log 404 Invalid author ID parameter
        req.flash('err_message', req.t('error.invalid_author_id', { ns: 'error' }));
        return res.redirect('/error');
    }

    const author = await authorServices.getAuthorById(id);
    if (author === null) {
        // log 404 Author not found
        req.flash('err_message', req.t('error.author_not_found', { ns: 'error' }));
        return res.redirect('/error');
    }

    return author;
}

// Display list of all Authors.
export const authorList = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const authors = await authorServices.getAuthorList();
    res.render('authors/index', { authors, title: req.t('list.author') });
});

// Display detail page for a specific Author.
export const authorDetail = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
        const author = await validateGetAuthorById(req, res, next);
        if (!author) return;

        res.render('authors/detail', {
            title: req.t('detail.author_detail', { ns: 'detail' }),
            author,
            author_books: author?.books,
        });
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

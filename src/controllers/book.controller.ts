import { Request, Response, NextFunction } from 'express';
import asyncHandler from 'express-async-handler';

// Display list of all Books.
export const bookList = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    res.send('NOT IMPLEMENTED: Book list');
});

// Display detail page for a specific Book.
export const bookDetail = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    res.send(`NOT IMPLEMENTED: Book detail: ${req.params.id}`);
});

// Display Book create form on GET.
export const bookCreateGet = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
        res.send('NOT IMPLEMENTED: Book is created with method GET');
    }
);

// Handle Book create on POST.
export const bookCreatePost = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
        res.send('NOT IMPLEMENTED: Book is created with method POST');
    }
);

// Display Book delete form on GET.
export const bookDeleteGet = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
        res.send(`NOT IMPLEMENTED: Book ${req.params.id} is deleted with method GET`);
    }
);

// Handle Book delete on POST.
export const bookDeletePost = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
        res.send(`NOT IMPLEMENTED: Book ${req.params.id} is deleted with method POST`);
    }
);

// Display Book update form on GET.
export const bookUpdateGet = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
        res.send(`NOT IMPLEMENTED: Book ${req.params.id} is updated with method GET`);
    }
);

// Handle Book update on POST.
export const bookUpdatePost = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
        res.send(`NOT IMPLEMENTED: Book ${req.params.id} is updated with method POST`);
    }
);

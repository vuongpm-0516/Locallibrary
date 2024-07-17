import { Request, Response, NextFunction } from 'express';
import asyncHandler from 'express-async-handler';

import * as bookinstanceServices from '../services/bookinstance.services';

// Display list of all BookInstances.
export const bookinstanceList = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
        const bookInstances = await bookinstanceServices.getBookinstanceList();
        res.render('bookinstances/index', { bookInstances, title: req.t('list.bookinstance') });
    }
);

// Display detail page for a specific BookInstance.
export const bookinstanceDetail = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
        res.send(`NOT IMPLEMENTED: BookInstance detail: ${req.params.id}`);
    }
);

// Display BookInstance create form on GET.
export const bookinstanceCreateGet = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
        res.send('NOT IMPLEMENTED: BookInstance create GET');
    }
);

// Handle BookInstance create on POST.
export const bookinstanceCreatePost = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
        res.send('NOT IMPLEMENTED: BookInstance create POST');
    }
);

// Display BookInstance delete form on GET.
export const bookinstanceDeleteGet = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
        res.send(`NOT IMPLEMENTED: BookInstance delete GET ${req.params.id}`);
    }
);

// Handle BookInstance delete on POST.
export const bookinstanceDeletePost = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
        res.send(`NOT IMPLEMENTED: BookInstance delete POST ${req.params.id}`);
    }
);

// Display BookInstance update form on GET.
export const bookinstanceUpdateGet = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
        res.send(`NOT IMPLEMENTED: BookInstance update GET ${req.params.id}`);
    }
);

// Handle BookInstance update on POST.
export const bookinstanceUpdatePost = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
        res.send(`NOT IMPLEMENTED: BookInstance update POST ${req.params.id}`);
    }
);

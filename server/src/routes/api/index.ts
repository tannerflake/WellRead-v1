import { Router } from 'express';
import { userRouter } from './user-routes.js';
import { shelfRouter } from './shelf-routes.js';

const router = Router();

router.use('/users', userRouter);
router.use('/shelf', shelfRouter);

export default router;

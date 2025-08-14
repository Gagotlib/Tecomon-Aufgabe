import { Router } from 'express';
import widgetRoutes from './widget.route';

const router = Router();


router.use('/widgets', widgetRoutes);


export default router;

import { Router } from 'express';
import widgetRoutes from './widget.router';

const router = Router();


router.use('/api/widgets', widgetRoutes);


export default router;

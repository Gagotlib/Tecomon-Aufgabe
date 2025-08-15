import { Router } from 'express';
import widgetRoutes from './widget.router';
import weatherRoutes from './weather.router'

const router = Router();


router.use('/api/widgets', widgetRoutes);
router.use('/api/weather', weatherRoutes) 

export default router;

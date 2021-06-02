import { Router } from 'express';
import IndexCtrl from '../controllers/IndexCtrl'

const router = Router();
router.get('/', IndexCtrl.LiteCtrl.findAll);
router.get('/:id', IndexCtrl.LiteCtrl.findOne);
router.post('/order', IndexCtrl.VicaCtrl.findOne1,
    IndexCtrl.VillaCtrl.findOne1,
    IndexCtrl.OrderCtrl.create,
    IndexCtrl.VicaCtrl.update1,
    IndexCtrl.LiteCtrl.update1)

export default router;
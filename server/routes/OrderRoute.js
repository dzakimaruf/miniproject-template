import { Router } from 'express';
import IndexCtrl from '../controllers/IndexCtrl'

const router = Router();
router.post('/', IndexCtrl.OrderCtrl.create);
router.get('/', IndexCtrl.OrderCtrl.findAll);
router.get('/:id', IndexCtrl.OrderCtrl.findOne);
router.put('/:id', IndexCtrl.OrderCtrl.update);
router.delete('/:id', IndexCtrl.OrderCtrl.remove);
router.get('/rawsql/:id', IndexCtrl.OrderCtrl.rawSQL);

export default router;
import { Router } from 'express';
import IndexCtrl from '../controllers/IndexCtrl'

const router = Router();
router.post('/', IndexCtrl.VicaCtrl.create);
router.get('/', IndexCtrl.VicaCtrl.findAll);
router.get('/:id', IndexCtrl.VicaCtrl.findOne);
router.put('/:id', IndexCtrl.VicaCtrl.update);
router.delete('/:id', IndexCtrl.VicaCtrl.remove);
router.get('/rawsql/:id', IndexCtrl.VicaCtrl.rawSQL);

export default router;
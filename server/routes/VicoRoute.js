import { Router } from 'express';
import IndexCtrl from '../controllers/IndexCtrl'

const router = Router();
router.post('/', IndexCtrl.VicoCtrl.create);
router.get('/', IndexCtrl.VicoCtrl.findAll);
router.get('/:id', IndexCtrl.VicoCtrl.findOne);
router.put('/:id', IndexCtrl.VicoCtrl.update);
router.delete('/:id', IndexCtrl.VicoCtrl.remove);
router.get('/rawsql/:id', IndexCtrl.VicoCtrl.rawSQL);

export default router;
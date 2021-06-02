import { Router } from 'express';
import IndexCtrl from '../controllers/IndexCtrl'

const router = Router();
router.post('/', IndexCtrl.VillaCtrl.create);
router.get('/', IndexCtrl.VillaCtrl.findAll);
router.get('/:id', IndexCtrl.VillaCtrl.findOne);
router.put('/:id', IndexCtrl.VillaCtrl.update);
router.delete('/:id', IndexCtrl.VillaCtrl.remove);
router.get('/rawsql/:id', IndexCtrl.VillaCtrl.rawSQL);

router.post("/cart/:id", IndexCtrl.UserCtrl.checkL,IndexCtrl.VillaCtrl.findOne,
IndexCtrl.VicaCtrl.createc,IndexCtrl.LiteCtrl.createlite);

export default router;
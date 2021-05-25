import { Router } from 'express';
import IndexCtrl from '../controllers/IndexCtrl'

const router = Router();
// router.post('/profile/:id', IndexCtrl.UploadDownloadCtrl, IndexCtrl.villasCtrl.update);
// router.post('/multipart/', IndexCtrl.UploadDownloadCtrl.uploadMultipart,
//     IndexCtrl.ViimCtrl.create,
router.get('/', IndexCtrl.ViimCtrl.findAll);
router.get('/:filename', IndexCtrl.UploadCtrl.download);

export default router;
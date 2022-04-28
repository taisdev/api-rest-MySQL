import { Router } from 'express';
import pacienteController from '../controllers/PacienteController';
import loginRequired from '../middlewares/loginRequired';

const router = new Router();

router.post('/', loginRequired, pacienteController.create);
router.get('/', loginRequired, pacienteController.index);

router.get('/:id', loginRequired, pacienteController.show);
router.put('/', loginRequired, pacienteController.update);
router.delete('/', loginRequired, pacienteController.delete);

export default router;

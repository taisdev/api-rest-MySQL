"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express');
var _PacienteController = require('../controllers/PacienteController'); var _PacienteController2 = _interopRequireDefault(_PacienteController);
var _loginRequired = require('../middlewares/loginRequired'); var _loginRequired2 = _interopRequireDefault(_loginRequired);

const router = new (0, _express.Router)();

router.post('/', _loginRequired2.default, _PacienteController2.default.create);
router.get('/', _loginRequired2.default, _PacienteController2.default.index);

router.get('/:id', _loginRequired2.default, _PacienteController2.default.show);
router.put('/', _loginRequired2.default, _PacienteController2.default.update);
router.delete('/', _loginRequired2.default, _PacienteController2.default.delete);

exports. default = router;

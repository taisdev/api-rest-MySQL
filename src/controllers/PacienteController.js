import Paciente from '../models/Paciente';

class PacienteController {
  async create(req, res) {
    try {
      const novoPaciente = await Paciente.create(req.body);
      return res.json(novoPaciente);
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  async index(req, res) {
    try {
      const paciente = await Paciente.findAll({ attributes: ['id', 'nome', 'cpf', 'sexo', 'endereco', 'telefone'] });
      return res.json(paciente);
    } catch (e) {
      return res.json(null);
    }
  }

  async show(req, res) {
    try {
      const paciente = await Paciente.findOne(req.params.id);
      const {
        id, nome, cpf, sexo, endereco, telefone,
      } = paciente;
      return res.json({
        id, nome, cpf, sexo, endereco, telefone,
      });
    } catch (e) {
      return res.json(null);
    }
  }

  async update(req, res) {
    try {
      const paciente = await Paciente.findByPk(req.params.id);
      console.log('id: ', req.params.id);

      if (!paciente) {
        return res.status(400).json({
          errors: ['Usuário não existe'],
        });
      }

      const novosDados = await paciente.update(req.body);
      const {
        id, nome, cpf, sexo, endereco, telefone,
      } = novosDados;
      return res.json({
        id, nome, cpf, sexo, endereco, telefone,
      });
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  async delete(req, res) {
    try {
      if (!req.params.id) {
        return res.status(400).json({
          error: ['ID não enviado'],
        });
      }

      const paciente = await Paciente.findByPk(req.params.id);

      if (!paciente) {
        return res.status(400).json({
          error: ['Paciente não encontrado'],
        });
      }

      await paciente.destroy();

      return res.send('Paciente deletado com sucesso');
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }
}

export default new PacienteController();

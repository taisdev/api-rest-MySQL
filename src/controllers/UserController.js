import User from '../models/User';

class UserController {
  async create(req, res) {
    try {
      const novoUser = await User.create(req.body);
      return res.json(novoUser);
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  async index(req, res) {
    try {
      const users = await User.findAll({ attributes: ['id', 'usuario', 'email', 'tipo'] });
      return res.json(users);
    } catch (e) {
      return res.json(null);
    }
  }

  async show(req, res) {
    try {
      const user = await User.findOne({
        where: {
          email: req.params.email,
        },
      });
      const {
        id, usuario, email, tipo,
      } = user;
      return res.json({
        id, usuario, email, tipo,
      });
    } catch (e) {
      return res.json(null);
    }
  }

  async update(req, res) {
    try {
      const user = await User.findByPk(req.userId);
      console.log('id: ', req.userId);

      if (!user) {
        return res.status(400).json({
          errors: ['Usuário não existe'],
        });
      }

      const novosDados = await user.update(req.body);
      const {
        id, usuario, email, tipo,
      } = novosDados;
      return res.json({
        id, usuario, email, tipo,
      });
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  async delete(req, res) {
    try {
      if (!req.userId) {
        return res.status(400).json({
          error: ['ID não enviado'],
        });
      }

      const user = await User.findByPk(req.userId);

      if (!user) {
        return res.status(400).json({
          error: ['Usuário não encontrado'],
        });
      }

      await user.destroy();

      return res.send('Usuario deletado com sucesso');
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }
}

export default new UserController();

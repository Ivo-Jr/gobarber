// Fecture de criação de usuários da nossa API;
import User from '../models/User';
import * as Yup from 'yup';

class UserController {
  async store(request, response) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().email().required(),
      password: Yup.string().required().min(6),
    });

    if (!(await schema.isValid(request.body))) {
      return response.status(400).json({ error: 'Validation fails' });
    }

    const userExists = await User.findOne({ where: { email: request.body.email }})

    if (userExists) {
      return response.status(400).json({ error: 'User already exists.' });
    }

    const { id, name, email, provider } = await User.create(request.body);

    return  response.json({
      id,
      name,
      email,
      provider
    });
  }

    async update(request, response) {
      const schema = Yup.object().shape({
        name: Yup.string(),
        email: Yup.string().email(),
        oldPassword: Yup.string().min(6),
        password: Yup.string()
          .min(6)
          .when('oldPassword', (oldPassword, field) =>
            oldPassword ? field.required() : field
          ),
        confirmPassword: Yup.string().when('password', (password, field) =>
          password ? field.required().oneOf([Yup.ref('password')]) : field
        ),
      });

      if (!(await schema.isValid(request.body))) {
        return response.status(400).json({ error: 'Validation fails' });
      }

      const { email, oldPassword } = request.body;

      const user = await User.findByPk(request.userId);

      if (email && email !== user.email ) {
        const userExists = await User.findOne({ where: { email }});

        if (userExists) {
          return response.status(400).json({ error: 'User already exists.' });
        }
      }

      // Alteração de senha:
      if(oldPassword && !(await user.checkPassword(oldPassword))) {
        return response.status(401).json({ error: 'Password does not match' });
      }

      const { id, name, provider } = await user.update(request.body);

      return response.json({
        id,
        name,
        email,
        provider
      });
  }
}

export default new UserController();

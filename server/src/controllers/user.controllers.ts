import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { passwordValid, hashPassword } from '../helpers/password.helper';
import { UserRepository } from '../repositories/user.repository';
import uploadS3 from '../helpers/image.helper';
import { avatarFolder } from '../../config/aws.config';

class UserController {
	uploadAvatar = async (req: Request, res: Response): Promise<void> => {
		const userRepository = getCustomRepository(UserRepository);
		const { id, firstName, lastName } = req.user;
		const name = `${firstName}_${lastName}_${id}`;
		try {
			const avatar = await uploadS3(avatarFolder, req.file, name);
			const user = await userRepository.updateById(id, { avatar });
			res.send(user);
		} catch (error) {
			res.status(400).send(error.message);
		}
	};

	changePassword = async (req: Request, res: Response): Promise<void> => {
		const userRepository = getCustomRepository(UserRepository);
		const { oldPassword, newPassword } = req.body;
		const { email, id } = req.user;
		const { password } = await userRepository.getByEmail(email);
		try {
			if (!passwordValid(oldPassword, password)) {
				throw new Error('Old password is incorrect');
			}
			const changedPassword = hashPassword(newPassword);
			userRepository.updateById(id, { password: changedPassword });
			res.send({ message: 'Password was changed' });
		} catch (error) {
			res.status(400).send(error.message);
		}
	};

	getUser = async (req: Request, res: Response): Promise<void> => {
		const userRepository = getCustomRepository(UserRepository);
		const { id } = req.params;

		try {
			const user = await userRepository.getById(id);
			res.send(user);
		} catch (error) {
			res.status(404).send();
		}
	};

	getAllUser = async (req: Request, res: Response): Promise<void> => {
		const userRepository = getCustomRepository(UserRepository);
		const { id } = req.params;

		try {
			const user = await userRepository.findAll();
			res.send(user);
		} catch (error) {
			res.status(404).send();
		}
	};

	updateUser = async (req: Request, res: Response): Promise<void> => {
		const userRepository = getCustomRepository(UserRepository);
		const { id } = req.user;
		if (req.body.email) {
			const checkUser = await userRepository.getByEmail(req.body.email);
			if (checkUser && checkUser.id !== id) {
				throw new Error('This email is already taken');
			}
		}
		if (req.body.password) {
			throw new Error('Forbidden to change password');
		}
		try {
			const updatedUser = await userRepository.updateById(id, req.body);
			res.status(200).send(updatedUser);
		} catch (error) {
			res.status(400).send(error.message);
		}
	};

	deleteUser = async (req: Request, res: Response): Promise<void> => {
		const userRepository = getCustomRepository(UserRepository);
		const { id } = req.user;

		try {
			await userRepository.deleteById(id);
			res.status(200).send();
		} catch (error) {
			res.status(400).send();
		}
	};
}

export default UserController;

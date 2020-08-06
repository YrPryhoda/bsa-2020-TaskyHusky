import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { TeamsRepository } from '../repositories/teams.repository';
import { getWebError } from '../helpers/error.helper';

class TeamsController {
	getTeams = async (req: Request, res: Response): Promise<void> => {
		const teamRepository = getCustomRepository(TeamsRepository);
		try {
			const teams = await teamRepository.findAll();
			res.send(teams);
		} catch (error) {
			res.status(404).send(getWebError(error, 400));
		}
	}

	getTeam = async (req: Request, res: Response): Promise<void> => {
		const teamRepository = getCustomRepository(TeamsRepository);
		const { id } = req.params;

		try {
			const team = await teamRepository.findOneById(id);
			res.send(team);
		} catch (error) {
			res.status(404).send(getWebError(error, 404));
		}
	};

	createTeam = async (req: Request, res: Response): Promise<void> => {
		const teamRepository = getCustomRepository(TeamsRepository);
		try {
			const team = await teamRepository.createOne(req.body);
			res.send(team);
		} catch (error) {
			res.status(400).send(getWebError(error, 400));
		}
	}

	updateTeam = async (req: Request, res: Response): Promise<void> => {
		const teamRepository = getCustomRepository(TeamsRepository);
		const { id } = req.params;
		try {
			const updatedTeam = await teamRepository.updateOneById(id, req.body);
			res.status(200).send(updatedTeam);
		} catch (error) {
			res.status(400).send(getWebError(error, 400));
		}
	};

	deleteTeam = async (req: Request, res: Response): Promise<void> => {
		const teamRepository = getCustomRepository(TeamsRepository);
		const { id } = req.params;

		try {
			const result = await teamRepository.deleteOneById(id);
			res.send(result);
		} catch (error) {
			res.status(400).send(getWebError(error, 400));
		}
	};
}

export default TeamsController;
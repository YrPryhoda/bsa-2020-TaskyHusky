import { Server as IOServer } from 'socket.io';

declare namespace Express {
	export interface Request {
		io: IOServer;
		user: {
			id: string;
			email: string;
			password: string;
			firstName?: string;
			lastName?: string;
			avatar?: string;
			department?: string;
			timezone?: string;
			organization?: string;
			jobTitle?: string;
			userSettingsId?: string;
		};
	}
}

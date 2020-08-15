export type Team = {
	id: string;
	name: string;
	description: string;
	links: string[];
	members: [];
	loading: boolean
};

export interface TeamState {
	team: Team;
}

export const initialState: TeamState = {
	team: {
		id: '',
		name: '',
		description: '',
		links: [],
		members: [],
		loading: false
	},
};

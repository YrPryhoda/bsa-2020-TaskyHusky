type issuesToSprint = {
	[sprintId: string]: WebApi.Entities.Issue[];
};

export interface ScrumBoardState {
	sprints: WebApi.Entities.Sprint[];
	matchIssueToSprint: issuesToSprint;
	project: WebApi.Result.BoardProjectsResult;
	board: WebApi.Result.BoardResult;
}

export const initialState: ScrumBoardState = {
	sprints: [],
	matchIssueToSprint: {},
	project: {
		id: '',
		name: '',
		key: '',
		description: '',
		icon: '',
		category: '',
		createdDate: undefined,
		updatedDate: undefined,
		deletedDate: undefined,
	},
	board: {
		id: '',
		boardType: 'Kanban',
		name: '',
		location: '',
		createdAt: {
			firstName: '',
			lastName: '',
			id: '',
			avatar: '',
		},
	},
};

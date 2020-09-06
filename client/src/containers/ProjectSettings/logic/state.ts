export interface ProjectState {
	project: WebApi.Entities.Projects;
	isLoading: boolean;
	is404Error: boolean;
}

export const initialState: ProjectState = {
	project: {
		id: '',
		name: '',
		key: '',
		category: '',
		icon: '',
		sprints: [],
		boards: [],
		defaultAssignee: undefined,
		labels: [],
		lead: {
			id: '',
			firstName: '',
			lastName: '',
			username: '',
			avatar: '',
			department: '',
			location: '',
			organization: '',
			email: '',
			jobTitle: '',
			userSettingsId: '',
			password: '',
			teams: [],
			boards: [],
			filters: [],
			assignedProjects: [],
			leadedProjects: [],
			createdProjects: [],
		},
		creator: {
			id: '',
			firstName: '',
			lastName: '',
			username: '',
			avatar: '',
			department: '',
			location: '',
			organization: '',
			email: '',
			jobTitle: '',
			userSettingsId: '',
			password: '',
			teams: [],
			boards: [],
			filters: [],
			assignedProjects: [],
			leadedProjects: [],
			createdProjects: [],
		},
		users: [],
	},
	isLoading: true,
	is404Error: false,
};

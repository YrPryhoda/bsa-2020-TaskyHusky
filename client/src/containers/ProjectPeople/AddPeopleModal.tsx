import React, { useState, useMemo, memo } from 'react';
import { Modal, Button, Dropdown, DropdownOnSearchChangeData } from 'semantic-ui-react';
import { useSelector, useDispatch } from 'react-redux';

import * as actions from './logic/actions';
import { RootState } from 'typings/rootState';
import { startGettingProject } from 'containers/ProjectSettings/logic/actions';

interface Props {
	project: WebApi.Entities.Projects;
}

const AddPeopleModal = ({ project: { id: projectId, users: projectUsers } }: Props) => {
	const dispatch = useDispatch();
	const { users } = useSelector((rootState: RootState) => rootState.users);
	const { isLoading, isAdded } = useSelector((rootState: RootState) => rootState.projectPeople);

	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [searchQuery, setSearchQuery] = useState<string>('');
	const [selectedUsersIds, setSelectedUsersIds] = useState<string[]>([]);

	const usersNotInProject = useMemo(
		() => users.filter((user) => projectUsers.every((projectsUser) => projectsUser.id !== user.id)),
		[users, projectUsers],
	);

	if (isAdded) {
		dispatch(actions.resetState());
		setIsOpen(false);
		dispatch(startGettingProject({ id: projectId }));
	}

	const onSearchQueryChange = (
		event: React.SyntheticEvent<HTMLElement, Event>,
		{ searchQuery: query }: DropdownOnSearchChangeData,
	): void => {
		setSearchQuery(query);
	};

	const onSearchDataChange = (event: React.SyntheticEvent<HTMLElement, Event>, { value: selectedIds }: any): void => {
		setSelectedUsersIds(selectedIds);
	};

	const onAddSelectedUsers = () => {
		dispatch(actions.startAddingUsers({ usersId: selectedUsersIds, projectId }));
	};

	return (
		<Modal
			dimmer="inverted"
			size={'mini'}
			open={isOpen}
			onClose={() => setIsOpen(false)}
			trigger={
				<Button primary onClick={() => setIsOpen(true)}>
					Add people
				</Button>
			}
		>
			<Modal.Header>Add people</Modal.Header>
			<Modal.Content>
				<Dropdown
					fluid
					multiple
					onChange={onSearchDataChange}
					onSearchChange={onSearchQueryChange}
					options={usersNotInProject.map((user) => ({
						key: user.id,
						value: user.id,
						text: `${user.firstName} ${user.lastName}`,
					}))}
					placeholder="Users"
					search
					searchQuery={searchQuery}
					selection
					value={selectedUsersIds}
				/>
			</Modal.Content>
			<Modal.Actions>
				<Button onClick={() => setIsOpen(false)}>Cancel</Button>
				<Button primary onClick={onAddSelectedUsers} loading={isLoading}>
					Add
				</Button>
			</Modal.Actions>
		</Modal>
	);
};

export default memo(AddPeopleModal);
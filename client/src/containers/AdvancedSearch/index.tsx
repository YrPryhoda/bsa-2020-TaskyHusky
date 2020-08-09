import React, { useEffect, useState } from 'react';
import styles from './styles.module.scss';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'typings/rootState';
import { Button, Table, Input, Form, List, Icon } from 'semantic-ui-react';
import IssueItem from 'components/IssueItem';
import FilterPart from 'components/FilterPart';
import MoreFilterPartsDropdown from 'components/MoreFilters';
import { fetchFilterParts } from './logic/actions';
import { FilterPartState } from './logic/state';

const QUICK_FILTER_IDS = [
	'9d7cc2e4-f158-4ff2-a899-e89c657b70ef',
	'932d024f-2ea6-448b-b614-ccb053bbde53',
	'2c26b1a1-1a86-458a-bdcd-1d79055aa5ed',
];

const AdvancedSearch: React.FC = () => {
	const dispatch = useDispatch();
	const { filterParts } = useSelector((rootState: RootState) => rootState.advancedSearch);
	const [addedFilterParts, setAddedFilterParts] = useState([] as FilterPartState[]);

	useEffect(() => {
		dispatch(fetchFilterParts());
	}, [dispatch]);

	const issues = [
		{
			summary: 'Very summary',
			boardColumnID: '6d1',
			labels: 'done',
			attachments: 'attachments',
			links: 'link1',
			description: 'Very description',
			sprintID: '52ce',
			projectID: 'fc9e9ce',
			issueKey: 'TH-1',
			assignedID: 'b4e938e1',
			creatorID: 'a01d',
			type: {
				id: 'string',
				icon: 'string',
				color: 'string',
				title: 'string',
			},
			id: 'a269d9f4-1c10-40ad-81e0-7ac333804d91',
		},
	];

	const getDefaultFilterParts = () => {
		return filterParts.filter(({ filterDef }) =>
			QUICK_FILTER_IDS.find((quickFilterID) => filterDef.id === quickFilterID),
		);
	};

	const getAdditionalFilterParts = () => {
		return filterParts.filter(
			({ filterDef }) => !QUICK_FILTER_IDS.find((quickFilterID) => filterDef.id === quickFilterID),
		);
	};

	return (
		<div className={styles.filtersContainer}>
			<div className={styles.outer}>
				<div className={styles.titleWrapper}>
					<div className={styles.titleContainer}>
						<h1 className={styles.title}>Search</h1>
						<Button compact basic className={styles.saveBtn}>
							Save as
						</Button>
					</div>
					<div className={styles.actionWrapper}>
						<List selection horizontal>
							<List.Item>
								<div className={styles.actionItem}>
									<Icon name="share alternate" />
									<List.Content>Share</List.Content>
								</div>
							</List.Item>
							<List.Item>
								<div className={styles.actionItem}>
									<Icon name="external share" />
									<List.Content>Export</List.Content>
								</div>
							</List.Item>
							<List.Item>
								<div className={styles.actionItem}>
									<Icon name="ellipsis horizontal" />
								</div>
							</List.Item>
						</List>
					</div>
				</div>
				<div className={styles.bottomBarWrapper}>
					<Form>
						<Form.Group>
							{getDefaultFilterParts().map((part) => (
								<FilterPart key={part.id} filterPart={part} />
							))}
							<MoreFilterPartsDropdown
								additionalFilterParts={getAdditionalFilterParts()}
								addedFilterParts={addedFilterParts}
								setAddedFilterParts={(data) => setAddedFilterParts(data)}
							/>
							<Form.Field control={Input} placeholder="Contains text" />
							<Button primary content="Search" />
						</Form.Group>
						<Form.Group>
							{addedFilterParts.map((part) => (
								<FilterPart key={part.id} filterPart={part} />
							))}
						</Form.Group>
					</Form>
				</div>
			</div>
			<div>
				<Table selectable compact>
					<Table.Header>
						<Table.Row>
							<Table.HeaderCell>T</Table.HeaderCell>
							<Table.HeaderCell>Key</Table.HeaderCell>
							<Table.HeaderCell>Summary</Table.HeaderCell>
							<Table.HeaderCell>Assignee</Table.HeaderCell>
							<Table.HeaderCell>Reporter</Table.HeaderCell>
							<Table.HeaderCell>P</Table.HeaderCell>
							<Table.HeaderCell>Status</Table.HeaderCell>
							<Table.HeaderCell>Resolution</Table.HeaderCell>
							<Table.HeaderCell>Created</Table.HeaderCell>
							<Table.HeaderCell>Updated</Table.HeaderCell>
							<Table.HeaderCell> </Table.HeaderCell>
						</Table.Row>
					</Table.Header>

					<Table.Body>
						{issues.map((issue) => (
							<IssueItem key={issue.id} issue={issue} />
						))}
					</Table.Body>
				</Table>
			</div>
		</div>
	);
};

export default AdvancedSearch;
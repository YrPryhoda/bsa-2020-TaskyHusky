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
import SaveFilterModal from 'containers/SaveFilterModal';
import { filterDefsIDS } from 'constants/FilterDef';

const QUICK_FILTER_IDS = [
	filterDefsIDS.PROJECTS,
	filterDefsIDS.STATUS,
	filterDefsIDS.ISSUE_TYPE,
	filterDefsIDS.ASSIGNEE,
];

const AdvancedSearch: React.FC = () => {
	const dispatch = useDispatch();
	const [stared, setStared] = useState(false);
	const { filterParts } = useSelector((rootState: RootState) => rootState.advancedSearch);
	const [addedFilterParts, setAddedFilterParts] = useState<FilterPartState[]>([]);

	useEffect(() => {
		dispatch(fetchFilterParts());
	}, [dispatch]);

	const issues = [
		{
			priority: {
				id: 'id',
				color: 'string',
				title: 'string',
				icon: 'string',
			},
			summary: 'Very summary',
			boardColumn: '6d1',
			labels: ['done'],
			attachments: ['attachments'],
			links: ['link1'],
			description: 'Very description',
			sprintID: '52ce',
			project: '9fc89a01-f610-48f7-b0ac-f11ef4db4532', //real
			issueKey: 'TH-1',
			assigned: 'a01dcb1e-73d6-4a23-a3a3-ebc36206f551',
			creator: 'a01dcb1e-73d6-4a23-a3a3-ebc36206f551', //real
			type: {
				id: 'type-id-12',
				icon: 'check',
				color: 'teal',
				title: 'Issue',
			},
			id: 'a269d9f4-1c10-40ad-81e0-7ac333804d91',
		},
		{
			priority: {
				id: 'id',
				color: 'string',
				title: 'string',
				icon: 'string',
			},
			summary: 'Interface implemented',
			boardColumn: '6d1',
			labels: ['done'],
			attachments: ['attachments'],
			links: ['link1'],
			description: 'Very description',
			sprintID: '52ce',
			project: '47ab4c46-e506-4dcb-a4d3-79b47cdc16a5', //real
			issueKey: 'TH-1',
			assigned: 'e89a7a50-68f2-4a43-a043-80eec52e0ac8',
			creator: 'e89a7a50-68f2-4a43-a043-80eec52e0ac8', // real
			type: {
				id: 'id-212',
				icon: 'close',
				color: 'blue',
				title: 'Task',
			},
			id: 'a269d9f4-1c10-40ad-81e0-7ac333804d92',
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
						<SaveFilterModal />
					</div>
					<div className={styles.actionWrapper}>
						<List selection horizontal>
							<List.Item>
								<div onClick={() => setStared(!stared)} className={styles.actionItem}>
									<div className={styles.star}>
										{stared ? <Icon name="star" color="yellow" /> : <Icon name="star outline" />}
									</div>
								</div>
							</List.Item>
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
						<Form.Group className={styles.searchContentContainer}>
							{getDefaultFilterParts().map((part) => (
								<FilterPart key={part.id} filterPart={part} />
							))}
							<MoreFilterPartsDropdown
								additionalFilterParts={getAdditionalFilterParts()}
								addedFilterParts={addedFilterParts}
								setAddedFilterParts={(data) => setAddedFilterParts(data)}
							/>
							<Form.Field
								control={() => (
									<div className={styles.searchInputContainer}>
										<Input placeholder="Contains text" className={styles.containTextInput} />
										<Button className={styles.searchBtn} primary content="Search" />
									</div>
								)}
							/>
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
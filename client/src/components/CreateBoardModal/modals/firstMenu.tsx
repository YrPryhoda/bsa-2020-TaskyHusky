import { Button, Container, Grid, Header } from 'semantic-ui-react';
import styles from '../styles.module.scss';
import { boardTypes } from '../types';
import React from 'react';

interface Props {
	onTypeSelection: (type: boardTypes) => void;
}

const FirstMenu = (props: Props) => {
	return (
		<Grid columns={2} relaxed="very" divided>
			<Grid.Row>
				<Grid.Column>
					<Container>
						<Header as="h2">Scrum</Header>
						<p>
							Scrum focuses on planning, committing and delivering time-boxed chunks of work called
							Sprints
						</p>
					</Container>
				</Grid.Column>
				<Grid.Column>
					<Container>
						<Header as="h2">Kanban</Header>
						<p>
							Kanban focuses on visualising your workflow and limiting work-in-progress to facilitate
							incremental improvements to your existing process
						</p>
					</Container>
				</Grid.Column>
			</Grid.Row>
			<Grid.Row>
				<Grid.Column className={styles.buttonContainer}>
					<Button onClick={() => props.onTypeSelection(boardTypes.scrum)}>Create a Scrum board</Button>
					<Button basic color="blue" className={styles.link}>
						Create a Scrum board with sample data
					</Button>
				</Grid.Column>
				<Grid.Column className={styles.buttonContainer}>
					<Button onClick={() => props.onTypeSelection(boardTypes.kanban)}>Create a Kanban board</Button>
					<Button basic color="blue" className={styles.link}>
						Create a Kanban board with sample data
					</Button>
				</Grid.Column>
			</Grid.Row>
		</Grid>
	);
};

export default FirstMenu;

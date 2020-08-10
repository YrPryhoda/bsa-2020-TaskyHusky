import React, { useState } from 'react';
import { Button, Modal } from 'semantic-ui-react';
import { boardTypes, creatingAlgorithms, IBoard } from './types';
import FirstMenu from './modals/firstMenu';
import SecondMenu from './modals/secondMenu';
import ThirdMenuExisting from './modals/thirdMenuExisting';
import { createBoard } from '../../containers/Boards/logic/actionTypes';

interface Props {
	setIsModalShown(params: boolean): void;

	onCreateBoard(board: createBoard): void;
}

const CreateBoardModal = (props: Props) => {
	const [isTypeSelected, selectType] = useState(false);
	const [isAlgorithmSelected, selectAlgorithm] = useState(false);
	const { setIsModalShown, onCreateBoard } = props;
	const [isCreateDisabled, changeSubmitStatus] = useState(true);

	const [board, setBoard] = useState<IBoard>({
		boardType: boardTypes.scrum,
		algorithm: creatingAlgorithms.newProject,
		projects: [],
		name: '',
		admin: '',
	});

	const onCancelClick = () => {
		selectType(false);
		selectAlgorithm(false);
		setIsModalShown(false);
	};

	const onRadioChange = (algorithmType: creatingAlgorithms) => {
		setBoard({
			...board,
			algorithm: algorithmType,
		});
	};

	const onTypeSelection = () => {
		selectType(true);
		setBoard({
			...board,
			boardType: boardTypes.kanban,
		});
	};

	return (
		<Modal
			closeIcon
			onClose={() => setIsModalShown(false)}
			onOpen={() => setIsModalShown(true)}
			open={true}
			size={'small'}
			dimmer="inverted"
		>
			<Modal.Header>
				{!isAlgorithmSelected
					? 'Create a board'
					: board.algorithm === creatingAlgorithms.newProject
					? 'New project with board'
					: 'Name this board'}
			</Modal.Header>
			<Modal.Content>
				{!isTypeSelected ? <FirstMenu onTypeSelection={onTypeSelection} /> : null}
				{isTypeSelected && !isAlgorithmSelected ? (
					<SecondMenu algorithm={board.algorithm} onRadioChange={onRadioChange} />
				) : null}
				{isAlgorithmSelected && board.algorithm === creatingAlgorithms.existingProject ? (
					<ThirdMenuExisting board={board} setBoard={setBoard} changeSubmitStatus={changeSubmitStatus} />
				) : null}
			</Modal.Content>
			<Modal.Actions>
				{isTypeSelected ? (
					<Button
						onClick={() => {
							if (isAlgorithmSelected) {
								selectAlgorithm(false);
							} else {
								selectType(false);
							}
						}}
					>
						Back
					</Button>
				) : null}
				{isTypeSelected && !isAlgorithmSelected ? (
					<Button color={'facebook'} onClick={() => selectAlgorithm(true)}>
						Next
					</Button>
				) : null}
				{isAlgorithmSelected ? (
					<Button
						color={'facebook'}
						disabled={isCreateDisabled}
						onClick={() => {
							const { projects, algorithm, admin, ...boardData } = board;
							if (admin) {
								onCreateBoard({
									...boardData,
									createdBy: {
										id: admin,
									},
								});
							}
							onCancelClick();
						}}
					>
						Create board
					</Button>
				) : null}
				<Button color="blue" basic onClick={onCancelClick}>
					Cancel
				</Button>
			</Modal.Actions>
		</Modal>
	);
};

export default CreateBoardModal;

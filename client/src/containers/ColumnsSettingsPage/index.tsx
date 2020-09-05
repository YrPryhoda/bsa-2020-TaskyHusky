import React, { useState, useEffect } from 'react';
import NotFound from 'pages/404';
import { getBoardById } from 'services/board.service';
import { useParams } from 'react-router-dom';
import styles from './styles.module.scss';
import Spinner from 'components/common/Spinner';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import InteractiveColumn from 'containers/InteractiveColumn';

const ColumnsSettingsPage: React.FC = () => {
	const { boardId } = useParams();
	const [board, setBoard] = useState<WebApi.Result.ComposedBoardResult | undefined>();

	useEffect(() => {
		if (!board) {
			getBoardById(boardId).then(setBoard);
		}
	}, [board, boardId]);

	if (!board) {
		return <Spinner />;
	}

	if (board.boardType !== 'Kanban') {
		return <NotFound />;
	}

	const onDragEnd = () => {};

	return (
		<div className={styles.wrapper}>
			<h1>{board.name}</h1>
			<DragDropContext onDragEnd={onDragEnd}>
				<Droppable droppableId="0" direction="horizontal">
					{(provided, snapshot) => (
						<div className={styles.columnsContainer} ref={provided.innerRef} {...provided.droppableProps}>
							{board.columns.map((column, i) => (
								<InteractiveColumn key={i} column={column} index={i} />
							))}
							{provided.placeholder}
						</div>
					)}
				</Droppable>
			</DragDropContext>
		</div>
	);
};

export default ColumnsSettingsPage;

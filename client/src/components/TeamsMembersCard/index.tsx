import React, { useState } from 'react';
import { Icon } from 'semantic-ui-react';
import Avatar from 'components/Avatar';
import styles from './styles.module.scss';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import RemoveUserModal from './RemoveUserModal';
import { useSelector } from 'react-redux';
import { RootState } from 'typings/rootState';

type Props = {
	teammates?: User[];
	title: string;
	teamOwner: WebApi.Entities.UserProfile;
	removeUserFromTeam: (arg: string) => void;
};
export interface User {
	id: string;
	email?: string;
	firstName: string;
	lastName: string;
	avatar: string;
	address?: string;
	department?: string;
	jobTitle?: string;
	color?: string;
}

const TeamsMembersCard = ({ title, teamOwner, removeUserFromTeam, teammates = [] }: Props) => {
	const { t } = useTranslation();
	const fullUserName = (fn: string, ln: string): string => `${fn} ${ln}`;

	const authUser = useSelector((rootState: RootState) => rootState.auth.user);
	const [removeUserModal, setRemoveUserModal] = useState<boolean>(false);
	const [userToRemove, setUserToRemove] = useState<User | null>(null);
	const [viewUser, setViewUser] = useState<User | null>(null);
	const onHover = (user: User) => {
		setViewUser(user);
	};

	const hideModal = (e: React.BaseSyntheticEvent) => {
		if (!e.target.classList.contains('cardBody') && !e.target.classList.contains('blockWrapper')) {
			setViewUser(null);
			setViewUser(null);
		}
	};

	const onDeleteUserClick = (user: User) => {
		setUserToRemove(user);
		setRemoveUserModal(true);
	};

	const removeUser = (id: string) => {
		removeUserFromTeam(id);
		setViewUser(null);
		setRemoveUserModal(false);
	};

	const showDeleteUserIcon = (user: User) =>
		teamOwner && authUser?.id === teamOwner.id && viewUser?.id === user.id && viewUser?.id !== teamOwner.id;

	return (
		<>
			<div className={styles.sectionHeader}>
				<h3 className={styles.header}>{t(title)} </h3>
				<span className={styles.metaHeader}>
					{teammates.length > 0 && title === 'members' && ` ${teammates.length}  ${t('members')}`}
				</span>
			</div>
			<div className={styles.card}>
				{teammates.map((teammate, index) => (
					<div
						className={styles.cardWrapper}
						key={index}
						onMouseEnter={() => onHover(teammate)}
						onMouseLeave={(e: React.BaseSyntheticEvent) => hideModal(e)}
					>
						<div className={styles.cardBody}>
							<div className={styles.icon}>
								<Link to={`/profile/${teammate.id}`}>
									<Avatar
										key={teammate.id}
										fullName={fullUserName(teammate.firstName, teammate.lastName)}
										imgSrc={teammate.avatar}
										color={teammate.color}
									/>
								</Link>
							</div>
							<div className={styles.userInfo}>
								<p className={styles.firstName}>
									{fullUserName(teammate.firstName, teammate.lastName)}
								</p>
								<p className={styles.metainfo}>{teammate.jobTitle}</p>
								{showDeleteUserIcon(teammate) && (
									<Icon
										name="delete"
										onClick={() => onDeleteUserClick(teammate)}
										className={styles.userDeleteBtn}
									/>
								)}
							</div>
							{removeUserModal && (
								<RemoveUserModal
									user={userToRemove}
									confirm={removeUser}
									setShowDelete={setRemoveUserModal}
								/>
							)}
						</div>
					</div>
				))}
			</div>
		</>
	);
};

export default TeamsMembersCard;

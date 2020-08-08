import React from 'react';
import { Header, Icon } from 'semantic-ui-react';
import styles from './styles.module.scss';
import { PropsUserData } from 'containers/ProfilePage';

const ProfileContacntBlock: React.FC<PropsUserData> = (props: PropsUserData) => {
	const { user, isCurrentUser } = props;
	return (
		<>
			{user.email && (
				<>
					<Header as="h3" className={styles.header}>
						Contact
					</Header>
					{user.email ? (
						<div className={`${styles.email} ${styles.neverPoint}`}>
							<Icon disabled name="envelope outline" size="large" />
							<p className={styles.infoBlock__content}>{user.email}</p>
						</div>
					) : isCurrentUser ? (
						<div className={styles.item}>
							<Icon disabled name="envelope outline" size="large" />
							<p>Your location</p>
						</div>
					) : (
						''
					)}
				</>
			)}
		</>
	);
};

export default ProfileContacntBlock;
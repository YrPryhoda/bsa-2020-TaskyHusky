import React from 'react';
import styles from './styles.module.scss';
import { useDispatch } from 'react-redux';
import * as actions from 'components/NotificationsMenu/logic/actions';
import { Button } from 'semantic-ui-react';
import moment from 'moment';
import { useTranslation } from 'react-i18next';

interface Props {
	notification: WebApi.Entities.Notification;
	notifications: WebApi.Entities.Notification[];
}

const UserNotification: React.FC<Props> = ({ notification, notifications }) => {
	const { id, title, text, link, isViewed } = notification;
	const dispatch = useDispatch();
	const { t } = useTranslation();

	const view = () => {
		dispatch(actions.viewNotification({ id }));

		const newNotifications = [...notifications];
		const index = newNotifications.findIndex((notif) => notif.id === id);
		newNotifications[index].isViewed = true;

		dispatch(actions.setNotifications({ notifications: newNotifications }));
	};

	const renderTitle = title ? <h3 style={{ marginBottom: 10 }}>{title}</h3> : null;

	const renderMarker = !isViewed ? (
		<Button onClick={view} secondary inverted compact size="tiny" style={{ marginTop: 10 }}>
			{t('mark_notif_as_read')}
		</Button>
	) : null;

	return (
		<div className={styles.container}>
			<div style={{ display: 'flex' }}>
				{renderTitle}
				<div style={{ marginLeft: 10, position: 'relative', top: 5 }}>
					{moment(notification.createdAt).fromNow()}
				</div>
			</div>
			<div style={{ width: 250, whiteSpace: 'pre-wrap', float: 'left', lineHeight: 1.4 }}>{text}</div>
			{link ? (
				<a target="_blank" rel="noopener noreferrer" href={link} style={{ float: 'right' }}>
					{t('see_it')}
				</a>
			) : (
				''
			)}
			<div style={{ clear: 'both' }} />
			{renderMarker}
		</div>
	);
};

export default UserNotification;

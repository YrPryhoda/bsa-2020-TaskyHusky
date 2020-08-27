import React from 'react';
import styles from './styles.module.scss';
import { useTranslation } from 'react-i18next';
import mail from 'icons/profile/mail.svg';
import { useSelector } from 'react-redux';
import { RootState } from 'typings/rootState';

const ProfileContacntBlock = () => {
	const { t } = useTranslation();
	const email = useSelector((state: RootState) => state.user.email);
	return (
		<>
			<h3 className={styles.header}>{t('contact')}</h3>
			<div className={`${styles.email} ${styles.neverPoint}`}>
				<img src={mail} alt="icon" className={styles.icon} />
				<p className={styles.textData}>{email}</p>
			</div>
		</>
	);
};

export default ProfileContacntBlock;

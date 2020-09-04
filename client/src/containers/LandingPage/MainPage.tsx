import React, { useState } from 'react';
import { Grid, Image, Segment, List, Header } from 'semantic-ui-react';
import LoginPage from 'containers/LoginPage';
import SignUpForm from 'containers/SignUpForm';
import ForgetPassword from 'containers/ForgotPassword';
import manIcon from 'assets/images/landingPage/spaceMen.svg';
import landingTitle from 'assets/images/landingPage/logo.svg';
import landingCircleIcon from 'assets/images/landingPage/mainPageLogo.svg';
import styles from './styles.module.scss';
import { useTranslation } from 'react-i18next';

type Props = {
	isLoginForm: boolean;
	setLoginForm: (arg: boolean) => void;
};

const MainPage = ({ isLoginForm, setLoginForm }: Props) => {
	const { t } = useTranslation();
	const [forgetPass, setForgetPass] = useState<boolean>(false);
	return (
		<Grid className={styles.pageWrapper}>
			<Grid.Column mobile={16} tablet={8} computer={8} className={styles.mainImgWrapper}>
				<Image src={manIcon} className={styles.mediaQuery} />
			</Grid.Column>
			<Grid.Column mobile={16} tablet={8} computer={8} className={styles.formWrapper}>
				<Segment className={styles.formSegment}>
					<Image src={landingTitle} className={styles.title} />
					<Header as="h1" className={styles.title}>
						{isLoginForm ? t('sign_in') : t('create_an_account')}
					</Header>
					{isLoginForm ? <LoginPage /> : <SignUpForm />}
					<List horizontal link className={styles.list}>
						{isLoginForm && (
							<List.Item className={styles.listItem} onClick={() => setForgetPass(true)}>
								<span className={styles.title}>{t('cant_login')}</span>
							</List.Item>
						)}
						<List.Item onClick={() => setLoginForm(!isLoginForm)}>
							<div className={styles.bottomNavigation}>
								{isLoginForm ? (
									<span className={`${styles.listItem} ${styles.padding1}`}>{t('sign_up')}</span>
								) : (
									<>
										<span className={styles.title}>{t('already_have_a_account')}</span>
										<span className={`${styles.listItem} ${styles.marginLeft}`}>
											{t('sign_in')}
										</span>
									</>
								)}
							</div>
						</List.Item>
					</List>
					{forgetPass && <ForgetPassword onClose={setForgetPass} />}
				</Segment>
			</Grid.Column>
			<Image src={landingCircleIcon} className={`${styles.absIcon} ${styles.topRight}`} />
			<Image src={landingCircleIcon} className={`${styles.absIcon} ${styles.leftBottom}`} />
		</Grid>
	);
};
export default MainPage;

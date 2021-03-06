import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import styles from './styles.module.scss';
import { Form, Button, Popup } from 'semantic-ui-react';
import SubmitedInput from 'components/SubmitedInput';
import { requestUpdateUser } from 'containers/ProfilePage/logiс/actions';
import { UserProfileState } from 'containers/ProfilePage/logiс/state';
import { useDispatch } from 'react-redux';
import CustomValidator from 'helpers/validation.helper';
import JobTitleSelect from 'components/JobTitleSelect';
import { ModeManager } from 'containers/ProfilePage';
import SelectLocation from 'components/SelectLocation';

interface Props {
	showManager: (modeToShow: ModeManager) => void;
	updateUser: (changedUser: Partial<UserProfileState>) => void;
	user: UserProfileState;
}

export interface Location {
	address: string;
	location: {
		lat: number;
		lng: number;
	};
}

const ProfileManager: React.FC<Props> = (props: Props) => {
	const { t } = useTranslation();
	const { showManager, updateUser, user: userData } = props;
	const dispatch = useDispatch();
	const [user, setUser] = useState(userData);
	const [showMap, setShowMap] = useState<boolean>(false);
	const toggleShowMap = () => {
		setShowMap(!showMap);
	};
	const {
		firstName,
		lastName,
		username = '',
		jobTitle = '',
		department = '',
		address = '',
		lng = 0,
		lat = 0,
		organization = '',
	} = user;
	const [isSubmit, setIsSubmit] = useState<boolean>(false);

	const [currentLocation, setCurrentLocation] = useState<Location>({
		address: address === null ? '' : address,
		location: { lat: lat === null ? 0 : lat, lng: lng === null ? 0 : lng },
	});

	const changeLocation = (location: Location) => {
		setCurrentLocation(location);
		setUser({ ...user, address: location.address, lng: location.location.lng, lat: location.location.lat });
		setIsSubmit(userData.address !== location.address);
	};
	const [userValidation, setUserValidation] = useState({
		firstName: true,
		lastName: true,
		username: true,
		jobTitle: true,
		department: true,
		location: true,
		organization: true,
	});
	const [errorMessage, setErrorMessage] = useState({
		firstName: '',
		lastName: '',
		username: '',
		jobTitle: '',
		department: '',
		location: '',
		organization: '',
	});

	const handleChange = (event: any) => {
		setUser({
			...user,
			[(event.target as HTMLInputElement).name]: (event.target as HTMLInputElement).value,
		});
		setIsSubmit(
			userData[(event.target as HTMLInputElement).name as keyof UserProfileState] !==
				(event.target as HTMLInputElement).value,
		);
	};

	const handleSelect = (propKey: keyof UserProfileState, value: string) => {
		setUser({
			...user,
			[propKey]: value,
		});
		setIsSubmit(userData[propKey] !== value);
	};

	const onBlur = (event: any) => {
		const customValidator = new CustomValidator((event.target as HTMLInputElement).value);
		const isntValid = customValidator.checkMinLength(2).checkMaxLength(40).checkSimpleField().validate();
		if (isntValid) {
			setErrorMessage({ ...errorMessage, [(event.target as HTMLInputElement).name]: isntValid });
			setUserValidation({ ...userValidation, [(event.target as HTMLInputElement).name]: false });
		} else {
			setUserValidation({ ...userValidation, [(event.target as HTMLInputElement).name]: true });
		}
	};

	const onSubmit = () => {
		if (Object.values(userValidation).every((item) => item)) {
			const { isLoading, email, avatar, ...rest } = user;
			updateUser(user);
			dispatch(requestUpdateUser({ ...rest } as Partial<UserProfileState>));
			setIsSubmit(false);
		}
	};

	const onCancel = () => {
		showManager(ModeManager.main);
	};

	return (
		<section className={styles.container}>
			<div className={styles.card}>
				<h3 className={styles.header}>{t('about_you')}</h3>
				<Form onSubmit={onSubmit}>
					<SubmitedInput
						handleChange={handleChange}
						text={firstName}
						propKey="firstName"
						placeholder={t('placeholder_firstname')}
						title={t('first_name')}
						type="text"
						errorText={errorMessage.firstName}
						isValid={userValidation.firstName}
						onBlur={onBlur}
					/>
					<SubmitedInput
						handleChange={handleChange}
						text={lastName}
						propKey="lastName"
						placeholder={t('placeholder_lastname')}
						title={t('last_name')}
						type="text"
						errorText={errorMessage.lastName}
						isValid={userValidation.lastName}
						onBlur={onBlur}
					/>
					<SubmitedInput
						handleChange={handleChange}
						text={username === null ? '' : username}
						propKey="username"
						placeholder={t('placeholder_username')}
						title={t('public_name')}
						type="text"
						errorText={errorMessage.username}
						isValid={userValidation.username}
						onBlur={onBlur}
					/>
					<JobTitleSelect
						handleSelect={handleSelect}
						text={jobTitle === null ? '' : jobTitle}
						propKey="jobTitle"
						placeholder={t('placeholder_job')}
						title={t('job_title')}
					/>
					<SubmitedInput
						handleChange={handleChange}
						text={department === null ? '' : department}
						propKey="department"
						placeholder={t('placeholder_department')}
						title={t('department')}
						type="text"
						errorText={errorMessage.department}
						isValid={userValidation.department}
						onBlur={onBlur}
					/>
					<SubmitedInput
						handleChange={handleChange}
						text={organization === null ? '' : organization}
						propKey="organization"
						placeholder={t('placeholder_organization')}
						title={t('organization')}
						type="text"
						errorText={errorMessage.organization}
						isValid={userValidation.organization}
						onBlur={onBlur}
					/>
					{currentLocation.address ? (
						<p className={styles.labelLocation}>
							{t('placeholder_location')} {currentLocation.address}
						</p>
					) : (
						<p className={styles.labelLocation}>{t('you_have_not_specify_location')}</p>
					)}
					<Button className={styles.btnLink} type="button" onClick={toggleShowMap}>
						{t('choose_your_location')}
					</Button>
					{showMap && <SelectLocation changeLocation={changeLocation} currentLocation={currentLocation} />}
					<Form.Field className={styles.formFooter}>
						<Popup
							content={t('add_changes')}
							disabled={isSubmit}
							trigger={
								<span>
									<Button className={styles.submitButton} type="submit" disabled={!isSubmit}>
										{t('save_changes')}
									</Button>
								</span>
							}
						/>
						<Button type="text" onClick={onCancel} className={styles.secondaryButton}>
							{t('cancel')}
						</Button>
					</Form.Field>
				</Form>
			</div>
		</section>
	);
};

export default ProfileManager;

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import styles from './styles.module.scss';
import { requestChangePassword } from 'containers/ProfilePage/logiс/actions';
import { Header, Button, Form } from 'semantic-ui-react';
import SubmitedInput from 'components/SubmitedInput';
import PasswordCheck from 'components/PasswordCheck';

const SecurityManager = () => {
	const dispatch = useDispatch();
	const [passwords, setPasswords] = useState({
		oldPassword: '',
		newPassword: '',
		repeatedPassword: '',
	});
	const handleChange = (event: any) => {
		setPasswords({
			...passwords,
			[(event.target as HTMLInputElement).name]: (event.target as HTMLInputElement).value,
		});
	};

	const onSubmit = () => {
		if (passwords.newPassword === passwords.repeatedPassword) {
			const { oldPassword, newPassword } = passwords;
			dispatch(requestChangePassword({ oldPassword, newPassword }));
			setPasswords({ ...passwords, oldPassword: '', newPassword: '', repeatedPassword: '' });
		}
	};
	return (
		<section className={styles.container}>
			<Header as="h3">Security</Header>
			<Header as="h4">Change your password</Header>
			<Form onSubmit={onSubmit}>
				<SubmitedInput
					text={passwords.oldPassword}
					propKey="oldPassword"
					title="Current password"
					placeholder="Enter old password"
					type="password"
					handleChange={handleChange}
				/>
				<SubmitedInput
					text={passwords.newPassword}
					propKey="newPassword"
					title="New password"
					placeholder="Enter new password"
					type="password"
					handleChange={handleChange}
				/>
				<PasswordCheck passLength={passwords.newPassword.length} />
				<SubmitedInput
					text={passwords.repeatedPassword}
					propKey="repeatedPassword"
					title="Repeat password"
					placeholder="Repeat new password"
					type="password"
					handleChange={handleChange}
				/>
				<Button className={styles.submitButton} type="submit">
					Save changes
				</Button>
			</Form>
		</section>
	);
};

export default SecurityManager;

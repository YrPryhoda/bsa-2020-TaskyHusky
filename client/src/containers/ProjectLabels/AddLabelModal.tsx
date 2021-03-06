import React, { useState } from 'react';
import { Modal, Button, Form } from 'semantic-ui-react';
import { useTranslation } from 'react-i18next';

import { ColorResult, SliderPicker } from 'react-color';
import styles from './styles.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from './logic/actions';
import { RootState } from 'typings/rootState';
import Label from 'components/common/Label';
import CustomInput from 'components/common/Input/CustomInput';
import getContrastingColor from 'helpers/getContrastColor';
const AddLabelModal: React.FC = () => {
	const { isLoading, isEditMode, editLabel } = useSelector((rootState: RootState) => rootState.projectLabel);
	const { project } = useSelector((rootState: RootState) => rootState.project);
	const { labels } = project;

	const dispatch = useDispatch();
	const { t } = useTranslation();

	const defaultBackgroundColor = '#ebbd34';
	const [text, setText] = useState<string>(editLabel?.text || '');
	const [backgroundColor, setBackgroundColor] = useState<string>(
		editLabel?.backgroundColor || defaultBackgroundColor,
	);
	const [textColor, setTextColor] = useState<string>('#000000');

	const [isLabelTextValid, setIsLabelTextValid] = useState<boolean>(false);
	const [isValidErrorShown, setIsValidErrorShown] = useState<boolean>(false);

	const isTextValid = (labelText: string): boolean => {
		const label = labels.find((label) => label.text.toLowerCase() === labelText.toLowerCase());

		if (label?.id === editLabel?.id && labelText.trim() !== '') {
			return true;
		}

		if (label !== undefined || labelText.trim() === '') {
			return false;
		}

		return true;
	};

	const onTextChange = (text: string): void => {
		const regexp = new RegExp('\\s{1,}', 'g');
		const removeSpaces = text.replace(regexp, ' ').trimStart();
		setText(removeSpaces);
	};

	const onLabelColorChange = (color: ColorResult): void => {
		const checkedColor = color.hex;
		const contrastColor = getContrastingColor(checkedColor);
		setBackgroundColor(checkedColor);
		setTextColor(contrastColor);
	};

	const onAddLabel = (): void => {
		if (!isLabelTextValid) {
			setIsValidErrorShown(true);
			return;
		}

		dispatch(
			actions.startAddingLabel({
				project,
				label: { text: text.trim(), textColor, backgroundColor },
			}),
		);
	};

	const onEditLabel = (): void => {
		if (editLabel?.text === text) {
			const isValid = isTextValid(text);
			if (isValid) {
				onUpdateLabel();
				return;
			}
		}

		if (!isLabelTextValid) {
			setIsValidErrorShown(true);
			return;
		}

		onUpdateLabel();
	};

	const onUpdateLabel = (): void => {
		dispatch(
			actions.startUpdatingLabel({
				project,
				label: { ...editLabel, text, textColor, backgroundColor },
			}),
		);
	};

	const onModalClose = () => {
		dispatch(actions.closeModal());
	};

	return (
		<>
			<Modal size={'mini'} open={true} onClose={onModalClose}>
				<Modal.Header className="standartHeader">{t('add_label')}</Modal.Header>
				<Modal.Content>
					<Form>
						<Form.Field>
							<label className="standartLabel">{t('label_text')}</label>
							<CustomInput
								isValidErrorShown={isValidErrorShown}
								isDataValid={isLabelTextValid}
								setIsDataValid={setIsLabelTextValid}
								data={text}
								setData={onTextChange}
								placeholder={t('enter_label_text')}
								popUpContent={t('label_text_validation')}
								validation={isTextValid}
							/>
						</Form.Field>
						<Form.Field>
							<label className="standartLabel">{t('label_pick_color')}</label>
							<SliderPicker color={backgroundColor} onChange={onLabelColorChange} />
						</Form.Field>
						<Form.Field className={styles.label__example}>
							<label>
								<span className={styles.label__example_title}>{t('result')}</span>
							</label>
							<Label backgroundColor={backgroundColor} text={text} textColor={textColor} />
						</Form.Field>
					</Form>
				</Modal.Content>
				<Modal.Actions>
					<Button onClick={onModalClose} className="cancelBtn">
						{t('cancel')}
					</Button>
					<>
						{!isEditMode ? (
							<Button className={'primaryBtn'} onClick={onAddLabel} loading={isLoading}>
								{t('add')}
							</Button>
						) : (
							<Button className={'primaryBtn'} onClick={onEditLabel} loading={isLoading}>
								{t('edit')}
							</Button>
						)}
					</>
				</Modal.Actions>
			</Modal>
		</>
	);
};

export default AddLabelModal;

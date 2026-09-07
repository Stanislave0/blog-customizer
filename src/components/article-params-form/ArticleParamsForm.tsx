import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { useRef, useState, FormEvent } from 'react';
import clsx from 'clsx';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';
import { Text } from 'src/ui/text';
import {
	fontFamilyOptions,
	fontSizeOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	ArticleStateType,
} from 'src/constants/articleProps';
import { Separator } from 'src/ui/separator';
import { useOutsideClickClose } from 'src/ui/select/hooks/useOutsideClickClose';

import styles from './ArticleParamsForm.module.scss';

type ArticleParamsFormProps = {
	initialState: ArticleStateType;
	onApply: (state: ArticleStateType) => void;
};

export const ArticleParamsForm = ({
	initialState,
	onApply,
}: ArticleParamsFormProps) => {
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);
	const [formState, setFormState] = useState(initialState);

	const rootRef = useRef<HTMLDivElement>(null);

	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		onApply(formState);
	};

	const handleReset = () => {
		setFormState(defaultArticleState);
		onApply(defaultArticleState);
	};

	useOutsideClickClose({
		isOpen: isSidebarOpen,
		rootRef,
		onChange: setIsSidebarOpen,
	});

	const createFieldChangeHandler = (field: keyof ArticleStateType) => {
		return (value: ArticleStateType[typeof field]) => {
			setFormState((state) => ({ ...state, [field]: value }));
		};
	};

	return (
		<>
			<ArrowButton
				isOpen={isSidebarOpen}
				onClick={() => setIsSidebarOpen(!isSidebarOpen)}
			/>
			<aside
				ref={rootRef}
				className={clsx(styles.container, {
					[styles.container_open]: isSidebarOpen,
				})}>
				<form className={styles.form} onSubmit={handleSubmit}>
					<Text size={31} weight={800}>
						Задайте параметры
					</Text>
					<Select
						title='Шрифт'
						placeholder='Выберите шрифт'
						options={fontFamilyOptions}
						selected={formState.fontFamilyOption}
						onChange={createFieldChangeHandler('fontFamilyOption')}></Select>
					<RadioGroup
						title='Размер шрифта'
						name='sizes'
						options={fontSizeOptions}
						selected={formState.fontSizeOption}
						onChange={createFieldChangeHandler('fontSizeOption')}></RadioGroup>
					<Select
						title='Цвет шрифта'
						placeholder='Выберите цвет шрифта'
						options={fontColors}
						selected={formState.fontColor}
						onChange={createFieldChangeHandler('fontColor')}></Select>
					<Separator></Separator>
					<Select
						title='Цвет фона'
						placeholder='Выберите цвет фона'
						options={backgroundColors}
						selected={formState.backgroundColor}
						onChange={createFieldChangeHandler('backgroundColor')}></Select>
					<Select
						title='Ширина контента'
						placeholder='Выберите ширину'
						options={contentWidthArr}
						selected={formState.contentWidth}
						onChange={createFieldChangeHandler('contentWidth')}></Select>
					<div className={styles.bottomContainer}>
						<Button
							title='Сбросить'
							htmlType='reset'
							type='clear'
							onClick={handleReset}
						/>
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};

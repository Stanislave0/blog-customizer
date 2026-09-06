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
	const [isOpen, setIsOpen] = useState(true);
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
		isOpen,
		rootRef,
		onChange: setIsOpen,
	});

	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} />
			<aside
				ref={rootRef}
				className={clsx(styles.container, { [styles.container_open]: isOpen })}>
				<form className={styles.form} onSubmit={handleSubmit}>
					<Text size={31} weight={800}>
						Задайте параметры
					</Text>
					<Select
						title='Шрифт'
						placeholder='Выберите шрифт'
						options={fontFamilyOptions}
						selected={formState.fontFamilyOption}
						onChange={(value) =>
							setFormState({ ...formState, fontFamilyOption: value })
						}></Select>
					<RadioGroup
						title='Размер шрифта'
						name='sizes'
						options={fontSizeOptions}
						selected={formState.fontSizeOption}
						onChange={(value) =>
							setFormState({ ...formState, fontSizeOption: value })
						}></RadioGroup>
					<Select
						title='Цвет шрифта'
						placeholder='Выберите цвет шрифта'
						options={fontColors}
						selected={formState.fontColor}
						onChange={(value) =>
							setFormState({ ...formState, fontColor: value })
						}></Select>
					<Separator></Separator>
					<Select
						title='Цвет фона'
						placeholder='Выберите цвет фона'
						options={backgroundColors}
						selected={formState.backgroundColor}
						onChange={(value) =>
							setFormState({ ...formState, backgroundColor: value })
						}></Select>
					<Select
						title='Ширина контента'
						placeholder='Выберите ширину'
						options={contentWidthArr}
						selected={formState.contentWidth}
						onChange={(value) =>
							setFormState({ ...formState, contentWidth: value })
						}></Select>
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

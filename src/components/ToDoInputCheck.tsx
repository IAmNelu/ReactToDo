interface ToDoInputCheckProps {
	id: string;
	completed: boolean;
	toggle: () => void;
	text: string;
	className?: string;
	classNameInput?: string;
	classNameText?: string;
}
export const ToDoInputCheck = ({
	id,
	completed,
	toggle,
	text,
	className,
	classNameInput,
	classNameText
}: ToDoInputCheckProps) => {
	return (
		<div className={`flex items-center ${className}`}>
			<input
				type="checkbox"
				className={`${classNameInput ?? ''} checkbox-primary checkbox me-3`}
				id={id}
				name={id}
				checked={completed}
				onChange={toggle}
			/>
			<label htmlFor={id} className={`${classNameText ?? ''} ${completed && 'line-through'}`}>
				{text}
			</label>
		</div>
	);
};

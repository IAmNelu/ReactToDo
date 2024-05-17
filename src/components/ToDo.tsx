import { ArrowDown01Icon, ArrowUp01Icon, Delete02Icon } from 'hugeicons-react';
import { produce } from 'immer';
import { useCallback, useEffect, useState } from 'react';
import { ISubTask, IToDo } from '../types/ToDo';
import { ToDoInputCheck } from './ToDoInputCheck';

interface ToDoProps {
	todo: IToDo;
	toggleToDo: () => void;
	deleteToDo: () => void;
	updateToDo: (subTasks: ISubTask[]) => void;
}
export function ToDo({ todo, toggleToDo, deleteToDo, updateToDo }: ToDoProps) {
	const [moreInfoVisible, setMoreInfoVisible] = useState(false);

	const [subTasks, setSubTasks] = useState(todo.subTasks);

	const handleToggle = useCallback((id: string) => {
		setSubTasks(
			produce((draft) => {
				const subTask = draft.find((sb) => sb.id === id)!;
				subTask.done = !subTask.done;
			})
		);
	}, []);

	const handleDelete = useCallback((id: string) => {
		setSubTasks(
			produce((draft) => {
				const toDeleteId = draft.findIndex((val) => val.id === id);
				if (toDeleteId !== -1) draft.splice(toDeleteId, 1);
			})
		);
	}, []);

	useEffect(() => {
		updateToDo(subTasks);
	}, [subTasks]);

	const completeSubTask = () => {
		return subTasks.map((st) => (st.done ? 1 : 0) as number).reduce((a, b) => a + b, 0);
	};
	if (todo.dateDue) console.log(!todo.completed, todo.dateDue < new Date());

	return (
		<>
			<div className={`${!todo.dateDue && 'mb-3'} flex items-center justify-between text-left`}>
				<div className="flex items-center">
					<ToDoInputCheck
						id={todo.id}
						completed={todo.completed}
						toggle={toggleToDo}
						text={todo.text}
						classNameText="text-2xl"
					/>
				</div>
				<div className="flex items-center">
					{subTasks.length > 0 && (
						<button
							type="button"
							className="btn me-4"
							onClick={() => setMoreInfoVisible((val) => !val)}
						>
							[{completeSubTask()}/{subTasks.length}]
							{moreInfoVisible ? <ArrowUp01Icon /> : <ArrowDown01Icon />}
						</button>
					)}
					<button type="button" className="btn btn-square me-4" onClick={deleteToDo}>
						<Delete02Icon />
					</button>
				</div>
			</div>
			{todo.completed && (
				<div className={`mb-3 text-left italic `}>
					Done on:
					<span className={`ms-2`}>{todo.dateCompleted!.toDateString()}</span>
				</div>
			)}
			{!todo.completed && todo.dateDue && (
				<div className={`mb-3 text-left italic `}>
					Deadline:
					<span className={`ms-2 ${!todo.completed && todo.dateDue < new Date() && 'text-error'}`}>
						{todo.dateDue.toDateString()}
					</span>
				</div>
			)}
			{moreInfoVisible && (
				<div className="ps-4">
					{subTasks.map((sb) => (
						<div className="flex">
							<ToDoInputCheck
								key={sb.id}
								id={sb.id}
								completed={sb.done}
								toggle={() => handleToggle(sb.id)}
								text={sb.text}
								className="mb-3 w-full max-w-[30%]"
								classNameText={`${todo.completed && 'line-through'}`}
							/>
							<div className="text-left">
								<button
									type="button"
									className="btn ms-2 h-6 min-h-6 w-6 px-1"
									onClick={() => handleDelete(sb.id)}
								>
									<Delete02Icon size={20} />
								</button>
							</div>
						</div>
					))}
				</div>
			)}
		</>
	);
}

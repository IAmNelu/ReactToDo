import { Add01Icon, ArrowDown01Icon, ArrowUp01Icon, Delete02Icon } from 'hugeicons-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { ISubTask, IToDo } from '../types/ToDo';

interface CreateToDoProps {
	createToDo: (todo: IToDo) => void;
}
export function CreateToDo({ createToDo }: CreateToDoProps) {
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset
	} = useForm();

	const [subTasks, setSubTasks] = useState<ISubTask[]>([]);
	const [subTask, setSubTask] = useState<string>('');
	const [moreInfoVisible, setMoreInfoVisible] = useState(false);

	const handleToDoSubmit = (formData: Partial<IToDo>) => {
		const creationDate = new Date();
		const toDo: IToDo = {
			id: creationDate.getTime().toString(),
			completed: false,
			text: formData.text!,
			dateCreated: creationDate,
			subTasks: subTasks
		};

		formData.dateDue && (toDo.dateDue = new Date(formData.dateDue));
		console.log(toDo.dateDue);
		createToDo(toDo);
		setSubTasks([]);
		setSubTask('');
		reset();
	};

	const addSubTask = () => {
		if (subTask === '') return;
		const st = {
			id: new Date().toISOString() + Math.random(),
			text: subTask,
			done: false
		};
		setSubTasks((sts) => [...sts, st]);
		setSubTask('');
	};
	const deleteSubTask = (id: string) => {
		setSubTasks((sts) => sts.filter((st) => st.id !== id));
	};

	return (
		<>
			<form className="my-5" onSubmit={handleSubmit(handleToDoSubmit)}>
				<div className="flex flex-col">
					<label className="form-control w-full">
						<div className="label">
							<span className="label-text">What do you want to accomplish?</span>
						</div>
						<div className="flex">
							<input
								{...register('text', { required: true })}
								type="text"
								placeholder="Pay rent"
								className={`input input-bordered me-4 w-full max-w-md grow ${errors.text && 'input-error'}`}
							/>
							<button
								type="button"
								className="btn btn-square me-4"
								onClick={() => setMoreInfoVisible((val) => !val)}
							>
								{moreInfoVisible ? <ArrowUp01Icon /> : <ArrowDown01Icon />}
							</button>
							<button className="btn" type="submit">
								Create
							</button>
						</div>
						<div className="label">
							{errors.text && (
								<span className="label-text-alt text-error">Please fill the todo</span>
							)}
						</div>
					</label>
					<div className={`${!moreInfoVisible && 'hidden'} flex flex-col items-center`}>
						<label className="form-control w-full max-w-xs">
							<div className="label">
								<span className="label-text">Due date:</span>
							</div>
							<input
								type="date"
								className="input input-bordered w-full max-w-xs"
								{...register('dateDue')}
							/>
						</label>

						<label className="form-control w-full max-w-xs">
							<div className="label">
								<span className="label-text">Subtasks:</span>
							</div>
							<div className="flex justify-between">
								<input
									onChange={(e) => setSubTask(e.target.value)}
									value={subTask}
									type="text"
									placeholder="Type here"
									className="input input-bordered w-full max-w-xs"
								/>

								<button type="button" className="btn btn-circle ms-4" onClick={addSubTask}>
									<Add01Icon />
								</button>
							</div>
							{subTasks.map((subTask) => {
								return (
									<div className="mt-4 flex justify-between" key={subTask.id}>
										<p className="ps-4 text-lg">{subTask.text}</p>
										<button
											type="button"
											className="btn btn-circle ms-4"
											onClick={() => deleteSubTask(subTask.id)}
										>
											<Delete02Icon />
										</button>
									</div>
								);
							})}
						</label>
					</div>
				</div>
			</form>
		</>
	);
}

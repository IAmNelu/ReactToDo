import { produce } from 'immer';
import { useCallback, useState } from 'react';
import './App.css';
import { CreateToDo } from './components/CreateToDo';
import { ToDo } from './components/ToDo';
import { ISubTask, IToDo } from './types/ToDo';

function App() {
	const [toDos, setToDos] = useState<IToDo[]>([]);

	const handleToggle = useCallback((id: string) => {
		setToDos(
			produce((draft) => {
				const todo = draft.find((todo) => todo.id === id)!;
				todo.completed = !todo.completed;
				todo.dateCompleted = todo.completed ? new Date() : undefined;
			})
		);
	}, []);

	const handleAdd = useCallback((toDo: IToDo) => {
		setToDos(
			produce((draft) => {
				draft.push(toDo);
			})
		);
	}, []);
	const handleDelete = useCallback((id: string) => {
		setToDos(
			produce((draft) => {
				const toDeleteId = draft.findIndex((val) => val.id === id);
				if (toDeleteId !== -1) draft.splice(toDeleteId, 1);
			})
		);
	}, []);

	const handleUpdateSubTasks = useCallback((id: string, subTasks: ISubTask[]) => {
		setToDos(
			produce((draft) => {
				const todo = draft.find((todo) => todo.id === id)!;
				todo.subTasks = subTasks;
			})
		);
	}, []);
	const getTodo = (toDo: IToDo) => (
		<ToDo
			key={toDo.id}
			todo={toDo}
			toggleToDo={() => handleToggle(toDo.id)}
			deleteToDo={() => handleDelete(toDo.id)}
			updateToDo={(subTasks: ISubTask[]) => handleUpdateSubTasks(toDo.id, subTasks)}
		/>
	);

	return (
		<>
			<h1 className="text-3xl">Welcome to MyToDo App</h1>
			<div className="container mx-auto flex max-w-xl flex-col items-center">
				<div className="w-full">
					<CreateToDo createToDo={handleAdd} />
				</div>
				<div className="divider text-xl">Todo List</div>
				<div className="w-full">
					{toDos.filter((todo) => !todo.completed).length === 0 && <p>Nothing to be done</p>}
					{toDos.filter((todo) => !todo.completed).map((toDo) => getTodo(toDo))}
				</div>
				{toDos.filter((todo) => todo.completed).length > 0 && (
					<div className="divider text-xl">Complete</div>
				)}
				<div className="w-full">
					{toDos.filter((todo) => todo.completed).map((toDo) => getTodo(toDo))}
				</div>
			</div>
		</>
	);
}

export default App;

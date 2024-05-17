export interface ISubTask {
	id: string;
	text: string;
	done: boolean;
}

export interface IToDo {
	id: string;
	completed: boolean;
	text: string;
	subTasks: ISubTask[];
	dateCompleted?: Date;
	dateCreated: Date;
	dateDue?: Date;
}

export interface Project {
    _id?: string;
    title: string;
    tasks: Task[];
}

export interface Task {
    _id?: string,
    description: string,
    finishDate: Date,
    isCompleted: boolean,
    createdAt: Date,
}
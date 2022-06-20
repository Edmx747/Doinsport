export interface Todo {
    label: string;
    done: boolean;
    createdAt: string;
    updatedAt: string;
}
export interface TodoResponse {
    count: number;
    rows: Todo[];
}

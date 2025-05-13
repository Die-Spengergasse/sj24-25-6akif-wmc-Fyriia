
import { axiosInstance, createErrorResponse, ErrorResponse } from "@/utils/apiClient";
import {isTodoItem, TodoItem} from "@/types/TodoItem";

export async function getTodoItems(): Promise<TodoItem[] | ErrorResponse> {
    try {
        const todoItemResponse = await axiosInstance.get<TodoItem[]>("api/TodoItems");
        return todoItemResponse.data.filter(isTodoItem);
    }
    catch (e) {
        return createErrorResponse(e);
    }
}

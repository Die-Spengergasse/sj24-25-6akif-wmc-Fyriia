"use client";

import { useRef, useState, useEffect } from "react";
import ModalDialog from "../components/ModalDialog";
import { TodoItem } from "../types/TodoItem";

// Define the backend API base URL
const API_BASE_URL = "https://localhost:5443/api";

type TodosDeleteProps = {
    todo: TodoItem;
    onCancel: () => void;
    onDeleted: () => void;
};

export default function TodosDelete({ todo, onCancel, onDeleted }: TodosDeleteProps) {
    const [error, setError] = useState<string>("");
    // Ref for accessing the checkbox value
    const deleteTasksRef = useRef<HTMLInputElement>(null);

    async function handleDelete() {
        // Use the checkbox value to determine whether to delete associated tasks
        const deleteTasks = deleteTasksRef.current?.checked ? "true" : "false";
        try {
            const res = await fetch(`${API_BASE_URL}/TodoItems/${todo.guid}?deleteTasks=${deleteTasks}`, {
                method: "DELETE",
            });
            if (!res.ok) {
                // Parse the error response from the backend
                const errorData = await res.json();
                setError(errorData.message || "Deletion failed");
            } else {
                onDeleted();
            }
        } catch (e: any) {
            setError(e.message || "Deletion error");
        }
    }

    useEffect(() => {
        if (error) {
            alert(error);
        }
    }, [error]);

    return (
        <ModalDialog title={`Delete Todo: ${todo.title}`} onCancel={onCancel} onOk={handleDelete}>
            <div>
                <p>Do you really want to delete this Todo item?</p>
                <label>
                    <input type="checkbox" ref={deleteTasksRef} />
                    Also delete associated tasks
                </label>
            </div>
        </ModalDialog>
    );
}

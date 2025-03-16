"use client";

import React, { useState } from "react";
import { TodoItem } from "../types/TodoItem";
import { Category } from "../types/Category";
import TodosDelete from "./TodosDelete";
import styles from "./style.module.css";

type Props = {
    todoItems: TodoItem[];
    categories: Category[];
};

export default function TodosClient({ todoItems, categories }: Props) {
    const [selectedCategory, setSelectedCategory] = useState<string>("");
    const [todoToDelete, setTodoToDelete] = useState<TodoItem | null>(null);
    const [items, setItems] = useState<TodoItem[]>(todoItems);

    const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedCategory(event.target.value);
    };

    const filteredTodoItems = selectedCategory
        ? items.filter(item => item.categoryName === selectedCategory)
        : items;

    return (
        <div className={styles.categories}>
            <h1>Todo Liste</h1>
            <select onChange={handleCategoryChange}>
                <option value="">Alle Kategorien</option>
                {categories.map(category => (
                    <option key={category.guid} value={category.name}>
                        {category.name}
                    </option>
                ))}
            </select>

            <ul>
                {filteredTodoItems.map(item => (
                    <li
                        key={item.guid}
                        className={
                            new Date(item.dueDate) < new Date() ? styles.overdue : styles.onTime
                        }
                    >
                        <h2>{item.title}</h2>
                        <p>{item.description}</p>
                        <p>Kategorie: {item.categoryName}</p>
                        <p>Fällig am: {new Date(item.dueDate).toLocaleDateString()}</p>
                        <p>Status: {item.isCompleted ? "Abgeschlossen" : "Ausstehend"}</p>
                        <button onClick={() => setTodoToDelete(item)}>Delete</button>
                    </li>
                ))}
            </ul>

            {todoToDelete && (
                <TodosDelete
                    todo={todoToDelete}
                    onCancel={() => setTodoToDelete(null)}
                    onDeleted={() => {
                        // Remove the deleted item from local state and clear the deletion modal
                        setItems(prevItems =>
                            prevItems.filter(item => item.guid !== todoToDelete.guid)
                        );
                        setTodoToDelete(null);
                    }}
                />
            )}
        </div>
    );
}

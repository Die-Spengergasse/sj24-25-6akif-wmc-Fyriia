"use client";

import { useEffect, useState } from "react";
import ModalDialog from "../components/ModalDialog";
import { Category } from "../types/Category";
import { createEmptyErrorResponse, ErrorResponse } from "../utils/apiClient";

// Define the backend API base URL
const API_BASE_URL = "https://localhost:5443/api";

type CategoryDeleteProps = {
    category: Category;
    onCancel: () => void;
    onDeleted: () => void;
};

export default function CategoryDelete({
                                           category,
                                           onCancel,
                                           onDeleted,
                                       }: CategoryDeleteProps) {
    const [error, setError] = useState<ErrorResponse>(createEmptyErrorResponse());

    async function handleDelete() {
        try {
            const res = await fetch(`${API_BASE_URL}/categories/${category.guid}`, {
                method: "DELETE",
            });
            if (!res.ok) {
                // Parse error message from the backend
                const errorData = await res.json();
                setError(errorData);
            } else {
                onDeleted();
            }
        } catch (e: any) {
            setError({
                status: e.message,
                message: e.message,
                validations: {},
            });
        }
    }

    useEffect(() => {
        if (error.message) {
            alert(error.message);
        }
    }, [error]);

    return (
        <ModalDialog
            title={`Delete Category ${category.name}`}
            onCancel={onCancel}
            onOk={handleDelete}
        >
            <p>Möchtest du die Kategorie {category.name} wirklich löschen?</p>
        </ModalDialog>
    );
}

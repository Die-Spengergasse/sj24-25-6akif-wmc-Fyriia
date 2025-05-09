import React, { useCallback, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { styles } from '@/utils/categories/index.styles';
import { isErrorResponse } from '@/utils/apiClient';
import {TodoItem} from "@/types/TodoItem";
import {getTodoItems} from "@/utils/todoItems/apiClient";
import {Picker} from "@react-native-picker/picker";

export default function TodoItemsIndexScreen() {
    const [todoItems, setTodoItems] = useState<TodoItem[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<string>('All');

    async function loadTodoItems() {
        console.log("Loading todo items...");
        const response = await getTodoItems();
        if (isErrorResponse(response)) {
            console.error('Error fetching todo items:', response.message);
            return;
        }
        setTodoItems(response);
    }

    useFocusEffect(
        useCallback(() => {
            loadTodoItems();
        }, [])
    );

    const uniqueCategories = ['All', ...Array.from(new Set(todoItems.map(item => item.categoryName)))];

    const filteredItems =
        selectedCategory === 'All'
            ? todoItems
            : todoItems.filter(item => item.categoryName === selectedCategory);


    return (
        <View style={styles.container}>
            <Picker
                selectedValue={selectedCategory}
                onValueChange={(value) => setSelectedCategory(value)}
                style={{ height: 50, width: '100%' }}
            >
                {uniqueCategories.map((category, index) => (
                    <Picker.Item key={index} label={category} value={category} />
                ))}
            </Picker>
            <FlatList
                data={filteredItems}
                keyExtractor={(item) => item.guid.toString()}
                renderItem={({ item }) => (
                    <TouchableOpacity style={styles.card}>
                        <Text style={styles.title}>{item.title}</Text>
                        <Text style={styles.title}>{item.categoryName}</Text>
                        <Text style={styles.description}>{item.description}</Text>
                        <Text style={styles.description}>{item.dueDate}</Text>
                        <Text style={styles.description}>{item.isCompleted}</Text>
                    </TouchableOpacity>
                )}
            />
        </View>
    );
}

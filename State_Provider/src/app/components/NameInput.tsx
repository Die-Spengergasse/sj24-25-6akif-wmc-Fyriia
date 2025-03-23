"use client";

import React, { useState, useContext } from 'react';
import ModalDialog from './ModalDialog';
import { useTodoAppState } from '../context/TodoAppContext';

const NameInput: React.FC = () => {
    const { activeUser, actions: { setActiveUser } } = useTodoAppState();
    const [name, setName] = useState('');

    if (activeUser !== null) {
        return null;
    }

    const handleOk = () => {
        const trimmedName = name.trim();

        setActiveUser(trimmedName === '' ? 'Guest' : trimmedName);
    };

    const handleCancel = () => {

        setActiveUser('Guest');
    };

    return (
        <ModalDialog title="Welcome" onOk={handleOk} onCancel={handleCancel}>
            <p>Please enter your name:</p>
            <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
            />
        </ModalDialog>
    );
};

export default NameInput;

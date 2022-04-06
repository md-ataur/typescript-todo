import React, { useCallback, useReducer, useRef } from 'react';
import { Trash } from 'react-feather';

// Type declare
interface Todo {
    id: number,
    text: string
}

// Type declare
type actionType = { type: 'ADD'; text: string } | { type: 'REMOVE'; id: number }

// Reducer callback
const reducer = (state: Todo[], action: actionType) => {
    switch (action.type) {
        case 'ADD':
            localStorage.setItem("todos", JSON.stringify([
                ...state,
                {
                    id: state.length,
                    text: action.text
                }
            ]));

            return [
                ...state,
                {
                    id: state.length,
                    text: action.text
                }
            ];

        case 'REMOVE':
            return state.filter(({ id }) => id !== action.id);
    }
}

const TodoList = () => {
    // Get data from local storage
    const storageData = localStorage.getItem('todos');
    let parseData = storageData ? JSON.parse(storageData) : [];

    // useReducer
    const [todos, dispatch] = useReducer(reducer, parseData);

    // Catch the dom element
    const todoRef = useRef<HTMLInputElement>(null);

    // useCallback
    const onTodoAdd = useCallback(() => {
        if (todoRef.current && todoRef.current.value !== "") {
            dispatch({
                type: 'ADD',
                text: todoRef.current.value
            });

            todoRef.current.value = '';
        }
    }, []);

    // Remove Handler
    const removeHandler = (id: number) => {
        dispatch({ type: 'REMOVE', id: id });

        // Update data to local storage
        const storageData = localStorage.getItem('todos');
        let parseData: Todo[] = storageData ? JSON.parse(storageData) : [];
        let restData = parseData.filter((item) => (item.id !== id));
        localStorage.setItem('todos', JSON.stringify(restData));
    }

    return (
        <div>
            <input type="text" ref={todoRef} className='border border-gray-300 outline-none px-2 py-2 w-60' />
            <button onClick={onTodoAdd} className='border border-gray-300 px-4 py-2 hover:bg-gray-200'>Add</button>

            <div className='mt-4 w-72 mx-auto'>
                {todos.map((item) => (
                    <div key={item.id} className='mb-2 flex items-center'>
                        <span className="text-lg">{item.text}</span>
                        <button onClick={() => removeHandler(item.id)} className='mx-2 py-1 pl-1'><Trash className="w-5" /></button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TodoList;
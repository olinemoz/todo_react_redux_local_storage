import React from 'react';
import {useSelector} from "react-redux";
import TodoItem from "./TodoItem";

const AppContent = () => {
    const todoList = useSelector(state => state?.todo.todoList)
    const sortTodoList = [...todoList]
    sortTodoList.sort((a, b) => new Date(b.time) === new Date(a.time))

    return (
        <div>
            {
                sortTodoList && sortTodoList.length > 0 ?
                    sortTodoList.map((todo) => (
                        <TodoItem key={todo.id} todo={todo}/>
                    ))
                    : 'no todo found'
            }
        </div>
    );
};

export default AppContent;
import React, {useEffect, useState} from 'react';
import styles from '../styles/modules/todoItem.module.scss'
import {getClasses} from "../utils/getClasses";
import {format} from "date-fns";
import {MdDelete, MdEdit} from "react-icons/md";
import {useDispatch} from "react-redux";
import {deleteTodo, updateTodo} from "../slices/todoSlice";
import {toast} from "react-hot-toast";
import ToDoModal from "./ToDoModal";
import CheckButton from "./CheckButton";


const TodoItem = ({todo}) => {
    const [checked, setChecked] = useState(false)
    const [updateModalOpen, setUpdateModalOpen] = useState(false)
    const dispatch = useDispatch()

    useEffect(() => {
        if(todo.status === 'complete'){
            setChecked(true)
        } else {
            setChecked(false)
        }
    },[todo.status])

    const handleDelete = (id) => {
        dispatch(deleteTodo(id))
        toast.success("Todo Deleted Successfully!")
    }
    const handleUpdate = () => {
        setUpdateModalOpen(true)
    }
    const handleCheck = () => {
        setChecked(!checked)
        dispatch(updateTodo({
            ...todo,
            status: checked ? 'incomplete' : 'complete'
        }))
    }

    return (
        <>
            <div className={styles.item}>
                <div className={styles.todoDetails}>
                    <CheckButton checked={checked} handleCheck={handleCheck} />
                    <div className={styles.texts}>
                        <p className={getClasses([styles.todoText, todo.status === 'complete' && styles[`todoText--completed`]])}>
                            {todo.title}
                        </p>
                        <p className={styles.time}>
                            {format(new Date(todo.time), 'p, MM/dd/yyyy')}
                        </p>
                    </div>
                </div>
                <div className={styles.todoActions}>
                    <div className={styles.icon}
                         onClick={() => handleDelete(todo.id)}
                         onKeyDown={() => handleDelete(todo.id)}
                         role="button"
                         tabIndex={0}
                    >
                        <MdDelete/>
                    </div>
                    <div className={styles.icon}
                         onClick={() => handleUpdate(todo.id)}
                         onKeyDown={() => handleUpdate(todo.id)}
                         role="button"
                         tabIndex={0}
                    >
                        <MdEdit/>
                    </div>
                </div>
            </div>
            <ToDoModal type="update" modalOpen={updateModalOpen} setModalOpen={setUpdateModalOpen} todo={todo}/>
        </>
    );
};

export default TodoItem;
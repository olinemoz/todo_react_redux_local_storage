import React, {useEffect, useState} from 'react';
import styles from '../styles/modules/modal.module.scss'
import {MdOutlineClose} from "react-icons/md";
import Button from "./Button";
import {useDispatch} from "react-redux";
import {addTodo, updateTodo} from "../slices/todoSlice";
import {v4 as uuid} from 'uuid'
import {toast} from "react-hot-toast";

const ToDoModal = ({type, modalOpen, setModalOpen, todo}) => {
    const [title, setTitle] = useState("")
    const [status, setStatus] = useState("incomplete")
    const dispatch = useDispatch()

    useEffect(() => {
        if(type === 'update' && todo){
            setTitle(todo.title)
        } else {
            setTitle("")
            setStatus("incomplete")
        }
    },[type, todo, modalOpen])

    const handleSubmit = event => {
        console.log("Title: ",title, "Status: ",status)
        event.preventDefault();
        if(title === ''){
            toast.error("Please enter a title!")
            return;
        }

        if (title && status) {
            if(type === 'add'){
                dispatch(addTodo({
                    id: uuid(),
                    title,
                    status,
                    time: new Date().toLocaleString(),
                }))
                toast.success('Task Added Successfully')
                setTitle("")
            }
            if(type === 'update'){
                if(todo.title !== title || todo.status !== status){
                    dispatch(updateTodo({
                       ...todo,
                       title,
                       status,
                    }))
                    toast.success('Task Updated Successfully')
                    setModalOpen(false)
                } else {
                    toast.error("No Changes Made.")
                }
            }
            setModalOpen(false)
        }
    }

    return (
        modalOpen && (
            <div className={styles.wrapper}>
                <div className={styles.container}>
                    <div className={styles.closeButton}>
                        <MdOutlineClose
                            onClick={() => setModalOpen(false)}
                            onKeyDown={() => setModalOpen(false)}
                            tabIndex={0}
                            role="button"
                        />
                    </div>
                    <form className={styles.form} onSubmit={(event) => handleSubmit(event)}>
                        <h1 className={styles.formTitle}>{type === "update" ? 'Update' : 'Add'} Task</h1>
                        <label htmlFor="title">
                            Title
                            <input
                                type="text"
                                id="title"
                                value={title}
                                onChange={(event) => setTitle(event.target.value)}
                            />
                        </label>
                        <label htmlFor="status">
                            Type
                            <select
                                name="status"
                                id="status"
                                value={status}
                                onChange={(event) => setStatus(event.target.value)}
                            >
                                <option value="incomplete">Incomplete</option>
                                <option value="complete">Complete</option>
                            </select>
                        </label>
                        <div className={styles.buttonContainer}>
                            <Button type="submit" variant="primary">
                                {type === 'update' ? 'Update' : 'Add'} Task
                            </Button>
                            <Button type="button"
                                    variant="secondary"
                                    onClick={() => setModalOpen(false)}
                                    onKeyDown={() => setModalOpen(false)}
                            >
                                Cancel
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        )
    );
};

export default ToDoModal;
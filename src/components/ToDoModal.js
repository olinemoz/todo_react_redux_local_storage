import React, {useState} from 'react';
import styles from '../styles/modules/modal.module.scss'
import {MdOutlineClose} from "react-icons/md";
import Button from "./Button";
import {useDispatch} from "react-redux";
import {addTodo} from "../slices/todoSlice";
import {v4 as uuid} from 'uuid'
import {toast} from "react-hot-toast";

const ToDoModal = ({modalOpen, setModalOpen}) => {
    const [title, setTitle] = useState("")
    const [status, setStatus] = useState("incomplete")
    const dispatch = useDispatch()

    const handleSubmit = event => {
        event.preventDefault();
        if (title && status) {
            dispatch(addTodo({
                id: uuid(),
                title,
                status,
                time: new Date().toLocaleString(),
            }))
            toast.success('Task Added Successfully')
            setModalOpen(false)
        }else {
            toast.error("Title Shouldn't Empty")
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
                        <h1 className={styles.formTitle}>Add Task</h1>
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
                                Add Task
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
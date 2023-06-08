import 'semantic-ui-css/semantic.min.css'
import './App.css'
import React, { useState } from 'react';
import {Button, Checkbox, Divider, Form, Icon, List, Segment, Dropdown} from 'semantic-ui-react';
import { TodoItem } from './types/TodoItem';

function App() {
    const [todos, setTodos] = useState<TodoItem[]>([]);
    const [newTask, setNewTask] = useState('');
    const [sortBy, setSortBy] = useState('latest');

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewTask(event.target.value);
    };

    const handleAddTodo = () => {
        if (newTask.trim() !== '') {
            const newTodo: TodoItem = {
                id: Date.now(),
                task: newTask,
                isCompleted: false,
                createdDate: new Date(),
            };
            setTodos([...todos, newTodo]);
            setNewTask('');
        }
    };

    const handleDeleteTodo = (id: number) => {
        const updatedTodos = todos.filter(todo => todo.id !== id);
        setTodos(updatedTodos);
    };

    const handleDoubleClick = (id: number) => {
        const updatedTodos = todos.map(todo => {
            if (todo.id === id) {
                return { ...todo, isCompleted: !todo.isCompleted };
            }
            return todo;
        });
        setTodos(updatedTodos);
    };

    const handleSortChange = (_event: React.SyntheticEvent<HTMLElement>, data: any) => {
        setSortBy(data.value);
    };

    const sortedTodos = todos.slice().sort((a, b) => {
        if (sortBy === 'latest') {
            return b.createdDate.getTime() - a.createdDate.getTime();
        } else {
            return a.createdDate.getTime() - b.createdDate.getTime();
        }
    });

    return (
        <Segment raised className={"main-segment"}>

            <h1 className={"main-header"}>todos</h1>

            <Divider horizontal />

            <Form onSubmit={handleAddTodo}>
                <div className={"d-flex"}>
                    <div style={{flex: 1}}>
                        <Form.Input
                            placeholder="Add a task"
                            value={newTask}
                            onChange={handleInputChange}
                            style={{ width: 'calc(100% - 32px)' }}
                        />
                    </div>

                    <Button
                        icon
                        type="submit"
                        primary
                        onClick={handleAddTodo}
                        disabled={!newTask.trim()}
                        className={newTask.trim() ? "button-add" : "button-add disabled-button"}
                    >
                        <Icon name='plus' />
                    </Button>
                </div>
                <div className={"d-flex"}>
                    <Dropdown
                        selection
                        options={[
                            { key: 'latest', value: 'latest', text: 'Latest' },
                            { key: 'oldest', value: 'oldest', text: 'Oldest' },
                        ]}
                        value={sortBy}
                        onChange={handleSortChange}
                    />
                </div>
            </Form>

            <Divider horizontal />

            <List divided relaxed>
                {sortedTodos.map(todo => (
                    <List.Item key={todo.id}>
                        <div className={"d-flex"}>
                            <Checkbox
                                checked={todo.isCompleted}
                                label={
                                    <div
                                        onDoubleClick={() => handleDoubleClick(todo.id)}
                                        className={todo.isCompleted ? "completed-task" : ""}
                                    >
                                        {todo.task}
                                    </div>
                                }
                            />
                            <Button icon onClick={() => handleDeleteTodo(todo.id)} className={"button-delete"}>
                                <Icon name='trash' />
                            </Button>
                        </div>

                    </List.Item>
                ))}
            </List>
        </Segment>
    );
}

export default App;
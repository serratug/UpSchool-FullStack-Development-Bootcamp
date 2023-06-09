import 'semantic-ui-css/semantic.min.css'
import './App.css'
import React, { useState } from 'react';
import {Button, Checkbox, Divider, Form, Icon, List, Segment, Dropdown, DropdownProps} from 'semantic-ui-react';
import {TodoItem, TodoItemCategory} from './types/TodoItem';

function App() {
    const [todos, setTodos] = useState<TodoItem[]>([]);
    const [categories, setCategories] = useState<TodoItemCategory[]>([]);
    const [newTask, setNewTask] = useState('');
    const [newCategoryId, setNewCategoryId] = useState<number | null>(null);
    const [sortBy, setSortBy] = useState('latest');
    const [colors] = useState(['#C5D9AB', '#E6AFC3', '#FFCC9C', '#B199BF', '#71C1D1', '#F7D05E', '#8DD9C7'])

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewTask(event.target.value);
    };

    const handleAddTodo = () => {
        if (newTask.trim() !== '') {
            const newTodo = new TodoItem(Date.now(), newTask);
            newTodo.category = categories.find(category => category.id === newCategoryId) || null;
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
        setSortBy(data.value as string);
    };

    const handleCategoryAddition = (_event: any, data: DropdownProps) => {
        const value = data.value as string;
        if (value.trim() !== '') {
            const newCategory = new TodoItemCategory(Date.now(), value, colors[categories.length%colors.length]);
            setCategories([...categories, newCategory]);
            setNewCategoryId(newCategory.id); // Assign the newly added category to newTodo
        }
    };

    const handleCategoryChange = (_event: React.SyntheticEvent<HTMLElement>, data: any) => {
        setNewCategoryId(data.value);
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

                    <Dropdown
                        options={categories.map((category) => ({
                            key: category.id,
                            text: category.name,
                            value: category.id,
                            style: { color: category.color },
                        }))}
                        placeholder='Choose Category'
                        search
                        selection
                        fluid
                        allowAdditions
                        onAddItem={handleCategoryAddition}
                        onChange={handleCategoryChange}
                        className={"category-dropdown"}
                    />

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

                <div className={"d-flex"} style={{ marginTop: 10 }}>

                    {/* We only need the sorting if there is more than one item in the list */}
                    { todos.length > 1 && (
                        <Dropdown
                            selection
                            options={[
                                { key: 'latest', value: 'latest', text: 'Latest' },
                                { key: 'oldest', value: 'oldest', text: 'Oldest' },
                            ]}
                            value={sortBy}
                            onChange={handleSortChange}
                        />
                    )}

                </div>
            </Form>

            <Divider horizontal />

            <List divided relaxed>
                {sortedTodos.map(todo => (
                    <List.Item key={todo.id} className={"list-item"}>
                        <h4
                            style={
                                todo.category
                                    ? {
                                        borderLeft: `3px solid ${todo.category.color}`,
                                        color: todo.category.color,
                                    }
                                    : {}
                            }
                        >
                            {todo.category?.name}
                        </h4>
                        <div className={"d-flex"}>
                            <div className={"todo-container"} style={todo.category ? { borderLeft: `3px solid ${todo.category.color}` } : {}}>
                                <Checkbox
                                    checked={todo.isCompleted}
                                    label={
                                        <div
                                            onDoubleClick={() => handleDoubleClick(todo.id)}
                                            className={`todo ${todo.isCompleted ? "completed-task" : ""} todoText`}

                                        >
                                            {todo.task}
                                        </div>
                                    }
                                />
                            </div>
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
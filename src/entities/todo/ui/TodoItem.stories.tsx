import type {Meta, StoryObj} from '@storybook/react';
import { action } from '@storybook/addon-actions';

import TodoItem from './TodoItem.tsx';
import {TTodoItem} from "../model/todoItem.type.ts";

const valueDefault: TTodoItem = {
    _id: '1',
    title: 'title',
    completed: false,
    description: 'description',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
}

const valueEmptyDone: TTodoItem = {
    _id: '1',
    title: 'EMPTY',
    completed: true,
    description: '',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
}

const meta = {
    title: 'Todos/TodoItem',
    component: TodoItem,
    parameters: {
        layout: 'centered',
    },
    argTypes: {
        value: {
            options: ['default', 'done'],
            mapping: {
                default: valueDefault,
                done: valueEmptyDone
            },
            control: {
                type: 'radio',
                labels: {
                    valueDefault: 'default',
                    valueEmptyDone: 'done'
                },},

        },
        handleChangeTodo: {
            table: {
                disable: true
            }
        },
        handleTodoClick: {
            table: {
                disable: true
            }
        },
        handleTodoDelete: {
            table: {
                disable: true
            }
        },
        handleUpdateTodo: {
            table: {
                disable: true
            }
        },
        handleSetChange: {
            table: {
                disable: true
            }
        },
        handleChangeTitle: {
            table: {
                disable: true
            }
        },
        handleChangeDescription: {
            table: {
                disable: true
            }
        },
    },
    tags: ['autodocs'],
    args: {
        handleTodoClick: action('handleTodoClick'),
        handleChangeTodo: () => {
        },
        handleUpdateTodo: () => {
        },
        change: false,
        handleChangeTitle: () => {
        },
        handleTodoDelete: () => {
        },
        handleChangeDescription: () => {
        },
        changedDescription: 'changedDescription',
        changedTitle: 'changedTitle',
        handleSetChange: () => {
        },
        label: {inputProps: {'aria-label': 'Checkbox demo'}},
        formatedCreateDate: '10 minutes ago',
        formattedUpdateDate: '1 minute ago',
        isLoading: false,
        value: valueDefault,
        index: 0,
    }
} satisfies Meta<typeof TodoItem>;

export default meta;
type Story = StoryObj<typeof meta>;


export const Simple: Story = {};

export const Done: Story = {
    args: {
        value: {
            ...valueDefault,
            completed: true
        }
    }
}

export const Loading: Story = {
    args: {
        isLoading: true
    }
}

export const Change: Story = {
    args: {
        change: true
    }
}
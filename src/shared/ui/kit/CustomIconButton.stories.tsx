import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

import IconButton from './IconButton.tsx';

const meta = {
    title: 'Example/IconButton',
    component: IconButton,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    args: { onClick: fn() },
} satisfies Meta<typeof IconButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Delete: Story = {};

export const Edit: Story = {
    args: {
        iconName: 'edit'
    }
};

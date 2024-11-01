import type { Meta, StoryObj } from '@storybook/react';

import CountButton from './CountButton.tsx';

const meta = {
    title: 'Example/CountButton',
    component: CountButton,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
} satisfies Meta<typeof CountButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithDecor: Story = {
    decorators: [(Story) => (
        <div style={{ margin: '3em', padding: '20px', border: '1px solid red' }}>
            <Story />
        </div>
    )],
};

export const WithoutDecor: Story = {
    decorators: [],
};
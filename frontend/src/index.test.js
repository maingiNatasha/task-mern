import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from './app/store';
import App from './App';

test('renders the root component correctly', () => {
    render (
        <Provider store={store}>
            <App />
        </Provider>
    );

    const rootComponent = screen.getByTestId('root');

    expect(rootComponent).toBeInTheDocument();
});
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import App from '../App';

const mock = new MockAdapter(axios);

describe('App Component', () => {
    beforeEach(() => {
        mock.reset();
    });

    test('renders the header', () => {
        render(<App />);
        const headerElement = screen.getByText(/Magic Musics/i);
        expect(headerElement).toBeInTheDocument();
    });

    test('fetches and displays musics', async () => {
        mock.onGet('http://localhost:5000/musics').reply(200, [{ id: 1, name: 'Song1', singer: 'Singer1' }]);

        render(<App />);

        const musicElement = await screen.findByText(/Song1, Singer1/i);
        expect(musicElement).toBeInTheDocument();
    });

    test('adds a new music', async () => {
        mock.onGet('http://localhost:5000/musics').reply(200, []);
        mock.onPost('http://localhost:5000/musics').reply(201, { id: 1, name: 'Song1', singer: 'Singer1' });

        render(<App />);

        fireEvent.change(screen.getByPlaceholderText(/Music's Name/i), { target: { value: 'Song1' } });
        fireEvent.change(screen.getByPlaceholderText(/Singer's Name/i), { target: { value: 'Singer1' } });
        fireEvent.click(screen.getByText(/Add to playlist/i));

        const musicElement = await screen.findByText(/Song1, Singer1/i);
        expect(musicElement).toBeInTheDocument();
    });
});

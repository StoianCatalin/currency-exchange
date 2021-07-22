import React from 'react';
import { render, waitFor } from '@testing-library/react';
import App from './App';

describe("App component", () => {
  it('should have the title set correctly', async () => {
    render(<App />);
    await waitFor(() => expect(document.title).toEqual("Exhange Widget - Revolut HomeTask"));
  });
});

import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

test('display all photoes that user selected in gphotogid view', () => {

});

test('display order in the best photo gallery is correct as user selected', () => {

});

test('not allowing to select more than 9 photoes', () => {

});

test('photo order is correctly updating with regard to user click on photo', () => {

});

test('photo order is correctly updateing when user deselect a photo', () => {

});



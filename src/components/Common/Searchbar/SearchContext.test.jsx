import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Searchbar from './Searchbar';
import { SearchProvider } from './SearchContext';

describe('Searchbar', () => {
  test('updates searchTerm on input change', () => {
    render(
      <SearchProvider>
        <Searchbar />
      </SearchProvider>
    );

    
    const inputElement = screen.getByPlaceholderText('Search');
    fireEvent.change(inputElement, { target: { value: 'chicken' } });

    
    expect(inputElement.value).toBe('chicken');
  });
});
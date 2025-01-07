import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import App from '../components/App/App';

const mockRows = [
  {
    name: 'Mads L. Klausen',
    email: 'MadsLKlausen@jourrapide.com',
    edit_path: 'http://google.com',
    per_id: 1,
  },
  {
    name: 'Alfred K. Krogh',
    email: 'AlfredKKrogh@armyspy.com',
    edit_path: 'http://google.com',
    per_id: 2,
  },
  {
    name: 'Silas L. Bertelsen',
    email: 'SilasLBertelsen@armyspy.com',
    edit_path: 'http://google.com',
    per_id: 3,
  },
  {
    name: 'Mia A. Johnsen',
    email: 'MiaAJohnsen@dayrep.com',
    edit_path: 'http://google.com',
    per_id: 4,
  },
  {
    name: 'Alfred S. Schou',
    email: 'AlfredSSchou@jourrapide.com',
    edit_path: 'http://google.com',
    per_id: 5,
  },
  {
    name: 'Eric Annelie',
    email: 'EricAnnelie@jourrapide.com',
    edit_path: 'http://google.com',
    per_id: 6,
  },
  {
    name: 'Gertrud Levi',
    email: 'GertrudLevi@jourrapide.com',
    edit_path: 'http://google.com',
    per_id: 7,
  },
];

describe('renders the table', () => {
  beforeEach(() => {
    render(<App rows={mockRows} />);
  });

  test('renders 5 rows', () => {
    expect(screen.getAllByRole('cell')).toHaveLength(5);
  });

  describe('filters rows based on input', () => {
    test.each(['mads', 'MADS'])(
      'filters by name while ignoring the casing',
      async (searchTerm) => {
        const input = screen.getByRole('searchbox');
        userEvent.type(input, searchTerm);

        await waitFor(() => {
          expect(screen.getAllByRole('cell')).toHaveLength(1);
          expect(screen.getByText(/mads l. klausen/i)).toBeInTheDocument();
        });
      }
    );

    test.each(['jourrapide', 'JOURRAPIDE'])(
      'filters by email while ignoring the casing',
      async (searchTerm) => {
        const input = screen.getByRole('searchbox');
        userEvent.type(input, searchTerm);

        await expect(screen.queryAllByRole('cell')).toHaveLength(4);
      }
    );
  });

  describe('pagination', () => {
    test('renders the pagination buttons', () => {
      const paginationButtons = screen.getAllByRole('button');

      expect(paginationButtons).toHaveLength(2);
    });

    test('changes the page when click on pagination button', () => {
      const [, secondButton] = screen.getAllByRole('button');

      expect(screen.getAllByRole('cell')).toHaveLength(5);
      expect(screen.getByText(mockRows[0].name)).toHaveTextContent(
        mockRows[0].name
      );

      userEvent.click(secondButton);
      expect(screen.getAllByRole('cell')).toHaveLength(2);
      expect(screen.getByText(mockRows[5].name)).toHaveTextContent(
        mockRows[5].name
      );
    });
  });
});

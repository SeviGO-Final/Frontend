import '@testing-library/jest-dom';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Table from '../components/elements/table/admin/userTable'; // Sesuaikan dengan path komponen Anda
import api from '../services/api';
import { UserResponse } from '../types/user-type';

// Mock API
jest.mock("../services/api", () => ({
  get: jest.fn(),
  post: jest.fn(),
}));

//ubah describe berikut
describe('Table Component', () => {
    const mockData: UserResponse[] = [
        {
          _id: '1',
          nik: '123456789',
          name: 'John Doe',
          email: 'john@example.com',
          role: 'User',
          is_verified: false,
          avatar: 'avatar1.jpg',
          address: '123 Example Street',
        },
        {
          _id: '2',
          nik: '987654321',
          name: 'Jane Smith',
          email: 'jane@example.com',
          role: 'Admin',
          is_verified: true,
          avatar: 'avatar2.jpg',
          address: '456 Example Avenue',
        },
      ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders table and displays users', async () => {
    (api.get as jest.Mock).mockResolvedValueOnce({
      data: { data: mockData },
    });

    render(<Table />);

    expect(screen.getByText('Loading...')).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument();
      expect(screen.getByText('Jane Smith')).toBeInTheDocument();
    });

    expect(screen.getByText('123456789')).toBeInTheDocument();
    expect(screen.getByText('john@example.com')).toBeInTheDocument();
    expect(screen.getByText('Verified')).toBeInTheDocument();
    expect(screen.getByText('Unverified')).toBeInTheDocument();
  });

  test('filters users based on search input', async () => {
    (api.get as jest.Mock).mockResolvedValueOnce({
      data: { data: mockData },
    });

    render(<Table />);

    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument();
      expect(screen.getByText('Jane Smith')).toBeInTheDocument();
    });

    const searchInput = screen.getByPlaceholderText('Search...');
    fireEvent.change(searchInput, { target: { value: 'John' } });

    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.queryByText('Jane Smith')).not.toBeInTheDocument();
  });

  test('displays "No users found" when filtered users are empty', async () => {
    (api.get as jest.Mock).mockResolvedValueOnce({
      data: { data: mockData },
    });

    render(<Table />);

    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument();
    });

    const searchInput = screen.getByPlaceholderText('Search...');
    fireEvent.change(searchInput, { target: { value: 'Nonexistent User' } });

    expect(screen.getByText('No users found')).toBeInTheDocument();
  });
});

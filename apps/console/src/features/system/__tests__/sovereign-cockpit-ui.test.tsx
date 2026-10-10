import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { FleetTenantsTable } from '../tenants/fleet-tenants-table';
import { RbacMatrixGrid } from '../roles/rbac-matrix-grid';
import { UserMembershipDrawer } from '../roles/user-membership-drawer';

// Mock TanStack Router
vi.mock('@tanstack/react-router', () => ({
  useNavigate: () => vi.fn(),
  Link: ({ children }: any) => <a>{children}</a>,
}));

function renderWithClient(ui: React.ReactElement) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  return render(
    <QueryClientProvider client={queryClient}>
      {ui}
    </QueryClientProvider>
  );
}

describe('Sovereign Cockpit UI Components', () => {
  it('renders FleetTenantsTable with search and filters', () => {
    renderWithClient(<FleetTenantsTable />);
    expect(screen.getByPlaceholderText(/search fleet tenants/i)).toBeTruthy();
    expect(screen.getByRole('button', { name: /provision tenant/i })).toBeTruthy();
  });

  it('renders RbacMatrixGrid with permission matrix table', () => {
    renderWithClient(<RbacMatrixGrid />);
    expect(screen.getByPlaceholderText(/search permissions/i)).toBeTruthy();
    expect(screen.getByText(/permission atom/i)).toBeTruthy();
  });

  it('renders UserMembershipDrawer with universal user directory', () => {
    renderWithClient(<UserMembershipDrawer />);
    expect(screen.getByPlaceholderText(/search users by name/i)).toBeTruthy();
    expect(screen.getByText(/emergency custody/i)).toBeTruthy();
  });
});

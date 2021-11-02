import { BrandIcon } from '@pagetree/components';
import styled from 'styled-components';

export const DashboardRoot = styled.main`
  display: grid;
  gap: ${({ theme }) => theme.spacing.md};
  align-self: start;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  margin-top: ${({ theme }) => theme.spacing.xl};
  padding: ${({ theme }) => theme.spacing.md};

  ${BrandIcon} {
    margin-bottom: ${({ theme }) => theme.spacing.md};
  }
`;

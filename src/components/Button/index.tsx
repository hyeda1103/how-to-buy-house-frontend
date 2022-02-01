import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { VARIANT, IProps, SIZE } from './types';

export const Button = styled.button<IProps>`
  display: inline-block;
  width: 100%;
  height: 56px;
  margin: 2rem 0;
  cursor: pointer;
  font-size: 1.25rem;
  border-radius: 4px;
  ${(props) => {
    switch (props.variant) {
      case VARIANT.SUCCESS:
        return `
          border: 1px solid ${props.theme.palette.success.contrastText};
          color: ${props.theme.palette.success.contrastText};
          background-color: ${props.theme.palette.success.main};
        `;
      case VARIANT.FAIL:
        return `
          border: 1px solid ${props.theme.palette.fail.contrastText};
          color: ${props.theme.palette.fail.contrastText};
          background-color: ${props.theme.palette.fail.main};
        `;
      default:
        return `
          border: 1px solid ${props.theme.palette.common.contrastText};
          color: ${props.theme.palette.common.main};
          background-color: ${props.theme.palette.common.contrastText};
        `;
    }
  }}
`;

export const CircleButton = styled.button`
  width: 24px;
  height: 24px;
  border-radius: ${({ theme }) => theme.borderRadius};
  cursor: pointer;
  font-size: 0.75rem;
  font-weight: 700;
  border: 1px solid ${({ theme }) => theme.palette.common.contrastText};
  color: ${({ theme }) => theme.palette.common.contrastText};
  background-color: ${({ theme }) => theme.palette.common.main};
  margin: 0 0.25rem;
`;

export const ButtonWithLink = styled(Link)<IProps>`
  display: inline-block;
  border-radius: ${({ theme }) => theme.borderRadius};
  background-color: ${({ theme }) => theme.palette.common.main};
  color: ${({ theme }) => theme.palette.common.contrastText};
  border: 1px solid ${({ theme }) => theme.palette.common.contrastText};
  font-weight: 700;
  margin: 0 0.25rem;
  ${(props) => {
    switch (props.size) {
      case SIZE.LARGE:
        return `
          font-size: 1.25rem;
          padding: 0.75rem 2.5rem;
        `;
      case SIZE.SMALL:
        return `
          font-size: 0.75rem;
          padding: 0.3rem 0.5rem;
        `;
      default:
        return `
          font-size: 1rem;
          padding: 0.5rem 1rem;
        `;
    }
  }}
`;

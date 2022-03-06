import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { VARIANT, IProps, SIZE } from './types';

export const Button = styled.button<IProps>`
  display: inline-block;
  width: 100%;
  height: 52px;
  cursor: pointer;
  font-size: 1.25rem;
  transition: background-color .3s ease;
  ${(props) => {
    switch (props.variant) {
      case VARIANT.SUCCESS:
        return `
          border: 1px solid ${props.theme.palette.success};
          color: ${props.theme.palette.success};
          background-color: ${props.theme.palette.border.default};
        `;
      case VARIANT.FAIL:
        return `
          border: 1px solid ${props.theme.palette.fail};
          color: ${props.theme.palette.fail};
          background-color: ${props.theme.palette.border.default};
        `;
      default:
        return `
          border: none;
          color: ${props.theme.palette.main};
          background-color: ${props.theme.palette.primary};
          border-radius: ${props.theme.borderRadius};

          &:hover {
            background-color: ${props.theme.palette.hover};
          }
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
  border: 1px solid ${({ theme }) => theme.palette.contrastText};
  color: ${({ theme }) => theme.palette.contrastText};
  background-color: ${({ theme }) => theme.palette.main};
  margin: 0 0.25rem;
`;

export const ButtonWithLink = styled(Link)<IProps>`
  display: inline-block;
  border-radius: ${({ theme }) => theme.borderRadius};
  background-color: ${({ theme }) => theme.palette.main};
  color: ${({ theme }) => theme.palette.contrastText};
  border: 1px solid ${({ theme }) => theme.palette.contrastText};
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

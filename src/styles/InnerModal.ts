import type { ThemedStyles } from '../types'

import styled from 'styled-components'
import { darken } from 'polished'

export const InnerModal = styled.div<ThemedStyles>`
  width: 30vw;
  height: 25vh;
  display: grid;
  grid-template-rows: 3rem 1fr 5rem;
  background: white;
  box-shadow: ${({ theme }) => theme.shadows[1]};
  .title {
    height: 5rem;
    display: flex;
    align-items: center;
    background: ${({ theme }) => theme.primary};
    padding-left: 1rem;
    img {
      width: 3.5rem;
      height: 3.5rem;
      margin-right: 0.5rem;
    }
    span {
      font: 2rem 'Open Sans';
      font-weight: 600;
    }
  }
  .message {
    height: calc(25vh - 8rem);
    display: flex;
    align-items: center;
    justify-content: center;
    font: 3rem 'Open Sans';
    font-weight: 600;
    padding: 1rem;
  }
  .actions {
    height: 5rem;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    border-top: 1px solid ${({ theme }) => theme.grey[2]};
    background: ${({ theme }) => theme.grey[0]};
    .action {
      display: flex;
      align-items: center;
      justify-content: center;
      font: 1.5rem 'Open Sans';
      font-weight: 700;
      text-transform: uppercase;
      padding: 0.75rem 1rem;
      margin-right: 1rem;
      border-radius: ${({ theme }) => theme.borderRadius};
      transition: 0.3s;
      cursor: pointer;
    }
    .confirm {
      color: white;
      background: ${({ theme }) => theme.secondary};
      &:hover {
        background: ${({ theme }) => darken(0.1, theme.secondary)};
      }
    }
    .cancel {
      color: ${({ theme }) => theme.grey[10]};
      background: ${({ theme }) => theme.grey[1]};
      &:hover {
        background: ${({ theme }) => theme.grey[2]};
      }
    }
  }
`

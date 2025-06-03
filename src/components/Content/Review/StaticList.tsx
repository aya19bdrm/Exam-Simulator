import type { Choice, ThemedStyles } from '../../../types'

import React from 'react'
import styled from 'styled-components'
import { lighten } from 'polished'

const ListItem = styled.div<ListItemStylesProps>`
  width: 50%;
  padding: 1rem 1rem;
  margin-bottom: 1rem;
  background: ${({ $correct, theme }) => ($correct ? lighten(0.2, theme.primary) : lighten(0.4, theme.secondary))};
  color: ${({ theme }) => theme.grey[10]};
  border: 2px dashed ${({ theme }) => theme.grey[5]};
  font: 1.25rem 'Open Sans';
  font-weight: 700;
`

const StaticListComponent: React.FC<StaticListProps> = ({ choices }) => {
  return (
    <div>
      {choices.map(({ text, correct }, i) => (
        <ListItem key={i} $correct={correct}>
          {text}
        </ListItem>
      ))}
    </div>
  )
}

export default StaticListComponent

export interface StaticListProps {
  choices: Choice[]
}

export interface ListItemStylesProps extends ThemedStyles {
  $correct: boolean
}

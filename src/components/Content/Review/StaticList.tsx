import type { Choice, ThemedStyles } from '../../../types'

import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { lighten } from 'polished'

const ListItem = styled.div<ListItemProps>`
  width: 50%;
  padding: 1rem 1rem;
  margin-bottom: 1rem;
  background: ${(props) => (props.correct ? lighten(0.2, props.theme.primary) : lighten(0.4, props.theme.secondary))};
  color: ${(props) => props.theme.grey[10]};
  border: 2px dashed ${(props) => props.theme.grey[5]};
  font: 1.25rem 'Open Sans';
  font-weight: 700;
`

export default ({ choices, order }: StaticListProps): React.JSX.Element => {
  const [list, setList] = useState<ChoiceAnswer[]>([])

  useEffect(() => {
    const initialList: ChoiceAnswer[] = []

    for (let i = 0; i < choices.length; i++) {
      let { text } = order ? choices[order[i]] : choices[i]
      let correct = order ? order[i] === i : false
      initialList.push({ text, correct })
    }

    setList(initialList)
  }, [])

  return (
    <div>
      {list.map(({ text, correct }, i) => (
        <ListItem key={i} correct={correct || undefined}>
          {text}
        </ListItem>
      ))}
    </div>
  )
}

export interface StaticListProps {
  choices: Choice[]
  order: number[]
}

export interface ListItemProps extends ThemedStyles, Pick<ChoiceAnswer, 'correct'> {}

export interface ChoiceAnswer {
  text: string
  correct: boolean
}

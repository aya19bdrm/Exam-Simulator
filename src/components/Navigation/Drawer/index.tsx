import type { ThemedStyles } from '../../../types'

import React from 'react'
import styled from 'styled-components'
import { lighten } from 'polished'
import { Menu } from '@styled-icons/material/Menu'
import { ChevronLeft } from '@styled-icons/material/ChevronLeft'
// import { Save } from '@styled-icons/material/Save'
import { FormatListNumbered } from '@styled-icons/material/FormatListNumbered'
import { Bookmark } from '@styled-icons/material/Bookmark'
// import { Pause } from '@styled-icons/material/Pause'
// import { Stop } from '@styled-icons/material/Stop'
import Grid from './Grid'
// import Stats from './Stats'

const DrawerStyles = styled.div<ThemedStyles>`
  position: fixed;
  left: 0;
  z-index: 1;
  width: 24rem;
  height: 100%;
  transition: 0.3s;
  background: ${(props) => props.theme.grey[0]};
`

const Control = styled.div<ControlStylesProps>`
  width: ${(props) => (props.$open ? '24em' : '5rem')};
  height: 5rem;
  display: flex;
  justify-content: ${(props) => (props.$open ? 'flex-end' : 'center')};
  align-items: center;
  border: 1px solid ${(props) => props.theme.grey[1]};
  border-left: 0;
  border-top: 0;
  transition: 0.3s;
  cursor: pointer;
  svg {
    color: ${(props) => props.theme.black};
  }
  .chevron {
    margin-right: 1rem;
  }
`

const MainMenu = styled.div<ThemedStyles>`
  height: calc(100vh - 5rem);
  display: flex;
  flex-direction: column;
  border-right: 1px solid ${(props) => props.theme.grey[1]};
`

const MenuItem = styled.div<ThemedStyles>`
  height: 5rem;
  display: grid;
  grid-template-columns: 5rem 1fr;
  align-items: center;
  justify-items: center;
  color: ${(props) => props.theme.black};
  cursor: pointer;
  &:hover {
    background: ${(props) => lighten(0.1, props.theme.primary)};
  }
  & > :first-child {
    color: inherit;
  }
  & > :last-child {
    justify-self: flex-start;
    font: 1.5rem 'Open Sans';
    font-weight: 600;
    padding-left: 2rem;
    color: inherit;
  }
`

export default ({ open }: DrawerProps): React.JSX.Element => {
  const [isOpen, setIsOpen] = React.useState<boolean>(open)
  const [showQuestionType, setShowQuestionType] = React.useState<'all' | 'marked'>('all')

  const menu = [
    {
      type: 'menu',
      text: 'All Questions',
      icon: <FormatListNumbered size={20} />,
      onClick: () => setShowQuestionType('all')
    },
    {
      type: 'menu',
      text: 'Marked Questions',
      icon: <Bookmark size={20} />,
      onClick: () => setShowQuestionType('marked')
    },
    { type: 'exam-grid' }
    // {
    //   type: 'menu',
    //   text: 'Save Session',
    //   icon: <Save size={20} />,
    //   onClick: setConfirmSaveSession
    // },
    // { type: 'menu', text: 'Pause Exam', icon: <Pause size={20} />, onClick: pauseExam },
    // { type: 'menu', text: 'End Exam', icon: <Stop size={20} />, onClick: setConfirmEndExam }
  ]

  return (
    <DrawerStyles>
      <Control $open={isOpen} onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <ChevronLeft className="chevron" size={20} /> : <Menu size={20} />}
      </Control>

      <MainMenu>
        {menu.map((section, i) => {
          if (section.type === 'menu') {
            return (
              <MenuItem key={section.text} data-test={section.text} onClick={section.onClick}>
                {section.icon}
                <div>{section.text}</div>
              </MenuItem>
            )
            // } else if (section.type === 'stats') {
            //   return <Stats key={i} open={open} exam={exam} />
          } else if (section.type === 'exam-grid') {
            return <Grid key={i} open={open} />
          }
        })}
      </MainMenu>
    </DrawerStyles>
  )
}

export interface DrawerProps {
  open: boolean
}

export interface ControlStylesProps extends ThemedStyles {
  $open: boolean
}

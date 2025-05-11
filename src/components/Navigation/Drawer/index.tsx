import type { QuestionFilter, ThemedStyles } from '../../../types'

import React from 'react'
import styled from 'styled-components'
import { lighten } from 'polished'
import { Menu } from '@styled-icons/material/Menu'
import { ChevronLeft } from '@styled-icons/material/ChevronLeft'
// import { Save } from '@styled-icons/material/Save'
import { FormatListNumbered } from '@styled-icons/material/FormatListNumbered'
import { Bookmark } from '@styled-icons/material/Bookmark'
import { CheckBox, CheckBoxOutlineBlank } from '@styled-icons/material'
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

const MenuItem = styled.div<MenuItemStylesProps>`
  height: 5rem;
  display: grid;
  grid-template-columns: 5rem 1fr;
  align-items: center;
  justify-items: center;
  background: ${(props) => (props.$selected ? props.theme.grey[2] : 'none')};
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

export default ({ open, toggleOpen }: DrawerProps): React.JSX.Element => {
  const [filter, setFilter] = React.useState<QuestionFilter>('all')

  const menu: MenuSections[] = [
    {
      type: 'filter',
      text: 'All Questions',
      icon: <FormatListNumbered size={20} />,
      filter: 'all',
      onClick: () => setFilter('all')
    },
    {
      type: 'filter',
      text: 'Marked Questions',
      icon: <Bookmark size={20} />,
      filter: 'marked',
      onClick: () => setFilter('marked')
    },
    {
      type: 'filter',
      text: 'Answered Questions',
      icon: <CheckBox size={20} />,
      filter: 'answered',
      onClick: () => setFilter('answered')
    },
    {
      type: 'filter',
      text: 'Unanswered Questions',
      icon: <CheckBoxOutlineBlank size={20} />,
      filter: 'incomplete',
      onClick: () => setFilter('incomplete')
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
      <Control $open={open} onClick={() => toggleOpen()}>
        {open ? <ChevronLeft className="chevron" size={20} /> : <Menu size={20} />}
      </Control>

      <MainMenu>
        {menu.map((section, i) =>
          section.type === 'filter' ? (
            <MenuItem
              key={i}
              data-test={section.text}
              $selected={filter === section.filter}
              onClick={() => setFilter(section.filter)}
            >
              {section.icon}
              <div>{section.text}</div>
            </MenuItem>
          ) : section.type === 'exam-grid' ? (
            <Grid key={i} open={open} show={filter} />
          ) : null
        )}
      </MainMenu>
    </DrawerStyles>
  )
}

export interface DrawerProps {
  open: boolean
  toggleOpen: () => void
}

export interface ControlStylesProps extends ThemedStyles {
  $open: boolean
}

export interface MenuItemStylesProps extends ThemedStyles {
  $selected: boolean
}

export type MenuSections =
  | {
      type: 'filter'
      text: string
      icon: React.ReactNode
      filter: QuestionFilter
      onClick: () => void
    }
  | {
      type: 'exam-grid'
    }

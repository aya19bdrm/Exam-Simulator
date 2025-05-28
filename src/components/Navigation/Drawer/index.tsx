import type { QuestionFilter, ThemedStyles } from '../../../types'

import React from 'react'
import styled from 'styled-components'
import { lighten } from 'polished'
import { Menu } from '@styled-icons/material/Menu'
import { ChevronLeft } from '@styled-icons/material/ChevronLeft'
import { FormatListNumbered } from '@styled-icons/material/FormatListNumbered'
import { Bookmark } from '@styled-icons/material/Bookmark'
import { CheckBox, CheckBoxOutlineBlank, PlayArrow } from '@styled-icons/material'
import { Pause } from '@styled-icons/material/Pause'
import { Stop } from '@styled-icons/material/Stop'
import Grid from './Grid'
import { translate } from '../../../settings'
import { type Session, SessionActionTypes } from '../../../session'

const DrawerStyles = styled.div<ThemedStyles>`
  position: fixed;
  left: 0;
  z-index: 1;
  width: 24rem;
  height: 100%;
  top: 5rem;
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
    background: ${(props) => lighten(0.2, props.theme.primary)};
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

export default ({ open, toggleOpen, session }: DrawerProps): React.JSX.Element => {
  const [filter, setFilter] = React.useState<QuestionFilter>('all')

  const menu: MenuSections[] = [
    {
      type: 'filter',
      filter: 'all',
      text: translate('nav.drawer.all'),
      icon: <FormatListNumbered size={20} />
    },
    {
      type: 'filter',
      filter: 'marked',
      text: translate('nav.drawer.marked'),
      icon: <Bookmark size={20} />
    },
    {
      type: 'filter',
      filter: 'answered',
      text: translate('nav.drawer.answered'),
      icon: <CheckBox size={20} />
    },
    {
      type: 'filter',
      filter: 'incomplete',
      text: translate('nav.drawer.incomplete'),
      icon: <CheckBoxOutlineBlank size={20} />
    },
    { type: 'exam-grid' },
    {
      type: 'timer',
      text: translate('nav.drawer.pause'),
      icon: <Pause size={20} />,
      onClick: () => session.update!(SessionActionTypes.SET_TIMER_STATE, 'paused')
    },
    {
      type: 'timer',
      text: translate('nav.drawer.resume'),
      icon: <PlayArrow size={20} />,
      onClick: () => session.update!(SessionActionTypes.SET_TIMER_STATE, 'running')
    },
    {
      type: 'timer',
      text: translate('nav.drawer.stop'),
      icon: <Stop size={20} />,
      onClick: () => session.update!(SessionActionTypes.SET_TIMER_STATE, 'stopped')
    }
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
          ) : section.type === 'timer' ? (
            <MenuItem key={i} data-test={section.text} $selected={false} onClick={section.onClick}>
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
  session: Session
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
    }
  | {
      type: 'exam-grid'
    }
  | {
      type: 'timer'
      text: string
      icon: React.ReactNode
      onClick: () => void
    }

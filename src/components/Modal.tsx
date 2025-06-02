import type { ThemedStyles } from '../types'

import React, { useEffect, useRef } from 'react'
import styled, { keyframes } from 'styled-components'

const grow = keyframes`
  from {
    transform: scale(.25) translate(-50%, -50%);
  }
  to {
    transform: scale(1) translate(-50%, -50%);
  }
`

const ModalWindow = styled.div<ThemedStyles>`
  display: block;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 3;
  width: 100%;
  height: 100%;
  background: ${({ color }) =>
    color === 'light' ? 'rgba(255, 255, 255, 0.5)' : color === 'dark' ? 'rgba(0, 0, 0, 0.5)' : 'transparent'};
`

const ModalMain = styled.div`
  position: fixed;
  max-width: 100%;
  height: auto;
  top: 50%;
  left: 50%;
  z-index: 4;
  transform: translate(-50%, -50%);
  transform-origin: left center;
  animation: ${grow} 200ms ease;
`

export default ({ children, color, onClose }: ModalProps): React.JSX.Element => {
  const modal = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onClickAway = (e: MouseEvent) => {
      if (modal.current && e.target === modal.current) {
        onClose?.()
        document.removeChild(modal.current)
      }
    }

    document.body.addEventListener('click', onClickAway)

    return () => {
      document.body.removeEventListener('click', onClickAway)
    }
  }, [onClose])

  return (
    <ModalWindow id="modal-window" ref={modal} color={color}>
      <ModalMain id="modal">{children}</ModalMain>
    </ModalWindow>
  )
}

export interface ModalProps {
  children: React.JSX.Element | React.JSX.Element[]
  color: string
  onClose?: () => void
}

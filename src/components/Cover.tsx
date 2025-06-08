import type { Exam, ThemedStyles } from '../types'

import React from 'react'
import styled from 'styled-components'
import { translate } from '../settings'
// @ts-expect-error
import Logo from '../assets/logo.png'

const CoverStyles = styled.div<ThemedStyles>`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

export const Image = styled.img<ThemedStyles>`
  max-height: 40vh;
  margin-bottom: 0.5rem;
  border: 1px solid ${({ theme }) => theme.grey[2]};
  padding: 1rem;
`

export const Description = styled.div`
  font: 1.25rem 'Open Sans';
  padding: 1rem;
`

export const Title = styled.div<ThemedStyles>`
  font: 3rem 'Open Sans';
  font-weight: 700;
  margin-bottom: 0.5rem;
  color: ${({ theme }) => theme.black};
`

const StartButton = styled.button<ThemedStyles>`
  background: ${({ theme }) => theme.primary};
  color: white;
  border: none;
  padding: 1rem 2rem;
  font-size: 1.8rem;
  font-weight: 600;
  border-radius: 8px;
  transition: all 0.3s ease;
  cursor: pointer;
  min-width: 200px;
  position: relative;
  margin-top: 4rem;
  padding: 2rem;
`

const CoverComponent: React.FC<CoverProps> = ({ exam, onStart }) => {
  const { title, description } = exam

  return (
    <CoverStyles id="cover">
      {<Image src={Logo} alt={translate('cover.logo-alt')} />}
      {title && <Title>{title}</Title>}
      {description && <Description>{description}</Description>}

      {onStart && (
        <StartButton className="start-exam-button" onClick={() => onStart()}>
          {translate('cover.start')}
        </StartButton>
      )}
    </CoverStyles>
  )
}

export default CoverComponent

export interface CoverProps {
  exam: Exam
  onStart?: () => void | Promise<void>
}

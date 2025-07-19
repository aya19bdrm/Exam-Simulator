import type { ThemedStyles } from '../types'

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
  margin: 1rem;
`

export const Title = styled.div<ThemedStyles>`
  font: 3rem 'Open Sans';
  font-weight: 700;
  margin-bottom: 0.5rem;
  color: ${({ theme }) => theme.black};
`

export const Description = styled.div`
  font: 2.25rem 'Open Sans';
  padding: 1rem;
  margin-bottom: 3rem;
`

const StartButton = styled.button<ThemedStyles>`
  background: ${({ theme }) => theme.primary};
  color: white;
  border: none;
  padding: 2rem;
  font-size: 1.8rem;
  font-weight: 600;
  border-radius: 8px;
  transition: all 0.3s ease;
  cursor: pointer;
  min-width: 200px;
  margin: 0.8rem;

  &:hover {
    opacity: 0.9;
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }
`

const ContinueButton = styled(StartButton)<ThemedStyles>`
  background: ${({ theme }) => theme.secondary || theme.grey[6]};
`

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
`

const ButtonRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 1rem;
`

const CoverComponent: React.FC<CoverProps> = ({ onStartNew, onStartMini, onContinue }) => {
  return (
    <CoverStyles id="cover">
      <Image src={Logo} alt={translate('cover.logo-alt')} />
      <Title>{translate('about.title')}</Title>
      <Description>{translate('about.description')}</Description>

      <ButtonContainer>
        <ButtonRow>
          <StartButton id="start-new-button" onClick={onStartNew}>
            {translate('cover.new')}
          </StartButton>
          <StartButton id="start-mini-button" onClick={onStartMini}>
            {translate('cover.mini')}
          </StartButton>
        </ButtonRow>
        {onContinue && (
          <ContinueButton id="continue-button" onClick={onContinue}>
            {translate('cover.continue')}
          </ContinueButton>
        )}
      </ButtonContainer>
    </CoverStyles>
  )
}

export default CoverComponent

export interface CoverProps {
  onStartNew: () => void | Promise<void>
  onStartMini: () => void | Promise<void>
  onContinue?: () => void | Promise<void>
}

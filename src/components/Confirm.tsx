import React from 'react'
import Modal from './Modal'
import { InnerModal } from '../styles/InnerModal'
// @ts-expect-error
import Logo from '../assets/logo.png'

export default ({ title, message, buttons, onConfirm, onClose }: ConfirmProps): React.JSX.Element => (
  <Modal color="dark" onClose={onClose}>
    <InnerModal id="inner-modal">
      <div id="title" className="title">
        <img src={Logo} />

        <span>{title}</span>
      </div>

      <div id="message" className="message">
        {message}
      </div>

      <div id="buttons" className="actions">
        <div id="button0" className="action confirm" onClick={onConfirm}>
          {buttons[0]}
        </div>

        {buttons.length === 2 ? (
          <div id="button1" className="action cancel" onClick={onClose}>
            {buttons[1]}
          </div>
        ) : null}
      </div>
    </InnerModal>
  </Modal>
)

export interface ConfirmProps {
  title: string
  message: string
  buttons: [string] | [string, string] // ['Okay', 'Cancel']
  onConfirm?: () => void
  onClose?: () => void
}

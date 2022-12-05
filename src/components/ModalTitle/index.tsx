import React, { FC } from 'react'
import './style.scss'

interface IProps {
    title: string;
}

const ModalTitle: FC<IProps> = ({ title }) => {
  return (
    <h2 className='modal-title'>{title}</h2>
  )
}

export default ModalTitle
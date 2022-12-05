import React, { FC, ChangeEventHandler } from 'react'
import './style.scss'

interface IProps {
    placeholder?: string;
    name: string;
    value: string;
    handleChange: ChangeEventHandler<HTMLTextAreaElement>;
    description: string;
}

const TextareaGroup: FC<IProps> = ({ 
    placeholder, 
    name, 
    value, 
    handleChange,
    description
}) => {
  return (
    <div className='input-group-container'>
        <label className='input-group-label' htmlFor={name}>{description}</label>
        <textarea 
            className='input-group-input' 
            name={name} 
            value={value} 
            placeholder={placeholder} 
            onChange={handleChange}
        />
    </div>
  )
}

export default TextareaGroup
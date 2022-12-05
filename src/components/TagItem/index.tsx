import React, { FC } from 'react'
import './style.scss'

interface IProps {
  tag: string;
  color?: string;
}

const TagItem: FC<IProps> = ({ tag, color }) => {
  let classes = 'tag-item'
  if(color) classes += ` ${color}`
  return (
    <div className={classes}>{tag}</div>
  )
}

export default TagItem
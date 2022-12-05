import React, { FC } from 'react'
import TagItem from '../TagItem';
import { v4 as uuid } from 'uuid'
import './style.scss'

interface IProps {
  tags: string[];
  color?: string;
}

const TagList: FC<IProps> = ({ tags, color }) => {
  return (
    <div className='tag-list'>
      {tags.map(tag => <TagItem key={uuid()} tag={tag} color={color}/>)}
    </div>
  )
}

export default TagList
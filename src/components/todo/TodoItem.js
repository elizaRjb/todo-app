import React from 'react';
import PropTypes from 'prop-types';
import {partial} from '../../util/util';

export const TodoItem = (props) => {
  const handleToggle = partial(props.handleToggle, props.id);
  const handleRemove = partial(props.handleRemove, props.id);
  return (
    <li>
      <button 
        type="button" 
        title="Remove"
        onClick={handleRemove}
      >
        x
      </button>
      <input 
        type="checkbox" 
        checked={props.isComplete} 
        onChange={handleToggle} />
      <span>{props.name}</span>
    </li>
  )
};

TodoItem.propTypes = {
  id: PropTypes.number.isRequired,
  isComplete: PropTypes.bool,
  name: PropTypes.string
}

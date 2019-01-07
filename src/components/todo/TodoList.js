import React from 'react';
import PropTypes from 'prop-types';

import {TodoItem} from './TodoItem';

export const TodoList = (props) => (
  <ul>
    {
      props.todos.map(todo =>
        <TodoItem
          key={todo.id}
          handleToggle={props.handleToggle}
          handleRemove={props.handleRemove}
          {...todo}
        />
      )
    }
  </ul>
);

TodoList.propTypes = {
  todos: PropTypes.array.isRequired
}

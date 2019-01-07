import React from 'react';
import {TodoForm, TodoList} from './components/todo';
import {addTodo, generateId, findById, toggleTodo, updateTodo, removeTodo} from './lib/TodoHelpers';
import {partial, pipe} from './util/util';
class App extends React.Component {
  state = {
    todos: [
      {
        id: 1,
        name: 'learn react',
        isComplete: false
      },
      {
        id: 2,
        name: 'Give 1 KSS session',
        isComplete: false
      },
      {
        id: 3,
        name: 'start design challenge',
        isComplete: false
      }
    ],
    currentTodo: ''
  };

  handleRemove = (id, evt) => {
    evt.preventDefault();
    const updatedTodos = removeTodo(this.state.todos, id);
    this.setState({todos: updatedTodos});
  }

  handleToggle = (id) => {
    const getUpdatedTodos = pipe(findById, toggleTodo, partial(updateTodo, this.state.todos));
    this.setState({todos: getUpdatedTodos(id, this.state.todos)});
  };

  handleSubmit = (evt) => {
    evt.preventDefault();

    const newId = generateId();
    const newTodo = {id: newId, name: this.state.currentTodo, isComplete: false}

    const updatedTodos = addTodo(this.state.todos, newTodo);

    this.setState({
      todos: updatedTodos,
      currentTodo: '',
      errorMsg: ''
    })
  }

  handleEmptySubmit = (evt) => {
    evt.preventDefault();
    this.setState({
      errorMsg: 'Please enter a todo'
    })
  }

  handleInputChange = (evt) => {
    this.setState({
      currentTodo: evt.target.value
    })
  }

  render() {
    const submitHandler = this.state.currentTodo ? this.handleSubmit : this.handleEmptySubmit;
    return(
      <div className="main-container-wrapper">
        <header>
          <h2>React todos</h2>
        </header>
        <main>
          <div className="input-wrapper">
          </div>
          <div className="list-wrapper">
            {
              this.state.errorMsg && <p>{this.state.errorMsg}</p>
            }
            <TodoForm 
              handleInputChange={this.handleInputChange}
              currentTodo={this.state.currentTodo}
              handleSubmit={submitHandler}
            />
            <TodoList
              todos={this.state.todos}
              handleToggle={this.handleToggle}
              handleRemove={this.handleRemove}
            />
          </div>
        </main>
      </div>
    );
  }
}

export default App;

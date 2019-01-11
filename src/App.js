import React from 'react';
import PropTypes from 'prop-types';

import {partial, pipe} from './util/util';

import {loadTodos, createTodo, saveTodo, destroyTodo} from './lib/TodoService';
import {addTodo, generateId, findById, toggleTodo, updateTodo, removeTodo, filterTodos} from './lib/TodoHelpers';

import {TodoForm, TodoList, Footer} from './components/todo';
class App extends React.Component {
  state = {
    todos: [],
    currentTodo: ''
  };

  static contextTypes = {
    route: PropTypes.string
  }

  componentDidMount() {
    loadTodos()
      .then(todos => this.setState({todos}));
  }

  handleRemove = (id, evt) => {
    evt.preventDefault();
    const updatedTodos = removeTodo(this.state.todos, id);
    this.setState({todos: updatedTodos});
    destroyTodo(id)
      .then(() => this.showTempMessage('Todo removed'));
  }

  handleToggle = (id) => {
    const getToggledTodo = pipe(findById, toggleTodo);
    const updated = getToggledTodo(id, this.state.todos);
    const getUpdatedTodos = partial(updateTodo, this.state.todos);
    const updatedTodos = getUpdatedTodos(updated);
    this.setState({todos: updatedTodos});
    saveTodo(updated)
      .then(() => this.showTempMessage('todo updated'));
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

    createTodo(newTodo)
      .then(() => this.showTempMessage('Todo added'));
  }

  showTempMessage = (msg) => {
    this.setState({submitMessage: msg});
    setTimeout(() => this.setState({submitMessage: ''}), 3000);
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
    const displayTodos = filterTodos(this.state.todos, this.context.route);
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
            {
              this.state.submitMessage && <p>{this.state.submitMessage}</p>
            }
            <TodoForm 
              handleInputChange={this.handleInputChange}
              currentTodo={this.state.currentTodo}
              handleSubmit={submitHandler}
            />
            <TodoList
              todos={displayTodos}
              handleToggle={this.handleToggle}
              handleRemove={this.handleRemove}
            />
          </div>
        </main>
        <footer>
          <Footer />
        </footer>
      </div>
    );
  }
}

export default App;

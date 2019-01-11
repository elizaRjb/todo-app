const BASE_URL = 'http://localhost:8080/todos';

export const loadTodos = () => {
  return fetch(BASE_URL)
    .then(res => res.json());
};

export const createTodo = (todo) => {
  return fetch(BASE_URL, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(todo)
  }).then(res => res.json());
};

export const saveTodo = (todo) => {
  return fetch(`${BASE_URL}/${todo.id}`, {
    method: 'PUT',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(todo)
  }).then(res => res.json());
};

export const destroyTodo = (id) => {
  return fetch(`${BASE_URL}/${id}`, {
    method: 'DELETE',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  });
};

import React, { Component } from 'react';
import './App.css';
import todoList from './todos.json';

class TodoItem extends Component {
  render() {
    return (
      <li className={this.props.completed ? 'completed' : 'not-completed'}>
		  	<div className="view">
		  		<input className="toggle" type="checkbox" />
		  		<label>{this.props.title}</label>
		  		<button className="destroy"></button>
		  	</div>
		  </li>
    )
  }
}

class TodoList extends Component {
  render() {
    return (
      <ul className="todo-list">
        {this.props.todos.map( todo => <TodoItem key={todo.id} title={todo.title} completed={todo.completed} /> )}
      </ul>
    )
  }
}

class App extends Component {

  handleKeyPress = (event) => {
    if(event.key === 'Enter'){
      console.log("new list item:", event.target.value);
    }
  }

  render() {
    return (
      <div className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <input className="new-todo" placeholder="This logs to the console" onKeyPress={this.handleKeyPress} autoFocus />
        </header>
			  <section className="main">
          <TodoList todos={todoList} />
			  </section>
			  <footer className="footer">
			  	<span className="todo-count"><strong>0</strong> item(s) left</span>
			  	<button className="clear-completed">Clear completed</button>
			  </footer>
      </div>
    );
  }
}

export default App;

import React, { Component } from 'react';
import './App.css';
import todoList from './todos.json';

class TodoItem extends Component {
  state = {
    completed: this.props.completed
  }

  handleCheck = (event) => {
    this.setState({
      completed: event.target.checked
    })
  }

  render() {
    return (
      <li className={this.state.completed ? 'completed' : 'not-completed'}>
		  	<div className="view">
		  		{this.props.completed
            ? <input className="toggle" defaultChecked type="checkbox" onClick={this.handleClick}/>
            : <input className="toggle" type="checkbox" onClick={this.handleCheck}/>
          }
		  		<label>{this.props.title}</label>
		  		<button className="destroy" onClick={this.handleDestroy}></button>
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
  state = {
    todos: todoList.slice()
  }

  handleKeyPress = (event) => {
    if(event.key === 'Enter'){
      this.setState({todos: [
        ...this.state.todos,
        {
          id: this.state.todos.length + 1,
          title: event.target.value,
          completed: false
        }
      ]})
      event.target.value = "";
    }
  }

  render() {
    return (
      <div className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <input className="new-todo" placeholder="What do you need to do today?" onKeyPress={this.handleKeyPress} autoFocus />
        </header>
			  <section className="main">
          <TodoList todos={this.state.todos} />
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

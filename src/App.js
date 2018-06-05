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
      <li className={this.state.completed ? 'completed' : 'not-completed'} id={this.props.id}>
		  	<div className="view">
		  		{this.props.completed
            ? <input className="toggle" defaultChecked type="checkbox" onClick={this.handleClick}/>
            : <input className="toggle" type="checkbox" onClick={this.handleCheck}/>
          }
		  		<label>{this.props.title}</label>
		  		<button className="destroy" onClick={this.handleDestroy}></button>
          {this.props.children}
		  	</div>
		  </li>
    )
  }
}

class TodoList extends Component {
  render() {
    return (
      <ul className="todo-list">
        {this.props.todos.map( todo =>
          <TodoItem id={todo.id} key={todo.id} title={todo.title} completed={todo.completed}>
            {this.props.children}
          </TodoItem> )}
      </ul>
    )
  }
}

class App extends Component {
  state = {
    todos: todoList.slice()
  }

  handleKeyPress = (event) => {
    if(event.key === 'Enter') {
      let maxId = Math.max.apply(Math,this.state.todos.map(function(o){return o.id;}));
      this.setState({todos: [
        ...this.state.todos,
        {
          id: maxId + 1,
          title: event.target.value,
          completed: false
        }
      ]})
      event.target.value = "";
    }
  }

  handleDestroy = (event) => {
    let id = parseInt( event.target.parentElement.parentElement.id, 10 );
    let index = this.state.todos.findIndex(element => {
      return element.id === id;
    })
    let newTodos = this.state.todos;
    newTodos.splice(index, 1);
    this.setState({ todos: newTodos })
  }

  render() {
    return (
      <div className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <input className="new-todo" placeholder="What do you need to do today?" onKeyPress={this.handleKeyPress} autoFocus />
        </header>
			  <section className="main">
          <TodoList todos={this.state.todos}>
            <button className="destroy" onClick={this.handleDestroy}></button>
          </TodoList>
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

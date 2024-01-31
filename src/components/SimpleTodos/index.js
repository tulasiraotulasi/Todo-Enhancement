import {Component} from 'react'
import {v4 as uuid} from 'uuid'
import TodoItem from '../TodoItem'
import './index.css'

const initialTodosList = [
  {
    id: uuid(),
    title: 'Book the ticket for today evening',
    checked: false,
  },
  {
    id: uuid(),
    title: 'Rent the movie for tomorrow movie night',
    checked: false,
  },
  {
    id: uuid(),
    title: 'Confirm the slot for the yoga session tomorrow morning',
    checked: false,
  },
  {
    id: uuid(),
    title: 'Drop the parcel at Bloomingdale',
    checked: false,
  },
  {
    id: uuid(),
    title: 'Order fruits on Big Basket',
    checked: false,
  },
  {
    id: uuid(),
    title: 'Fix the production issue',
    checked: false,
  },
  {
    id: uuid(),
    title: 'Confirm my slot for Saturday Night',
    checked: false,
  },
  {
    id: uuid(),
    title: 'Get essentials for Sunday car wash',
    checked: false,
  },
]

class SimpleTodos extends Component {
  state = {TodoList: initialTodosList, userInput: ''}

  onChangeValue = event => {
    this.setState({userInput: event.target.value})
  }

  uploadMany = (n, userInput) => {
    for (let i = 0; i < n; i += 1) {
      const temp = {id: uuid(), title: userInput, checked: false}
      console.log(temp)
      this.setState(prevState => ({
        TodoList: [...prevState.TodoList, temp],
        userInput: '',
      }))
    }
  }

  onAddList = () => {
    const {userInput} = this.state
    const isNumber = char =>
      char.charCodeAt(0) >= 48 && char.charCodeAt(0) <= 57
    if (userInput !== '') {
      let number = ''
      for (let i = userInput.length - 1; i >= 0; i -= 1) {
        const char = userInput[i]
        if (isNumber(char)) {
          number = char + number
        } else {
          break
        }
      }
      if (number !== '') {
        this.uploadMany(parseInt(number), userInput)
      } else {
        const temp = {id: uuid(), title: userInput, checked: false}
        console.log(temp)
        this.setState(prevState => ({
          TodoList: [...prevState.TodoList, temp],
          userInput: '',
        }))
      }
    }
  }

  saveChanges = (id, value) => {
    const {TodoList} = this.state
    const temp = TodoList.map(items => {
      if (id === items.id) {
        return {...items, title: value}
      }
      return items
    })
    this.setState({TodoList: temp})
  }

  deleteTodoItem = id => {
    const {TodoList} = this.state
    const userListUpdated = TodoList.filter(item => item.id !== id)
    this.setState({TodoList: userListUpdated})
  }

  onCheck = (id, value) => {
    const {TodoList} = this.state
    const temp = TodoList.map(items => {
      if (id === items.id) {
        return {...items, checked: value}
      }
      return items
    })
    this.setState({TodoList: temp})
  }

  render() {
    const {TodoList, userInput} = this.state
    return (
      <div className="mainDiv">
        <div className="innerDiv">
          <h1 className="heading">Simple Todos</h1>
          <div className="addTodo">
            <input
              type="text"
              placeholder="Add Todo...."
              value={userInput}
              onChange={this.onChangeValue}
            />
            <button
              type="button"
              className="addButton btn btnSuccess"
              onClick={this.onAddList}
            >
              Add
            </button>
          </div>
          <ul className="ullist">
            {TodoList.map(item => (
              <>
                <TodoItem
                  TodoListItem={item}
                  key={item.id}
                  deleteTodoItem={this.deleteTodoItem}
                  saveChanges={this.saveChanges}
                  onCheck={this.onCheck}
                />
                <hr className="hrtag" />
              </>
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default SimpleTodos

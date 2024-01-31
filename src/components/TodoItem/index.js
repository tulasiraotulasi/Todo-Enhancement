import {useState} from 'react'
import './index.css'

const TodoItem = props => {
  const {TodoListItem} = props
  const {id, title, checked} = TodoListItem
  const {deleteTodoItem, saveChanges, onCheck} = props

  const [listTitle, setListTitle] = useState(title)
  const [updateList, setUpdateList] = useState(false)

  const updateTask = event => {
    setListTitle(event.target.value)
  }

  const editTodo = () => {
    setUpdateList(true)
  }

  const saveTodo = () => {
    saveChanges(id, listTitle)
    setUpdateList(false)
  }

  const deleteTodo = () => {
    deleteTodoItem(id)
  }

  const onChecks = event => {
    onCheck(id, event.target.checked)
  }

  return (
    <li className="mainDivs">
      <input type="checkbox" onChange={onChecks} />
      {updateList ? (
        <input type="text" value={listTitle} onChange={updateTask} />
      ) : (
        <p className={checked ? 'todoPara ParaStrike' : 'todoPara'}>{title}</p>
      )}

      <div className="btnDiv">
        {!updateList && (
          <button type="button" className="btn" onClick={editTodo}>
            Edit
          </button>
        )}

        {updateList && (
          <button type="button" className="btn" onClick={saveTodo}>
            Save
          </button>
        )}

        <button type="button" className="btn" onClick={deleteTodo}>
          Delete
        </button>
      </div>
    </li>
  )
}

export default TodoItem

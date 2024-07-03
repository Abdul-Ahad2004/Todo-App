import React, { useEffect, useState } from 'react'
import Header from './components/Header'
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { BiSolidAddToQueue } from "react-icons/bi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [todoItems, settodoItems] = useState([]);
  const [Todo, setTodo] = useState("");
  const [view, setview] = useState("all")

  useEffect(() => {
    let todoString = localStorage.getItem("todos")
    if (todoString) {
      let todos = JSON.parse(localStorage.getItem("todos"))
      settodoItems(todos)
    }
  }, [])

  const Addtodo = () => {
    let newtodos = [...todoItems, { todo: Todo, isdone: false }];
    settodoItems(newtodos);
    save(newtodos)
    setTodo("");
    toast("Todo Added!");
  }

  const save = (newT) => {
    localStorage.setItem("todos", JSON.stringify(newT))
  }


  const DeleteTodo = (todo) => {
    let newtodos = todoItems.filter((item) => item !== todo)
    settodoItems(newtodos);
    save(newtodos)
    toast("Todo Deleted!");
  }

  const EditTodo = (todo) => {
    let newtodos = todoItems.filter((item) => item !== todo)
    settodoItems(newtodos);
    save(newtodos)
    setTodo(todo.todo);
  }

  const handlecheckbox = (e) => {
    let name = e.target.name
    let index = todoItems.findIndex((item) => item.todo === name)
    let newtodos = [...todoItems];
    newtodos[index].isdone = !newtodos[index].isdone;
    settodoItems(newtodos);
    save(newtodos)
  }

  const filtertodoitems = todoItems.filter((item) => {
    if (view == "pending") return !item.isdone
    else if (view == "completed") return item.isdone
    return true;
  })

  return (
    <>

      <header>
        <Header />
      </header>
      <main className=' w-[60%] ml-[20%] '>
        <div className=" flex sm:flex-row  items-center flex-col sm:gap-2 gap-1 sm:m-3 m-1">
          <input onChange={(e) => setTodo(e.target.value)} onKeyDown={(e) => {
            if (e.key === "Enter") {
              Addtodo()
            }
          }}
            className="p-2 sm:w-2/3 w-full m-2 rounded-md" value={Todo} name="input " type="text" placeholder='Enter your TODO here' />
          <button onClick={() => Addtodo()} className="bg-slate-500 max-w-min text-white rounded-xl p-2 m-2 px-5 "><BiSolidAddToQueue /></button>
          <ToastContainer
            position="top-center"
            autoClose={800}
          />

        </div>
        <h1 className=" text-center font-bold m-4 text-2xl w-40">Your TODOS</h1>
        <div className="buttons flex gap-3 ml-6">
          <button className='hover:text-blue-600 active:text-blue-600' onClick={() => setview("all")}>All</button>
          <button className='hover:text-blue-600 ' onClick={() => setview("pending")}>Pending</button>
          <button className='hover:text-blue-600' onClick={() => setview("completed")} >Completed</button>
        </div>
        <div className="todos  m-3 flex flex-col w-3/4 border-red-900 ">
          {filtertodoitems.length === 0 && <div className='m-4'> No TODOS to show</div>}
          {filtertodoitems.map((todo) =>
            <div key={todo.todo} className="todo flex items-center m-1 p-2 gap-2 sm:gap-5">
              <div className={`sm:w-2/3 w-full flex ${todo.isdone ? "line-through" : ""}`} > <input className="mr-2" onChange={handlecheckbox} name={todo.todo} checked={todo.isdone} type="checkbox" />{todo.todo}</div>
              {!todo.isdone && <button onClick={() => EditTodo(todo)} className="bg-slate-500 text-white rounded-xl p-1 px-2 sm:px-5 " ><FaEdit /></button>}
              <button onClick={() => DeleteTodo(todo)} className="bg-slate-500 text-white rounded-xl p-1 px-2 sm:px-5 " ><MdDelete /></button>
            </div>
          )}
        </div>
      </main>
    </>
  )
}

export default App

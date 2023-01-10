import './App.css';
import Header from './MyComponents/Header';
import Todos from './MyComponents/Todos';
import Footer from './MyComponents/Footer';
import AddTodo from './MyComponents/AddTodo';
import React, { useState,useEffect } from 'react';
import About from './MyComponents/About';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
    let initTodo;
    if(localStorage.getItem("todos")===null){
        initTodo = [];  
    }
    else{
        initTodo = JSON.parse(localStorage.getItem("todos"));
    }
    const onDelete = (todo) => {
        // console.log("I am on delete",todo);
        // Deleting in this way n react does not work
        // let index = todos.indexOf(todo);
        // todos.splice(index, 1);
        console.log(todos);
        setTodos(todos.filter((e)=>{
          return e!==todo;
        }));
        localStorage.setItem("todos", JSON.stringify(todos));
    }
    const addTodo = (title, desc)=>{
        console.log("the current todo is ", title, desc);
        let sn;
        if(todos.length === 0){
         sn = 0;
        }
        else{
        sn = todos[todos.length-1].sn + 1;  
        }
        const myTodo = {
            sn : sn,
            title:title,
            desc:desc,
        }
        // console.log(myTodo);
        setTodos([...todos, myTodo]);
    }
    const [todos, setTodos] = useState(initTodo);
    useEffect(()=>{
        localStorage.setItem("todos", JSON.stringify(todos));
    }, [todos])
    return (
        <>
        <BrowserRouter>
        <Header title="My Site" searchBar={true}/>
        <Routes>
        {/* <Route exact path="/" element={<AddTodo addTodo={addTodo}/>}>
        </Route> */}
        <Route exact path="/" element={
        <>
        <AddTodo addTodo={addTodo}/>
        <Todos todos={todos} onDelete={onDelete}/>
        </>
        }>
        </Route>
        <Route exact path="/about" element={<About />}></Route>
        </Routes>
        </BrowserRouter>
        
        <Footer/>
        </>
  );    
}

export default App;

import React, { useEffect, useState } from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import TodoLi from './TodoLi';
import { auth, db } from '../firebasae';
import {
  query,
  collection,
  onSnapshot,
  updateDoc,
  doc,
  addDoc,
  deleteDoc,
} from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import { signOut } from 'firebase/auth';

const Todo = () => {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');
  const [user] = useAuthState(auth);

  const userTodosCollection = user ? collection(db, 'users', user.uid, 'todos') : null;

  const createTodo = async (e) => {
    e.preventDefault(e);
    if (input === '') {
      alert('Please enter a valid todo');
      return;
    }

    if (user) {
      await addDoc(userTodosCollection, {
        text: input,
        completed: false,
      });
      setInput('');
    }
  };

  useEffect(() => {
    const fetchTodos = async () => {
      if (user) {
        const q = query(userTodosCollection);
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
          let todosArr = [];
          querySnapshot.forEach((doc) => {
            todosArr.push({ ...doc.data(), id: doc.id });
          });
          setTodos(todosArr);
        });

        return () => unsubscribe();
      }
    };

    fetchTodos();
  }, [user, userTodosCollection]);

  const toggleComplete = async (todo) => {
    if (user) {
      await updateDoc(doc(userTodosCollection, todo.id), {
        completed: !todo.completed,
      });
    }
  };

  const deleteTodo = async (id) => {
    if (user) {
      await deleteDoc(doc(userTodosCollection, id));
    }
  };

  const editTodo = async (id, newText) => {
    if (user) {
      await updateDoc(doc(userTodosCollection, id), {
        text: newText,
      });
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      // You can perform additional actions after logout if needed
    } catch (error) {
      console.error('Error logging out:', error.message);
    }
  };

  return (
    <div className='bg-gradient-to-b from-emerald-500 to-blue-800 flex items-center justify-center min-h-screen pt-4 px-4 pb-10 text-center sm:block sm:p-0 h-screen w-full '>
      <div className='inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-xl sm:w-full '>
        <h1 className='text-red-500 w-full text-center py-3 font-bold'>Todo App</h1>
        <form onSubmit={createTodo} className='w-full flex justify-center'>
          <div className='flex items-center w-full pb-4 px-6'>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              type='text'
              placeholder='Add todo'
              className='rounded-md border w-full mr-2 px-2 py-3  '
            />
            <button className='bg-red-500 rounded-md py-2 px-2'>
              <AiOutlinePlus size={30} />
            </button>
          </div>
        </form>
        <ul>
          {todos.map((todo, index) => (
            <TodoLi key={index} todo={todo} toggleComplete={toggleComplete} deleteTodo={deleteTodo} editTodo={editTodo} />
          ))}
        </ul>
        <div className='flex items-center gap-4 justify-center'>
          {todos.length < 1 ? null : <p className='text-center py-3'>You Have {todos.length} Todos</p>}
          <button onClick={handleLogout} className='bg-gradient-to-b from-emerald-500 to-blue-800 rounded-full text-white font-bold px-6 flex justify-center py-2'>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Todo;

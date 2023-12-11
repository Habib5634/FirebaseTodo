import React, { useState } from 'react';
import { FaRegTrashAlt, FaRegEdit, FaCheck, FaTimes } from 'react-icons/fa';

const TodoLi = ({ todo, toggleComplete, deleteTodo, editTodo }) => {
  const [isEditing, setEditing] = useState(false);
  const [editedText, setEditedText] = useState(todo.text);

  const handleEdit = () => {
    setEditing(true);
  };

  const handleSaveEdit = () => {
    editTodo(todo.id, editedText);
    setEditing(false);
  };

  const handleCancelEdit = () => {
    setEditing(false);
  };

  return (
    <li className={`${todo.completed ? 'flex justify-between bg-slate-400 p-6 my-2 capitalize' : 'flex justify-between bg-slate-200 p-6 my-2 capitalize'} `}>
      <div className='flex py-2'>
        <input onChange={() => toggleComplete(todo)} className='' type='checkbox' checked={todo.completed ? 'checked' : ''} />
        {isEditing ? (
          <input
            type='text'
            value={editedText}
            onChange={(e) => setEditedText(e.target.value)}
            className='ml-2 px-2 py-1 border rounded-md'
          />
        ) : (
          <p onClick={() => toggleComplete(todo)} className={` ${todo.completed ? 'ml-2 cursor-pointer line-through' : 'ml-2 cursor-pointer'} `}>
            {todo.text}
          </p>
        )}
      </div>
      <div className='flex gap-4'>
        {isEditing ? (
          <>
            <button onClick={handleSaveEdit} className='cursor-pointer flex items-center'>
              <FaCheck />
            </button>
            <button onClick={handleCancelEdit} className='cursor-pointer flex items-center'>
              <FaTimes />
            </button>
          </>
        ) : (
          <>
            <button onClick={() => deleteTodo(todo.id)} className='cursor-pointer flex items-center'>
              <FaRegTrashAlt />
            </button>
            <button onClick={handleEdit} className='cursor-pointer flex items-center'>
              <FaRegEdit />
            </button>
          </>
        )}
      </div>
    </li>
  );
};

export default TodoLi;
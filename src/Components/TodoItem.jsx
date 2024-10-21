import React from 'react';

const TodoItem = ({ note }) => {
  return (
    <div className="todo-item">
      <p>{note.content}</p>
    </div>
  );
};

export default TodoItem;

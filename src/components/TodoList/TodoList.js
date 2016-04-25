import React from 'react';
import Todo from '../Todo'

export default React.createClass({
  completeTodo: function(index) {
    this.props.onDoneTask(index)
  },
  removeTodo: function(index) {
    this.props.onRemoveTask(index)
  },
  render: function() {
    var tasks = this.props.list.map(function(task, index) {
      var category_name = this.props.categories.filter(function( category ) {
        return category.id == task.category;
      }.bind(this))[0].name;
      if (task.done && this.props.hideDoneTasks) {
        return;
      }
      return (
        <Todo 
          key={task.id}
          date={task.date}
          category_name={category_name}
          done={task.done}
          onClickDone={this.completeTodo.bind(this, index)}
          onClickClose={this.removeTodo.bind(this, index)}
          >
          {task.text}
        </Todo>
      )
    }.bind(this));

    return (
      <table className="TodoList table table-fixed">
        <thead>
          <tr>
            <th className="col-md-2">Estimate date</th>
            <th className="col-md-2">Category</th>
            <th className="col-md-6">Description</th>
            <th className="col-md-2"></th>
          </tr>
        </thead>
        <tbody>
          {tasks}
        </tbody>
      </table>
    );
  }
});
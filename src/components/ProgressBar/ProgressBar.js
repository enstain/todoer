import React from 'react';
import Badges from '../Badges'

export default React.createClass({
  currentLevel() {
    var done_tasks_count = this.props.list.filter(function(task) { return task.done }).length + 1,
        level = Math.floor(Math.log(done_tasks_count)),
        tasks_count_for_current_level = Math.floor(Math.exp(level)),
        tasks_count_for_next_level = Math.floor(Math.exp(level+1)),
        progress = Math.floor(((done_tasks_count - tasks_count_for_current_level) / (tasks_count_for_next_level - tasks_count_for_current_level)) * 100);
    
    if (progress == 100) {
      progress = 0
      level += 1
    }
    return({
      level: level,
      progress: progress
    })
  },
  componentDidUpdate() {
    var level = this.currentLevel().level
    if (level > this.props.level) {
      this.props.onLevelProgress(level)
    }
  },
  render: function() {
    var status = this.currentLevel()
    var categorized_tasks = this.props.categories.map(function(category) {
          category.tasks_count = 0
          category.done_tasks_count = 0
          this.props.list.forEach(function(task) {
            if (task.category == category.id) {
              category.tasks_count += 1  
              if (task.done) {
                category.done_tasks_count += 1
              }
            }
          });
      
      return (
        <li className="list-group-item" key={category.id}>
          {category.name}
          <span className="badge">tasks done: {category.done_tasks_count} of {category.tasks_count}</span>
        </li>
      )
    }.bind(this));
    return (
      <div className="progressBar">
        <div className="panel panel-info">
          <div className="panel-heading">Your progress</div>
          <div className="panel-body">
            <h1 className="level">LEVEL <span className="label label-primary">{status.level}</span></h1>
            <div className="progress">
              <div 
                className="progress-bar" 
                role="progressbar" 
                aria-valuenow={status.progress} 
                aria-valuemin="0" 
                aria-valuemax="99" 
                style={{width: status.progress + '%'}}
              >
                {status.progress}%
              </div>
            </div>
          </div>
          <ul className="list-group">
            {categorized_tasks}
          </ul>
        </div>

        <Badges 
          badges={this.props.badges}
        />
      </div>
    );
  }
});
import React from 'react';
import TodoForm from '../TodoForm'
import TodoFilter from '../TodoFilter'
import TodoList from '../TodoList'
import ProgressBar from '../ProgressBar'

var CATEGORIES = [
  {id: 1, name: 'Work'},
  {id: 2, name: 'Study'},
  {id: 3, name: 'Home'},
  {id: 4, name: 'Family'},
  {id: 5, name: 'Activities'}
]

var TODO_LIST = [
  {id: 1, date: '2016-04-25', category: 1, text: 'finish this project', done: false},
  {id: 2, date: '2016-04-24', category: 2, text: 'read article', done: false},
  {id: 3, date: '2016-04-25', category: 2, text: 'read another article', done: false},
  {id: 4, date: '2016-04-26', category: 2, text: 'read another article', done: false},
  {id: 5, date: '2016-04-27', category: 2, text: 'read another article', done: false},
  {id: 6, date: '2016-04-28', category: 2, text: 'read another article', done: false},
  {id: 7, date: '2016-04-29', category: 2, text: 'read another article', done: false},
  {id: 8, date: '2016-04-30', category: 2, text: 'read another article', done: false}
];

var BADGES = [
  {icon: 'fa-coffee', title: "First Blood", text: "Get first level"},
  {icon: 'fa-briefcase', title: "Busy Bee", text: "Over 3 tasks for one day"},
  {icon: 'fa-clock-o', title: "Just in time", text: "Complete task before estimation"}
]

export default React.createClass({
  getInitialState() {
    return {list: [], badges: [], today_tasks_count: 0, hideDoneTask: false, level: 0};
  },
  componentDidMount() {
    this.loadTasks();
  },
  loadTasks() {
    this.setState({list: TODO_LIST})
  },
  addBadge(index) {
    var badges = this.state.badges,
        new_badge = BADGES[index],
        exists_already = badges.filter(function(badge) {return badge.title == new_badge.title})[0]
    if (exists_already) {
      badges.splice(badges.indexOf(exists_already), 1); 
      new_badge.count = exists_already.count+1
    } else {
      new_badge.count = 1
    }
    new_badge.id = new Date()+Math.random()
    badges.push(new_badge)
    this.setState({badges: badges})
  },
  handleLevelProgress(level) {
    if (level == 1) {
      this.addBadge(0)
    }

    this.setState({level: level})
    this.handleAddTask({
      date: new Date().toISOString().substring(0, 10),
      category: 5,
      text: 'Take a rest, have fun!'
    })
  },
  handleFilterInput(hideDoneTask) {
    this.setState({
      hideDoneTask: hideDoneTask
    });
  },
  handleAddTask(task) {
    var list = this.state.list;
    task.id = Date.now()+Math.random();
    task.done = false;
    if (task.date == new Date().toISOString().substring(0, 10)) {
      var today_tasks_count = this.state.today_tasks_count+1
      if (today_tasks_count > 3) {
        this.addBadge(1)
        today_tasks_count = 0;
      }
      this.setState({today_tasks_count: this.state.today_tasks_count+1})
    }
    list.unshift(task);
    this.setState({list: list});
  },
  handleDoneTask(index) {
    var list = this.state.list;
    var task = this.state.list[index];
    list.splice(index, 1);
    task.done = !task.done;
    task.done ? list.push(task) : list.unshift(task);

    if (new Date() < new Date(task.date)) {
      this.addBadge(2)
    }

    this.setState({
      list: list
    });
  },
  handleRemoveTask(index) {
    var list = this.state.list;
    list.splice(index, 1);

    this.setState({
      list: list
    });
  },
  render() {
    return (
      <div className="row">
        <div className="col-md-8">
          <TodoForm 
            categories={CATEGORIES}
            onAddTask={this.handleAddTask} 
          />
          <TodoList 
            categories={CATEGORIES}
            onDoneTask={this.handleDoneTask}
            onRemoveTask={this.handleRemoveTask}
            hideDoneTasks={this.state.hideDoneTask}
            list={this.state.list}
          />
          <TodoFilter
            onFilterInput={this.handleFilterInput}
          />
        </div>
        <div className="col-md-4">
          <ProgressBar
            categories={CATEGORIES}
            list={this.state.list}
            badges={this.state.badges}
            level={this.state.level}
            onLevelProgress={this.handleLevelProgress}
          />
        </div>
      </div>
    );
  }
});
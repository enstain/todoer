import React from 'react';

export default React.createClass({
  getInitialState() {
    return {date: new Date().toISOString().substring(0, 10), category: 1, text: ''}
  },
  handleChange() {
    this.setState({
      date:this.refs.dateInput.value,
      category:this.refs.categoryInput.value,
      text:this.refs.textInput.value,
      hasError:false
    });
  },
  taskSubmit(e) {
    var date = this.state.date;
    var category = this.state.category;
    var text = this.state.text.trim();
    if (!text || !date) {
      return;
    } else {
      this.props.onAddTask({date: date, category: category, text: text});
      this.setState({date: new Date().toISOString().substring(0, 10), category: 1, text: ''})  
    }
    
  },
  render() {
    var category_options = this.props.categories.map(function(category) {
      return (
        <option value={category.id} key={category.id}>{category.name}</option>
      );
    });
    return (
      <table className="table">
        <tbody>
          <tr className="TodoForm">
            <td className="col-md-2">
              <input 
                type="date"
                className="form-control"
                value={this.state.date}
                ref="dateInput"
                onChange={this.handleChange}
              />
            </td>
            <td className="col-md-2">
              <select 
                className="form-control"
                ref="categoryInput"
                onChange={this.handleChange}
              >
                {category_options}
              </select>
            </td>
            <td className="col-md-7">
              <div className={this.state.hasError}></div>
              <input 
                type="text"
                className="form-control"
                placeholder="Task text" 
                ref="textInput"
                onChange={this.handleChange}
              />
            </td>
            <td className="col-md-1">
              <input type="submit" className="btn btn-primary" value="Add Task" onClick={this.taskSubmit} />
            </td>
          </tr>
        </tbody>
      </table>
    );
  }
});
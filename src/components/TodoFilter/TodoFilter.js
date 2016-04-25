import React from 'react';

export default React.createClass({
  handleDoneFilter: function() {
    this.props.onFilterInput(
      this.refs.hideDoneTasksInput.checked
    )
  },
  render: function() {
    return (
      <div>
        <hr/>
        <form>
          <div className="checkbox">
            <label>
              <input 
                type="checkbox" 
                checked={this.props.hideDoneTasks}
                ref="hideDoneTasksInput"
                onChange={this.handleDoneFilter}
              />
              {' '}
              Hide done tasks
            </label>
          </div>
        </form>
      </div>
    );
  }
});
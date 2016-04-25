import React from 'react';
import classNames from 'classnames'

export default React.createClass({
  render: function() {
    var taskClass = classNames({
      'task': true,
      'success': this.props.done
    });
    var actionClass = classNames({
      'fa': true,
      'fa-check': !this.props.done,
      'fa-undo': this.props.done
    })
    return (
      <tr className={taskClass}>
        <td className="col-md-2">{this.props.date}</td>
        <td className="col-md-2">{this.props.category_name}</td>
        <td className="col-md-6" title={this.props.children}>{this.props.children}</td>
        <td className="col-md-2">
          <button className="btn btn-success" onClick={this.props.onClickDone}>
            <i className={actionClass}></i>
          </button>
          {' '}
          <button className="btn btn-danger" onClick={this.props.onClickClose}>
            <i className="fa fa-trash" aria-hidden="true"></i>
          </button>
        </td>
      </tr>
    );
  }
});
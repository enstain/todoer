import React from 'react';
import classNames from 'classnames'

export default React.createClass({
  render: function() {
    var badges = this.props.badges.map(function(badge) {
      var badgeIconClass = classNames({
        'fa': true,
        'fa-3x': true,
        'media-object': true
      })
      badgeIconClass += ' '+badge.icon
      return(
        <div className="media" key={badge.id}>
          <div className="media-left">
            <i className={badgeIconClass} />
          </div>
          <div className="media-body">
            <h4 className="media-heading">
              {badge.title}
              &nbsp;
              { badge.count > 1 ? <span className="badge">x{badge.count}</span> : null }
            </h4>
            {badge.text}
          </div>
        </div>
      )
    })

    return (
      <div>
        {badges}
      </div>
    );
  }
});
import React from 'react';
import ToDoer from '../ToDoer/';
import DocTitle from 'react-document-title';

export default React.createClass({
	render() {
		return (
			<div className='Home'>
				<DocTitle title='ToDoer - Home'/>
        <div className="container">
          <ToDoer/>
        </div>
			</div>
		);
	},
});

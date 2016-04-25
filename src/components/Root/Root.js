import React from 'react';
import Header from '../Header/';
import DocTitle from 'react-document-title';

export default React.createClass({
	render() {
		return (
			<div className='Root'>
				<DocTitle title='Default Page Title'/>
				<Header/>
				<div className='Root_main'>
					{this.props.children}
				</div>
			</div>
		);
	},
});
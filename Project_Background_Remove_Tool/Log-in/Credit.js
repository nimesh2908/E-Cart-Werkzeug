const { Component, Store, mount, useState } = owl;
const { xml } = owl.tags;

export class Credit extends Component {
	static template = xml `
		<div>
			<h1>Your Credit:</h1>
		</div>
	`;

}
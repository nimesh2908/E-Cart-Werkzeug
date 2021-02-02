const { Component, Store, mount } = owl;
const { xml } = owl.tags;

export class signup extends Component {
	static template = xml`	<div>
								<label>Email:</label>
								<input type="text" placeholder="Enter Your Email Address"/>
								<label>Mobile Number</label>
								<input type="text" placeholder="Enter Mobile Number"/>
								<label>New Password</label>
								<input type="Password" name="pass"/>
								<label>Re-enter Password</label>
								<input type="Password" name="rpass"/>
								<input type="button" name="btn" value="submit"/>
							</div>`;

}

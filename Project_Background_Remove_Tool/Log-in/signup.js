const { Component, Store, mount } = owl;
const { xml } = owl.tags;

export class Signup extends Component {

	static template = xml`	<div id="dv">
									<tr id="tr">	
										<label>Email:</label>
										<input type="text" placeholder="Enter Your Email Address"/>
									</tr>
									<tr>
										<label>Mobile Number</label>
										<input type="text" placeholder="Enter Mobile Number"/>
									</tr>
									<tr>
										<label>New Password</label>
										<input type="Password" name="pass"/>
									</tr>
									<tr>
										<label>Re-enter Password</label>
										<input type="Password" name="rpass"/>
									</tr>
									<tr>
										<input type="button" name="btn" value="submit"/>
									</tr>
							</div>`;


}
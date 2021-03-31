const { Component, Store, mount, useState } = owl;
const { xml } = owl.tags;

export class Credit extends Component {



	constructor() {
      super(...arguments);
      // event_type, owner, callback
       this.state = useState({
            session_id: odoo.session_info.session_id,
            credit: odoo.session_info.credit,
        });
    }

	static template = xml `
		<div>
			<div>
				<table>
					<tr>
						<th>
							<h1>Your Credit:<t t-esc="state.Credit"></t></h1>
						</th>
						<th>
							<button type="submit" class="btn btn-primary" t-on-click="onClickCredit">Show</button>
						</th>
					</tr>
				</table>
			</div>
			<div class="d-flex justify-content-center">
				<div class="card text-center">
					<div class="card-header">
						Subscription Plans
					</div>
					<form action="#" t-on-submit.prevent="OnSubscription">
						<table class="table">
						  <thead>
						    <tr>
						      <th scope="col"></th>
						      <th scope="col">Plans</th>
						      <th scope="col">Price</th>
						    </tr>
						  </thead>
						  <tbody>
						    <tr>
						      <th scope="row">
						      		 <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1"/>
						      </th>
						      <td>10 Credit</td>
						      <td>100</td>
						    </tr>
						    <tr>
						      <th scope="row">
						      		<input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1"/>
						      </th>
						      <td>20 Credit</td>
						      <td>180</td>
						    </tr>
						    <tr>
						      <th scope="row">
						      		<input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1"/>
						      </th>
						      <td>40 Credit</td>
						      <td>350</td>
						    </tr>
						  </tbody>
						</table>
						<button type="submit" class="btn btn-primary">Subscription</button>
					</form>
				</div>
			</div>
		</div>
	`;

	async onClickCredit(ev){
		const xhr = new window.XMLHttpRequest();
        xhr.open('POST', '/do_credit');
        xhr.send(JSON.stringify({'session_id': this.state.session_id}));
        xhr.onload = async () => {
        	const response = JSON.parse(xhr.response);
        	
        	if (response.Credit) {
        		console.log("Credit Showing Sucessfully");
        		this.state.Credit = response.Credit;
        		console.log(this.state.credit)
        	}
        }
	}
}
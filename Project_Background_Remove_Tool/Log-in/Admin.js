const { Component, Store, mount, useState } = owl;
const { xml } = owl.tags;

export class Admin extends Component {

	constructor() {
      super(...arguments);
      // event_type, owner, callback
       this.state = useState({
            session_id: odoo.session_info.session_id,
            credit: odoo.session_info.credit,
            details: null,
            order_detail: null,
        });
    }
    onCLickDetails(ev){
    	const xhr = new window.XMLHttpRequest();
	    xhr.open('POST', '/do_customer_details');
        xhr.send(JSON.stringify({'session_id': 'hii'}));
	    xhr.onload = async () => {
	    	const response = JSON.parse(xhr.response);
	    	this.state.details = response.details;
	    }
    }
    onClickOrderDetails(ev){
    	const xhr = new window.XMLHttpRequest();
	    xhr.open('POST', '/do_order_details');
        xhr.send(JSON.stringify({'session_id': 'hii'}));
	    xhr.onload = async () => {
	    	const response = JSON.parse(xhr.response);
	    	this.state.order_detail = response.order;
	    }
    }


	static template = xml `
		<div class="card text-center">
		  	<div class="card-header">
		    	Dashboard
		  	</div>
		  	<div class="row">
			  	<div class="col-sm-6">
			    	<div class="card">
				    	<t t-if="state.details">
					    	<table class="table">
							  	<thead>
							    	<tr>
							      		<th scope="col">No</th>
							      		<th scope="col">Email</th>
							      		<th scope="col">Credit</th>
							    	</tr>
							  	</thead>
							  	<tbody>
							  		<t t-foreach="state.details" t-as="i">
							    		<tr>
							      			<th scope="row">
							      				<t t-esc="i[0]"/>
							      			</th>
							      			<td>
							      				<t t-esc="i[1]"></t>
							      			</td>
							      			<td>
							      				<t t-esc="i[2]"></t>
							      			</td>
							    		</tr>	
							   		</t>
							  	</tbody>
							</table>
			  			</t>
			  			<t t-else="">
				      		<div class="card-body">
				        		<h5 class="card-title">Customer Details</h5>
								<button class="btn btn-primary" type="button" t-on-click="onCLickDetails">Details</button>
				      		</div>
				      	</t>
				    </div>
			  	</div>
			  	<div class="col-sm-6">
			    	<div class="card">
			    		<t t-if="state.order_detail">
					    	<table class="table">
							  	<thead>
							    	<tr>
							      		<th scope="col">No</th>
							      		<th scope="col">user-ID</th>
							      		<th scope="col">Email</th>
							      		<th scope="col">Date</th>
							      		<th scope="col">Time</th>
							    	</tr>
							  	</thead>
							  	<tbody>		
							  		<t t-foreach="state.order_detail" t-as="i">
							    		<tr>
							    			<td>
							      				<th scope="row"><t t-esc="i.id"/></th>
							      			</td>
							      			<td>
							      				<t t-esc="i.user_id"/>
							      			</td>
							    			<td>
							      				<t t-esc="i.email"></t>
							    			</td>
							      			<td>
							      				<t t-esc="i.day"></t>/
							      				<t t-esc="i.month"></t>/
							      				<t t-esc="i.year"></t>
							    			</td>
							    			<td>
							      				<t t-esc="i.hour"></t>:
							      				<t t-esc="i.minute"></t>
							    			</td>
							    		</tr>
							   		</t>
							  	</tbody>
							</table>
			  			</t>
			  			<t t-else="">
				      		<div class="card-body">
					        	<h5 class="card-title">Order Details</h5>
								<button class="btn btn-primary" type="button" t-on-click="onClickOrderDetails">Order Details</button>
				      		</div>
				      	</t>
			    	</div>
			  	</div>
			</div>
		</div>`;
}
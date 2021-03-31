const { Component, Store, mount, useState } = owl;
const { xml } = owl.tags;

export class Profile extends Component {

	constructor() {
      super(...arguments);
      this.env.bus.on('dataChange', this, this.dataChange);
      // event_type, owner, callback
      this._updateState(); 
    }
    _updateState(){debugger
		this.state = useState({
			user_id: odoo.session_info.user_id,
			session_id: odoo.session_info.session_id,
        	credit: odoo.session_info.credit,
        	cr: false,
        	usage: [],
        	billing: [],
		});
    }
    dataChange(ev){
    	this._updateState();
    }
    onClickBuy(){
/*    	this._updateState();
*/    	this.state.cr = true;
    }
    OnClickSubscription(ev){
    	const xhr = new window.XMLHttpRequest();
	    xhr.open('POST', '/do_credit');
	    const formData = new FormData(ev.currentTarget);
	    xhr.send(JSON.stringify(Object.fromEntries(formData.entries())));
	    xhr.onload = async () => {
	    	const response = JSON.parse(xhr.response);
	    	this.state.credit = response.credit;
	    	alert(this.state.credit);
	    } 
	    this.state.cr = false;
	    this._updateState();
    }
    onClickBilling(ev){
    	const xhr = new window.XMLHttpRequest();
	    xhr.open('POST', '/do_billing');
        xhr.send(JSON.stringify({'user_id': this.state.user_id}));
	    xhr.onload = async () => {
	    	const response = JSON.parse(xhr.response);
	    	this.state.billing = response.billing_details;
	    }
    }
    onClickUsage(ev){
    	const xhr = new window.XMLHttpRequest();
	    xhr.open('POST', '/do_usage');
        xhr.send(JSON.stringify({'user_id': this.state.user_id}));
	    xhr.onload = async () => {
	    	const response = JSON.parse(xhr.response);
	    	this.state.usage = response.usage_details;
	    }
	}
	
	static template = xml `
							<div>
								<div class="d-flex justify-content-center">
									<div class="card text-center">
										<div class="card-header">
								    		Credit
								  		</div>
								  		<div class="card-body">
											<ul class="nav nav-tabs" id="myTab" role="tablist">
							  					<li class="nav-item" role="presentation">
										    		<button class="nav-link active" id="credit-tab" data-bs-toggle="tab" data-bs-target="#credit" type="button" role="tab" aria-controls="credit" aria-selected="true">Credit</button>
										  		</li>
										  		<li class="nav-item" role="presentation">
										    		<button class="nav-link" id="billing-tab" data-bs-toggle="tab" data-bs-target="#billing" type="button" role="tab" aria-controls="billing" aria-selected="false" t-on-click="onClickBilling">Payment And Billing</button>
										  		</li>
										  		<li class="nav-item" role="presentation">
										    		<button class="nav-link" id="apikey-tab" data-bs-toggle="tab" data-bs-target="#apikey" type="button" role="tab" aria-controls="apikey" aria-selected="false">API Key</button>
										  		</li>
										  		<li class="nav-item" role="presentation">
										    		<button class="nav-link" id="usage-tab" data-bs-toggle="tab" data-bs-target="#usage" type="button" role="tab" aria-controls="usage" aria-selected="false" t-on-click="onClickUsage">Usage</button>
										  		</li>
											</ul>
											<div class="tab-content" id="myTabContent">
										  		<div class="tab-pane fade show active" id="credit" role="tabpanel" aria-labelledby="credit-tab">
											  		<div class="d-flex justify-content-center mt-5" >
											  			<t t-if="state.cr">
											  				<div class="d-flex justify-content-center">
																<div class="card text-center">
																	<div class="card-header">
																		Subscription Plans
																	</div>
																	<form action="#" t-on-submit.prevent="OnClickSubscription">
																		<input type="hidden" id="custId" name="session_id" t-att-value="state.session_id"/>
																		<input type="hidden" id="userid" name="user_id" t-att-value="state.user_id"/>
																		<div class="form-check">
																		  	<input class="form-check-input" type="radio" t-att-value="10" name="flexRadioDefault" id="flexRadioDefault1" required="true"/>
																		  	<label class="form-check-label" for="flexRadioDefault1">
																		    	10 Credit
																		  	</label>
																		</div>
																		<div class="form-check">
																		  	<input class="form-check-input" type="radio" t-att-value="20" name="flexRadioDefault" id="flexRadioDefault2"/>
																		  	<label class="form-check-label" for="flexRadioDefault2">
																			    20 Credit
																		  	</label>
																		</div>
																		<div class="form-check">
																		  	<input class="form-check-input" type="radio" t-att-value="30" name="flexRadioDefault" id="flexRadioDefault3"/>
																		  	<label class="form-check-label" for="flexRadioDefault3">
																			    30 Credit
																		  	</label>
																		</div>
																		<div class="form-check">
																		  	<input class="form-check-input" type="radio" t-att-value="40" name="flexRadioDefault" id="flexRadioDefault4"/>
																		  	<label class="form-check-label" for="flexRadioDefault4">
																			    40 Credit
																		  	</label>
																		</div>
																		<button type="submit" class="btn btn-primary">Subscription</button>
																	</form>
																</div>
															</div>
											  			</t>
											  			<t t-else="">
											  			<div class="card text-center" style="width: 18rem;">
														  	<div class="card-body">
														    	<h5 class="card-title">Your Credit</h5>
														    	<p t-esc="state.credit"></p>
														  	</div>
														</div>
														<div class="card text-center" style="width: 18rem;">
														  	<div class="card-body">
														  		<button class="btn btn-primary" type="submit" t-on-click="onClickBuy" >Buy More Credit</button>
														  	</div>
														</div>
														</t>
													</div>
										  		</div>
										  		<div class="tab-pane fade" role="tabpanel" id="billing" aria-labelledby="billing-tab">
										  			<div class="d-flex justify-content-center mt-5" >
											  			<div class="card text-center" style="width: 18rem;">
														  	<div class="card-body">
														    	<h5 class="card-title">Billing And Payment</h5>
														    	<table class="table">
					    										<thead>
															    	<tr>
															      		<th scope="col">No</th>
															      		<th scope="col">Date</th>
															      		<th scope="col">Credit</th>
															    	</tr>
															  	</thead>
															    	<tbody>
																    	<t t-foreach="state.billing" t-as="i">
									                                        <tr>
									                                        	<td><t t-esc="i.id"></t></td>
									                                            <td>
									                                            	<p>
									                                                	<t t-esc="i.day"></t>
									                                                	/
									                                                	<t t-esc="i.month"></t>
									                                                	/
									                                                	<t t-esc="i.year"></t>

									                                                </p>
									                                            </td>
									                                            <td>
									                                                <p>
									                                                	<t t-esc="i.credit"/>
									                                                </p>
									                                            </td>
									                                        </tr>   
										                                </t>
									                                </tbody>
									                            </table>
														  	</div>
														</div>
													</div>
										  		</div>
										  		<div class="tab-pane fade" role="tabpanel" id="apikey" aria-labelledby="apikey-tab">
										  			<div class="d-flex justify-content-center mt-5" >
											  			<div class="card text-center" style="width: 18rem;">
														  	<div class="card-body">
														    	<h5 class="card-title">API Key</h5>
														  	</div>
														</div>
													</div>
										  		</div>
										  		<div class="tab-pane fade" role="tabpanel" id="usage" aria-labelledby="usage-tab">
										  			<div class="d-flex justify-content-center mt-5" >
											  			<div class="card text-center" style="width: 18rem;">
														  	<div class="card-body">
														    	<h5 class="card-title">Usage</h5>
					    										<table class="table">
					    										<thead>
															    	<tr>
															      		<th scope="col">No</th>
															      		<th scope="col">Date</th>
															      		<th scope="col">Time</th>
															    	</tr>
															  	</thead>
															    	<tbody>
																    	<t t-foreach="state.usage" t-as="i">
									                                        <tr>
									                                        	<td><t t-esc="i.id"></t></td>
									                                            <td>
									                                            	<p>
									                                                	<t t-esc="i.day"></t>
									                                                	/
									                                                	<t t-esc="i.month"></t>
									                                                	/
									                                                	<t t-esc="i.year"></t>

									                                                </p>
									                                            </td>
									                                            <td>
									                                                <p>
									                                                	<t t-esc="i.hour"/>
									                                                	:
									                                                	<t t-esc="i.minute"/>
									                                                </p>

									                                            </td>
									                                        </tr>   
										                                </t>
									                                </tbody>
									                            </table>
														  	</div>
														</div>
													</div>
										  		</div>
									  		</div>
										</div>
									</div>
								</div>
							</div>`;	
}


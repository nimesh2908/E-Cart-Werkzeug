const { Component, Store, mount, useState } = owl;
const { xml } = owl.tags;

export class Signin extends Component {
	static template = xml `<div class="d-flex justify-content-center" style="height:26em;">
								<div class="card text-center">
									<div class="card-header">
								    	Signin
								  	</div>
								  	<div class="card-body">
								  		<form action="#" t-on-submit.prevent="OnLoginsubmit">
								  			<div class="mb-3">
								    			<label for="exampleInputEmail1" class="form-label">Email address</label>
								    			<input name="email" type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" required="true"/>
								    			<div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
								  			</div>
								  			<div class="mb-3">
								    			<label for="exampleInputPassword1" class="form-label">Password</label>
								    			<input name="password" type="password" class="form-control" id="exampleInputPassword1" required="true"/>
								  			</div>
								  			<div class="mb-3 form-check">
										    	<input type="checkbox" class="form-check-input" id="exampleCheck1"/>
										    	<label class="form-check-label" for="exampleCheck1">Check me out</label>
										  	</div>
										  	<t t-esc="state.invalid"/>
										  	<br></br>
								  			<button type="submit" class="btn btn-primary">Submit</button>
										</form>
									</div>
								</div>								
							</div>`;

	constructor() {
            super(...arguments);
            this.state = useState({
                invalid: undefined,
            });
        }

	OnLoginsubmit(ev){
    const xhr = new window.XMLHttpRequest();
    xhr.open('POST', '/do_login');
    const formData = new FormData(ev.currentTarget);
    xhr.send(JSON.stringify(Object.fromEntries(formData.entries())));
    xhr.onload = async () => {
        const response = JSON.parse(xhr.response);
        if (response.email === false) {
        	this.state.invalid = "Please Enter Valid Username";
        }
        else if (response.password === false) {
        	this.state.invalid = "Please Enter Valid Password";
        } 
        else {
        	console.log(response.session_id)
        	this.env.router.navigate({to:'remove_bg'});
            document.cookie = response.session_id;
            this.env.bus.trigger('login_changed', {valid: true});
        }
   	};
	}
}
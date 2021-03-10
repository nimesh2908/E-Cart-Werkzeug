const { Component, mount, useState } = owl;
const { xml } = owl.tags;

export class Signup extends Component {

	constructor() {
        super(...arguments);
            this.state = useState({
                pwd: "",
                repwd: "",
                pwmatch: undefined,
            });
    }

	onFormSubmit(ev){
            const xhr = new window.XMLHttpRequest();
            xhr.open('POST', '/do_signup');
            const formData = new FormData(ev.currentTarget);
            xhr.send(JSON.stringify(Object.fromEntries(formData.entries())));
            xhr.onload = async () => {
            const response = JSON.parse(xhr.response);
                if (response.exist === true) {
                    this.state.exist = "This Email Already Used Try For Another Email";
                }else{
                    this.env.router.navigate({to: 'signin'});
                }
            };
        }

	_checkPwd() {
            if (!this.state.pwd || !this.state.repwd) {
                return;
            }
            if (this.state.pwd === this.state.repwd) {
                this.state.pwmatch = true;
                this.el.querySelector('button[type="submit"]').removeAttribute('disabled');
            } else {
                this.state.pwmatch = false;
                this.el.querySelector('button[type="submit"]').setAttribute('disabled', true);
            }
        }

        _onKeyUpRePwd(ev) {
            this._checkPwd();
        }

        _onKeyUpPwd(ev) {
            this._checkPwd();
        }
	
	static template = xml`	<div class="d-flex justify-content-center" style="height:30em;">
								<div class="card text-center">
									<div class="card-header">
								    	Signup Form
								  	</div>
								  	<div class="card-body">
								  		<form action="#" t-on-submit.prevent="onFormSubmit">
								  			<div class="mb-3">
								    			<label for="exampleInputEmail1" class="form-label">Email address</label>
								    			<input name="email" type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" required="true"/>
								  			</div>
								  			<div class="mb-3">
								    			<label for="exampleInputPassword1" class="form-label">Password</label>
								    			<input name="password" type="password" t-model="state.pwd" t-on-keyup="_onKeyUpPwd" class="form-control" id="exampleInputPassword1" required="true"/>
								  			</div>
								  			<div class="mb-3">
								    			<label for="exampleInputPassword2" class="form-label">Re-Password</label>
								    			<input name="repassword" type="password" t-model="state.repwd" t-on-keyup="_onKeyUpRePwd" class="form-control" id="exampleInputPassword2" required="true"/>
								  			</div>
								  			<div t-if="state.pwmatch === false">
                								<h4>Password Does not match</h4>
            								</div>
            								<t t-esc="state.pwd"/>
								            <t t-esc="state.repwd"/>
								            <t t-esc="state.pwmatch"/>
                                            <t t-esc="state.exist"/>
                                            <br></br>
								  			<button id="signupBtnId" type="submit" disabled="True" class="btn btn-secondary">Submit</button>
										</form>
									</div>
								</div>								
							</div>`;
}
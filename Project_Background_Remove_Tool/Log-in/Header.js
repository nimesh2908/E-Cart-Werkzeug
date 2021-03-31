const { Component, Store, mount, useState} = owl;
const { xml } = owl.tags;

export class Header extends Component {

	static template = xml`
	<div class="p-3 mb-2 bg-dark text-white">
		<div class="navbar">
			<div class="conHeading">
			  <h1 class="heading" t-on-click="onClickHome">Background Remove Tool</h1>
			</div>
			<ul class="nav justify-content-end">
				<ul class="nav nav-pills mb-3" id="pills-tab" role="tablist">
					<t t-if="state.user_id and state.is_valid">
						<t t-if="state.role=='Customer'">
							<li class="nav-item" role="presentation">
								<button style="color:white;" class="nav-link active" id="pills-home-tab" data-bs-toggle="pill" type="button" t-on-click="onClickRemoveBg">Background Remove</button>
							</li>
							<li class="nav-item" role="presentation">
								<button style="color:white;" class="nav-link" id="pills-contact-tab" data-bs-toggle="pill" data-bs-target="" type="button" role="tab" aria-controls="pills-contact" aria-selected="false" t-on-click="onClickProfile">Profile</button>
							</li>
							<li class="nav-item" role="presentation">
								<button style="color:white;" class="nav-link" id="pills-contact-tab" data-bs-toggle="pill" data-bs-target="" type="button" role="tab" aria-controls="pills-contact" aria-selected="false" t-on-click="onClickLogout">Logout</button>
							</li>
						</t>
						<t t-else="">
							<li class="nav-item" role="presentation">
								<button style="color:white;" class="nav-link" id="pills-contact-tab" data-bs-toggle="pill" data-bs-target="" type="button" role="tab" aria-controls="pills-contact" aria-selected="false" t-on-click="onClickDashboard">Home</button>
							</li>
							<li class="nav-item" role="presentation">
								<button style="color:white;" class="nav-link" id="pills-contact-tab" data-bs-toggle="pill" data-bs-target="" type="button" role="tab" aria-controls="pills-contact" aria-selected="false" t-on-click="onClickLogout">Logout</button>
							</li>
						</t>
					</t>
					<t t-else="">
					<li class="nav-item" role="presentation">
						<button style="color:white;" class="nav-link" id="pills-profile-tab" data-bs-toggle="pill" type="button" t-on-click="onClickSignup">Signup</button>
					</li>
					<li class="nav-item" role="presentation">
						<button style="color:white;" class="nav-link" id="pills-contact-tab" data-bs-toggle="pill" type="button" t-on-click="onClickSignin">Signin</button>
					</li>
					</t>
				</ul>
			</ul>
		</div>
	</div>`;

	constructor() {
      super(...arguments);
      // event_type, owner, callback
      this.env.bus.on('login_changed', this, this._loginChanged);
      this._updateState();
    }
    _updateState(){
        this.state = useState({
            user_id: odoo.session_info.user_id,
            is_valid: odoo.session_info.is_valid,
            session_id: odoo.session_info.session_id,
            credit: odoo.session_info.credit,
            role: odoo.session_info.role,
        });
    }
    _loginChanged (ev) {
    	this._updateState();
    }
	async onClickSignin(ev){
		await this.env.router.navigate({ to: 'signin' });
	}	
	async onClickSignup(ev){
		
		await this.env.router.navigate({ to: 'signup' });
	}		
	async onClickHome(ev){
		
		await this.env.router.navigate({ to: 'home' });
	}	
	async onClickRemoveBg(ev){
		
		await this.env.router.navigate({ to: 'remove_bg' });
	}
	async onClickProfile(ev){
		/*odoo.session_info*/
		await this.env.router.navigate({ to: 'profile' });
	    this.env.bus.trigger('dataChange');
	}
	async onClickDashboard(ev){
		await this.env.router.navigate({ to: 'admin' });
	}
	/*async onClickCredit(ev){
	
		await this.env.router.navigate({ to: 'credit' });
	}*/
	async onClickLogout(ev){
            const xhr = new window.XMLHttpRequest();
            xhr.open('POST', '/do_logout');
            xhr.send(JSON.stringify({'session_id': this.state.session_id}));
            xhr.onload = async () => {
                const response = JSON.parse(xhr.response);
                if (response.logout === 'done') {
                    document.cookie = 'session_id=null';
                    odoo.session_info = {
                        user_id: null,
                        is_valid: false,
                        session_id: null,
                    };
                    this._updateState();
                    this.env.router.navigate({ to: 'home' });
                }
            }
	}
}
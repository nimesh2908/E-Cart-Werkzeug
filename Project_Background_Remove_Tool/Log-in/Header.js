const { Component, Store, mount } = owl;
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
					<t t-if="valid">
					<li class="nav-item" role="presentation">
						<button style="color:white;" class="nav-link" id="pills-contact-tab" data-bs-toggle="pill" data-bs-target="" type="button" role="tab" aria-controls="pills-contact" aria-selected="false" t-on-click="onClickLogout">Logout</button>
					</li>
					<li class="nav-item" role="presentation">
						<button style="color:white;" class="nav-link" id="pills-contact-tab" data-bs-toggle="pill" data-bs-target="" type="button" role="tab" aria-controls="pills-contact" aria-selected="false" t-on-click="onClickCredit">Credit</button>
					</li>
					</t>
					<t t-else="">
  					<li class="nav-item" role="presentation">
						<button style="color:white;" class="nav-link active" id="pills-home-tab" data-bs-toggle="pill" type="button" t-on-click="onClickRemoveBg">Background Remove</button>
					</li>
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
      // this.env.bus.on('login_changed', null, this._loginChanged.bind(this));
    }
    _loginChanged (ev) {debugger
    	this.valid = ev.valid;
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
	async onClickCredit(ev){debugger;
		const xhr = new window.XMLHttpRequest();
        xhr.open('POST', '/do_credit');
        xhr.onload = async () => {
        	const response = JSON.parse(xhr.response);
        	if (response.Credit === "done") {
        		console.log("Credit Showing Sucessfully");
        	}
        }
		await this.env.router.navigate({ to: 'credit' });
	}
	async onClickLogout(ev){debugger

		this.valid = ev.valid;	
		const session_id = document.cookie;
		const xhr = new window.XMLHttpRequest();
        xhr.open('POST', '/do_logout');
        xhr.send(JSON.stringify({'session_id': session_id}));
        xhr.onload = async () => {
        	const response = JSON.parse(xhr.response);
        	if (response.logout === "done") {
        		console.log("Logout Sucessfully");
        	}
        }
		document.cookie = "";
		await this.env.router.navigate({ to: 'home' });
	}
}
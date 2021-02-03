const { Component, Store, mount } = owl;
const { xml } = owl.tags;
const { whenReady } = owl.utils;
const { useRef, useDispatch, useState, useStore } = owl.hooks;
const {qweb} = owl;

import { Signup } from "./signup.js";

const APP_TEMPLATE = xml/* xml */ `
<div>
	<h1 align="center">Background Remove Tool</h1>
		<div align="center">
			<input type="button" value="Sign-Up" t-on-click="signup"/>
		<Signup/>
		</div>
</div>`;

class BRT extends Component {
	static template =APP_TEMPLATE;
	static components={Signup};

	signup(){
		alert("Welcome");
		/*return this.env.router.navigate({ to: 'Signup'});*/
		alert("logout");
	}

	
}
/*export const ROUTES = [
	  { name: "SIGNUP", path: "./signup", component: Signup },
];*/

/*function makeEnvironment() {
    const env = { qweb };
    const router = new owl.router.Router(env, ROUTES);
    env.router.start();
    return env;
}
	BRT.env=makeEnvironment();*/

// Setup code
function setup() {
	const bgrmtl=new BRT();
 	bgrmtl.mount(document.body);
}

whenReady(setup);
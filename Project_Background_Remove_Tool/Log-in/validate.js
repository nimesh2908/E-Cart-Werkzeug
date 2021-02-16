const { Component, Store, mount } = owl;
const { xml } = owl.tags;
const { whenReady } = owl.utils;
const { useRef, useDispatch, useState, useStore } = owl.hooks;
const {qweb} = owl;

import { Signup } from "./signup.js";
import { Navbar } from "./Navbar.js";
import { Content } from "./Content.js";
import { Footer } from "./Footer.js";


const APP_TEMPLATE = xml/* xml */ `
<div>
	<div>
		<Navbar/>
		<Content/>
		<Footer/>
	</div>
</div>`;

class BRT extends Component {
	static template =APP_TEMPLATE;
	static components={Navbar,Content,Footer};

	signup(){
		return this.env.router.navigate({ to: 'SIGNUP'});
	}
	
}

const ROUTES = [
	  { name: "SIGNUP", path: "/signup", component: Signup },
];

function makeEnvironment() {

    const env = { qweb };
    env.router = new owl.router.Router(env, ROUTES);
    env.router.start();
    return env;
}
BRT.env = makeEnvironment();

// Setup code
function setup() {
	const bgrmtl=new BRT();
 	bgrmtl.mount(document.body);
}

whenReady(setup);
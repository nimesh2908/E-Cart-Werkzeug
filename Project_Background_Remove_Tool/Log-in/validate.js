const { Component, Store, mount } = owl;
const { xml } = owl.tags;
const { whenReady } = owl.utils;
const { useRef, useDispatch, useState, useStore } = owl.hooks;

import {signup} from "./signup.js"

export const ROUTES = [
  { name: "SIGNUP", path: "/signup" },
];

const APP_TEMPLATE = xml/* xml */ `
<div>
	<h1 align="center">Background Remove Tool</h1>
		<div align="center">
			<input type="button" value="Sign-Up" t-on-click="signup"/>
		</div>
</div>`;

class brt extends Component {
	static template =APP_TEMPLATE;

	signup(env,to){
		return { to: "SIGNUP" };
		const sgout=new signup();
		alert("logout");
	}
}

function makeEnvironment() {
    const env = { qweb };
    env.session = new Session(env);
    env.router = new owl.router.Router(env, ROUTES);
    env.router.start();
    return env;
}
// Setup code
function setup() {
	const bgrmtl=new brt();
 	bgrmtl.mount(document.body);
}

whenReady(setup);
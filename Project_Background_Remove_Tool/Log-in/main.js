const { Component, mount, Store, qweb } = owl;
const { xml } = owl.tags;
const { EventBus } = owl.core;
const { RouteComponent } = owl.router
const { whenReady } = owl.utils;
const { useRef, useDispatch, useState, useStore } = owl.hooks;

import { Content } from "./Content.js";
import { Footer } from "./Footer.js";
import { Header } from "./Header.js";
import { RemoveBG } from "./RemoveBG.js";
import { Signin } from "./Signin.js";
import { Signup } from "./signup.js";
import { Credit } from "./Credit.js";

const APP_TEMPLATE = xml/* xml */ `
						<div>
							<div>
								<Header/>
								<div>
									<RouteComponent/>
								</div>
								<Footer/>
							</div>
						</div>`;

class BackgroundRemoveTool extends Component {
	static template = APP_TEMPLATE;
	static components = { Content, Footer, Header, RouteComponent, RemoveBG, Signup, Signin, Credit };

async willStart() {
        const session_id = document.cookie;
        console.log(session_id);
        if (session_id) {
            const xhr = new window.XMLHttpRequest();
            xhr.open('POST', '/session_validate');
            xhr.send(JSON.stringify({'session_id': session_id}));
            xhr.onload = async () => {
            	this.env.bus.trigger('login_changed', {valid: true});
            	alert("Welcome");
            };
        }
        else
        {
        	this.env.bus.trigger('login_changed', {valid: false});
        }
    }
}
const ROUTES = [
	{ name: "home", path: "/",component: Content},
	{ name: "signup", path: "/signup", component: Signup },
	{ name: "signin", path: "/signin", component: Signin },
	{ name: "remove_bg", path: "/remove_bg", component: RemoveBG },
	{ name: "credit", path: "/credit", component: Credit },

];

function makeEnvironment() {
	const env = { qweb };		
    env.router = new owl.router.Router(env, ROUTES);
    env.router.start();
    env.bus = new EventBus();
    return env;
}
BackgroundRemoveTool.env = makeEnvironment();

// Setup code
async function setup() {
	
	const intanceBRT=new BackgroundRemoveTool();
	/*await bgrmtl.env.router.navigate({to: 'login'});*/
 	intanceBRT.mount(document.body);
}

whenReady(setup);
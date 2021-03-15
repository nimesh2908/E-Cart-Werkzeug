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
import { Profile } from "./Profile.js";


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
	static components = { Content, Footer, Header, RouteComponent, RemoveBG, Signup, Signin, Credit, Profile };
}

const ROUTES = [
	{ name: "home", path: "/",component: Content},
	{ name: "signup", path: "/signup", component: Signup },
	{ name: "signin", path: "/signin", component: Signin },
	{ name: "remove_bg", path: "/remove_bg", component: RemoveBG },
	{ name: "credit", path: "/credit", component: Credit },
	{ name: "profile", path: "/profile", component: Profile },


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
 	intanceBRT.mount(document.body);
}

whenReady(setup);
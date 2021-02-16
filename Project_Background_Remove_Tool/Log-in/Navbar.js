const { Component, Store, mount } = owl;
const { xml } = owl.tags;



export class Navbar extends Component {

	static template = xml`	<div>
								<ul>
									<li class="main"><a href="#Home"><span class="spanbg">BACKGROUND</span> <span class="spanrm">REMOVE</span> <span class="spantl">TOOL</span></a></li>
								  	<li><a href="#Signin">Signin</a></li>
								  	<li><a href="#news">News</a></li>
								  	<li><a href="#contact">Contact</a></li>
								  	<li><a href="#about">About</a></li>
								</ul>

							</div>`;

}
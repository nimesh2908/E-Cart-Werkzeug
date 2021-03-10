const { Component, Store, mount } = owl;
const { xml } = owl.tags;


export class Footer extends Component {

	static template = xml`	
					<footer class="bg-dark text-center text-white">
					  	<div class="container p-4">
					    	<section class="mb-4">
					      		<a class="btn btn-outline-light btn-floating m-1" href="http://www.facebook.com" role="button">
					      			<i class="fab fa-facebook"></i>
					     		</a>

					      		<a class="btn btn-outline-light btn-floating m-1" href="http://www.twitter.com" role="button">
					        		<i class="fab fa-twitter"></i>
					        	</a>

					      		<a class="btn btn-outline-light btn-floating m-1" href="http://www.google.com" role="button">
					        		<i class="fab fa-google"></i>
					        	</a>

					      		<a class="btn btn-outline-light btn-floating m-1" href="http://www.instagram.com" role="button">
					      			<i class="fab fa-instagram"></i>
					      		</a>

					      		<a class="btn btn-outline-light btn-floating m-1" href="http://www.linkedin.com" role="button">
					        		<i class="fab fa-linkedin-in"></i>
					      		</a>

					      		<a class="btn btn-outline-light btn-floating m-1" href="http://www.github.com" role="button">
					        		<i class="fab fa-github"></i>
					      		</a>
					    	</section>
						    <section class="mb-4">
						      	<p>
							        All trademarks, service marks, trade names, product names, logos and trade dress appearing on our website 
							        are the property of their respective owners. Adobe, Creative Cloud and Photoshop are either registered trademarks
							        or trademarks of Adobe in the United States and/or other countries.
						      	</p>
						    </section>
					    	<section class="">
					      		<div class="row">
					        		<div class="col-lg-3 col-md-6 mb-4 mb-md-0">
					          			<h5 class="text-uppercase">Support</h5>
					          			<ul class="list-unstyled mb-0">
					            			<li>
					              				About Us
					            			</li>
					            			<li>
					              				Contact Us
					            			</li>
					            			<li>
					              				Review
					            			</li>
					            			<li>
					              				FAQs
					            			</li>
					          			</ul>
					        		</div>
					        		<div class="col-lg-3 col-md-6 mb-4 mb-md-0">
					          			<h5 class="text-uppercase">Learn More</h5>
					          			<ul class="list-unstyled mb-0">
					            			<li>
					              				Individuals
					            			</li>
					            			<li>
					              				Photographer
					            			</li>
					            			<li>
					              				Marketing
					            			</li>
					            			<li>
					              				Ecommerce
					            			</li>
					          			</ul>
					        		</div>
					        		<div class="col-lg-3 col-md-6 mb-4 mb-md-0">
					          			<h5 class="text-uppercase">Tools And API</h5>
				  				    	<ul class="list-unstyled mb-0">
				            				<li>
				              					API Documentation
				            				</li>
				            				<li>
				              					Photoshop Extension
				            				</li>
				            				<li>
				              					Windows/Mac/Ubantu
				            				</li>
				            				<li>
				              					Design Templates
				            				</li>
				          				</ul>
					        		</div>
					        		<div class="col-lg-3 col-md-6 mb-4 mb-md-0">
					          			<h5 class="text-uppercase">Address</h5>
					          			<ul class="list-unstyled mb-0">
					            			<li>
					              				<p>Tower III,</p>
					            			</li>
					            			<li>
					              				<p>401 And 402, 4th Floor IT,</p>
					            			</li>
					            			<li>
					              				<p>Infocity, </p>
					            			</li>
					            			<li>
					              				<p>Gandhinagar, Gujarat 382007</p>
					            			</li>
					          			</ul>
					        		</div>
					      		</div>
					    	</section>
					  	</div>
						<div class="text-center p-3" style="background-color: rgba(0, 0, 0, 0.2);">
					    	© 2021 Copyright By:
					    	<a class="text-white" href="https://instagram/dauntless_nims/">Nimesh</a>
					  	</div>
					</footer>`;   
}
  
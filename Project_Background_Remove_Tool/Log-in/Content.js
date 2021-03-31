const { Component, Store, mount } = owl;
const { xml } = owl.tags;

export class Content extends Component {

	static template = xml`		
				<div id="carouselExampleInterval" class="carousel slide" data-bs-ride="carousel">
					<div class="carousel-inner">
				    	<div class="carousel-item active" data-bs-interval="10000">
				      		<img src="/img/image3" class="d-block w-100"/>
				        	<div class="centered">
				        		<div style="margin-bottom:500px;">
				        			<div class="d-flex justify-content-center " style="height:26em;">
										<div class="card text-center border border-white border border-5 bg-transparent text-white">
											<div class="card-header text-white">
								    			Upload Image
								  			</div>
											<div class="card-body">
									  			<input class="form-control" type="file" id="formFile"/>
									  			<button class="btn btn-primary">Upload</button>
											</div>
										</div>
									</div>
									<div class="mt-4">
					        		<h1>
										Remove backgrounds 100% automatically in 5 seconds with zero clicks
									</h1>
									<p>
										There are approximately 20 million more interesting activities than removing backgrounds by hand.
										Thanks to Background Remove Tool AI, you can slash editing time - and have more fun!
									</p>
									</div>
				        		</div>
							</div>
				    	</div>
				    	<div class="carousel-item" data-bs-interval="2000">
				      		<img src="/img/image4" class="d-block w-100"/>
				      		<div class="centered">
				        		<h1>
									Ramp up the creativity - and efficiency!
								</h1>
								<p>
									Whether you want to make a mind-blowing greetings card for your bestie or to power through thousands of 
									car photos in next to no time, Background remove tool makes it happen.
								</p>
							</div>
				    	</div>
				    	<div class="carousel-item">
				      		<img src="/img/image5" class="d-block w-100"/>
				      		<div class="centered">
				        		<h1>
									Save time and money
								</h1>
								<p>
									How long does it take to manually cut out an image? Depending on the complexity, perhaps a minute? Or five, 
									or twenty? Even more?
									With remove.bg you'll be done in 5 seconds. The process is completely automatic and fine-tuning is a breeze.
									In fact, you can do something else entirely while our Artificial Intelligence gets rid of your image backgrounds
								</p>
							</div>
				    	</div>
				  	</div>
				  	<button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleInterval"  data-bs-slide="prev">
				    	<span class="carousel-control-prev-icon" aria-hidden="true"></span>
				    	<span class="visually-hidden">Previous</span>
				  	</button>
				  	<button class="carousel-control-next" type="button" data-bs-target="#carouselExampleInterval"  data-bs-slide="next">
				    	<span class="carousel-control-next-icon" aria-hidden="true"></span>
				    	<span class="visually-hidden">Next</span>
				  	</button>
				</div>`;
}
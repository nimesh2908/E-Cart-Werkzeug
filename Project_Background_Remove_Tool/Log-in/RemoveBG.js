const { Component, Store, mount } = owl;
const { xml } = owl.tags;

export class RemoveBG extends Component {

	
	static template = xml`	<div class="d-flex justify-content-center" style="height:26em;">
								<div class="card text-center">
									<div class="card-header">
								    	Upload Image
								  	</div>
									<div class="card-body">
									  	<input class="form-control" type="file" id="formFile"/>
									  	<button>Upload</button>
									</div>
								</div>
							</div>`;
}
const { Component, Store, mount, useState } = owl;
const { xml } = owl.tags;

export class RemoveBG extends Component {

	constructor() {
      super(...arguments);
      // event_type, owner, callback
      this._updateState();
    }
    _updateState(){
        this.state = useState({
            user_id: odoo.session_info.user_id,
            session_id: odoo.session_info.session_id,
            credit: odoo.session_info.credit,
        });
    }

	onClickUpload(ev){
		const xhr = new window.XMLHttpRequest();
	    xhr.open('POST', '/do_upload');
        xhr.send(JSON.stringify({'session_id': this.state.session_id}));
	    xhr.onload = async () => {
	    }
	    this._updateState();
	    alert(this.state.credit,"Upload Sucessfully");
	}
	static template = xml`	<div class="d-flex justify-content-center" style="height:26em;">
								<div class="card text-center">
									<div class="card-header">
								    	Upload Image
								  	</div>
									<div class="card-body">
									  	<input class="form-control" type="file" id="formFile"/>
									  	<button class="btn btn-primary" t-on-click="onClickUpload">Upload</button>
									</div>
								</div>
							</div>`;
}
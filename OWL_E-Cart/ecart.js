const { Component, Store, mount } = owl;
const { xml } = owl.tags;
const { whenReady } = owl.utils;
const { useRef, useDispatch, useState, useStore } = owl.hooks;

const actions = {
        addTask({ state }, title) {
            if (title && (!state.tasks.find(n => parseInt(n.title) == parseInt(title)))) {
                const newTask = {
                    title:title,
                };
                
                state.tasks.push(newTask);
            }

        },
        deleteTask({state},title){
            const index = state.tasks.findIndex((n)=> n.title == title);
            state.tasks.splice(index,1);
        },
};

const APP_TEMPLATE = xml/* xml */ `
<div>
  <div id="tsk">  
    <h1>Online Shopping</h1>
    <div id="p1">
      <hr></hr>
        <input type="text" name="search" id="search" placeholder="Search" t-on-keyup="search"/>
      <hr></hr>
    </div>
    <t t-foreach="shop" t-as="i" t-key="i.id">
      <div class="cards">
            <span id="pn"><t t-esc="i.title"/></span>
            <span id="pp"><t t-esc="i.price"/></span>
            <button t-att-id="i.id" t-on-click="addTask">Add To Cart</button>
      </div>
    </t>
  </div>
  <div id="crt">
    <h1>-----Cart----</h1>
    <t t-set="total" t-value="0"/>
    <t t-foreach="tasks" t-as="j" t-key="j.id">
      <ui>
        <t t-set="total" t-value="total + shop[j.title-1].price"/>
        <li>
          <span><t t-esc="shop[j.title-1].title"/>  Rs:  </span>
          <span><t t-esc="shop[j.title-1].price"/></span>
          <input type="button" t-att-id="j.title" value="Delete" t-on-click="deleteTask"/>
        </li>
      </ui>
    </t>
    <span>__________________________</span><br></br>
    <span>Total:<t t-esc="total"/></span><br></br>
  </div>
</div>
`;
const initialState ={
    tasks : []
};

class Ecart extends Component {
	static template =APP_TEMPLATE;

    tasks = useStore((state) => state.tasks);
    dispatch = useDispatch();
      
    search(){
        var input, filter, mainDiv, div, childDiv, i, txtValue;
        input = document.getElementById("search").value;
        filter = input.toUpperCase();
        
        mainDiv = document.getElementById("tsk");
        div = mainDiv.getElementsByClassName("cards");
        for (i = 0; i < div.length; i++) {
            childDiv = div[i].getElementsByTagName("span")[0];
            if (childDiv) {
                txtValue = childDiv.textContent;
                if (txtValue.toUpperCase().indexOf(filter) > -1) {
                    div[i].style.display = "";
                } else {
                    div[i].style.display = "none";
                }
            }
            
        }
    }
    addTask(ev) {
            if (ev.target.id) {
                this.dispatch("addTask",ev.target.id);
            }
        }
    deleteTask(ev) {
      this.dispatch("deleteTask",ev.target.id);
    }

    shop = [
    {},
    {
      "id": 1,
      "title": "Milk",
      "price": 50,
    },
    {
      "id": 2,
      "title": "Thick-Shake",
      "price": 100,
    },
    {
      "id": 3,
      "title": "Butter-Milk",
      "price": 20,
    },
    {
      "id": 4,
      "title": "Ice-Cream",
      "price": 40,
    },
  ];
}

function makeStore() {
  const localState = window.localStorage.getItem("Shopping");
  const state = localState ? JSON.parse(localState) : initialState;
  const store = new Store({ state , actions });
  store.on("update", null, () => {
    localStorage.setItem("Shopping", JSON.stringify(store.state));
  });debugger
  return store;
}
// Setup code
function setup() {
  Ecart.env.store = makeStore();
	const ecart=new Ecart();
 	ecart.mount(document.body);
}

whenReady(setup);

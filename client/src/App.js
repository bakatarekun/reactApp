//import React from 'react';
import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Customers from './components/customers/customers'
//test
class App extends Component {
  constructor(props){
    super(props);

    this.state={
      newItem:"",
      list:[]
    }
  }

  updateInput(key, value){

    //update react state
    this.setState({
      [key]: value
    });
  }

  addItem(){
    //create item with unique id
    const newItem={
      id: 1+ Math.random(),
      value: this.state.newItem.slice()
    };

    //copy of current list of items
    const list = [...this.state.list];

    //add new item to list
    list.push(newItem);

    //update state with new list and reset newItem input
    this.setState({
      list,
      newItem:""
    })
  }

  deleteItem(id){
    //copy of current list of items
    const list = [...this.state.list];
    //filter out item being deleted
    const updatedList = list.filter(item => item.id !== id);

    this.setState({list: updatedList});
  }
  render(){
    return (
          <div className="App">
          <h1>My List to Do</h1>
          {/* <Customers/> */}
          <br/>
            <div>
            
              Add an Item...
      
              <input type="text"
              placeholder="Type item here..."
              value={this.state.newItem}
              onChange={e => this.updateInput("newItem", e.target.value)}/>
              <button  onClick={() => this.addItem()}>Add</button>
              <br/>

            <ul>
              {this.state.list.map(item =>{
                 return(
                   <li  key={item.id} >
                   {item.value} 
                   <button class="btnClass" onClick={() => this.deleteItem(item.id)}>
                    X </button>
                   </li>
                 )
              })}
            </ul>
            </div>

            


          </div>
        );

  }
}
// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//        <Customers />
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

export default App;

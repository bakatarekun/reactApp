//import React from 'react';
import React, { Component } from 'react';
import './customers.css';
//test
class Customers extends Component{
  constructor(){ 
    super();
    this.state ={
     
      customers:[]
    }
  }

  componentDidMount() {

    fetch('/api/customers')
   .then(res => res.json())
  //  .then(res => res.text())
    .then(customers => this.setState( {customers}, () => console.log('Customers fetched..',
    customers)));
  }
    render()
    {
      return(
        <div >
        <h2>From Customers Class</h2>
    
    </div>
      )
    }
  }

// function Customers() {
//   return (
//     <div >
//         <h2>Customers</h2>
    
//     </div>
//   );
// }

export default Customers;

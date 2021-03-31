import React, {useEffect} from "react";
import { Link } from 'react-router-dom';
import {getAmazon, getFlipkart, getMyntra, getBewakoof} from "./ApiCalls";
import MediaCard from "./Card";
import Button from '@material-ui/core/Button';
import './SearchPage.css';



class SearchPage extends React.Component {
  constructor(props) {
    super(props);
    const { state } = this.props.location;
    this.state = {
        productList : [],
        product : state.product,
        checkedA: state.amazon,
        checkedF: state.flipkart,
        checkedM: state.myntra,
        checkedB: state.bewakoof,
        
    };
  }

  loadProducts = () =>{
    getBewakoof(this.state.product)
      .then((data) => {
        if (data.error) {          
          console.log(`This is error : ${data.error}`);
        } else {
          this.setState({productList : data})
          console.log(`This is data : ${data}`);
          console.log(`This is state data : ${this.state.productList}`);
          console.log(this.state.productList);
        }
      });
    
  }

  componentDidMount = () =>{
      this.loadProducts();
  }

  handleInput = (event) => {
    this.setState({[event.target.name]: event.target.value });
  };

  

  buttonClick = () => {
    console.log(this.state.product);
    console.log(this.state.checkedA);
    console.log(this.state.checkedF);
    console.log(this.state.checkedM);
    console.log(this.state.checkedB);
  }

  
  
  myntraProducts = () => {
      return <div >      
        {Object.values(this.state.productList).map((product, index) => {
          return (            
            // <div key={index}>
                <MediaCard  key={index}
                website="Myntra"
                title={product.title} 
                url = {product.url}
                image = {product.image}
                price = {product.price}
                />
            // </div>
          );
        })}
      
    
      </div>
  }
  amazonProducts = () => {
    return <div >      
      {Object.values(this.state.productList).map((product, index) => {
        return (            
          // <div key={index}>
              <MediaCard  key={index}
              website="Amazon"
              title={product.title} 
              url = {product.url}
              price = {product.price}
              />
          // </div>
        );
      })}
    
  
    </div>
}

bewakoofProducts = () => {
    return <div >      
      {Object.values(this.state.productList).map((product, index) => {
        return (            
          // <div key={index}>
              <MediaCard  key={index}
              website="Bewakoof"
              title={product.title} 
              url = {product.url}
              price = {product.price}
              />
          // </div>
        );
      })}
    
  
    </div>
}
  

  render (){
    
  return <div id="root" style={{minHeight:"100vh", overflow:"hidden"}}>
      <div className="header">
      <Link to="/">
      <h2>BuyPlus</h2>
      </Link>
      <div className="header__search">
     
      <div className="SearchBox">
      <div>
       
        <div className="SearchIcon">
          <span>
            <svg color="#12f79f" focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
            </svg>
          </span>
        </div>
        <div className="InputBox">
          <div> </div>
          <input 
          value={this.state.product}
          onChange={this.handleInput}
            maxLength="2048"
            name="product"
            type="text"
            aria-autocomplete="both"
            aria-haspopup="false"
            autoCapitalize="off"
            autoComplete="off"
            autoCorrect="off"
            spellCheck="false"
            title="Search"
            aria-label="Search"
            placeholder="Search products"
            style={{color:"#12f79f"}}
          /></div></div>
          <Button variant="contained" 
      onClick={this.buttonClick}
      style={{
          paddingLeft:"10px",
        backgroundColor:"black",
         color:"#12f79f",
         border: "2px solid #12f79f"
         }} color="primary">
        Go      </Button>
        
      
    </div>  
      </div>

      


        
      </div>
      {this.bewakoofProducts()}
      {/* {this.state.productList.length === 0 && (<h1>No data</h1>)}
      <h1>{typeof this.state.productList['0']}</h1> */}
      {/* <h1>{JSON.stringify(Object.values( this.state.productList))}</h1> */}
    </div>
  }
}

export default SearchPage;
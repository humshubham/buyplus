import React from 'react';
import Button from '@material-ui/core/Button';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import './App.css';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product: "",
      checkedA: true,
      checkedF: true,
      checkedM: true,
      checkedB: true,
    };  
  }


  handleChange = (event) => {
    this.setState({[event.target.name]: event.target.checked });
  };

  handleInput = (event) => {
    this.setState({[event.target.name]: event.target.value });
  };

  

  buttonClick = () => {
    this.props.history.push( {pathname: "/search",
    state: {
      product:this.state.product,
      amazon : this.state.checkedA,
      flipkart : this.state.checkedF,
      myntra : this.state.checkedM,
      bewakoof : this.state.checkedB 
    }
  });
  }
  

  render (){
  return <div id="root" style={{minHeight:"100vh", overflow:"hidden"}}>
      
      
      <div className="googleBox">
      <h1 className="App-logo">BuyPlus</h1>
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
          />
        </div>
      </div>
    </div>
      <div className="buttonBox">
      <Button variant="contained" 
      onClick={this.buttonClick}
      style={{
        backgroundColor:"black",
         color:"#12f79f",
         border: "2px solid #12f79f"
         }} color="primary">
        Go      </Button> <br/> </div>
        <FormControlLabel style={{color:"#12f79f"}}
        control={<Checkbox checked={this.state.checkedA} onChange={this.handleChange} name="checkedA"
        style={{
          color:"#12f79f"
        }}
        />}
        label="Amazon"
      />
      <FormControlLabel style={{color:"#12f79f"}}
        control={<Checkbox checked={this.state.checkedF} onChange={this.handleChange} name="checkedF" 
        style={{
          color:"#12f79f"
        }}
        />}
        label="Flipkart"
      />
      <FormControlLabel style={{color:"#12f79f"}}
        control={<Checkbox checked={this.state.checkedM} onChange={this.handleChange} name="checkedM" 
        style={{
          color:"#12f79f"
        }}
        />}
        label="Myntra"
      />
      <FormControlLabel style={{color:"#12f79f"}}
        control={<Checkbox checked={this.state.checkedB} onChange={this.handleChange} name="checkedB" 
        style={{
          color:"#12f79f"
        }}
        />}
        label="Bewakoof"
      />
      
    </div>
    
    </div>
  }
}

export default App;
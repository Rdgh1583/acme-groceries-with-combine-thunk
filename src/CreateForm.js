import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { create } from './store';


class CreateForm extends Component{
  constructor(){
    super();
    this.state = {
      name: ''
    };
  }
  render(){
    const { name } = this.state;
    return (
      <form>
        <input value={ name } onChange={ ev => this.setState({ name: ev.target.value})}/>
        <button onClick={()=> this.props.create(this.state.name)}>Create</button>
      </form>
    );
  }
}

const mapDispatchToProps = (dispatch)=> {
  return {
    create: (name)=> {
      dispatch(create(name));
    }
  };
}

export default connect(null, mapDispatchToProps)(CreateForm);

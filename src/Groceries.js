import React from 'react';
import axios from 'axios';
import { toggle, createRandom } from './store';


import { connect } from 'react-redux';

const _Groceries = ({ groceries, view, toggle, create })=> {
  return (
    <div>
      <button onClick={ create }>Create</button>
      <ul>
        {
          groceries.filter(grocery => !view || ( grocery.purchased && view === 'purchased') ||( !grocery.purchased && view === 'needs') ).map( grocery => {
            return (
              <li onClick={ ()=> toggle(grocery)} key={ grocery.id } className={ grocery.purchased ? 'purchased': ''}>{ grocery.name }</li>
            );
          })
        }
      </ul>
    </div>
  );
};

const mapDispatchToProps = (dispatch)=> {
  return {
    toggle: (grocery)=>{
      dispatch(toggle(grocery));
    }, 
    create: ()=>{
      dispatch(createRandom());
    } 
  };
};

const Groceries = connect(state => state, mapDispatchToProps)(_Groceries);

export default Groceries;

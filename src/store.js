import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import axios from 'axios';


const LOAD = 'LOAD';
const CREATE = 'CREATE';
const UPDATE = 'UPDATE';
const SET_VIEW = 'SET_VIEW';

const viewReducer = (state = '', action)=> {
  if(action.type === SET_VIEW){
    state = action.view; 
  }
  return state;

};
const groceriesReducer = (state = [], action)=> {
  if(action.type === LOAD){
    state = action.groceries;
  }
  if(action.type === UPDATE){
    state = state.map(grocery => grocery.id === action.grocery.id ? action.grocery : grocery );
  }
  if(action.type === CREATE){
    state = [...state, action.grocery]; 
  }
  return state;
};

const store = createStore(combineReducers({
  groceries: groceriesReducer,
  view: viewReducer
}), applyMiddleware(thunk));

const _loadGroceries = (groceries)=> ({ type: LOAD, groceries}); 

const loadGroceries = ()=> {
  return async(dispatch)=> {
    const groceries = (await axios.get('/api/groceries')).data;
    dispatch(_loadGroceries(groceries));
  };
};

const _toggle = (grocery)=> ({ type: UPDATE, grocery}); 

const toggle = (grocery)=> {
  return async(dispatch)=> {
      const updated = (await axios.put(`/api/groceries/${grocery.id}`, { purchased: !grocery.purchased })).data;
    dispatch(_toggle(updated));
  }
};

const _create = (grocery)=> ({ type: 'CREATE', grocery});

const create = (name)=> {
  return async(dispatch)=> {
      const grocery = (await axios.post('/api/groceries', { name })).data;
      dispatch(_create(grocery));
  };
};

const createRandom = ()=> {
  return async(dispatch)=> {
      const grocery = (await axios.post('/api/groceries/random')).data;
      dispatch(_create(grocery));
  };
};

export { loadGroceries, toggle, create, createRandom };

export default store;



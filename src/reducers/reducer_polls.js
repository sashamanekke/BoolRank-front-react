import _ from 'lodash';
import {FETCH_POLLS} from '../actions';
import {FETCH_POLL} from '../actions';

export default function(state = {}, action){
  switch (action.type){
  case FETCH_POLLS:
    // this is the old ES5 way to do it (to understand if not)
    // const post = action.payload.data;
    // const newState = {...state};
    // newState[post.id] = post;
    // return newState;
    // the new one is vvv
    //return {...state, [action.payload.data.id]: action.payload.data};
    return _.mapKeys(action.payload.data, 'id');
  case FETCH_POLL:
    return {...state, [action.payload.data.id]: action.payload.data};
  default:
    return state;
  }
}

import axios from 'axios';

export const FETCH_POLLS = 'FETCH_POLLS';
export const FETCH_POLL = 'FETCH_POLL';
export const CREATE_VOTE = 'CREATE_VOTE';

const ROOT_URL = 'http://localhost:3000/api/v1/';// CHANGE LATER WHEN THE REAL API IS WORKING

export function fetchPolls(){
  const request = axios.get(`${ROOT_URL}/polls`);
  //console.log(request);
  return {
    type: FETCH_POLLS,
    payload: request
  }
}

export function fetchPoll(id){
  const request = axios.get(`${ROOT_URL}/polls/${id}`);
  //console.log(request);
  return {
    type: FETCH_POLL,
    payload: request
  }
}

export function createVote(accepted_proposition_id, rejected_proposition_id, callback){
  var data = {
  }
  // var headers = {
  //   // TODO: change data to work with EVERY user, now it only works with sasha
  //   'Content-Type': 'application/json',
  //   'X-User-Email': 'sasha.delaet@gmail.com',
  //   'X-User-Token': '74PAx2TCUC5xCNJkkjqz',
  // }
  const request = axios.post(`${ROOT_URL}votes?accepted_proposition_id=${accepted_proposition_id}&rejected_proposition_id=${rejected_proposition_id}`, data,
    {headers: {
      'Content-Type': 'application/json',
      'X-User-Email': 'sasha.delaet@gmail.com',
      'X-User-Token': '74PAx2TCUC5xCNJkkjqz',
    }})
    .then(()=>callback()); // only when we have a response, that the psot has been created
    // then we call the callback
  return {
    type: CREATE_VOTE,
    payload: request
  }
}

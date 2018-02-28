import _ from 'lodash';
import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {fetchPoll} from '../actions';
import {createVote} from '../actions';

class PollShow extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount(){
    if (!this.props.poll || !this.props.poll.propositions){
      const {id} = this.props.match.params;
      this.props.fetchPoll(id);
    } else {
    //  this.props.all_combinations = generate_combinations(this.props.poll.propositions);
    }
  }

  renderComparing(all_combinations){
    const pair = _.sample(all_combinations);
    return _.map(pair, proposition => {
      const color = `${proposition.color}`;
      return (
        <li
        onClick={() => {this.handleClick(pair,proposition)}}
        className="list-group-item"
        key={proposition.id}
        style={{backgroundColor: color}}>
          <div className="white">
            {proposition.name}
          </div>
        </li>
      );
    });
  }

  handleClick(pair,proposition){
    const accepted_proposition_id = proposition.id;
    let rejected_proposition_id = 0;
    if (pair[0] === proposition){
      rejected_proposition_id = pair[1].id;
    } else {
      rejected_proposition_id = pair[0].id;
    }
    console.log(`${accepted_proposition_id} ${rejected_proposition_id}`);
    this.props.createVote(accepted_proposition_id,rejected_proposition_id,() => {
      const {id} = this.props.match.params;
      this.props.fetchPoll(id);
      this.props.history.push(`/polls/${id}/compare`);
    });
  }

  render() {

    const {poll} = this.props;
    if (!poll) {
      return <div>Loading...</div>;
    }

    // could be putted into helper functions
    let all_combinations = generate_combinations(poll.propositions);
    const all_votes = generate_voted_combinations(poll.votes);
    console.log(all_votes);
    for(var i = 0; i < all_votes.length; i++){
      let contains = false;
      let comb_to_delete_position = 0;
      for (var j = 0; j < all_combinations.length; j++){
        if(all_votes[i][0] === all_combinations[j][0].id && all_votes[i][1] === all_combinations[j][1].id){
          contains = true;
          comb_to_delete_position = j;
          break;
        }
      }
      if (contains) {
        all_combinations.splice(comb_to_delete_position,1);
      }
    }
    //const remaining_combinations = (all_combinations - all_votes);
    console.log(all_combinations);
    return (
      <div>
        <h3 className="margin-top">Compare</h3>
        <p>{poll.description}</p>
        <ul className="list-group">
          {this.renderComparing(all_combinations)}
        </ul>
      </div>
    );
  }
}

// -------- Helper functions ---------//
function generate_combinations(propositions){
  propositions = propositions.sort(function(a, b){return b.id - a.id});
  let all_combinations = [];
  for (let i = 0; i < propositions.length - 1; i++) {
    for (let j = i + 1; j < propositions.length; j++) {
      const combination = [
        propositions[i],
        propositions[j]
      ]
      all_combinations.push(combination);
    }
  }
  return all_combinations;
}

function generate_voted_combinations(votes){
  //for the moment it takes ALL the votes, later I will have to add a diifernetiation between users
  // just add in here an additional condition where USER must be the current_user
  // also add this in the api > we need therefore the user of each vote > TO ADD in API!
    let done_combinations = _.map(votes, vote => {
      let comb = [vote.accepted_proposition_id, vote.rejected_proposition_id];
      return comb.sort(function(a, b){return b - a});
    });
    return done_combinations;
  //}
}

// -------- end Helper functions ------- //


function mapStateToProps({polls}, ownProps){
  return {
    poll: polls[ownProps.match.params.id]
    //all_combinations: generate_combinations(ownProps.match.params.propositions)
  };
}


export default connect(mapStateToProps,{fetchPoll,createVote})(PollShow);

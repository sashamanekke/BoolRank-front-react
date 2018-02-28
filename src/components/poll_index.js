import _ from 'lodash';
import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {fetchPolls} from '../actions';

class PollsIndex extends Component {

  componentDidMount(){
    this.props.fetchPolls();
    //console.log(polls)

  }

  renderPolls(){
    return _.map(this.props.polls, poll => {
      return (
        <li className="list-group-item" key={poll.id}>
          <Link to={`/polls/${poll.id}`}>
            {poll.title}
            {poll.description}
          </Link>
        </li>
      );
    });
  }

  render() {
    //console.log(this.props.polls)
    return (
      <div>
        <h3>All the Polls</h3>
        <ul className="list-group">
          {this.renderPolls()}
        </ul>
      </div>
    );
  }
}

function mapStateToProps(state){
  //console.log(state);
  return { polls: state.polls  };
}

export default connect(mapStateToProps,{fetchPolls})(PollsIndex);

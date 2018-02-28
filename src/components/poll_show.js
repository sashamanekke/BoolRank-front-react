import _ from 'lodash';
import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {fetchPoll} from '../actions';

class PollShow extends Component {

  componentDidMount(){
    if (!this.props.poll || !this.props.poll.propositions){
      const {id} = this.props.match.params;
      this.props.fetchPoll(id);
    }
  }

  renderPropositions(){
    return _.map(this.props.poll.propositions, proposition => {
      const color = `${proposition.color}`;
      return (
        <li className="list-group-item" key={proposition.id} style={{backgroundColor: color}}>
          <div className="white">
            {proposition.name}
          </div>
        </li>
      );
    });
  }

  render() {
    const {poll} = this.props;
    if (!poll) {
      return <div>Loading...</div>;
    }
    console.log(this.props);
    const {id} = this.props.match.params;
    const compare = `/polls/${id}/compare`;
    return (
      <div>

        <h3 className="margin-top">{poll.title}</h3>
        <Link className="btn btn-primary" to="/">
          Back to polls
        </Link>
        <Link className="btn btn-success" to={compare}>
          Start poll
        </Link>
        <p>{poll.description}</p>
        <ul className="list-group">
          {this.renderPropositions()}
        </ul>
      </div>
    );
  }
}

function mapStateToProps({polls}, ownProps){
  return {poll: polls[ownProps.match.params.id]};
}

export default connect(mapStateToProps,{fetchPoll})(PollShow);

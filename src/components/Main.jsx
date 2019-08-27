import React from "react";
import Jira from "../actions/jira";
import {Manage, Story, Todo} from "./index";

class Main extends React.Component{
  state = {
    data: [],
    issueTypes: [],
    'to-do':[]
  };
  componentDidMount() {
    Jira.getAllIssueTypes()
      .then(issueTypes=>this.setState({issueTypes}));
    this.fetchAll()
  }

  fetchAll = async () => {
    const data = await Jira.getAllStories();
    if (this.state.manageStory) {
      const active = data.find(e => e.id === this.state.manageStory.id);
      this.setState({manageStory: active})
    }
    this.setState({ data });
    const toDo = [];
    data.forEach(issue => {
      issue.fields.subtasks.forEach(sub => {
        if (sub.fields.status.name !== 'Close'){
          toDo.push(sub);
        }
      })
    });
    this.setState({'to-do': toDo})
  };

  clickStory = (story) => {
    this.setState({ manageStory: story});
  }



  render() {
    return (
      <div className="main">
        <div className="stories">
          <div className="head">Stories</div>
          {
            this.state.data.map(e => (
              <Story onClick={() => this.clickStory(e)} key={e.id} story={e} />
            ))
          }
        </div>
        {this.state.manageStory && (<div className="tasks">
          <div className="head">
            <span>Manage</span>
            <button onClick={() => this.setState({manageStory: undefined})}>&times;</button>
          </div>
          {this.state.manageStory && (<Manage fetchAll={this.fetchAll} issueTypes={this.state.issueTypes} story={this.state.manageStory} />)}
        </div>)}
        <div className="tasks">
          <div className="head">To Do</div>
          <Todo data={this.state['to-do']} />
        </div>
        <div className="tasks">
          <span className="head">Done</span>
        </div>
      </div>
    );
  }
}

export default Main

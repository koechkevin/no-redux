import React, {useState} from "react";

export const Story = ({ story, onClick }) => {
  const subtasks = story.fields.subtasks;
  const done = subtasks.filter(e => e.fields.status.name === 'Close');
  return (
    <button onClick={onClick} className="story">
      <div className="summary">{story.fields.summary}</div>
      <div className="info">
        <span>{ done.length+'/'+subtasks.length}</span>
      </div>
    </button>
  );
};


export const Manage = ({ story }) => {
  const subtasks = story.fields.subtasks;
  const [summary, setSummary] = useState('');
  return (
    <div className="manage">
      <div className="sticky">
      <div className="summary">
        <div className="title">summary</div>
        {story.fields.summary}
        {story.fields.description && (
          <span>
          <hr/>
        <div className="title">description</div>
        {story.fields.description || ''}
          </span>)}
      </div>
      <div className="subtask-title">subtasks</div>
      </div>
      <div className="subtasks">
        {
          subtasks.map(e => {
            return (
              <div key={e.id} className="subTask">
                <div>{e.fields.summary}</div>
                <div>25:00</div>
              </div>
            );
          })
        }
        <div className="bottom">
          <div className="title">Add</div>
          <div className="add">
            <textarea onChange={(e) => {
              setSummary(e.target.value)
            }}/>
            <div className="button-input">
              <input type="text"/>
              <button onClick={() => console.log(summary)}>Save</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const Todo = ({data}) => {
  const [doing, setDoing] = useState(0);
  const inProgress = data && data[(typeof doing === 'number') && doing];
  return (
    <div className="todo">
      <div className="doing">
        <span className="title">In Progress</span>
        <div className="summary">{inProgress && inProgress.fields.summary}</div>
        <div className="flex estimate">
          <div>Time estimated</div>
        <div>25 minutes</div>
        </div>
        <div className="flex estimate">
          <div>Time Remaining</div>
          <div>20 minutes</div>
        </div>
        <div className="buttons">
          <button>Pause</button>
          <button>Finish</button>
        </div>
      </div>
      {data.map((value,i) => {
        return (
          <div className="single-parent" key={value.id}>
          <div className="single">
            <div className="summary">{value.fields.summary}</div>
            <div className="estimate">25:00</div>
          </div>
            <button onClick={() => setDoing(i)}>Start</button>
          </div>
        )
      })}
    </div>
  );
};

import React from "react";

class ActiveUser extends React.Component {
  render() {
    const { logout, data } = this.props;
    return (
      <div  className="logout" >
        <span className="name">{data && data['displayName']}</span>
        <img onClick={logout} height="50px" width="50px" src={data && data.avatarUrls['16x16']} alt="kk"/>
      </div>
      )
  }
}
export default ActiveUser

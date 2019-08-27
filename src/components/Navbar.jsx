import  React from "react";
import Login from "./Login";
import ActiveUser from "./ActiveUser";


class Navbar extends React.Component{

  render(){
    const {updateKey, logout, apiKey, saveUserData, data} = this.props;
    return (
      <div className="nav">
        {!apiKey?(<Login saveUserData={saveUserData} updateKey={updateKey}/>):(<ActiveUser data={data} logout={logout} />)}
      </div>
    )
  }
}

export default Navbar;

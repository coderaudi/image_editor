
import React, { Component, Fragment } from "react";
import FacebookLogin from "react-facebook-login";
import "./fb.css";
import axios from "axios";
class FacebookLive extends Component {

    constructor() {
        super();
        this.state = {
            userDetails: null,
            errMessage :  "Login to continue..."
        }
    }

    responseFacebook = response => {
        console.log(response);
        if (response) {
            this.setState({
                userDetails: response.accessToken ? response : null,
                errMessage : response.accessToken ? "" : "Fail to login try again!",
            })
        }
    };

    goLive = () =>{
        let accessToken = this.state.userDetails.accessToken;
        axios
        .post(
          `https://graph.facebook.com/v3.3/me/live_videos?status=LIVE_NOW&access_token=${accessToken}`,
          {
            headers: {
              "Content-Type": "application/json"
            }
          }
        )
        .then(response => {
          console.log(response);
        })
        .catch(error => {
         // handleError(error);

        });
        
    }

    render() {
        return (
            <div>
                <h4>Facebook Live (Publish video)  </h4>
                <FacebookLogin
                    appId="1853627951564328"
                    autoLoad={true}
                    fields="name,email,picture"
                    scope="public_profile, email , publish_video"
                    callback={this.responseFacebook}
                    cssClass="my-facebook-button-class"
                    icon="fa-facebook"
                />


                <div>

                    {
                        this.state.userDetails ?
                            <div>
                                <h3>User Details </h3>
                                <hr />
                                <div className="card">
                                <img src={this.state.userDetails.picture.data.url} alt="userProfile" style={{width:"100%" }}/>
                                <h4> { this.state.userDetails.name}</h4>
                                <h5 style={{paddingBottom: "10px"}}>{ this.state.userDetails.email} </h5>
                            

                            
                            </div>
                            </div>
                            : <div style={{ color : "black"}}>{this.state.errMessage} </div>

                    }

                </div>

                <div>
                    <button onClick={e => this.goLive(e)}>GOLIve</button>
                </div>
            </div>
        )
    }
}

export default FacebookLive;
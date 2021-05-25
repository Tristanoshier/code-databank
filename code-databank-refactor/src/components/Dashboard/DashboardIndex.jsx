import React, { useContext, useState, useEffect } from "react";
import { TokenContext } from "../../App";
import axios from "axios";
import { Card, Button, Divider } from "antd";
import "./Dashboard-Styles.css";
import { PostActiveContext, PostOnContext } from "../Feed/FeedIndex";
import CreatePost from "../Posts/CreatePost";
export const UserContext = React.createContext();

const DashboardIndex = (props) => {
  // state
  const [user, setUser] = useState([]);
  const [userIncludes, setUserIncludes] = useState({});
  const [upvotes, setUpvotes] = useState(0);

  // context
  const token = useContext(TokenContext);
  const postActive = useContext(PostActiveContext);
  const postOn = useContext(PostOnContext);

  const getUser = async () => {
    try {
      const data = await axios
        .get("http://localhost:3000/user/loggedInUser", {
          headers: {
            Authorization: token,
          },
        })
        .then((res) => {
          setUser(res.data.user);
          console.log(res.data.user);
        });
      return data;
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  // const ifPopular = () => {
  //   user.map((loggedInUser) => {
  //     let totalAmountReduce = function (response) {
  //       return response.reduce(function (a, b) {
  //         return a + Number(b.upVotes);
  //       }, 0);
  //     };
  //     console.log(totalAmountReduce(loggedInUser.posts));
  //   });
  // };

  const test = () => {
    user.map((loggedInUser) => {
      function totalAmount(response) {
        return response.reduce(function (a, b) {
          let total = 0;
          total = a + Number(b.upVotes);
          console.log(total);
          // setUpvotes((prevState) => [...prevState, total]);
          return total;
        }, 0);
      }
      totalAmount(loggedInUser.posts);
    });
  };

  return (
    <Card title={[<i className="fas fa-user"></i>, "Welcome Hustin"]}>
      <div className="dashboard-content">
        <p>Posts: 7</p>
        <p>Votes: 246</p>
        {test()}
      </div>
      <Divider />
      <div className="dashboard-footer">
        <h5>Activity</h5>
        <h5>Placeholder</h5>
      </div>
      <div className="dashboard-post-button">
        <Button type="default" onClick={() => postOn()}>
          Create a post
        </Button>
      </div>
      {postActive ? <CreatePost /> : <></>}
    </Card>
  );
};

export default DashboardIndex;

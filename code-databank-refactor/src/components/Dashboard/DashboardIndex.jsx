import React, { useContext, useState, useEffect } from "react";
import { TokenContext } from "../../App";
import axios from "axios";
import { Card, Button } from "antd";
import "./Dashboard-Styles.css";
export const UserContext = React.createContext();

const DashboardIndex = (props) => {
  const [user, setUser] = useState([]);
  const [userIncludes, setUserIncludes] = useState({});
  const [upvotes, setUpvotes] = useState(0);
  const token = useContext(TokenContext);

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
    <Card title={[<i className="fas fa-user"></i>, "Welcome User"]}>
      <div className="dashboard-content">
        <p>Posts: </p>
        <p>Votes: 246</p>
        {test()}
      </div>
      <div className="dashboard-footer">
        <p>Activity</p>
        <p>Placeholder</p>
      </div>
      <div className="dashboard-post-button">
        <Button type="default">Create a post</Button>
      </div>
    </Card>
  );
};

export default DashboardIndex;

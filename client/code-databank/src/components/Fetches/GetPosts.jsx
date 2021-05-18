// import React, {useState, useEffect} from "react"
import axios from "axios";

export default async function GetPosts(setPosts, token) {
  try {
    const data = await axios
      .get("http://localhost:3000/posts", {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        setPosts(res.data);
        console.log(res.data);
      });
    return data;
  } catch (error) {
    console.log("error", error);
  }
}

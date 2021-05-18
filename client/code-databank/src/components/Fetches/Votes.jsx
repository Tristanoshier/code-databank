import axios from "axios";
import GetPosts from "./GetPosts";

// export default async function upvoteReply(reply, token, setUpvoteCount) {
//   console.log(token);
//   console.log(reply);
//   let newUpvotes = reply.upVotes + 1;
//   try {
//     const data = await axios
//       .post(`http://localhost:3000/replies/${reply.id}`, {
//         method: "PUT",
//         body: JSON.stringify({
//           replyMessage: reply.replyMessage,
//           upVotes: newUpvotes,
//         }),
//         headers: new Headers({
//           "Content-Type": "application/json",
//           Authorization: token,
//         }),
//       })
//       .then((res) => {
//         console.log(res.data);
//         setUpvoteCount(newUpvotes);
//         GetPosts();
//       });
//     return data;
//   } catch (error) {
//     console.log("error", error);
//   }
// }

export default function upVote(reply, token, setUpvoteCount, setPosts) {
  console.log(token);
  let newUpvotes = reply.upVotes + 1;
  fetch(`http://localhost:3000/replies/${reply.id}`, {
    method: "PUT",
    body: JSON.stringify({
      replyMessage: reply.replyMessage,
      upVotes: newUpvotes,
    }),
    headers: new Headers({
      "Content-Type": "application/json",
      Authorization: token,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      setUpvoteCount(newUpvotes);
      GetPosts();
    });
}

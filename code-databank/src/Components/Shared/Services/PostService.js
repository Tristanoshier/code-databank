// post up and down votes
// const upVotePostService = (post, newUpVotes, token) => {
//   try {
//     fetch(`${APIURL}/posts/${post.id}`, {
//       method: "PUT",
//       body: JSON.stringify({
//         upVotes: newUpVotes,
//       }),
//       headers: new Headers({
//         "Content-Type": "application/json",
//         Authorization: token,
//       })
//     }).then(res => res.json())
//     return true;
//   } catch {
//     return false;
//   }
// }

// const downVotePostService = (post, newUpVotes, token) => {
//   try {
//     fetch(`${APIURL}/posts/${post.id}`, {
//       method: "PUT",
//       body: JSON.stringify({
//         upVotes: newUpVotes,
//       }),
//       headers: new Headers({
//         "Content-Type": "application/json",
//         Authorization: token,
//       })
//     }).then(res => res.json())
//     return true;
//   } catch {
//     return false;
//   }
// }

// // reply up and down votes
// const upVoteReplyService = (reply, newUpVotes, token) => {
//   try {
//     fetch(`${APIURL}/replies/${reply.id}`, {
//       method: "PUT",
//       body: JSON.stringify({
//         replyMessage: reply.replyMessage,
//         upVotes: newUpVotes,
//       }),
//       headers: new Headers({
//         "Content-Type": "application/json",
//         Authorization: token,
//       }),
//     }).then(res => res.json())
//     return true;
//   } catch {
//     return false;
//   }
// }

// const downVoteReplyService = (reply, newUpVotes, token) => {
//   try {
//     fetch(`${APIURL}/replies/${reply.id}`, {
//       method: "PUT",
//       body: JSON.stringify({
//         replyMessage: reply.replyMessage,
//         upVotes: newUpVotes,
//       }),
//       headers: new Headers({
//         "Content-Type": "application/json",
//         Authorization: token,
//       }),
//     }).then(res => res.json())
//     return true;
//   } catch {
//     return false;
//   }
// }

// // post CRUD

// const createPostService = (title, message, pt, ct, token) => {
//     try {
//       fetch("${APIURL}/posts", {
//         method: "POST",
//         body: JSON.stringify({
//           postTitle: title,
//           postMessage: message,
//           postType: pt,
//           codeType: ct
//         }),
//         headers: new Headers({
//           "Content-Type": "application/json",
//           Authorization: token,
//         })
//       }).then(res => res.json())
//       return true;
//     } catch {
//       return false;
//     }
// }

// const deleteReplyService = (reply, token) => {
//   try {
//     fetch(`${APIURL}/replies/${reply.id}`, {
//       method: "DELETE",
//       headers: new Headers({
//         "Content-Type": "application/json",
//         Authorization: token,
//       }),
//     }).then(res => res.json())
//     return true;
//   } catch {
//     return false;
//   }
// }

// export {
//   upVotePostService,
//   downVotePostService,
//   upVoteReplyService,
//   downVoteReplyService,
//   deleteReplyService,
//   createPostService,
// }

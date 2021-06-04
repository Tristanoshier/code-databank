

// post up and down votes
const upVotePostService = (post, newUpVotes, token) => {
  try {
    fetch(`http://localhost:3000/posts/${post.id}`, {
      method: "PUT",
      body: JSON.stringify({
        upVotes: newUpVotes,
      }),
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: token,
      })
    }).then(res => res.json())
    return true;
  } catch {
    return false;
  }
}

const downVotePostService = (post, newUpVotes, token) => {
  try {
    fetch(`http://localhost:3000/posts/${post.id}`, {
      method: "PUT",
      body: JSON.stringify({
        upVotes: newUpVotes,
      }),
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: token,
      })
    }).then(res => res.json())
    return true;
  } catch {
    return false;
  }
}

// reply up and down votes
const upVoteReplyService = (reply, newUpVotes, token) => {
  try {
    fetch(`http://localhost:3000/replies/${reply.id}`, {
      method: "PUT",
      body: JSON.stringify({
        replyMessage: reply.replyMessage,
        upVotes: newUpVotes,
      }),
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: token,
      }),
    }).then(res => res.json())
    return true;
  } catch {
    return false;
  }
}

const downVoteReplyService = (reply, newUpVotes, token) => {
  try {
    fetch(`http://localhost:3000/replies/${reply.id}`, {
      method: "PUT",
      body: JSON.stringify({
        replyMessage: reply.replyMessage,
        upVotes: newUpVotes,
      }),
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: token,
      }),
    }).then(res => res.json())
    return true;
  } catch {
    return false;
  }
}

const deletePostService = (post, token) => {
  try {
    fetch(`http://localhost:3000/posts/${post.id}`, {
      method: "DELETE",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: token,
      }),
    }).then(res => res.json())
    return true;
  } catch {
    return false;
  }
}

const deleteReplyService = (reply, token) => {
  try {
    fetch(`http://localhost:3000/replies/${reply.id}`, {
      method: "DELETE",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: token,
      }),
    }).then(res => res.json())
    return true;
  } catch {
    return false;
  }
}

export {
  upVotePostService,
  downVotePostService,
  upVoteReplyService,
  downVoteReplyService,
  deletePostService,
  deleteReplyService
}
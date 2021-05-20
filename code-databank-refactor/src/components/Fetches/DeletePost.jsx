import axios from "axios";

export default async function DeletePost(token, post) {
  try {
    const data = await axios
      .delete(`http://localhost:3000/posts/${post.id}`, {
        method: "DELETE",
        headers: new Headers({
          "Content-Type": "application/json",
          Authorization: token,
        }),
      })
      .then((res) => {
        console.log(res);
        console.log(post);
        return data;
        // GetPosts(token)
      });
  } catch (error) {
    console.log("error", error);
  }
}

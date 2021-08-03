import React from "react";
import { Menu, Popconfirm } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

export function controlButtons(post, editPostOn, updatePost, DeletePost) {
  return localStorage.getItem("id") != post?.ownerId ? (
    ""
  ) : (
    <>
      <Menu.Item>
        <a
          onClick={() => {
            editPostOn();
            updatePost(post);
          }}
        >
          <EditOutlined />
          Edit Post
        </a>
      </Menu.Item>
      <Menu.Item danger>
        <Popconfirm
          title="Are you sure？"
          placement="topRight"
          okText="Yes"
          cancelText="No"
          onConfirm={() => DeletePost(post)}
        >
          <DeleteOutlined />
          Delete Post
        </Popconfirm>
      </Menu.Item>
    </>
  );
}

export function replyControlButtons(
  reply,
  editReplyOn,
  updateReply,
  deleteReply
) {
  return localStorage.getItem("id") != reply?.ownerId ? (
    ""
  ) : (
    <div className="reply-footer-actions">
      <h5>
        <a
          id="edit-reply"
          onClick={() => {
            editReplyOn();
            updateReply(reply);
          }}
        >
          Edit
        </a>
      </h5>
      <h5>
        <a id="delete-reply">
          <Popconfirm
            title="Are you sure？"
            placement="topRight"
            okText="Yes"
            cancelText="No"
            onConfirm={() => deleteReply(reply)}
          >
            Delete
          </Popconfirm>
        </a>
      </h5>
    </div>
  );
}

export function menu(
  post,
  addToSaved,
  openSavedPostNotifiction,
  editPostOn,
  updatePost,
  DeletePost
) {
  return (
    <Menu>
      <Menu.Item>
        <a
          onClick={() => {
            addToSaved(post);
            openSavedPostNotifiction();
          }}
        >
          <i className="far fa-bookmark"></i>
          Save Post
        </a>
      </Menu.Item>
      {controlButtons(post, editPostOn, updatePost, DeletePost)}
    </Menu>
  );
}

export function iconType(post) {
  if (post?.codeType === "React") {
    return <i className="fab fa-react"></i>;
  } else if (post?.codeType === "JavaScript") {
    return <i className="fab fa-js-square"></i>;
  } else if (post?.codeType === "HTML") {
    return <i className="fab fa-html5"></i>;
  } else if (post?.codeType === "CSS") {
    return <i className="fab fa-css3-alt"></i>;
  } else if (post?.codeType === "Github") {
    return <i className="fab fa-github"></i>;
  } else {
    return <i className="far fa-question-circle"></i>;
  }
}

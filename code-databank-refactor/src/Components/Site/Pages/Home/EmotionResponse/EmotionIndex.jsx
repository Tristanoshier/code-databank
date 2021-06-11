import React from "react";
import { Card, Divider } from "antd";
import "./Emotion-Styles.css";

const EmotionIndex = () => {
  let topics = [
    "Student gets upset with you",
    "Student threatens a bad review",
    "Student has personal issues",
    "Motivation tips",
    "Student is inappropriate with you",
  ];

  return (
    <Card
      title={[
        <i className="fas fa-angry" style={{ paddingRight: "10px" }}></i>,
        "Emotional Response",
      ]}
      className="emotion-card"
    >
      <div className="emotion-container">
        <Divider orientation="left" style={{ marginTop: "0px" }}>
          <h5 id="popular-topics">Popular Topics</h5>
        </Divider>
        <div className="emotion-popular-topics-content">
          {topics.map((topic) => (
            <div className="popular-topics">
              <div className="topic-badge">99+</div>
              <h5 className="popular-topics-title">{topic}</h5>
            </div>
          ))}
        </div>
        <Divider />
        <div className="emotion-footer">
          <h5 className="emotion-footer-links">Check out all tips</h5>
          <h5 className="emotion-footer-links">Placeholder</h5>
        </div>
      </div>
    </Card>
  );
};

export default EmotionIndex;

import React from "react";
import { Card, Divider } from "antd";
import "./Emotion-Styles.css";

const EmotionIndex = () => {
  return (
    <Card
      title={[<i className="fas fa-angry"></i>, "Emotional Response"]}
      className="emotion-card"
    >
      <div className="emotion-container">
        <h4 id="popular-topics">
          <u>Popular Topics</u>
        </h4>
        <p>Student gets upset with you</p>
        <p>Student threatens bad review</p>
        <p>Student has personal problems</p>
        <p>Motivations tips</p>
        <p>Student is inappropriate with you</p>
        <Divider />
        <div className="emotion-footer">
          <h5>Check out all tips</h5>
          <h5>Placeholder</h5>
        </div>
      </div>
    </Card>
  );
};

export default EmotionIndex;

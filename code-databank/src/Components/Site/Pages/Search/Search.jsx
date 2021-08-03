import React, { useState, useContext } from "react";
import { Skeleton, Card, Input, Select, Button, Row, Col } from "antd";
import { TokenContext } from "../../../../App";
import { SearchDisplay } from "./SearchDisplay";
import "./Search.css";

export const Search = () => {
  const [query, setQuery] = useState("");
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [filterType, setFilterType] = useState("all");
  const [loading, setLoading] = useState(false);
  const [showSearchMessage, setShowSearchMessage] = useState(true);

  const token = useContext(TokenContext);

  const searchPosts = () => {
    if (filterType === "all" && query != "") {
      searchAllByTitleQuery();
    } else {
      searchAllByPostTypeForTitle();
    }
  };

  const searchAllByTitleQuery = () => {
    try {
      setLoading(true);
      fetch(`https://cd-server.herokuapp.com/search/all?search=${query}`, {
        method: "GET",
        headers: new Headers({
          "Content-Type": "application/json",
          Authorization: token,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          setFilteredPosts(data);
          setShowSearchMessage(false);
        })
        .then(() => setLoading(false))
        .catch((error) => console.log(error));
    } catch (error) {
      setLoading(false);
    }
  };

  const searchAllByPostTypeForTitle = () => {
    try {
      setLoading(true);
      fetch(
        `https://cd-server.herokuapp.com/search/type?search=${query}&type=${filterType}`,
        {
          method: "GET",
          headers: new Headers({
            "Content-Type": "application/json",
            Authorization: token,
          }),
        }
      )
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setFilteredPosts(data);
          setShowSearchMessage(false);
        })
        .then(() => setLoading(false))
        .catch((error) => console.log(error));
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <Row justify="center">
        <Col xs={24} sm={24} md={16} lg={12} xl={12} xxl={12}>
          <div className="search-field-container">
            <Input.Group compact>
              <Select
                onChange={(value) => setFilterType(value)}
                style={{ width: "25%" }}
                defaultValue="All"
              >
                <Select.Option value="all">All</Select.Option>
                <Select.Option value="HTML">HTML</Select.Option>
                <Select.Option value="CSS">CSS</Select.Option>
                <Select.Option value="JavaScript">JavaScript</Select.Option>
                <Select.Option value="React">React</Select.Option>
                <Select.Option value="GitHub">GitHub</Select.Option>
              </Select>
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search"
                onKeyPress={(e) => {
                  if (e.key === "Enter" && query != "") searchPosts();
                }}
                style={{ width: "60%" }}
              />
              <Button
                style={{ width: "15%" }}
                type="default"
                onClick={searchPosts}
              >
                Search
              </Button>
            </Input.Group>
          </div>
        </Col>
      </Row>
      <br />
      {loading ? (
        <div>
          <Row justify="center">
            <Col xs={24} sm={24} md={16} lg={12} xl={12} xxl={12}>
              <Card>
                <Skeleton active paragraph={{ rows: 10 }} />
              </Card>
              <br />
              <br />
              <Card>
                <Skeleton active paragraph={{ rows: 10 }} />
              </Card>
            </Col>
          </Row>
        </div>
      ) : showSearchMessage ? (
        <Row justify="center">
          <Col xs={24} sm={24} md={16} lg={12} xl={12} xxl={12}>
            <h4>Search all or choose by category.</h4>
          </Col>
        </Row>
      ) : filteredPosts.length === 0 && !loading ? (
        <Row justify="center">
          <Col xs={24} sm={24} md={16} lg={12} xl={12} xxl={12}>
            <h4>No results found</h4>
          </Col>
        </Row>
      ) : (
        <SearchDisplay posts={filteredPosts} getPosts={searchPosts} />
      )}
    </div>
  );
};

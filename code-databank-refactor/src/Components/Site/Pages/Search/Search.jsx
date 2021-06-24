import React, { useState, useContext } from "react";
import { Spin, Input, Button, Form, Row, Col } from "antd";
import { TokenContext } from "../../../../App";
import { SearchDisplay } from "./SearchDisplay";
import "./Search.css";

export const Search = () => {
  const [query, setQuery] = useState("");
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [queryInUse, setQueryInUse] = useState();
  const [loading, setLoading] = useState(false);

  const token = useContext(TokenContext);

  const searchAllByTitleQuery = () => {
    try {
      setLoading(true);
      fetch(`http://localhost:3000/search/all/title?search=${query}`, {
        method: "GET",
        headers: new Headers({
          "Content-Type": "application/json",
          Authorization: token,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          setFilteredPosts(data);
        })
        .then(() => setLoading(false))
        .catch((error) => console.log(error));
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };


  const searchAllByPostTypeForTitle = () => {
    try {
      fetch(
        `http://localhost:3000/search/type/title?search=${query}&type=${type}`,
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
          setFilteredPosts(data);
        })
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
            <Form layout="inline" style={{ marginBottom: "20px" }}>
              <Form.Item>
                <Input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search"
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      searchAllByTitleQuery();
                    }
                  }}
                />
              </Form.Item>
              <Form.Item>
                <Button type="default" onClick={searchAllByTitleQuery}>
                  Search
                </Button>
              </Form.Item>
              <br />
            </Form>
          </div>
        </Col>
      </Row>
      {!loading ? (
        <SearchDisplay posts={filteredPosts} getPosts={searchAllByTitleQuery} />
      ) : (
        <Row justify="center">
          <Spin />
        </Row>
      )}
    </div>
  );
};

import React, { useState, useContext } from 'react'
import { Skeleton, Input, Select } from "antd";
import { TokenContext } from "../../../../App";
import { SearchDisplay } from './SearchDisplay';

export const Search = () => {
    const [query, setQuery] = useState('')
    const [filteredPosts, setFilteredPosts] = useState([])
    const [searchInUse, setSearchInUse] = useState()
    const [loading, setLoading] = useState(false)

    const token = useContext(TokenContext);

    const { Search } = Input;

    const searchAllByTitleQuery = () => {
        try {
            setLoading(true)
            fetch(`http://localhost:3000/search/all/title?search=${query}`, {
                method: "GET",
                headers: new Headers({
                    "Content-Type": "application/json",
                    Authorization: token,
                }),
            })
                .then((res) => res.json())
                .then((data) => {
                    setFilteredPosts(data)
                }).then(() => setLoading(false))
                .catch((error) => console.log(error));
        } catch (error) {
            console.log(error);
            setLoading(false)
        }
    }

    const searchAllByPostTypeForTitle = () => {
        try {
            fetch(`http://localhost:3000/search/type/title?search=${query}&type=${type}`, {
                method: "GET",
                headers: new Headers({
                    "Content-Type": "application/json",
                    Authorization: token,
                }),
            })
                .then((res) => res.json())
                .then((data) => {
                    setFilteredPosts(data)
                })
                .catch((error) => console.log(error));
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div>
            <Input.Group compact>
                <Select style={{ width: '25%' }} defaultValue="All">
                    <Select.Option value="all">All</Select.Option>
                    <Select.Option value="HTML">HTML</Select.Option>
                    <Select.Option value="CSS">CSS</Select.Option>
                    <Select.Option value="JavaScript">JavaScript</Select.Option>
                    <Select.Option value="React">React</Select.Option>
                    <Select.Option value="GitHub">GitHub</Select.Option>
                </Select>
                <Search style={{ width: '75%' }} placeholder="input search text" value={query} onChange={e => setQuery(e.target.value)} onSearch={searchAllByTitleQuery} enterButton />
            </Input.Group>
            {/* <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search"></input>
            <button onClick={searchAllByTitleQuery}>Search</button> */}
            <br />
            {!loading ? (
                <SearchDisplay posts={filteredPosts} getPosts={searchAllByTitleQuery} />
            ) : (
                <Skeleton active paragraph={{ rows: 12 }} />
            )}
        </div>
    )
}

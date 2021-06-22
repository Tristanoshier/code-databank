import React, { useState, useContext } from 'react'
import { TokenContext } from "../../../../App";
import { SearchDisplay } from './SearchDisplay';

export const Search = () => {
    const [query, setQuery] = useState('')
    const [filteredPosts, setFilteredPosts] = useState([])
    const [queryInUse, setQueryInUse] = useState()

    const token = useContext(TokenContext);

    const searchAllByTitleQuery = () => {
        try {
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
                })
                .catch((error) => console.log(error));
        } catch (error) {
            console.log(error);
        }
    }

    const searchAllByMessageQuery = () => {
        try {
            fetch(`http://localhost:3000/search/all/message?search=${query}`, {
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

    const searchAllByPostTypeForMessage = () => {
        try {
            fetch(`http://localhost:3000/search/type/message?search=${query}&type=${type}`, {
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
            <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search"></input>
            <button onClick={searchAllByTitleQuery}>Search</button>
            <br />
            <SearchDisplay posts={filteredPosts} getPosts={searchAllByTitleQuery} />
        </div>
    )
}

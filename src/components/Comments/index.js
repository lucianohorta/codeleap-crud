import React, { useState } from 'react';
import { CommentSection, SubmitBtn } from '../Comments/styles';
import instance from '../../services/axiosConfig';

export default function Comments() {

    const [posts, setPosts] = useState([]);

    const addPost = (e) => {
        e.preventDefault();

        const newPost = {
            id: Math.random().toString(36).substr(2, 9), //get id from api later on
            title: e.target.title.value,
            content: e.target.post.value,
        };

        //AXIOS POST:
        var postData = {
            username: localStorage.getItem('name'),
            title: e.target.title.value,
            content: e.target.post.value
        };
        let axiosConfig = {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        };
        instance.post(baseURL, postData, axiosConfig)
        .then((res) => {
            console.log("POST SUCCESS: ", res);
            setPosts([...posts, newPost]);  //update posts variable
            e.target.title.value = "";      //reset title input after sent
            e.target.post.value = "";       //reset post input after sent
        })
        .catch((err) => {
            console.log("AXIOS ERROR: ", err);
        })

    };

    return (
        <CommentSection>
            <h5> What's on your mind? </h5>

            {/* SUBMIT BUTTON: */}
            <form onSubmit={addPost}>
                <p>Title</p>
                <input type="text" name="title" id="title" placeholder="Hello world" />
                <p>Content</p>
                <textarea name="post" rows="3" cols="60" placeholder="Content here"></textarea>
                <SubmitBtn type="Submit" value="CREATE" />
            </form>
        </CommentSection>
    )

}
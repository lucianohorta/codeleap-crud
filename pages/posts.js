import React, { useEffect, useState } from 'react';
import Comments from '../src/components/Comments';
import instance from '../src/services/axiosConfig';
// Moment:
import Moment from 'react-moment';
import 'moment-timezone';
// Images:
import Image from 'next/image';
import iconDelete from '../public/icon-delete.png';
import iconEdit from '../public/icon-edit.png';

// Styles
import {
    Post, 
    PostContainer, 
    Header, 
    EditPostContainer, 
    RecentPostHeader, 
    RecentPostBody, 
    EditItem, 
    RecentPostComment, 
    EachPost, 
    PostTitle, 
    PostInfo, 
    PostUser, 
    PostDate, 
    PostContent 
} from './../src/components/Post/styles.js';

export default function Posts() {
    const [data, setData] = useState([]);

    const [posts, setPosts] = useState([]);
    const [postEditing, setPostEditing] = useState("");
    const [postDelete, setPostDelete] = useState("");

    
    // GET POSTS FROM LOCALSTORAGE & RETRIEVE API DATA:
    useEffect(() => {
        const json = localStorage.getItem("posts");
        const savedPosts = JSON.parse(json);
        if (savedPosts) {
            setPosts(savedPosts);
        }

        try {
            instance.get(`/`).then(response => {
                const data = response.data.results;
                setData(data);

                //console.log(data);
            })
        } catch(err) {
            console.log(err)
        }
    }, []);

    // SAVE POSTS TO LOCALSTORAGE:
    useEffect(() => {
        const json = JSON.stringify(posts);
        localStorage.setItem("posts", json);
    }, [posts]);  


    const deletePost = (idToDelete) => {

        //const deletedPosts = posts.map((post) => {

            const filteredPosts = posts.filter((post) => post.id !== idToDelete);

            // if (post.id === idToDelete) {
                //AXIOS DELETE:
                instance.delete(`/` + idToDelete, {
                    mode: 'no-cors',
                    headers: {
                        "Accept": "application/json",
                        "Access-Control-Allow-Origin": "*",   
                        'Content-Type': "application/json; charset=utf-8",
                    },
                })
                .then((res) => {
                    console.log("DELETE SUCCESS: ", res);
                })
                .catch((err) => {
                    console.log("AXIOS ERROR: ", err);
                })

                setPosts(filteredPosts);
                
                
            // } else {
            //     return post;
            // }

        //});

        

    };

    const editPost = (event, idToEdit) => {
        event.preventDefault();
        const updatedPosts = posts.map((post) => {
            
            if (post.id === idToEdit) {
                 //AXIOS PATCH:
                var postData = {
                    title: event.target.title.value,
                    content: event.target.post.value
                };
                let axiosConfig = {
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    }
                };
                let idPost = post.id;
                instance.patch(`/`+idPost, postData, axiosConfig)
                .then((res) => {
                    console.log("POST SUCCESS: ", res);

                })
                .catch((err) => {
                    console.log("AXIOS ERROR: ", err);
                });

                return {
                    id: post.id,
                    title: event.target.title.value,
                    content: event.target.post.value,
                };
            } else {
                return post;
            }
        });

        

        setPosts(updatedPosts);
        setPostEditing("");

    };


    return (
        <>
            <Post>
                <Header>
                    <h5> CodeLeap Network </h5>
                </Header>

                <PostContainer className="postcontainer">

                    <Comments />

                    {/* EDIT POST SECTION: */}
                    {posts.map((post) => (
                        <EditPostContainer key={post.id}>
                            {post.id !== postEditing ? (
                            <div> 
                                <RecentPostHeader>
                                    <span>{post.title}</span>
                                    <div>
                                        <button onClick={() => deletePost(post.id)}>
                                            <Image
                                                src={iconDelete}
                                                alt="icon-delete"
                                                width={28}
                                                height={28}
                                            />
                                        </button>
                                        <button onClick={() => setPostEditing(post.id)}>
                                            <Image
                                                src={iconEdit}
                                                alt="icon-edit"
                                                width={28}
                                                height={28}
                                            />
                                        </button>
                                    </div>
                                </RecentPostHeader>
                                
                                {data.map(d => (
                                    <RecentPostBody key={d.id}>
                                        <p>  {d.username}  </p>
                                        <span> 
                                            <Moment fromNow format="MM/DD/YYYY">
                                                {d.created_datetime}
                                            </Moment>
                                        </span>
                                    </RecentPostBody>
                                )).shift()}
                                
                                <RecentPostComment>
                                    {post.content}
                                </RecentPostComment>
                            </div>
                            ) : (
                            <form onSubmit={(e) => editPost(e, post.id)}>
                                <EditItem>
                                    <div>
                                        <h5> Edit item </h5>
                                        <p>Title</p>
                                        <input type="text" name="title" id="title" placeholder="Hello world" defaultValue={post.title} />
                                        <p>Content</p>
                                        <textarea name="post" rows="3" cols="60" placeholder="Content here" defaultValue={post.content}></textarea>
                                        <button type="Submit"> SAVE</button>
                                    </div>
                                </EditItem>
                            </form>
                            )}
                        </EditPostContainer>
                    ))}

                    <EachPost>
                        <ul>
                            {data.map(d => (
                                <li key={d.id}>
                                    <PostTitle>
                                        {d.title}
                                    </PostTitle>
                                    <PostInfo>
                                        <PostUser>
                                            {d.username}
                                        </PostUser>
                                        <PostDate>
                                            <Moment fromNow format="MM/DD/YYYY">{d.created_datetime}</Moment>
                                        </PostDate>
                                    </PostInfo>
                                    <PostContent>
                                        {d.content}
                                    </PostContent>
                                </li>
                            ))} 
                        </ul>
                    </EachPost>

                </PostContainer>

            </Post>
        </>
    )
    
}
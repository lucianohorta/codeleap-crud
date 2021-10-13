import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Moment from 'react-moment';
import 'moment-timezone';
import styled from 'styled-components';
import Image from 'next/image';
import iconDelete from '../public/icon-delete.png';
import iconEdit from '../public/icon-edit.png';

const Container = styled.div`
    background: #DDDDDD;
`

const PostContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    height: 100vh;
    width: 100%;
    max-width: 100%;
    padding: 3%;
    background: #FFF;
    color: #000;
    width: 40%;
    height: auto;
    margin: 0 auto;
`

const EachPost = styled.div`
    width: 100%;

    ul {
        padding: 0;

        li {
            list-style: none;
            width: 100%;
            border: 1px solid grey;
            margin-top: 40px;
        }
    }
`

const PostTitle = styled.div`
    background: #000;
    color: white;
    padding: 18px;
    font-size: 18px;
    font-weight: bold;
`

const PostInfo = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`

const PostUser = styled.div`
    padding: 18px;
    color: #777777;

    &::before {
        content: '@';
    }
`
const PostDate = styled.div`
    margin-right: 20px;
    color: #777777;
`

const PostContent = styled.div`
    padding: 0 18px 18px 18px;
`

const Header = styled.div`
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding-left: 3%;
    width: 40%;
    background: black;
    color: #FFF;
    margin: 0 auto;
`

const CommentSection = styled.div`
    border: 1px solid #949494;
    padding: 20px;

    form {
        padding: 0 10px;
    }

    h5 { margin-bottom: 26px; padding: 0 10px;}
    p { font-weight: 500; margin-top: 20px; margin-bottom: 5px; }
    input {
        width: 100%;
        padding-left: 8px;

        &::placeholder {
            color: #DDDDDD;
            font-size: 14px;
        }
    }
    textarea {
        width: 100%;
        resize: none; 
        padding-left: 8px;

        &::placeholder {
            color: #DDDDDD;
            font-size: 14px;
        }
    }
`

const SubmitBtn = styled.input`
    background: #000;
    color: #FFF;
    border: 0;
    font-weight: bold;
    padding: 5px 10px;
    display: flex;
    text-align: right;
    margin-left: auto;
    margin-right: 0;
    margin-top: 20px;
    margin-bottom: 5px;
    justify-content: center;
    width: 115px !important;
    align-items: center;
    text-align: center;
`

const EditPostContainer = styled.div`
    border: 1px solid #949494;
    width: 100%;
    margin-top: 40px;
`
const RecentPostHeader = styled.div`
    display: flex;
    justify-content: space-between;
    background: #000;
    color: white;
    padding: 18px;
    font-size: 18px;
    font-weight: bold;
    margin: 0;

    button {
        background: transparent;
        border: 0;
    }
`

const RecentPostBody = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;

    p {
        padding: 18px;
        color: #777777;

        &::before {
            content: '@';
            margin-right: -5px;
        }
    }

    span {
        margin-right: 20px;
        margin-top: -18px;
        color: #777777;
    }
`

const EditItem = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: #1f1f1f66;

    > div {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;
        width: 40%;
        height: 40%;
        background: #FFF;;
        padding-left: 50px;
    }
    p { font-weight: 500; margin-top: 20px; margin-bottom: 5px; }

    button {
        background: #000;
        border: 0;
        color: white;
        padding: 4px 30px;
        margin-top: 20px;
        margin-bottom: 20px;
    }
    h5 {
        margin: 0;
        font-weight: bold;
    }
`

const RecentPostComment = styled.div`
    padding: 0 18px 18px 18px;
    margin-top: -15px;
`

const baseURL = "https://dev.codeleap.co.uk/careers/";

export default function Posts() {
    const [data, setData] = useState([]);

    const [posts, setPosts] = useState([]);
    const [postEditing, setPostEditing] = useState("");
    const [postDelete, setPostDelete] = useState("");
    
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
        axios.post(baseURL, postData, axiosConfig)
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

    const deletePost = (idToDelete) => {

        //const deletedPosts = posts.map((post) => {

            const filteredPosts = posts.filter((post) => post.id !== idToDelete);

            // if (post.id === idToDelete) {
                //AXIOS DELETE:
                axios.delete(baseURL + idToDelete, {
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
                axios.patch(baseURL+idPost, postData, axiosConfig)
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

    // GET POSTS FROM LOCALSTORAGE & RETRIEVE API DATA:
    useEffect(() => {
        const json = localStorage.getItem("posts");
        const savedPosts = JSON.parse(json);
        if (savedPosts) {
            setPosts(savedPosts);
        }

        try {
            axios.get(baseURL).then(response => {
                const data = response.data.results;
                setData(data);
    
                console.log(data);
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


    return (
        <Container>
            <Header>
                <h5> CodeLeap Network </h5>
            </Header>

            <PostContainer className="postcontainer">
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

                {/* EACH POST: */}
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

        </Container>
    )
    
}
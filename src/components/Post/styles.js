import styled from 'styled-components';

const Post = styled.div`
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

export { 
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
}
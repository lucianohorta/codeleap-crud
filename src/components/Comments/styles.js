import styled from 'styled-components';

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


export { CommentSection, SubmitBtn }
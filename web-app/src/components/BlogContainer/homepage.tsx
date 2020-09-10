import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import CoverImage from '../../public/image/nature.png';
import BlogCard from './blogCard';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../reducers';
import { useForm } from 'react-hook-form';
import allActions from '../../actions';
import {thingsInArray} from '../App';

type Inputs = {
    title: string,
    post: string,
};


// interface thingsInArray {
//     id: number,
//     emailid: string,
//     name: string,
//     title: string,
//     posttext: string,
//     timeofpost: string
// }

type Props = {
    listToPrint: thingsInArray[] | undefined,
    callback: React.Dispatch<React.SetStateAction<string>>,
    updatePropList: React.Dispatch<React.SetStateAction<thingsInArray[] | undefined>>
}

const HomeContainer = styled.div`
    width:100%;
`;

const HomeHeader = styled.div`
    width:80%;
    margin:0px auto;
`;

const HomeBody = styled.div`
    width:80%;
    margin:20px auto;
`;

const CoverImageTag = styled.img`
    width:80%;
    margin: 0px auto;
    display: block;
`;

const ProfileDetails = styled.div`
    width:80%;
    margin: 0px auto;

    & button {
        border: 0px;
        background:blue;
        color:white;
        border-radius:3px;
        float:right;
        padding:10px;
        cursor: pointer;
        font-family:inherit;
    }
`;

const CommentSection = styled.form`
    width:80%;
    margin: 0px auto;

    & label {
        display: block;
        margin-top: 10px;
        color: dimgray;
    }

    & input {
        width: 95%;
        padding: 20px;
        font-size: 18px;        
        background: #d5d7de;
        border: 1px solid gray;
        border-radius: 3px;
    }

    & textarea {
        width: 95%;
        height: 200px;
        font-size: 18px;
        display: block;
        padding: 20px;
        background: #d5d7de;
        border: 1px solid gray;
        border-radius: 3px;
    }

    & button[type=submit] {
        width: 100px;
        height: 50px;
        margin-top: 20px;
        color: white;
        border-radius: 6px;
        background: blue;
        border: none;
        font-size: larger;
        font-family:inherit;
    }

    & span {
        font-size: 12px;
        color:hotpink;
        display:block;
    }

`;

const HomeScreen: React.FC<Props> = ({ updatePropList, callback, listToPrint }) => {

    const userName = useSelector((state: RootState) => state.currentUserRed.current_user_name);
    const email = useSelector((state: RootState) => state.currentUserRed.current_user_email);
    const [cardId, setCardID] = useState<number | undefined>(-1);

    useEffect(() => {
        const result = listToPrint?.filter(item => {
            return item.id !== cardId
        })
        updatePropList(result);
        callback("Home");
    }, [cardId])

    const dispatch = useDispatch();

    const { register, handleSubmit, reset, errors } = useForm<Inputs>();

    const onSubmit = (data: Inputs) => {
        console.log(data);
        const date = new Date();

        const payload = {
            ...data,
            time: date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear(),
            emailid: email
        }

        fetch('http://localhost:5000/savepost',
            {
                method: "POST",
                body: JSON.stringify(payload)
            }
        ).then(res => res.json()
        ).then(json => {
            console.log(json);
            const data: thingsInArray = {
                id: json.id,
                emailid: email,
                name: userName,
                title: payload.title,
                posttext: payload.post,
                timeofpost: payload.time
            }

            listToPrint === undefined ? updatePropList([data]) : updatePropList([data, ...listToPrint]);
            callback("Home");
            reset();
        })
    }

    const logOutButtonhandler = (e: React.MouseEvent) => {
        e.preventDefault();
        console.log(e.target);
        callback("Community");
        dispatch(allActions.currentUser.setUsername(""));
        localStorage.setItem('username', '');
        dispatch(allActions.currentUser.setEmail(""));
        localStorage.setItem('email', '');
        dispatch(allActions.userAction.logIn(false));
        localStorage.setItem('logIn', 'false');
        dispatch(allActions.userAction.logOut(true));
        localStorage.setItem('logOut', 'true');
    }

    const filteredArray = listToPrint?.filter(arr => {
        return arr.name === userName
    })

    return (
        <HomeContainer>
            <HomeHeader>
                <CoverImageTag src={CoverImage} />
            </HomeHeader>
            <HomeBody>
                <ProfileDetails>
                    <button onClick={logOutButtonhandler}>Logout</button>
                    <h2>Hello, {userName}</h2>
                    <p>Welcome to BlogApp. Thank you for using our product.</p>
                    <h2>Your feeds</h2>
                    {filteredArray?.length === 0 && <p>Nothing to show right now. Create your post to show here...</p>}
                </ProfileDetails>

                {
                    filteredArray?.map(arr2 => {
                        return <BlogCard getId={setCardID} key={arr2.id} showDelete={true} cardDetails={arr2} />
                    })
                }
                <CommentSection onSubmit={handleSubmit(onSubmit)}>
                    <h3>Add your posts here...</h3>
                    <label htmlFor="title-field">Title *</label>
                    <input id='title-feild' name='title' ref={register({ required: true })} placeholder='Enter title for your post' />
                    {errors.title && <span>This field is required</span>}
                    <label htmlFor="posttext-field">Content *</label>
                    <textarea maxLength={600} name='post' ref={register({ required: true })} id='postText-feild' placeholder="Create your post here..."></textarea>
                    {errors.post && <span>This field is required</span>}
                    <button type='submit'>Post</button>
                </CommentSection>
            </HomeBody>
        </HomeContainer>
    )
}

export default HomeScreen;
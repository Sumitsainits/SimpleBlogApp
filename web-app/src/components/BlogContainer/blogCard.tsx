import React, { MouseEvent } from 'react';
import styled from 'styled-components';
import deletePost from '../../public/image/deletePost.png'

interface thingsInArray {
    id: number,
    emailid: string,
    name: string,
    title: string,
    posttext: string,
    timeofpost: string
}

type Props = {
    cardDetails: thingsInArray,
    showDelete: boolean,
    getId?: React.Dispatch<React.SetStateAction<number | undefined>>
}

const TempCard = styled.div`
    background: #fff;
    width:80%;
    border-radius: 2px;
    margin: 20px auto;
    box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
    transition: all 0.3s cubic-bezier(.25,.8,.25,1);
    padding: 1px;
    &:hover {
        box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);
    }
`;

const BlogHead = styled.div`
    width: 90%;
    margin: 20px auto; 

    & h1 {
        color: #333;
        font-weight:100;
    }

    & h1:hover{
        color:green;
    }

    & img {
        float: right;
        margin-top: -25px;
        border-radius: 3px;
        box-shadow: 0px 0px 1px rgba(20,20,20,0.6), 0 0 2px 3px rgba(0,0,0,0.2);
        cursor: pointer;
    }

    & div {
        font-size: 18px;
    }
`;

const BlogBody = styled.div`
    width: 90%;
    margin: 20px auto; 
    color:#4d4d4d;
`;

const BlogFoot = styled.div`
    width: 90%;
    margin: 10px auto; 
`;

const BlogCard: React.FC<Props> = (props) => {

    const getCardKey = (e: MouseEvent) => {
        e.preventDefault();
        const target = e.target as HTMLElement;
        //console.log(parseInt(target.attributes[1].value));

        fetch('http://localhost:5000/deletepost',
            {
                method: "POST",
                body: JSON.stringify({ id: parseInt(target.attributes[1].value) })
            }
        ).then(res => res.json()
        ).then(json => {
            console.log(json);
            if(json.error===''){
                props.getId && props.getId(json.id||-1)
            }
        })
    }

    return (
        <TempCard>
            <BlogHead>
                <div>
                    By - {props.cardDetails.name}
                </div>
                {props.showDelete && <img src={deletePost} onClick={getCardKey} data-tag={props.cardDetails.id} title="Delete this post" alt='delete-icon' />}
                <h1>{props.cardDetails.title}</h1>
            </BlogHead>
            <BlogBody>
                <p>{props.cardDetails.posttext}</p>
            </BlogBody>
            <hr style={{
                width: '90%'
            }} />
            <BlogFoot>
                <span>{props.cardDetails.timeofpost}</span>
            </BlogFoot>
        </TempCard>
    )
}

export default BlogCard;
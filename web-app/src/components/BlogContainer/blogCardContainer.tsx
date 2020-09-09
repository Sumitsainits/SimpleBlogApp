import React from 'react';
import BlogCard from './blogCard';
import styled from 'styled-components';

interface thingsInArray {
    id:number,
    emailid: string,
    name: string,
    title: string,
    posttext: string,
    timeofpost: string
  }

type Props = {
    listToPrint:thingsInArray[]|undefined
}

const ContainerDiv = styled.div`
    margin-bottom : 0px auto;
`;

const CardContainer : React.FC<Props> = (props) => {
    return (
        <ContainerDiv>
            {props.listToPrint === undefined && <p>Please wait loading content...</p>}
            {
                props.listToPrint?.map(arr=>{
                    return <BlogCard key={arr.id} showDelete={false} cardDetails={arr} />            
                })              
            }
            
        </ContainerDiv>
    )
}

export default CardContainer;
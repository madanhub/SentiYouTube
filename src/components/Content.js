import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import WordCloud from "./WordCloud";
import swal from "sweetalert";

function Content() {
  const [sentimentObject, setSentimentObject] = useState({});

  const id = 1;
  useEffect(() => {
    if (id !== undefined) {
      axios.get("https://er6f0ym5ia.execute-api.us-east-1.amazonaws.com/receivemessage/message").then((res) => {
        console.log(res);
        setSentimentObject(JSON.parse(JSON.stringify(res.data)));
        console.log(sentimentObject);
      });
    } else {
      swal("Please login to continue");
    }
  }, [sentimentObject]);

  return (
    <Container>
      <div>
        <Cover>
          <p> {sentimentObject?.channelId} </p>
          <img src={sentimentObject?.url} />
          <p> {sentimentObject?.title} </p>
          <p> {sentimentObject?.channelTitle} </p>
        </Cover>
      </div>

      <Grid>
        <Wrap>
          <p> Total number of views</p>
          <span> {sentimentObject?.viewCount} </span>
        </Wrap>
        <Wrap>
          <p> Total number of likes</p>
          <span> {sentimentObject?.likeCount} </span>
        </Wrap>
        <Wrap>
          <p> Total number of dislikes</p>
          <span> {sentimentObject?.dislikeCount} </span>
        </Wrap>
        <Wrap>
          <p> Total number of comments</p>
          <span> {sentimentObject?.commentCount} </span>
        </Wrap>
      </Grid>
      <p> SENTIMENT POLARITY: {sentimentObject?.sentimentPolarity} </p>
      <WordCloud />
    </Container>
  );
}

const Container = styled.div`
  display: block;
`;
const Grid = styled.div`
  margin: 20px 40px;
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  grid-gap: 2px;
`;

const Cover = styled.div`
  img {
    margin-top: 20px;
    height: 50%;
    width: 50%;
    object-fit: cover;
  }
  p {
    margin-top: 10px;
  }
`;

const Wrap = styled.div`
  margin: 30px 20px;
  border-radius: 10px;
  border: 3px solid rgba(249, 249, 249, 0.1);
  box-shadow: rgb(0 0 0 / 69%) 0px 26px 30px -10px,
    rgb(0 0 0 / 73%) 0px 16px 10px -10px;
  transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;

  span {
    font-size: 20px;
  }

  &:hover {
    transform: scale(1.05);
    box-shadow: rgb(0 0 0 / 80%) 0px 40px 58px -16px,
      rgb(0 0 0 / 72%) 0px 30px 22px -10px;
    border-color: rgba(249, 249, 249, 0.8);
  }
`;

export default Content;

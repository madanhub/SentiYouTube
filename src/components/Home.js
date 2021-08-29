import { Button } from "bootstrap";
import React, { useState } from "react";
import { ButtonGroup } from "react-bootstrap";
import styled from "styled-components";
import Navigation from "./Navigation";
import { Nav, Navbar, Form, FormControl, Container } from 'react-bootstrap';
import '../stylesheets/home.css';
import axios from "axios";


let name = ""
const GridWrapper = styled.div`
  display: inline;
  grid-gap: 10px;
  margin-top: 1em;
  margin-left: 6em;
  margin-right: 6em;
  grid-template-columns: repeat(12, 1fr);
  grid-auto-rows: minmax(25px, auto);
`;
const handleSearch = (e) => {
  e.preventDefault()
  name = (e.target.value)
  // console.log(setWord(e.target.value))
}

const Home = (props) => (
  < GridWrapper >
    {/* <Navigation /> */}
    < br ></br>
    <div>
      <Form className="form-center">
        <FormControl type="text" placeholder="Search" style={{ position: "absolute", left: "20rem", top: "4rem", maxWidth: "400px" }} className="" onChange={handleSearch} />
      </Form>
      <button type="button" class="block" style={{ position: "absolute", left: "48rem", top: "3rem" }} onClick={() => {
        alert("Please wait till Processing")
        axios.get("https://6d6pzlx7ll.execute-api.us-east-1.amazonaws.com/youtubeAPIHit/name=" + name).then(response => {
          setTimeout(function () {
            alert("Click Dashboard to see your resul")
          }, 1000);
        });
      }}
      >Submit</button>
      <button type="button" class="block" style={{ position: "absolute", left: "32rem", top: "15rem" }} onClick={() => {
        window.location = '/dashboard';
      }}
      >Dash Board</button>
    </div>

  </GridWrapper >
);

export default Home;

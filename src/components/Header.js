import React from "react";
import styled from "styled-components";

function Header() {
  return (
    <Nav>
      <NavMenu>
        {" "}
        <span> DASHBOARD </span>
      </NavMenu>

      <Link>
        <a href="/" style={{ color: "white" }}>
          <span>LOGOUT</span>
        </a>
      </Link>
    </Nav>
  );
}

export default Header;

const Nav = styled.nav`
  height: 60px;
  display: flex;
  align-items: center;
  padding: 0 36px;
  overflow-x: hidden;
`;
const NavMenu = styled.div`
  display: flex;
  flex: 1;
  margin-left: 45%;

  span {
    font-size: 19px;
    letter-spacing: 1.42px;
    position: relative;
  }
  
`;

const Link = styled.div`
  span {
    font-size: 12px;
    letter-spacing: 1.42px;
    cursor: pointer;
  }
`;

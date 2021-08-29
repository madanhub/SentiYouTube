import React from "react";
import ReactWordcloud from "react-wordcloud";
import { Resizable } from "re-resizable";

import "tippy.js/dist/tippy.css";
import "tippy.js/animations/scale.css";

const resizeStyle = {
  display: "flex",
  alignItems: "center",
  border: "3px solid rgba(249, 249, 249, 0.1)",
  borderRadius: "50%",
  justifyContent: "center",
  background: "#111826",
  marginLeft: "30%",
};

function WordCloud() {
  var tags = [
    "Amy Cuddy",
    "TED",
    "TEDTalk",
    "TEDTalks",
    "TED Talk",
    "TED Talks",
    "TEDGlobal",
    "brain",
    "business",
    "psychology",
    "self",
    "success",
  ];

  var arr = [];
  for (let i = 0; i < tags?.length; i++) {
    var obj = { text: tags[i], value: 1 };
    arr.push(obj);
  }
  console.log(arr);

  return (
    <div>
      <p> Channel Identifier Tags </p>
      <Resizable
        defaultSize={{
          width: 600,
          height: 300,
        }}
        style={resizeStyle}
      >
        <div style={{ width: "100%", height: "100%" }}>
          <ReactWordcloud words={arr} />
        </div>
      </Resizable>
    </div>
  );
}

export default WordCloud;

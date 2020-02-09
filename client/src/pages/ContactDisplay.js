import Tree from "react-tree-graph";
import React from "react";
import "./pages.css";
import "react-tree-graph/dist/style.css";

export const ContactDisplay = props => {
  // console.log(props.jsonData.data);
  const data = {
    name: "Larry Lee",
    gProps: {
      className: "normalClass"
    },
    children: [
      {
        name: "Tan Jie Hui",
        gProps: {
          className: "normalClass"
        },
        children: [
          {
            name: "Emily Ng",
            gProps: {
              className: "infectedClass"
            },
            children: []
          },
          {
            name: "Christine Ng",
            gProps: {
              className: "quarantineClass"
            },
            children: []
          }
        ]
      },
      {
        name: "Kenny Lee",
        gProps: {
          className: "quarantineClass"
        },
        children: []
      }
    ]
  };

  // var convertToObj = JSON.parse(converToSrring);

  return (
    <div className="custom-container">
      <Tree
        animated
        data={props.jsonData.data}
        height={400}
        width={800}
        svgProps={{
          className: "custom"
        }}
      />
    </div>
  );
};

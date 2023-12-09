import axios from "axios";
import React, { useEffect, useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import { FiPlus } from "react-icons/fi";
import Card from "../Card/Card";
import "./Dashboard.css";

import { getHeadingIcon, getPriorityName } from "../../helper/Icon";

function Dashboard(props) {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  const [ticket, setTicket] = useState([]);
  const [users, setUsers] = useState([]);

  // getting data from api
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://api.quicksell.co/v1/internal/frontend-assignment#"
        );
        const data = await response.data;
        setTicket(data.tickets);
        setUsers(data.users);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [props.grouping, props.ordering]);

  // combining the two data
  const combinedData = ticket.map((ticketItem) => {
    const correspondingUser = users.find(
      (user) => user.id === ticketItem.userId
    );
    return {
      ...ticketItem,
      user: correspondingUser,
    };
  });

  const groupByAttribute = props.grouping;

  var dict = {};

  for (let i = 0; i < combinedData.length; i++) {
    let groupValue;

    if (groupByAttribute === "user") {
      groupValue = combinedData[i].user.name;
    } else {
      groupValue = combinedData[i][groupByAttribute];
    }

    if (dict[groupValue]) {
      dict[groupValue].push(combinedData[i]);
    } else {
      dict[groupValue] = [combinedData[i]];
    }
  }

  if (props.grouping === "status") {
    if (!dict["Done"]) {
      dict["Done"] = [];
    }
    if (!dict["Canceled"]) {
      dict["Canceled"] = [];
    }
  }

  if (props.ordering === "priority") {
    Object.keys(dict).forEach((key) => {
      dict[key].sort((a, b) => b.priority - a.priority);
    });
  } else if (props.ordering === "title") {
    Object.keys(dict).forEach((key) => {
      dict[key].sort((a, b) => a.title.localeCompare(b.title));
    });
  }

  console.log(dict);

  return (
    <>
      <div
        style={{
          display: "flex",
          flexWrap: "nowrap",
          overflowX: "auto",
          justifyContent: "left",
        }}
      >
        {Object.keys(dict).map((key) => (
          <div
            key={key}
            style={{
              backgroundColor: "whitesmoke",
              margin: "10px",
              width: "50vw",
              padding: "10px",
            }}
          >
            <div key={key} className="status-item">
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div style={{ marginTop: "1px" }}>
                  {getHeadingIcon(props.grouping, key)}
                </div>
                <div
                  style={{
                    marginRight: "7px",
                    marginLeft: "7px",
                  }}
                >
                  {(props.grouping === "user" ||
                    props.grouping === "status") && (
                    <span
                      style={{
                        fontWeight: "500",
                        fontSize: "100%",
                        display: "block",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {key}
                    </span>
                  )}

                  {props.grouping === "priority" && (
                    <span
                      style={{
                        fontSize: "100%",
                        fontWeight: "500",
                        display: "block",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {getPriorityName(key)}
                    </span>
                  )}
                </div>
                <div style={{ marginTop: "0px", color: "gray" }}>
                  {dict[key].length}
                </div>
              </div>

              <div style={{ display: "flex", justifyContent: "left" }}>
                <div
                  style={{
                    marginTop: "3px",
                    marginRight: "7px",
                    ...(window.innerWidth < 730 && {
                      marginRight: "0px",
                    }),
                  }}
                >
                  <FiPlus />
                </div>
                <div style={{ marginTop: "3px" }}>
                  <BsThreeDots />
                </div>
              </div>
            </div>

            {/* values */}
            {dict[key].map((value) => (
              <div key={value.id}>
                <Card
                  id={value.id}
                  priority={value.priority}
                  status={value.status}
                  tag={value.tag}
                  title={value.title}
                  userId={value.userId}
                  userName={value.user.name}
                  available={value.user.available}
                  grouping={props.grouping}
                  ordering={props.ordering}
                  statusIcon={value.statusIcon}
                  priorityIcon={value.priorityIcon}
                />
              </div>
            ))}
          </div>
        ))}
      </div>
    </>
  );
}

export default Dashboard;

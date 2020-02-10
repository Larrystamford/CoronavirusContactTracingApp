import React from "react";
import "./pages.css";
import { useFetch } from "../customHooks/useFetch";
import { SearchName } from "../components/SearchName";
import axios from "axios";
import Button from "react-bootstrap/Button";
import { ContactDisplay } from "./ContactDisplay";
import { NewUsers } from "../components/NewUsers";
import { SpinnerLoad } from "../components/SpinnerLoad";
import Container from "react-bootstrap/Container";

export const HomePage = () => {
  const { data, loading } = useFetch("/contacts");
  var varContactList = [];

  const [userId, setId] = React.useState(0);
  const [userName, setUser] = React.useState(0);
  const [status, setStatus] = React.useState(0);
  const [contactList, setContact] = React.useState([]);

  const [rows, setRows] = React.useState([]);
  const [json, setJson] = React.useState({});
  const [display, setDisplay] = React.useState(false);

  const setContacts = contact => {
    setContact(currentRows => [...currentRows, contact]);
  };

  const setRowFunc = contacts => {
    setRows(currentRows => [
      ...currentRows,
      {
        name: contacts
      }
    ]);
  };

  let contactDis;
  if (display) {
    contactDis = <ContactDisplay jsonData={json} />;
  } else {
    contactDis = null;
  }

  const handleSubmit = () => {
    for (let key in data) {
      if (data[key].username == "You") {
        for (var i = 0; i < data[key].contacts.length; i++) {
          varContactList.push(data[key].contacts[i]);
        }
      }
    }

    for (var i = 0; i < rows.length; i++) {
      varContactList.push(rows[i].name);
    }
    console.log(varContactList);

    axios
      .post("http://localhost:5000/contacts/dfs/" + userId, {
        username: userName,
        currentStatus: status,
        contacts: varContactList
      })
      .then(res => {
        setJson(res);
        setDisplay(true);
        setRows([]);
      });
  };

  if (loading) return <SpinnerLoad />;
  return (
    <div>
      <SearchName
        onAdd={({ username, currentStatus, contacts }) => {
          const user = {
            username: username,
            currentStatus: currentStatus,
            contacts: contacts
          };

          setUser(username);
          setStatus(currentStatus);
          // userName = username;
          // status = currentStatus;

          for (let key in data) {
            if (data[key].username == "You") {
              // varContactList = data[key].contacts;
              // userId = data[key]._id;
              setId(data[key]._id);
              // console.log(contactList);
              // if (!contactList.includes(contacts)) {
              //   varContactList.push(contacts);
              //   setContacts(varContactList);
              // }
              break;
            }
          }
          setRowFunc(contacts);
        }}
      />
      <NewUsers rows={rows} />
      <Button id="submitButton" variant="secondary" onClick={handleSubmit}>
        Submit
      </Button>
      {contactDis}
    </div>
  );
};

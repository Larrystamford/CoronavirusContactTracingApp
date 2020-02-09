import React from "react";
import { TextField, Button } from "@material-ui/core";
import { Formik, Form, Field } from "formik";
import { makeStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import "./components.css";

const useStyles = makeStyles(theme => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: 200
    }
  }
}));

export const SearchName = ({ onAdd }) => {
  const classes = useStyles();

  return (
    <Formik
      initialValues={{
        username: "You",
        currentStatus: "Normal",
        contacts: ""
      }}
      onSubmit={(values, { resetForm }) => {
        onAdd(values);
        resetForm();
      }}
    >
      {({ values, handleChange, handleBlur }) => (
        <Form>
          <div className="defaultInputs">
            <TextField
              id="user"
              disabled
              id="standard-disabled"
              label="User"
              defaultValue="You"
              InputProps={{
                readOnly: true
              }}
            />

            <Field as="select" name="currentStatus">
              <option value="Normal">Normal</option>
              <option value="Quarantine">Quarantine</option>
              <option value="Infected">Infected</option>
            </Field>
          </div>
          <div className="searchAndAdd">
            <TextField
              required
              id="contacts"
              label="Name of Contact"
              type="search"
              variant="outlined"
              value={values.contactsList}
              onChange={handleChange}
            />
            <Button
              style={{ backgroundColor: "#6C757D", color: "white" }}
              type="submit"
            >
              Add
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

// <pre>{JSON.stringify(values, null, 2)}</pre>

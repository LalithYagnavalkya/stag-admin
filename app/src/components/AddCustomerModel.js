import React, { useState } from "react";
import {
  Box,
  Typography,
  Modal,
  Button,
  TextField,
  OutlinedInput,
  InputLabel,
  FormControl,
  InputAdornment,
  Input,
} from "@mui/material";
import { NumericFormat } from "react-number-format";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { AddCustomer } from "../features/customers/customerSlice";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const AddCustomerModel = ({ handleClose }) => {
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();

  //some custome props for numeric
  const materialUiTextFieldProps = {
    required: true,
    // error: totalAmount > 100000,
    fullWidth: true,
    label: "Total Amount",
    variant: "standard",
    InputProps: {
      startAdornment: <InputAdornment position="start">₹</InputAdornment>,
    },
  };

  //cons states
  const [client, setClient] = useState({
    username: "",
    phoneNumber: "",
    email: "",
    capital: 0,
    role: "user",
    returns: [0, 0],
    joiningDate: moment.unix(),
  });
  const [minReturns, setMinReturns] = useState(0);
  const [maxReturns, setMaxReturns] = useState(0);
  //handle form submit
  const addClient = (e) => {
    e.preventDefault();
    console.log(client);
    if (minReturns !== 0 || maxReturns !== 0) {
      if (client.capital !== 0 || client.username !== "") {
        dispatch(AddCustomer({ token: user.token, customer: client }));
        handleClose();
      }
    }
  };

  //useEffects section
  useEffect(() => {
    setClient((prev) => ({
      ...prev,
      returns: [minReturns, maxReturns],
    }));
  }, [maxReturns]);

  useEffect(() => {
    setClient((prev) => ({
      ...prev,
      returns: [minReturns, maxReturns],
    }));
  }, [minReturns]);

  return (
    <Box sx={style}>
      <form action="" onSubmit={addClient}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Add Client
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          <Box sx={{ display: "flex", columnGap: 2 }}>
            <TextField
              id="standard-basic"
              label="Name"
              variant="standard"
              onChange={(e) =>
                setClient((prev) => ({ ...prev, username: e.target.value }))
              }
            />
            <TextField
              id="standard-basic"
              label="Phone number"
              variant="standard"
              onChange={(e) =>
                setClient((prev) => ({ ...prev, phoneNumber: e.target.value }))
              }
            />
          </Box>
          <Box sx={{ display: "flex", columnGap: 2, mt: 2 }}>
            <TextField
              fullWidth
              id="standard-basic"
              label="Email"
              variant="standard"
              onChange={(e) =>
                setClient((prev) => ({ ...prev, email: e.target.value }))
              }
            />
          </Box>
          <Box sx={{ mt: 2 }}>
            <FormControl fullWidth sx={{ m: 1, mt: 2 }}>
              <NumericFormat
                //   value={0}
                customInput={TextField}
                onValueChange={() => {}}
                thousandSeparator=","
                decimalSeparator="."
                {...materialUiTextFieldProps}
                onChange={(e) =>
                  setClient((prev) => ({ ...prev, capital: e.target.value }))
                }
              />
            </FormControl>
          </Box>
          <Box
            sx={{ mt: 2, display: "flex", columnGap: 2, alignItems: "center" }}
          >
            <Typography id="modal-modal-title" variant="subtitle2">
              Returns
            </Typography>
            <FormControl fullWidth sx={{ m: 1 }} variant="standard">
              <InputLabel htmlFor="standard-adornment-amount">Min</InputLabel>
              <Input
                id="standard-adornment-amount"
                startAdornment={
                  <InputAdornment position="start">%</InputAdornment>
                }
                onChange={(e) => {
                  setMinReturns(e.target.value);
                  setClient((prev) => ({
                    ...prev,
                    returns: [minReturns, maxReturns],
                  }));
                }}
              />
            </FormControl>
            <FormControl fullWidth sx={{ m: 1 }} variant="standard">
              <InputLabel htmlFor="standard-adornment-amount">Max</InputLabel>
              <Input
                id="standard-adornment-amount"
                startAdornment={
                  <InputAdornment position="start">%</InputAdornment>
                }
                onChange={(e) => {
                  setMaxReturns(e.target.value);
                  setClient((prev) => ({
                    ...prev,
                    returns: [minReturns, maxReturns],
                  }));
                }}
              />
            </FormControl>
          </Box>
          <Box
            sx={{
              mt: 2,
              display: "flex",
              columnGap: 2,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {" "}
            <TextField
              fullWidth
              id="date"
              label="Joining Date"
              type="date"
              defaultValue={client.joiningDate}
              sx={{ width: 220 }}
              InputLabelProps={{
                shrink: true,
              }}
              onChange={(e) => {
                console.log(e.target.value);
                let temptime = moment(e.target.value).format("DD MM YYYY");

                console.log(temptime);
                setClient((prev) => ({ ...prev, joiningDate: temptime }));
              }}
            />
          </Box>
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
          <Button variant="contained" color="success" type="submit">
            Add
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default AddCustomerModel;

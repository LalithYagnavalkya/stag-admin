import React, { useEffect, useState } from "react";

import styled from "styled-components";
import moment, { now } from "moment";
import { useDispatch, useSelector } from "react-redux";
import { getAllCustomers } from "../features/customers/customerSlice";
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
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import CustomerBar from "../components/CustomerBar";
import { NumericFormat } from "react-number-format";
import { AddCustomerModel } from "../components/";
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

const Home = () => {
  const { user } = useSelector((state) => state.auth);
  const { customers } = useSelector((store) => store.customers);

  const [time, setTime] = useState(new Date());
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    console.log(user.token);
    dispatch(getAllCustomers({ token: user.token }));
  }, []);

  useEffect(() => {
    setInterval(() => {
      let nwDate = new Date();
      setTime(nwDate);
    }, 60000);
  }, []);
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
  return (
    <HomeStyles>
      <Box
        component="main"
        sx={{
          width: 1,
          display: "flex",
          height: "100vh",
          justifyContent: "space-between",
          p: "2rem 8rem",
          paddingTop: "6rem",
          // alignItems: "center",
        }}
      >
        <div className="left-home">
          <span>{moment(time).format("hh:mm A")}</span>

          <span className="day-name">{moment().format("dddd")}</span>
          <span className="date-name">{moment().format("MMMM D  yy")}</span>
          <div>
            <Button
              sx={{
                p: 1,
                borderColor: "white",
                color: "white",
                textTransform: "captalize",
              }}
              onClick={handleOpen}
              variant="outlined"
              startIcon={<AddIcon />}
            >
              Add Client
            </Button>
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <AddCustomerModel />
            </Modal>
          </div>
        </div>
        <div className="right-home">
          <span>Due this Week</span>
          <div className="customers-container">
            {customers.map((customer) => {
              return <CustomerBar {...customer}></CustomerBar>;
            })}
          </div>
        </div>
      </Box>
    </HomeStyles>
  );
};

export default Home;

// const HomeStyles = styled.div``;

const HomeStyles = styled.div`
  color: white;
  width: 100vw;
  display: flex;
  overflow: hidden;
  .left-home {
    display: flex;
    padding-top: 5rem;
    flex: 0.5;
    color: #d6d6d6;
    flex-direction: column;
    row-gap: 2rem;
    span {
      font-size: 69px;
      font-weight: 300;
    }
    .day-name {
      font-size: 34px;
    }
    .date-name {
      font-size: 34px;
    }
  }
`;

import React, { useEffect, useState } from "react";

import styled from "styled-components";
import moment, { now } from "moment";
import { useDispatch, useSelector } from "react-redux";
import { getAllCustomers, getReqs } from "../features/customers/customerSlice";
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
  Fab,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import CustomerBar from "../components/CustomerBar";
import { NumericFormat } from "react-number-format";
import { AddCustomerModel } from "../components/";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
  const { customers, reqs, isLoading, message, isError, isClientReqDeleted } =
    useSelector((store) => store.customers);

  const [time, setTime] = useState(new Date());
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [openDeleteUser, setOpenDeleteUser] = React.useState(false);
  const handleOpenDelete = () => setOpenDeleteUser(true);
  const handleCloseDelete = () => setOpenDeleteUser(false);
  useEffect(() => {
    console.log(user.token);
    dispatch(getAllCustomers({ token: user.token }));
    dispatch(getReqs({ token: user.token }));
  }, []);

  useEffect(() => {
    setInterval(() => {
      let nwDate = new Date();
      setTime(nwDate);
    }, 60000);
  }, []);

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
            <Fab
              variant="extended"
              onClick={handleOpen}
              color="success"
              aria-label="add"
            >
              <AddIcon sx={{ mr: 1 }} />
              Add Client
            </Fab>

            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <AddCustomerModel handleClose={handleClose} />
            </Modal>
          </div>
        </div>
        <div className="right-home">
          <span className="right-home-name">Requests</span>
          <div className="customers-container">
            {reqs.length === 0 ? (
              <>
                <img src="/illus/noreqs.svg" alt="" srcset="" />
              </>
            ) : (
              <>
                {reqs?.map((customer, index) => {
                  return (
                    <CustomerBar
                      key={customer._id}
                      {...customer}
                      // handleOpenDelete={handleOpenDelete}
                      // handleCloseDelete={handleCloseDelete}
                    ></CustomerBar>
                  );
                })}
              </>
            )}
          </div>
        </div>
      </Box>
      <ToastContainer position="bottom-right" theme="colored" />
    </HomeStyles>
  );
};

export default Home;

// const HomeStyles = styled.div``;

const HomeStyles = styled.div`
  color: white;
  width: 100vw;
  display: flex;
  overflow-x: hidden;
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
  }
  .right-home {
    /* display: none; */
    padding-top: 5rem;
    width: 50%;
    display: flex;
    flex-direction: column;
    row-gap: 1rem;
    .customers-container {
      display: flex;
      flex-direction: column;
      row-gap: 1rem;
      height: 80%;
      overflow-y: scroll;
      overflow-x: hidden;
      padding: 1rem;
      ::-webkit-scrollbar {
        display: none;
      }
    }
    .right-home-name {
      font-family: "Metropolis";
      font-style: normal;
      font-weight: 700;
      font-size: 32px;
      line-height: 69.84%;
      letter-spacing: -0.02em;
      color: #d6d6d6;
    }
  }
  @media (max-width: 768px) {
    .left-home {
      span {
        font-size: 32px;
        font-weight: 300;
      }
      .day-name {
        font-size: 14px;
      }
    }
  }
`;

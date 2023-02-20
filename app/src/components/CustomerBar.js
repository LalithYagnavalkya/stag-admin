import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Avatar,
  Box,
  Button,
  FormControl,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  Modal,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckIcon from "@mui/icons-material/Check";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useDispatch, useSelector } from "react-redux";
import {
  AddCustomer,
  DeleteClinetReq,
} from "../features/customers/customerSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { NumericFormat } from "react-number-format";
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
const CustomerBar = ({
  name,
  phone,
  bankaccount,
  branch,
  ifsc,
  photo,
  approved,
  _id,
  // handleOpenDelete,
  // handleCloseDelete,
}) => {
  const { user } = useSelector((state) => state.auth);
  const { reqs, isLoading, message, isError } = useSelector(
    (state) => state.customers
  );
  const notify = () => toast.success("Sent");
  const dispatch = useDispatch();

  const toggleAcordion = () => {
    setExpand((prev) => !prev);
  };

  //states/

  const [expand, setExpand] = React.useState(true);
  const [openDeleteUser, setOpenDeleteUser] = React.useState(false);
  const [minReturns, setMinReturns] = useState(0);
  const [maxReturns, setMaxReturns] = useState(0);

  const handleOpenDelete = () => setOpenDeleteUser(true);
  const handleCloseDelete = () => setOpenDeleteUser(false);

  const materialUiTextFieldProps = {
    required: true,
    // error: totalAmount > 100000,
    fullWidth: true,
    label: "Capital",
    variant: "standard",
    InputProps: {
      startAdornment: <InputAdornment position="start">₹</InputAdornment>,
    },
  };
  const [userDetails, setUserDetails] = useState({
    capital: "",
    returns: [],
  });

  useEffect(() => {
    console.log(userDetails);
  }, [userDetails.returns, minReturns]);

  useEffect(() => {
    setUserDetails((prev) => ({
      ...prev,
      returns: [minReturns, maxReturns],
    }));
  }, [maxReturns]);

  useEffect(() => {
    setUserDetails((prev) => ({
      ...prev,
      returns: [minReturns, maxReturns],
    }));
  }, [minReturns]);
  return (
    <CustomerBarStyled>
      <Accordion>
        <AccordionSummary
          // expandIcon={<ExpandMoreIcon />}

          aria-controls="panel1a-content"
          id="panel1a-header"
          IconButtonProps={{
            onClick: toggleAcordion,
          }}
        >
          <div className="container-custbar">
            <span className="name-customer-req">
              <Avatar
                sx={{ width: 56, height: 56 }}
                alt="Remy Sharp"
                src={photo}
              />
              {name}
            </span>
            <span className="name-customer-phone">{phone}</span>
            <span className="aprove">
              <Tooltip
                title="Delete"
                onClick={(e) => {
                  handleOpenDelete(_id);
                  e.stopPropagation();
                }}
              >
                <IconButton color="error">
                  <DeleteIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Accept">
                <IconButton color="success">
                  <CheckIcon />
                </IconButton>
              </Tooltip>
            </span>
          </div>
        </AccordionSummary>
        <AccordionDetails>
          <Box sx={{ display: "flex", columnGap: "2rem" }}>
            <FormControl sx={{ m: 1 }} variant="standard">
              <NumericFormat
                //   value={0}
                customInput={TextField}
                onValueChange={() => {}}
                thousandSeparator=","
                decimalSeparator="."
                {...materialUiTextFieldProps}
                onChange={(e) =>
                  setUserDetails((prev) => ({
                    ...prev,
                    capital: e.target.value,
                  }))
                }
              />
            </FormControl>
            <Box
              sx={{ display: "flex", alignItems: "center", columnGap: "2rem" }}
            >
              Returns
              <FormControl fullWidth sx={{ m: 1 }} variant="standard">
                <InputLabel htmlFor="standard-adornment-amount">Min</InputLabel>
                <Input
                  id="standard-adornment-amount"
                  startAdornment={
                    <InputAdornment position="start">%</InputAdornment>
                  }
                  placeholder="0"
                  onChange={(e) => {
                    setMinReturns(e.target.value);
                    setUserDetails((prev) => ({
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
                  placeholder="0"
                  onChange={(e) => {
                    setMaxReturns(e.target.value);
                    setUserDetails((prev) => ({
                      ...prev,
                      returns: [minReturns, maxReturns],
                    }));
                  }}
                />
              </FormControl>
            </Box>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
            <Button
              variant="contained"
              color="success"
              onClick={() => {
                dispatch(
                  AddCustomer({
                    token: user.token,
                    id: _id,
                    capital: userDetails.capital,
                    returns: [minReturns, maxReturns],
                  })
                );
                setUserDetails({
                  capital: "",
                  returns: [],
                });
              }}
            >
              Done
            </Button>
          </Box>
        </AccordionDetails>
      </Accordion>
      <Modal
        open={openDeleteUser}
        onClose={handleCloseDelete}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box
            sx={{ display: "flex", columnGap: "1rem", alignItems: "center" }}
          >
            <Avatar
              sx={{ width: 56, height: 56 }}
              alt="Remy Sharp"
              src={photo}
            />{" "}
            <Typography id="modal-modal-title" variant="h6" component="h2">
              {name}
            </Typography>
          </Box>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Press Delete to remove the request.
          </Typography>
          <Box
            sx={{
              display: "flex",
              columnGap: "1rem",
              justifyContent: "flex-end",
              alignItems: "center",
              mt: "1rem",
            }}
          >
            <Button
              variant="outlined"
              color="success"
              onClick={handleCloseDelete}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={() => {
                dispatch(DeleteClinetReq({ token: user.id, _id: _id }));
              }}
            >
              Delete
            </Button>
          </Box>
        </Box>
      </Modal>
    </CustomerBarStyled>
  );
};

export default CustomerBar;
const CustomerBarStyled = styled.div`
  /* color: black;
  background-color: white;
  padding: 1rem;
  display: flex;
  align-items: center;
  column-gap: 2rem;
  justify-content: space-between; */
  .name-customer-req {
    display: flex;
    justify-content: center;
    align-items: center;
    column-gap: 1rem;
  }
  .container-custbar {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`;

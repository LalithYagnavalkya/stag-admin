import { Box, Button, Container, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {
  createTheme,
  responsiveFontSizes,
  ThemeProvider,
} from "@mui/material/styles";
import FileBase64 from "react-file-base64";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import axios from "axios";

const Register = () => {
  let theme = createTheme();
  theme = responsiveFontSizes(theme);

  //notify things
  const notify = () => toast.success("Sent");
  const er = () => toast.success("Servers down try after a few minutes");
  const fillupdetails = () => toast.warning("Fill up all details");
  const uploadphoto = () => toast.warning("Please upload a photo");
  const bankAccountToast = () =>
    toast.warning("Please provide your bank account number");
  const ifsc = () => toast.warning("you forget to fill IFSC feild ");
  const branch = () => toast.warning("did you forget your branch?");
  const phone = () => toast.warning("Please add your Phone number");
  const name = () => toast.warning("Add your name as per bank account");
  const bankError = () => toast.warning("Bank account number didn't match");

  //all states

  const [data, setData] = useState({
    name: "",
    phone: "",
    bankaccount: "",
    ifsc: "",
    branch: "",
    photo: "",
  });
  const [confimbank, setConfirmBank] = useState("");
  const [isbankError, setisBankError] = useState(false);

  const sumbitHandler = () => {
    if (
      data.name !== "" &&
      data.phone !== "" &&
      data.bankaccount !== "" &&
      data.ifsc !== "" &&
      data.branch !== "" &&
      data.photo !== ""
    ) {
      if (isbankError) {
        bankError();
        return;
      }
      axios
        .post("http://localhost:4000/userinfo", {
          data,
        })
        .then(function (response) {
          console.log(response);
          if (response.status === 200) {
            notify();
          } else {
            er();
          }
        })
        .catch(function (error) {
          console.log(error);
        });
      setData({
        name: "",
        phone: "",
        bankaccount: "",
        ifsc: "",
        branch: "",
        photo: "",
      });
      setConfirmBank("");
    } else if (data.name === "") {
      name();
    } else if (data.phone === "") {
      phone();
    } else if (data.bankaccount === "") {
      bankAccountToast();
    } else if (data.ifsc === "") {
      ifsc();
    } else if (data.branch === "") {
      branch();
    } else if (data.photo === "") {
      uploadphoto();
    } else {
      fillupdetails();
    }
  };

  //all useEffects

  useEffect(() => {
    console.log(data.bankaccount + " === " + confimbank);
    if (data.bankaccount !== confimbank) {
      setisBankError(true);
      console.log(isbankError);
    } else {
      setisBankError(false);
    }
    console.log(isbankError);
  }, [confimbank, data.bankaccount]);

  return (
    <>
      <ThemeProvider theme={theme}>
        <RegisterStyles>
          <Box sx={{}}>
            <Typography variant="h2" gutterBottom>
              Welcome to Stag Investments
            </Typography>
            <Container maxWidth="sm">
              <Box sx={{ mt: 5 }}>
                <TextField
                  error={false}
                  autoComplete="off"
                  id="standard-basic"
                  fullWidth
                  label="Full Name as per bank account"
                  variant="outlined"
                  margin="dense"
                  value={data.name}
                  onChange={(e) =>
                    setData((prev) => ({ ...prev, name: e.target.value }))
                  }
                />
                <TextField
                  error={false}
                  fullWidth
                  id="standard-basic"
                  label="Phone Number"
                  variant="outlined"
                  margin="dense"
                  value={data.phone}
                  onChange={(e) =>
                    setData((prev) => ({ ...prev, phone: e.target.value }))
                  }
                />
                <TextField
                  margin="dense"
                  fullWidth
                  id="standard-basic"
                  label="Bank account number"
                  variant="outlined"
                  value={data.bankaccount}
                  onChange={(e) => {
                    setData((prev) => ({
                      ...prev,
                      bankaccount: e.target.value,
                    }));
                  }}
                />
                <TextField
                  margin="dense"
                  fullWidth
                  error={isbankError}
                  id="standard-basic"
                  label="Confirm Bank account number"
                  variant="outlined"
                  value={confimbank}
                  onChange={(e) => {
                    setConfirmBank(e.target.value);
                  }}
                />
                <TextField
                  margin="dense"
                  fullWidth
                  id="standard-basic"
                  label="IFSC"
                  variant="outlined"
                  value={data.ifsc}
                  onChange={(e) => {
                    setData((prev) => ({ ...prev, ifsc: e.target.value }));
                  }}
                />
                <TextField
                  margin="dense"
                  fullWidth
                  id="standard-basic"
                  label="Branch"
                  variant="outlined"
                  value={data.branch}
                  onChange={(e) =>
                    setData((prev) => ({ ...prev, branch: e.target.value }))
                  }
                />
              </Box>
              <Box
                textAlign="center"
                sx={{
                  mt: 1.4,
                  display: "flex",
                  justifyContent: "center",
                  columnGap: "1rem",
                }}
              >
                Upload Your Photo
                <FileBase64
                  multiple={true}
                  onDone={(e) =>
                    setData((prev) => ({ ...prev, photo: e[0].base64 }))
                  }
                />
              </Box>
              <Box textAlign={"center"}>
                <Button
                  sx={{ mt: 1.5, justifyContent: "center" }}
                  variant="contained"
                  color="success"
                  onClick={sumbitHandler}
                >
                  Save
                </Button>
              </Box>
            </Container>
          </Box>
        </RegisterStyles>
      </ThemeProvider>
      <ToastContainer position="bottom-right" pauseOnHover theme="dark" />
    </>
  );
};

export default Register;
const RegisterStyles = styled.div`
  display: flex;
  height: calc(100vh - 8rem);
  justify-content: center;
  padding-top: 4rem;
  padding: 4rem 5rem;
  background-color: #e4e4e4;

  @media (max-width: 768px) {
    padding: 4rem 1rem;
  }
`;

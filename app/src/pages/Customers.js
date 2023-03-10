import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import CustomerCard from "../components/CustomerCard";
import { FormControl, Grid, MenuItem, Select, TextField } from "@mui/material";
import { outlinedInputClasses } from "@mui/material/OutlinedInput";
import InputLabel, { inputLabelClasses } from "@mui/material/InputLabel";
import { useDispatch } from "react-redux";
import { getAllCustomers } from "../features/customers/customerSlice";

const Customers = () => {
  const { user } = useSelector((store) => store.auth);
  const { customers } = useSelector((store) => store.customers);
  const dispatch = useDispatch();
  const StyledTextField = styled(TextField)({
    [`& .${outlinedInputClasses.root} .${outlinedInputClasses.notchedOutline}`]:
      {
        borderColor: "white",
      },
    [`&:hover .${outlinedInputClasses.root} .${outlinedInputClasses.notchedOutline}`]:
      {
        borderColor: "white",
      },
    [`& .${outlinedInputClasses.root}.${outlinedInputClasses.focused} .${outlinedInputClasses.notchedOutline}`]:
      {
        borderColor: "#91CBF7",
      },
    [`& .${outlinedInputClasses.input}`]: {
      color: "white",
    },
    [`&:hover .${outlinedInputClasses.input}`]: {
      color: "#91CBF7",
    },
    [`& .${outlinedInputClasses.root}.${outlinedInputClasses.focused} .${outlinedInputClasses.input}`]:
      {
        color: "white",
      },
    [`& .${inputLabelClasses.outlined}`]: {
      color: "white",
    },
    [`&:hover .${inputLabelClasses.outlined}`]: {
      color: "white",
    },
    [`& .${inputLabelClasses.outlined}.${inputLabelClasses.focused}`]: {
      color: "#91CBF7",
    },
  });
  const StyledInputField = styled(FormControl)({
    [`& .${outlinedInputClasses.root} .${outlinedInputClasses.notchedOutline}`]:
      {
        borderColor: "white",
      },
    [`&:hover .${outlinedInputClasses.root} .${outlinedInputClasses.notchedOutline}`]:
      {
        borderColor: "white",
      },
    [`& .${outlinedInputClasses.root}.${outlinedInputClasses.focused} .${outlinedInputClasses.notchedOutline}`]:
      {
        borderColor: "#91CBF7",
      },
    [`& .${outlinedInputClasses.input}`]: {
      color: "white",
    },
    [`&:hover .${outlinedInputClasses.input}`]: {
      color: "#91CBF7",
    },
    [`& .${outlinedInputClasses.root}.${outlinedInputClasses.focused} .${outlinedInputClasses.input}`]:
      {
        color: "#91CBF7",
      },
    [`& .${inputLabelClasses.outlined}`]: {
      color: "white",
    },
    [`&:hover .${inputLabelClasses.outlined}`]: {
      color: "white",
    },
    [`& .${inputLabelClasses.outlined}.${inputLabelClasses.focused}`]: {
      color: "#91CBF7",
    },
  });

  //
  //
  //
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    console.log(user.token);
    dispatch(getAllCustomers({ token: user.token, query, filter }));
  }, []);
  useEffect(() => {
    // dispatch(getAllCustomers({ token: user.token, query, filter }));
    const promise = dispatch(
      getAllCustomers({ token: user.token, query, filter })
    );
    return () => {
      promise.abort();
    };
  }, [query]);

  return (
    <CustomerPage>
      <div className="search-section">
        <StyledTextField
          fullWidth
          defaultValue=""
          variant="outlined"
          label="Search"
          autoFocus="autofocus"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            e.preventDefault();
          }}
        />
        <StyledInputField sx={{ width: "200px" }}>
          <InputLabel id="demo-simple-select-label" sx={{ color: "white" }}>
            Filter
          </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            label="Filter"
            sx={{
              color: "white",
              ".MuiOutlinedInput-notchedOutline": {
                borderColor: "rgba(228, 219, 233, 0.25)",
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "rgba(228, 219, 233, 0.25)",
              },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "rgba(228, 219, 233, 0.25)",
              },
              ".MuiSvgIcon-root ": {
                fill: "white !important",
              },
            }}
            // onChange={handleChange}
          >
            <MenuItem value={"all"}>All</MenuItem>
            <MenuItem value={"due"}>Due</MenuItem>
            <MenuItem value={"recentlypaid"}>Recently Paid</MenuItem>
          </Select>
        </StyledInputField>
      </div>
      <div className="customers-cards-section">
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 2, sm: 8, md: 16 }}
        >
          {customers?.map((customer, index) => {
            return (
              <Grid item xs={2} sm={4} md={4} key={index}>
                <CustomerCard key={index} {...customer} />;
              </Grid>
            );
          })}
        </Grid>
      </div>
    </CustomerPage>
  );
};

export default Customers;

const CustomerPage = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  padding-top: 4rem;
  .search-section {
    /* background-color: #e6e7e8; */
    height: 64px;
    display: flex;
    /* justify-content: center; */
    padding: 0rem 2rem;
    column-gap: 1rem;
    margin-top: 2rem;
    align-items: center;
  }
  .search-bar input {
    outline: none;
  }
  .customers-cards-section {
    padding: 0 2rem;
    display: flex;
    justify-content: center;
    padding-top: 2rem;
    min-height: calc(100vh - 7rem);
    /* flex-wrap: wrap; */
    /* flex-direction: column; */

    /* row-gap: 22px; */
    /* column-gap: 26px; */
    /* overflow-y: scroll; */
  }
`;

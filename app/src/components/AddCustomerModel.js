import React from "react";
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

const AddCustomerModel = () => {
  const currentDate = moment();
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
  console.log(currentDate.format("DD MM YYYY"));
  return (
    <Box sx={style}>
      <Typography id="modal-modal-title" variant="h6" component="h2">
        Add Client
      </Typography>
      <Typography id="modal-modal-description" sx={{ mt: 2 }}>
        <Box sx={{ display: "flex", columnGap: 2 }}>
          <TextField id="standard-basic" label="Name" variant="standard" />
          <TextField
            id="standard-basic"
            label="Phone number"
            variant="standard"
          />
        </Box>
        <Box sx={{ display: "flex", columnGap: 2, mt: 2 }}>
          <TextField
            fullWidth
            id="standard-basic"
            label="Name"
            variant="standard"
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
                <InputAdornment position="start">₹</InputAdornment>
              }
            />
          </FormControl>
          <FormControl fullWidth sx={{ m: 1 }} variant="standard">
            <InputLabel htmlFor="standard-adornment-amount">Max</InputLabel>
            <Input
              id="standard-adornment-amount"
              startAdornment={
                <InputAdornment position="start">₹</InputAdornment>
              }
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
            defaultValue={currentDate.format("DD MM YYYY")}
            sx={{ width: 220 }}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Box>
      </Typography>
      <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
        <Button variant="contained" color="success">
          Add
        </Button>
      </Box>
    </Box>
  );
};

export default AddCustomerModel;

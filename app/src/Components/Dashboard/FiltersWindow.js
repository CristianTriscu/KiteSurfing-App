import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import FilterListIcon from "@material-ui/icons/FilterList";
import NativeSelect from "@material-ui/core/NativeSelect";
import RestoreIcon from "@material-ui/icons/Restore";
export default function FormDialog(props) {
  const data = props.data;

  const [open, setOpen] = React.useState(false);
  
  const [valueProb, setValueProb] = React.useState(0);
  const handleChangeProb = (e) => setValueProb(e.target.value);
  const [valueCountry, setValueCountry] = React.useState("");
  const handleChangeCountry = (e) => setValueCountry(e.target.value);

  const handleApply1 = () => {
    {
      props.filterByCountry(valueCountry);
    }
    handleClose();
  };

  const handleApply0 = () => {
    {
      props.filterByProb(valueProb);
    }
    handleClose();
  };
  const handleResetData = () => {
    props.loadData();
  };
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button type="contained" onClick={handleClickOpen}>
        <FilterListIcon></FilterListIcon>
        Filters
      </Button>
      <Button type="contained" onClick={handleResetData}>
        <RestoreIcon />
        Reset data
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Filters</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To apply the filter select the minimum wind probability and the
            desired country.
          </DialogContentText>
          <TextField
            onChange={handleChangeProb}
            autoFocus
            margin="dense"
            id="name"
            label="Min wind probability"
            type="number"
            width="300"
          />
          <Button onClick={handleApply0}>Apply</Button>
          <div className="customDiv2"></div>
          <NativeSelect
            defaultValue=""
            onChange={handleChangeCountry}
            inputProps={{
              id: "uncontrolled-native",
            }}
          >
            {data.map((elem) => (
              <option key={elem.country} value={elem.country}>{elem.country}</option>
            ))}
          </NativeSelect>
          <Button onClick={handleApply1}>Apply</Button>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

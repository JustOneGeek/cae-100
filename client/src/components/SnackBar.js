import React, {useContext, useState, useEffect} from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import {AppContext} from '../context/AppContext';


const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function SnackBar() {
  const [open, setOpen] = React.useState(false);
  const {alert, setAlert} = useContext(AppContext);
  // alert should look like this:
  //{
  // msg: "Alert Message",
  //  cat: "Success/Warning/Error/ect"
  //}

  useEffect(
      ()=>{setOpen(true)}
      ,[alert]
    )


  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
    setAlert({});
  };
  
  if (!alert?.msg){
      return <></>
  }

  return (
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={alert.cat} sx={{ width: '100%' }}>
          {alert.msg}
        </Alert>
      </Snackbar>
  );
}

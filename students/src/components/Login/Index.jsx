import React, { useState } from "react";
import { styled, alpha } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import EditIcon from '@mui/icons-material/Edit';
import Divider from '@mui/material/Divider';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Link } from "react-router-dom";




const Login = () => {
  const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    {...props}
  />
))(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color: 'rgb(55, 65, 81)',
    boxShadow:
      'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
    '& .MuiMenu-list': {
      padding: '4px 0',
    },
    '& .MuiMenuItem-root': {
      '& .MuiSvgIcon-root': {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
        ...theme.applyStyles('dark', {
          color: 'inherit',
        }),
      },
      '&:active': {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity,
        ),
      },
    },
    ...theme.applyStyles('dark', {
      color: theme.palette.grey[300],
    }),
  },
}));
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [selectExam , setSelectExam]= useState("Select Exam");


  return (
    <div className="  mt-10 flex items-center justify-center ">

      {/* Login Card */}
      <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl p-8">

        {/* Heading */}
        <h2 className="text-2xl font-bold text-center text-gray-800">
          Login
        </h2>
        <p className="text-center text-gray-500 mt-1">
          Welcome back! Please login
        </p>

        {/* Form */}
        <form className="mt-6 space-y-4">

          {/* Username */}
          <div>
            <label className="text-sm text-gray-600">Username</label>
            <input
              type="text"
              placeholder="Enter username"
              className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500  border-gray-300"
            />
          </div>

           <div>
            <label className="text-sm text-gray-600">Father Name</label>
            <input
              type="text"
              placeholder="Enter father name"
              className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500  border-gray-300"
            />
          </div>

          <div>
            <label className="text-sm text-gray-600">RollNo</label>
            <input
              type="text"
              placeholder="Enter roll no"
              className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500  border-gray-300"
            />
          </div>

          <div>
            <label className="text-sm text-gray-600">Class</label>
            <input
              type="text"
              placeholder="Enter class"
              className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500  border-gray-300"
            />
          </div>
          <div>
            <label className="text-sm text-gray-600">Section</label>
            <input
              type="text"
              placeholder="Enter section"
              className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500  border-gray-300"
            />
          </div>
          <div>
            <label className="text-sm text-gray-600">Exam Date</label>
            <input
              type="text"
              placeholder="Exam Date"
              className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500  border-gray-300"
            />
          </div>
          <div>
            <label className="text-sm text-gray-600 mr-4">Select Exam</label>
            <Button
        id="demo-customized-button"
        aria-controls={open ? 'demo-customized-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        variant="contained"
        disableElevation
        onClick={handleClick}
        endIcon={<KeyboardArrowDownIcon />}
      >
        {selectExam}
      </Button>
      <StyledMenu
        id="demo-customized-menu"
        slotProps={{
          list: {
            'aria-labelledby': 'demo-customized-button',
          },
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem onClick={()=>{
          handleClose();
          setSelectExam("NEET")
        }} disableRipple>
          <EditIcon />
          NEET
        </MenuItem>
        <MenuItem onClick={()=>{
          handleClose();
          setSelectExam("JEE")
        }} disableRipple>
          <FileCopyIcon />
          JEE
        </MenuItem>
        <Divider sx={{ my: 0.5 }} />
      </StyledMenu>
          </div>
         

          {/* Button */}
          <Link to='/ExamFormat'>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Login
          </button>
          </Link>

        </form>

        {/* Footer */}
        <p className="text-center text-sm text-gray-500 mt-6">
          © 2025 New Era School
        </p>

      </div>
    </div>
  );
};

export default Login;

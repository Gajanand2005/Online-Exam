import React, { useState } from "react";
import { styled, alpha } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import EditIcon from "@mui/icons-material/Edit";
import Divider from "@mui/material/Divider";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios"; // ✅ correct path

const Login = () => {
  const navigate = useNavigate();

  // 🔹 FORM STATE (backend ke liye)
  const [form, setForm] = useState({
    name: "",
    fatherName: "",
    rollNo: "",
    class: "",
  });

  const handleInput = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // 🔹 MUI MENU (tera hi code)
  const StyledMenu = styled((props) => (
    <Menu
      elevation={0}
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      {...props}
    />
  ))(({ theme }) => ({
    "& .MuiPaper-root": {
      borderRadius: 6,
      marginTop: theme.spacing(1),
      minWidth: 180,
    },
  }));

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const [selectExam, setSelectExam] = useState("Select Exam");

  // 🔹 SUBMIT HANDLER (NEW – MAIN FIX)
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.rollNo || !form.class) {
      alert("Name, Roll No and Class are required");
      return;
    }

    try {
      const res = await api.post("/student/login", form);
      localStorage.setItem("studentToken", res.data.token);

      navigate("/student/dashboard"); // ✅ proper redirect
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="mt-10 flex items-center justify-center">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl p-8">
        <h2 className="text-2xl font-bold text-center">Login</h2>

        {/* 👇 SAME FORM, bas onSubmit add */}
        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          <input
            name="name"
            placeholder="Username"
            className="w-full px-4 py-2 border rounded-lg"
            onChange={handleInput}
          />

          <input
            name="fatherName"
            placeholder="Father Name"
            className="w-full px-4 py-2 border rounded-lg"
            onChange={handleInput}
          />

          <input
            name="rollNo"
            placeholder="Roll No"
            className="w-full px-4 py-2 border rounded-lg"
            onChange={handleInput}
          />

          <input
            name="class"
            placeholder="Class"
            className="w-full px-4 py-2 border rounded-lg"
            onChange={handleInput}
          />

          {/* 🔹 SAME MUI DROPDOWN */}
          <Button
            variant="contained"
            onClick={(e) => setAnchorEl(e.currentTarget)}
            endIcon={<KeyboardArrowDownIcon />}
          >
            {selectExam}
          </Button>

          <StyledMenu
            anchorEl={anchorEl}
            open={open}
            onClose={() => setAnchorEl(null)}
          >
            <MenuItem
              onClick={() => {
                setSelectExam("NEET");
                setAnchorEl(null);
              }}
            >
              <EditIcon /> NEET
            </MenuItem>
            <MenuItem
              onClick={() => {
                setSelectExam("JEE");
                setAnchorEl(null);
              }}
            >
              <FileCopyIcon /> JEE
            </MenuItem>
            <Divider />
          </StyledMenu>

          {/* ❌ Link hata diya – yahi sabse important fix */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold"
          >
            Login
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-6">
          © 2025 New Era School
        </p>
      </div>
    </div>
  );
};

export default Login;

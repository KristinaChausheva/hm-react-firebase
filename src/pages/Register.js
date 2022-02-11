import { useState } from "react";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth"
import { doc, setDoc, serverTimestamp } from "firebase/firestore"
import { db } from "../firebase.config"
import visibilityIcon from "../assets/svg/visibilityIcon.svg";
import OAuth from "../components/OAuth";
import { ReactComponent as ArrowRightIcon } from "../assets/svg/keyboardArrowRightIcon.svg";


function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const { name, email, password } = formData;

  const navigate = useNavigate();

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const onSubmit = async (e) => {
      e.preventDefault()

      try {
          const auth = getAuth()
          const userCredential = await createUserWithEmailAndPassword(auth, email, password)
          const user = userCredential.user
          updateProfile(auth.currentUser, {
              displayName: name
          })

          const formDataCopy = { ...formData }
          delete formDataCopy.password
          formDataCopy.timestamp = serverTimestamp()

          await setDoc(doc(db, "users", user.uid), formDataCopy)

          navigate("/")
      } catch (error) {
          toast.error("Something went wrong with registration")
      }
  }

  return (
    <>
      <div className="pageContainer">
        <header>
          <p className="pageHeader">Welcome Back</p>
        </header>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            className="nameInput"
            placeholder="Name"
            id="name"
            value={name}
            onChange={onChange}
          />
          <input
            type="email"
            className="emailInput"
            placeholder="Email"
            id="email"
            value={email}
            onChange={onChange}
          />

          <div className="passwordInputDiv">
            <input
              type={showPassword ? "text" : "password"}
              className="passwordInput"
              placeholder="Password"
              id="password"
              value={password}
              onChange={onChange}
            />

            <img
              src={visibilityIcon}
              className="showPassword"
              alt="show password"
              onClick={() => setShowPassword((prevState) => !prevState)}
            />
          </div>
          {/* 
          <Link to="forgot-password" className="forgotPasswordLink">
            Forgot Password
          </Link> */}

          <div className="signInBar">
            <p className="signInText">Register</p>
          </div>
          <button className="signInButton">
            <ArrowRightIcon fill="#ffffff" width="34" height="34" />
          </button>
          
        </form>

        {/* Google OAuth */}
        <OAuth />
        <Link to="/login" className="registerLink">
          Login
        </Link>
      </div>
    </>
  );
}

export default Register;

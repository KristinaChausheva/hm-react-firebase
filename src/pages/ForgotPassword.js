import { useState } from "react"
import { Link } from "react-router-dom"
import { getAuth, sendPasswordResetEmail } from "firebase/auth"
import { toast } from "react-toastify"
import { ReactComponent as ArrowRightIcon } from "../assets/svg/keyboardArrowRightIcon.svg"


function ForgotPassword() {
  const [email, setEmail] = useState("")

  const onChange = (e) => {
    setEmail(e.target.value)
  }

  const onSubmit = async (e) => {
    e.preventDefault()

    try {
      const auth = getAuth()
      await sendPasswordResetEmail(auth, email)
      toast.success("Email was sent")
    } catch (error) {
      toast.error("Could not sent reset email")
    }
  }

  return (
    <div className="pageContainer">
      <header>
        <p className="pageHeader">Forgot Password</p>
      </header>
      <main>
        <form onSubmit={onSubmit}>
          <input
            type="email"
            className="emailInput"
            placeholder="email"
            id="email"
            value={email}
            onChange={onChange}
          />

          <div className="signInBar">
            <div className="signInText">Reset Link</div>
            <button className="signInButton">
              <ArrowRightIcon fill="#ffffff" width="34" height="34" />
            </button>
          </div>
        </form>
      </main>

      <Link className="forgotPasswordLink" to="login">
        Login
      </Link>
    </div>
  );
}

export default ForgotPassword;

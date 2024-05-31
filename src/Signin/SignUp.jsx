import React, { useState } from "react";
import SignInInputField from "./SignInInputField.jsx";
import SignInButton from "./SignInButton.jsx";
import { useAuth } from "../AuthContext.jsx";
import styles from "./Signin.module.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function SignUp({ switchToSignIn, close }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const { URL } = useAuth();

  const validateField = (key, value) => {
    let tempErrors = { ...errors };
    if (key === "name") {
      tempErrors.name = value ? "" : "name을 입력해주세요.";
    } else if (key === "email") {
      tempErrors.email = value ? "" : "email을 입력해주세요.";
    } else if (key === "password") {
      tempErrors.password =
        value.length >= 6 ? "" : "비밀번호는 6자 이상이어야 합니다.";
    } else if (key === "confirmPassword") {
      tempErrors.confirmPassword =
        password === value ? "" : "비밀번호가 다릅니다.";
    }

    setErrors(tempErrors);
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
    validateField("name", event.target.value);
  };
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    validateField("email", event.target.value);
  };
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    validateField("password", event.target.value);
  };
  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
    validateField("confirmPassword", event.target.value);
  };

  const validate = () => {
    let tempErrors = {};
    tempErrors.name = name ? "" : "name을 입력해주세요.";
    tempErrors.email = email ? "" : "email을 입력해주세요.";
    tempErrors.password =
      password.length >= 6 ? "" : "비밀번호는 6자 이상이어야 합니다.";
    tempErrors.confirmPassword =
      password === confirmPassword ? "" : "비밀번호가 다릅니다.";

    setErrors(tempErrors);

    return Object.values(tempErrors).every((x) => x === "");
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    if (validate()) {
      const data = {
        nickname: name,
        username: email,
        password: password,
        // confirmPassword는 서버에서 처리하지 않을 수도 있습니다.
      };
      // console.log(data);

      const SIGNUP_URL = `${URL}/api/account/register/`;
      try {
        const response = await axios.post(SIGNUP_URL, data);
        console.log(response.data);
        // 회원가입 성공 후의 로직을 여기에 작성하세요.
        // 예: 로그인 페이지로 리다이렉트하기, 성공 메시지 표시하기 등
        close();
        navigate("/");
        alert(
          `Welcome to Pureplate, ${response.data.nickname}!\nPlease, sign in!`
        );
      } catch (error) {
        console.error(
          "Error during sign up:",
          error.response ? error.response.data : error
        );
        // 오류 처리 로직을 여기에 작성하세요.
        // 예: 사용자에게 오류 메시지 표시하기 등
      }
    } else {
      console.error("Validation failed.");
    }
  };

  return (
    <form className={styles.frame33} onSubmit={onSubmit}>
      <SignInInputField
        label="Name"
        value={name}
        onChange={handleNameChange}
        errorMessage={errors.name}
      />
      <SignInInputField
        label="email"
        type="email"
        value={email}
        onChange={handleEmailChange}
        errorMessage={errors.email}
      />
      <SignInInputField
        label="Password"
        type="password"
        value={password}
        onChange={handlePasswordChange}
        errorMessage={errors.password}
      />
      <SignInInputField
        label="Confirm Password"
        type="password"
        value={confirmPassword}
        onChange={handleConfirmPasswordChange}
        errorMessage={errors.confirmPassword}
      />
      <SignInButton onSubmit={onSubmit} label="submit" />
    </form>
  );
}

export default SignUp;

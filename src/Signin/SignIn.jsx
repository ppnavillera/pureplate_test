import React, { useState } from "react";
import SignInInputField from "./SignInInputField.jsx";
import SignInButton from "./SignInButton.jsx";
import { useAuth } from "../AuthContext.jsx";
import styles from "./Signin.module.css";

function SignIn() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const validate = () => {
    let tempErrors = {};
    tempErrors.email = email ? "" : "ID를 입력해주세요.";
    tempErrors.password =
      password.length >= 6 ? "" : "비밀번호는 6자 이상이어야 합니다.";
    setErrors(tempErrors);
    return Object.values(tempErrors).every((x) => x === "");
  };

  const handleIdChange = (event) => setEmail(event.target.value);
  const handlePasswordChange = (event) => setPassword(event.target.value);
  const onSubmit = async (event) => {
    event.preventDefault();
    if (validate()) {
      try {
        await login(email, password);
        // 성공적으로 로그인이 되면, 필요하다면 여기서 추가적인 작업을 수행합니다.
      } catch (error) {
        // 로그인 실패 시, 오류 메시지를 처리합니다.
        setErrors({
          ...errors,
          form: "로그인에 실패하였습니다. 이메일 또는 비밀번호를 확인해주세요.",
        });
      }
    } else {
      console.error("Validation failed.");
    }
  };

  return (
    <div className={styles.signInArea}>
      <form className={styles.frame33} onSubmit={onSubmit}>
        <SignInInputField
          label="email"
          value={email}
          onChange={handleIdChange}
          errorMessage={errors.email}
        />
        <SignInInputField
          label="Password"
          type="password"
          value={password}
          onChange={handlePasswordChange}
          errorMessage={errors.password}
        />
        {errors.form && <div className={styles.error}>{errors.form}</div>}{" "}
        {/* 폼 전체에 대한 오류 메시지 표시 */}
        <SignInButton onSubmit={onSubmit} label="Sign-In" />
      </form>
    </div>
  );
}
export default SignIn;

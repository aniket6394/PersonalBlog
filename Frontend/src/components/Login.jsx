import { useRef } from "react";
import { useMutation } from "@tanstack/react-query";
import { loginUser } from "../util/http";
import { useNavigate } from "react-router-dom";
import "./Login.css";
export default function Login() {
  const email = useRef();
  const password = useRef();
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: () =>
      loginUser({
        email: email.current.value,
        password: password.current.value,
      }),
    onSuccess: () => {
      navigate("/admin");
    },
  });

  function handleSubmit(event) {
    event.preventDefault();
    mutation.mutate();
  }

  return (
    <>
      <div className="login-container">
        <form className="login-form" onSubmit={handleSubmit}>
          <h2>Login</h2>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" required ref={email} />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" required ref={password} />
          </div>

          <button
            type="submit"
            className="submit-btn"
            disabled={mutation.isPending}
          >
            {mutation.isPending ? "Logging in..." : "Submit"}
          </button>

          {mutation.isError && <p className="error-message">Login failed</p>}
        </form>
      </div>
    </>
  );
}

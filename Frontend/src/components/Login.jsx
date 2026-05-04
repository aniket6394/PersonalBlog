import { useRef } from "react";
import { useMutation } from "@tanstack/react-query";
import { loginUser } from "../util/http";
import { useNavigate } from "react-router-dom";

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
      <form onSubmit={handleSubmit}>
        <label htmlFor="email"></label>
        <input type="email" required ref={email} />

        <label htmlFor="password"></label>
        <input type="password" required ref={password} />

        <button type="submit">
          {mutation.isPending ? "Logging in..." : "Submit"}
        </button>

        {mutation.isError && <p>Login failed</p>}
      </form>
    </>
  );
}

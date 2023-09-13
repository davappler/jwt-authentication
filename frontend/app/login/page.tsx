"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";
// import bcrypt from "bcryptjs";
import Info from "../_components/info";

function Login() {
  // const salt = bcrypt.genSaltSync(10)
  const router = useRouter();
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const formDataAsEntries = formData.entries();
    const formDataAsObject = Object.fromEntries(formDataAsEntries);
    const password = formDataAsObject.password;
    // I should encrypt password before sending in body ?
    // const hashedPassword = await bcrypt.hash(password, 10);

    const body = {
      username: formDataAsObject.username,
      password,
    };
    fetch("http://localhost:5001/api/auth/login", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(body),
    })
      .then((response) => response.json())
      .then((jsonResponse) => {
        if (!jsonResponse.error) {
          localStorage.setItem("jwt", jsonResponse.token);
          router.push("/dashboard");
        } else {
          setIsError(true);
          setErrorMessage(jsonResponse.message);
        }
      })
      .catch((error) => console.log(error));
  }
  return (
    <div className="mt-20 grid grid-cols-2 justify-items-center">
      <div className="pt-10 bg-gray-900 w-full rounded-lg flex flex-col justify-center items-center">
        <Info />
      </div>
      <LoginForm
        handleLogin={handleLogin}
        isError={isError}
        errorMessage={errorMessage}
      />
    </div>
  );
}

type LoginFormType = {
  handleLogin: (e: React.FormEvent<HTMLFormElement>) => void;
  isError: boolean;
  errorMessage: string | null;
};

function LoginForm({ handleLogin, isError, errorMessage }: LoginFormType) {
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="py-20">
        <h1 className="text-3xl">Welcome to JWT authentication system</h1>
      </div>
      <form
        onSubmit={(e) => handleLogin(e)}
        className="flex flex-col justify-center items-center w-1/2"
      >
        <h1 className="text-xl font-medium">Login User</h1>
        <Input
          name="username"
          placeholder="username or email"
          className="w-60 mt-2"
          required
        />
        <Input
          name="password"
          placeholder="password"
          type="password"
          className="w-60 mt-2"
          required
        />
        <Button type="submit" className="mt-2">
          Login
        </Button>
        <a href="/" className="text-sm text-cyan-600 mt-1">
          Not registered? Register here
        </a>
        {isError && <div className="text-red-400"> {errorMessage}</div>}
      </form>
    </div>
  );
}

export default Login;

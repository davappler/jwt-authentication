'use client';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

function Login() {
  function handleLogin(e:React.FormEvent<HTMLFormElement>) {
    console.log(e);
    e.preventDefault()
        const formData = new FormData(e.target as HTMLFormElement)
    const formDataAsEntries = formData.entries()
    const formDataAsObject = Object.fromEntries(formDataAsEntries)

    console.log("HAHAH", formDataAsObject)
  }
  return (
    <>
      <form
        onSubmit={(e) => handleLogin(e)}
        className="flex flex-col justify-center items-center w-1/2"
      >
        <h1 className="text-xl font-medium">Login Details</h1>
        <Input name="username" placeholder="username" className="w-60 mt-2" required/>
        <Input name="password" placeholder="password" type="password" className="w-60 mt-2" required/>
        <Button type="submit" className="mt-2">
          Login
        </Button>
      </form>
    </>
  );
}

export default Login;

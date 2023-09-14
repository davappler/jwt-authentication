import { ReactNode, useState, useEffect } from "react";
import { userAuthorize } from "./authorisation";
// import  redirect from 'next/router';
import { redirect, useRouter } from "next/navigation";
// import { useRouter } from "next/router";

type Props = {
  children: JSX.Element | ReactNode;
};

function ProtectedPage({ children }: Props) {
  const router = useRouter();
  const [isUserAuthorized, setIsUserAuthorized] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      try {
        const jsonResponse = await userAuthorize();
        console.log("Console from protected route", jsonResponse);
        setIsUserAuthorized(jsonResponse.isUserAuthorized);

        if (!jsonResponse.isUserAuthorized) {
          redirect("/login");
        }
        console.log("okokokokokokoko", jsonResponse);
      } catch (error) {
        router.push("/login");
        console.error(error);
      }
    })();
  }, []);
  return (
    <>
      <div className="mt-20 pt-20">hahaha I am in protected route</div>

      {isUserAuthorized ? (
        children
      ) : (
        <div className="min-h-screen"> Loading... </div>
      )}
    </>
  );
}

export default ProtectedPage;

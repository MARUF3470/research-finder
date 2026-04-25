"use client";

import MultiStepLogin from "@/components/LoginRegistrationComponent/MultiStepLogin";
import MultiStepRegistration from "@/components/LoginRegistrationComponent/MultiStepRegistration";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";

const Authentication = () => {
  const [haveAccount, setHaveAccount] = useState(true);
  return (
    <main className="flex min-h-screen items-center w-full justify-center p-4">
      <div className="w-fit lg:w-1/3">
        {haveAccount ? (
          <h4 className="text-sm">
            Are you not registered yet?{" "}
            <Button
              onClick={() => setHaveAccount(!haveAccount)}
              variant="link"
              className="p-0"
            >
              Create New Account
            </Button>
          </h4>
        ) : (
          <h4 className="text-sm">
            Already have an account?{" "}
            <Button
              onClick={() => setHaveAccount(!haveAccount)}
              variant="link"
              className="p-0"
            >
              Login
            </Button>
          </h4>
        )}
        {haveAccount ? (
          <MultiStepLogin />
        ) : (
          <MultiStepRegistration setHaveAccount={setHaveAccount} />
        )}
      </div>
    </main>
  );
};

export default Authentication;

"use client"

import AuthFormWrapper from "./AuthFormWrapper";

const Register = () => {
  return (
    <section>
      <h2>Sign Up</h2>
      <AuthFormWrapper
        submitFn={async (d) => {console.log(d)}}
        fieldsToInclude={["email", "name", "password"]}
      />
    </section>
  );
};

export default Register;

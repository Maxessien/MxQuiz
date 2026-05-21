"use client"

import AuthFormWrapper from "./AuthFormWrapper"


const Login = () => {
  return (
    <section>
      <h2>Log In</h2>
      <AuthFormWrapper
        submitFn={async (d) => {console.log(d)}}
        fieldsToInclude={["email", "password"]}
      />
    </section>
  )
}

export default Login
import { RegisterLink, LoginLink, LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components"
export default function Page() {
  return <div className="bg-white flex flex-col justify-center items-center text-black h-[100vh] w-[100vw]">
    <h1 className="text-7xl text-center font-medium mb-5">Welcome to expense tracker</h1>
    <p>Dont waste time, Login or Register fast.</p>
    <div className="flex gap-3 mt-5">
      <LoginLink className="px-5 py-2 bg-blue-500 text-white rounded-md">Login</LoginLink>
      <RegisterLink className="px-5 py-2 bg-blue-500 text-white rounded-md">Register</RegisterLink>
    </div>
  </div>
}
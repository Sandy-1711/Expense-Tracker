import { RegisterLink, LoginLink, LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components"
export default function Page() {
  return <div className=" relative z-10 bg-white flex flex-col justify-center items-center text-black h-screen w-full">
    <div className=" -z-10 h-full absolute top-0 bottom-0 left-0 right-0 w-full">
      <spline-viewer url="https://prod.spline.design/12nEg6ewzZwDgACW/scene.splinecode"></spline-viewer>
    </div>
    <div className="absolute top-12">

      <h1 className=" text-5xl  text-center font-bold md:font-medium mb-5 md:text-7xl">Welcome to expense tracker</h1>
      <p className=" hidden md:block font-semibold md:font-normal text-center">Dont waste time, Login or Register fast.</p>
    </div>
    <p className=" md:hidden font-semibold md:font-normal text-center">Dont waste time, Login or Register fast.</p>
    <div className="flex gap-3 mt-5">
      <LoginLink className="px-5 py-2 bg-blue-500 text-white rounded-md">Login</LoginLink>
      <RegisterLink className="px-5 py-2 bg-blue-500 text-white rounded-md">Register</RegisterLink>
    </div>
  </div>
}
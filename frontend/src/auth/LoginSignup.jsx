import React, { useState } from 'react';
import { Tabs, Tab, Button, Input, Link } from "@nextui-org/react";
import { FaEye, FaEyeSlash, FaGoogle, FaEnvelope, FaArrowLeft } from 'react-icons/fa';
import Logo2 from '../assets/Rabas.png';

const LoginSignup = () => {
  const [view, setView] = useState("initial"); // initial, email, signup, forgotPassword
  const [selected, setSelected] = useState("login");
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    // Handle login logic here
  };

  const handleGoogleLogin = () => {
    // Handle Google sign-in logic here
  };

  const handleForgotPassword = (e) => {
    e.preventDefault();
    // Handle forgot password logic here
  };

  const renderInitialView = () => (
    <div className="flex flex-col h-full items-center justify-center gap-4">
      <img className="w-[11rem]" src={Logo2} />
      <h1 className="text-center font-semibold font-font1 text-2xl mb-9">
        Sign in to explore more in RabaSorsogon
      </h1>
      <Button
        className="flex items-center justify-center border-2 py-2 hover:bg-color2 hover:text-white transition rounded-full"
        onClick={handleGoogleLogin}
        fullWidth
      >
        <FaGoogle className="mr-2" /> Continue with Google
      </Button>
      <Button
        className="flex items-center justify-center border-2 py-2 hover:bg-gray-100 transition rounded-full"
        onClick={() => setView("email")}
        fullWidth
      >
        <FaEnvelope className="mr-2" /> Continue with Email
      </Button>
    </div>
  );

  const renderEmailForm = () => (
    <div className="flex flex-col gap-4">
      <button
        className="flex items-center text-gray-500 hover:text-black transition-all mb-4"
        onClick={() => setView("initial")}
      >
        <FaArrowLeft className="mr-2" /> Back
      </button>
      <Tabs
        fullWidth
        size="md"
        aria-label="Login or Signup"
        selectedKey={selected}
        onSelectionChange={setSelected}
        className="flex justify-center items-center "
      >
        <Tab key="login" title="Login">
          <form onSubmit={handleLogin} className="flex flex-col gap-4 ">
          <h1 className='font-font1 text-center text-2xl mb-2'>Welcome Back, Tara Rabas kita !</h1>
            <Input
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Input
              label="Password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              endContent={
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="focus:outline-none"
                >
                  {showPassword ? (
                    <FaEyeSlash className="text-2xl text-default-400" />
                  ) : (
                    <FaEye className="text-2xl text-default-400" />
                  )}
                </button>
              }
            />
            <div className="flex justify-between text-small">
              <Link
                className="cursor-pointer hover:text-color2"
                size="sm"
                onClick={() => setView("forgotPassword")}
              >
                Forgot Password?
              </Link>
              <p>
                Need an account?{" "}
                <Link
                  className="cursor-pointer hover:text-color2"
                  size="sm"
                  onPress={() => setSelected("signup")}
                >
                  Sign up
                </Link>
              </p>
            </div>
            <Button type="submit" color="primary" className="hover:bg-color2" fullWidth>
              Login
            </Button>
          </form>
        </Tab>

        <Tab key="signup" title="Sign Up">
          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <Input
              label="Name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <Input
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
              <Input
              label="Address"
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
            <Input
              label="Contact Number"
              type="tel"
              value={contactNumber}
              onChange={(e) => setContactNumber(e.target.value)}
              required
            />
            <Input
              label="Password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              endContent={
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="focus:outline-none"
                >
                  {showPassword ? (
                    <FaEyeSlash className="text-2xl text-default-400" />
                  ) : (
                    <FaEye className="text-2xl text-default-400" />
                  )}
                </button>
              }
            />
            <Input
              label="Confirm Password"
              type={showPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              endContent={
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="focus:outline-none"
                >
                  {showPassword ? (
                    <FaEyeSlash className="text-2xl text-default-400" />
                  ) : (
                    <FaEye className="text-2xl text-default-400" />
                  )}
                </button>
              }
            />
      
            <Button type="submit" color="primary" className="hover:bg-color2" fullWidth>
              Sign Up
            </Button>
          </form>
        </Tab>
      </Tabs>
    </div>
  );

  const renderForgotPasswordForm = () => (
    <div className="flex flex-col  gap-4">
      <button
        className="flex items-center text-gray-500 hover:text-black transition-all mb-4"
        onClick={() => setView("email")}
      >
        <FaArrowLeft className="mr-2" /> Back
      </button>
      <h2 className="text-center text-2xl font-semibold mb-4">Forgot Password?</h2>
      <h2>No problem! Just enter your email address below, and we’ll send you a link to reset your password.</h2>
      <form onSubmit={handleForgotPassword} className="flex flex-col gap-4">
        <Input
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Button type="submit" color="primary" className="hover:bg-color2" fullWidth>
          Send Password Reset Link
        </Button>
        
      </form>
    </div>
  );

  return (
    <div className="flex flex-col w-full p-4 h-full">
      {view === "initial"
        ? renderInitialView()
        : view === "forgotPassword"
        ? renderForgotPasswordForm()
        : renderEmailForm()}
    </div>
  );
};

export default LoginSignup;

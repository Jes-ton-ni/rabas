import React, { useState } from 'react';
import { Tabs, Tab, Card, CardBody, Input, Button, Link } from "@nextui-org/react";
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const LoginSignup = () => {
  const [selected, setSelected] = useState("login");
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    // Handle login logic here
  };

  const handleSignup = (e) => {
    e.preventDefault();
    // Handle signup logic here
  };

  return (
    <div className="flex flex-col w-full">
      <Card className="max-w-full w-full h-full">
        <CardBody className="overflow-hidden">
          <Tabs
            fullWidth
            size="md"
            aria-label="Login or Signup"
            selectedKey={selected}
            onSelectionChange={setSelected}
          >
            <Tab key="login" title="Login">
              <form onSubmit={handleLogin} className="flex flex-col gap-4">
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
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="focus:outline-none">
                      {showPassword ? (
                        <FaEyeSlash className="text-2xl text-default-400" />
                      ) : (
                        <FaEye className="text-2xl text-default-400" />
                      )}
                    </button>
                  }
                />
                <p className="text-center text-small">
                  Need to create an account?{" "}
                  <Link className='cursor-pointer hover:text-color2' size="sm" onPress={() => setSelected("signup")}>
                    Sign up
                  </Link>
                </p>
                <Button type="submit" color="primary" className='hover:bg-color2' fullWidth>
                  Login
                </Button>
              </form>
            </Tab>
            <Tab key="signup" title="Sign Up">
              <form onSubmit={handleSignup} className="flex flex-col gap-4">
                <div className="flex space-x-4">
                  <Input
                    label="First Name"
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                  />
                  <Input
                    label="Last Name"
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                  />
                </div>
                <div className="flex space-x-4">
                  <Input
                    label="Username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                  <Input
                    label="Phone Number"
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    required
                  />
                </div>
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
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="focus:outline-none">
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
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  endContent={
                    <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="focus:outline-none">
                      {showConfirmPassword ? (
                        <FaEyeSlash className="text-2xl text-default-400" />
                      ) : (
                        <FaEye className="text-2xl text-default-400" />
                      )}
                    </button>
                  }
                />
                <p className="text-center text-small ">
                  Already have an account?{" "}
                  <Link className='cursor-pointer hover:text-color2' size="sm" onPress={() => setSelected("login")}>
                    Login
                  </Link>
                </p>
                <Button type="submit" color="primary" className='hover:bg-color2' fullWidth>
                  Sign Up
                </Button>
              </form>
            </Tab>
          </Tabs>
        </CardBody>
      </Card>
    </div>
  );
};

export default LoginSignup;
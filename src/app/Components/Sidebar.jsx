"use client";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
import axios from "axios";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Checkbox,
  Input,

} from "@nextui-org/react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  Avatar,
} from "@nextui-org/react";
import Image from "next/image";
import bg from "../assests/bg.jpg";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";

function Sidebar() {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [backdrop, setBackdrop] = useState("blur");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegistering, setIsRegistering] = useState(false); 
  const router = useRouter();
  const [error , setError] = useState();
  const { data: session } = useSession();

  const handleOpen = (backdrop, isRegistering = false) => {
    setBackdrop(backdrop);
    setIsRegistering(isRegistering); 
    onOpen();
  };

  const handleLoginSubmit = async () => {
    if(!email || 
      !password){
      toast.info("Fill all the feilds")
    }
    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
        
      });

      if (res.error) {
         setEmail("");
         setPassword("");
        setError("Invalid Credentials");
        toast.error("Invalid Credentials")
        return;
      } else {
        toast.success("Login Successfully")
      }

      router.replace("/Bgimage");
      onClose();
    } catch (error) {
      console.log(error);
    }
  };

  const handleHome = () => {
    router.push("/");
  };

  const handleBgimage = () => {
    router.push("Bgimage");
  };

  const handleNewtab = () => {
    router.push("Newtab");
  };

  const handleRegisterSubmit = async () => {
    if(!name || !email || !password){
      toast.info("Fill all the fields")
    }
    try {
      const register = await axios.post("api/register", {
        name,
        email,
        password,
      });

      if (register.status === 201) {
        toast.success("Registered Successfully")
        setName("");
      setEmail("");
      setPassword("");
      setIsRegistering(false);
      onOpen(); 

      } else {
        toast.error("User registeration failed")
        console.log("User registration failed.");
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <>
      <Image alt="NextUI Fruit Image with Zoom" src={bg} fill={true} />

      <Navbar>
        <NavbarBrand>
          <AcmeLogo />
          <p className="font-bold text-inherit">Space X</p>
        </NavbarBrand>

        <NavbarContent className="hidden sm:flex gap-4" justify="center">
          <div>
            <ul className="hidden md:flex">
              <li
                onClick={handleHome}
                className="p-4 hover:bg-[#5950ce] rounded-xl m-2 cursor-pointer duration-300 hover:text-black"
              >
                Home
              </li>

              <li
                onClick={handleNewtab}
                className="p-4 hover:bg-[#5950ce] rounded-xl m-2 cursor-pointer duration-300 hover:text-black"
              >
                Categories
              </li>

              <li
                onClick={handleBgimage}
                className="p-4 hover:bg-[#5950ce] rounded-xl m-2 cursor-pointer duration-300 hover:text-black"
              >
                Resources
              </li>
            </ul>
          </div>
        </NavbarContent>

        <NavbarContent as="div" justify="end">
          {session ? (
            <Dropdown placement="bottom-end">
              <DropdownTrigger>
                <Avatar
                  isBordered
                  as="button"
                  className="transition-transform"
                  color="secondary"
                  size="sm"
                  showFallback
                  src="https://images.unsplash.com/broken"
                />
              </DropdownTrigger>
              <DropdownMenu aria-label="Profile Actions" variant="flat">
                <DropdownItem key="profile" className="h-14 gap-2">
                  <p className="font-semibold">Signed in as</p>
                  <p className="font-semibold">{session?.user?.email}</p>
                </DropdownItem>
                <DropdownItem key="settings">My Settings</DropdownItem>
                <DropdownItem key="team_settings">Team Settings</DropdownItem>
                <DropdownItem key="analytics">Analytics</DropdownItem>
                <DropdownItem key="system">System</DropdownItem>
                <DropdownItem key="configurations">Configurations</DropdownItem>
                <DropdownItem key="help_and_feedback">
                  Help & Feedback
                </DropdownItem>
                <DropdownItem onPress={signOut} key="logout" color="danger">
                  Log Out
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          ) : (
            <Button
              key="login"
              variant="flat"
              color="warning"
              onPress={() => handleOpen("blur")}
              className="capitalize"
            >
              Login
            </Button>
          )}
        </NavbarContent>
      </Navbar>

      <Modal
        backdrop={backdrop}
        isOpen={isOpen}
        onClose={onClose}
        onOpenChange={onOpenChange}
        placement="top-center"
      >
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">
            {isRegistering ? "Sign Up" : "Log in"}
          </ModalHeader>
          <ModalBody>
            {isRegistering && (
              <Input
                autoFocus
                endContent={
                  <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                }
                label="Name"
                placeholder="Enter your Name"
                variant="bordered"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            )}
            <Input
              autoFocus
              endContent={
                <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
              }
              label="Email"
              placeholder="Enter your email"
              variant="bordered"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              endContent={
                <LockIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
              }
              label="Password"
              placeholder="Enter your password"
              type="password"
              variant="bordered"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="flex py-2 px-1 justify-between">
              <Checkbox classNames={{ label: "text-small" }}>
                Remember me
              </Checkbox>
              {!isRegistering ? (
                <div
                  className=" cursor-pointer"
                  color="primary"
                  size="sm"
                  onClick={() => handleOpen("blur", true)}
                >
                  Register Now!
                </div>
              ) : (
                ""
              )}
            </div>
          </ModalBody>
          <ModalFooter>
            <Button color="danger" variant="flat" onPress={onClose}>
              Close
            </Button>
            <Button
              color="primary"
              onPress={isRegistering ? handleRegisterSubmit : handleLoginSubmit}
            >
              {isRegistering ? "Sign Up" : "Sign in"}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <ToastContainer />
    </>
  );
}

export default Sidebar;

export const MailIcon = (props) => (
  <svg
    aria-hidden="true"
    fill="none"
    focusable="false"
    height="1em"
    role="presentation"
    viewBox="0 0 24 24"
    width="1em"
    {...props}
  >
    <path
      d="M17 3.5H7C4 3.5 2 5 2 8.5V15.5C2 19 4 20.5 7 20.5H17C20 20.5 22 19 22 15.5V8.5C22 5 20 3.5 17 3.5ZM17.47 9.59L14.34 12.09C13.68 12.62 12.84 12.88 12 12.88C11.16 12.88 10.32 12.62 9.66 12.09L6.53 9.59C6.25 9.37 6.18 8.97 6.4 8.69C6.62 8.41 7.02 8.34 7.3 8.56L10.43 11.06C11.21 11.67 12.79 11.67 13.57 11.06L16.7 8.56C16.98 8.34 17.38 8.41 17.6 8.69C17.82 8.97 17.75 9.37 17.47 9.59Z"
      fill="currentColor"
    />
  </svg>
);

export const LockIcon = (props) => (
  <svg
    aria-hidden="true"
    fill="none"
    focusable="false"
    height="1em"
    role="presentation"
    viewBox="0 0 24 24"
    width="1em"
    {...props}
  >
    <path
      d="M12 17.5C11.45 17.5 11 17.05 11 16.5V14.5C11 13.95 11.45 13.5 12 13.5C12.55 13.5 13 13.95 13 14.5V16.5C13 17.05 12.55 17.5 12 17.5ZM17 8.5H16.5V6.5C16.5 4.29 14.71 2.5 12.5 2.5C10.29 2.5 8.5 4.29 8.5 6.5V8.5H8C6.9 8.5 6 9.4 6 10.5V18.5C6 19.6 6.9 20.5 8 20.5H17C18.1 20.5 19 19.6 19 18.5V10.5C19 9.4 18.1 8.5 17 8.5ZM15 8.5H10V6.5C10 5.4 10.9 4.5 12 4.5C13.1 4.5 14 5.4 14 6.5V8.5H15Z"
      fill="currentColor"
    />
  </svg>
);
export const AcmeLogo = () => (
  <svg fill="none" height="36" viewBox="0 0 32 32" width="36">
    <path
      clipRule="evenodd"
      d="M17.6482 10.1305L15.8785 7.02583L7.02979 22.5499H10.5278L17.6482 10.1305ZM19.8798 14.0457L18.11 17.1983L19.394 19.4511H16.8453L15.1056 22.5499H24.7272L19.8798 14.0457Z"
      fill="currentColor"
      fillRule="evenodd"
    />
  </svg>
);
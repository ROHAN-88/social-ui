import TextField from "@mui/material/TextField";
import { Formik } from "formik";
import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import "./Register.css";
import { useMutation } from "react-query";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { loginApi } from "../../lib/api/login-signup";
import Loader from "../../loader/Loader";

import { app } from "../firebase/firebaseconfig";
import { getMessaging, getToken } from "firebase/messaging";
import { sendNotification } from "../firebase/firebaseAxios";
const Login = () => {
  const navigate = useNavigate();

  const messaging = getMessaging(app);

  const [regToken, setRegToken] = useState("");
  const [webToken, setWebToken] = useState("");

  const callMessage = async () => {
    // let regToken = "";
    // Request permission and get FCM tokens
    Notification.requestPermission()
      .then((permission) => {
        if (permission === "granted") {
          console.log("Push notification permission granted");
          // Get registration token
          getToken(messaging).then((token) => {
            console.log("Registration token:", token);
            // regToken = token;
            setRegToken(token);
            setWebToken(token);
            // Send registration token to server for subscription
            // ...
          });
        } else {
          console.warn("Push notification permission denied");
        }
      })
      .catch((error) => {
        console.error("Error requesting push notification permission:", error);
      });
    // return regToken;
  };

  useEffect(() => {
    callMessage();
  }, []);

  //!mutation =========

  const { mutate, isLoading } = useMutation({
    mutationKey: ["login-mutation"],
    mutationFn: (values) => loginApi(values),
    onSuccess: async (respond) => {
      // console.log(respond);
      //!fireBase =============
      // callMessage();
      // const token = callMessage();
      // await sendNotification(regToken, "hello world");
      await sendNotification(regToken, webToken);
      //!=========================

      const accesstoken = respond?.data?.accesstoken;
      const Id = respond?.data?.user?._id;
      localStorage.setItem("accesstoken", accesstoken);
      localStorage.setItem("userId", Id);
      localStorage.setItem("isLoggedIn", true);
      navigate("/home");
    },
  });

  if (isLoading) {
    return <Loader />;
  }
  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
      }}
      validationSchema={Yup.object({
        email: Yup.string()
          .email("Invalid email address")
          .required("Email is Required"),
        password: Yup.string()
          .required("No password provided.")
          .min(8, "Password is too short - should be 8 chars minimum.")
          .matches(/[a-zA-Z]/, "Password can only contain Latin letters."),
      })}
      onSubmit={async (values) => {
        mutate(values);
      }}
    >
      {(formik) => (
        <form onSubmit={formik.handleSubmit} className="register-form">
          <div>
            <h3>email:RohanShrestha@gmail.com || password:hellojhgffj</h3>
          </div>
          <div className="register-form-parent" style={{ width: "300px" }}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                textAlign: "center",
              }}
            >
              <h2 style={{ color: "#F4CE14" }}>Social-Network</h2>
              <h2 style={{ color: "#45474B" }}>Login</h2>
            </div>
            {/* //!Email  */}
            <div className="register-form-child">
              <TextField
                style={{ width: "100%" }}
                label="Email"
                variant="filled"
                {...formik.getFieldProps("email")}
              />
              {formik.touched.email && formik.errors.email ? (
                <div className="error-msg">{formik.errors.email}</div>
              ) : null}
            </div>
            {/* //!password  */}
            <div className="register-form-child">
              <TextField
                style={{ width: "100%" }}
                label="Password"
                variant="filled"
                type="password"
                {...formik.getFieldProps("password")}
              />
              {formik.touched.password && formik.errors.password ? (
                <div className="error-msg">{formik.errors.password}</div>
              ) : null}
            </div>
            <h4
              style={{ color: "blue", cursor: "pointer" }}
              onClick={() => navigate("/register")}
            >
              Don't Have an account?
            </h4>
            {/* //!button  */}
            <Button type="submit" variant="contained">
              Submit
            </Button>
          </div>
        </form>
      )}
    </Formik>
  );
};

export default Login;

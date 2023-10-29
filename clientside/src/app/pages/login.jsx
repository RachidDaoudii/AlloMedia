import * as React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { setlogin } from "../features/auth/authSlice";
import { useDispatch } from "react-redux";
import { useLoginMutation } from "../services/auth/authApi";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  MDBRow,
  MDBCol,
  MDBInput,
  MDBCheckbox,
  MDBBtn,
  MDBIcon,
  MDBTabs,
  MDBTabsItem,
  MDBTabsLink,
  MDBTabsContent,
  MDBTabsPane,
} from "mdb-react-ui-kit";
import { useForm } from "react-hook-form";

export default function login() {
  const [loginRegisterActive] = React.useState("login");

  const dispatch = useDispatch();

  const [
    loginUser,
    {
      data: loginData,
      isSuccess: isLoginSuccess,
      isError: isLoginError,
      error: loginError,
    },
  ] = useLoginMutation();

  const {
    handleSubmit,
    watch,
    register,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const onSubmit = (data) => {
    console.log(data);
    if (data.email && data.password) {
      loginUser(data);
    } else {
      toast.error("Please enter Email and password");
    }
  };

  React.useEffect(() => {
    if (isLoginSuccess) {
      dispatch(setlogin(loginData));
      if (loginData.data.verified && loginData.data.role.name === "manager") {
        toast.success(
          `Bonjour ${loginData.data.username}, votre rôle est : ${loginData.data.role.name}`
        );
        return navigate("/manager");
      }
      if (loginData.data.verified && loginData.data.role.name === "client") {
        toast.success(
          `Bonjour ${loginData.data.username}, votre rôle est : ${loginData.data.role.name}`
        );
        return navigate("/client");
      }
      if (loginData.data.verified && loginData.data.role.name === "livreur") {
        toast.success(
          `Bonjour ${loginData.data.username}, votre rôle est : ${loginData.data.role.name}`
        );
        return navigate("/livreur");
      }
    }
  }, [isLoginSuccess]);

  React.useEffect(() => {
    if (isLoginError) {
      toast.error(`${loginError.data.message}`);
    }
  }, [isLoginError]);
  return (
    <div style={{ width: 500 }}>
      <MDBTabs pills justify className="mb-3">
        <MDBTabsItem>
          <MDBTabsLink>
            <Link to="/login">Login</Link>
          </MDBTabsLink>
        </MDBTabsItem>
        <MDBTabsItem>
          <MDBTabsLink>
            <Link to="/register">Register</Link>
          </MDBTabsLink>
        </MDBTabsItem>
      </MDBTabs>

      <MDBTabsContent>
        <MDBTabsPane show={loginRegisterActive === "login"}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="text-center mb-3">
              <p>Sign up with:</p>

              <MDBBtn floating color="secondary" className="mx-1">
                <MDBIcon fab icon="facebook-f" />
              </MDBBtn>

              <MDBBtn floating color="secondary" className="mx-1">
                <MDBIcon fab icon="google" />
              </MDBBtn>

              <MDBBtn floating color="secondary" className="mx-1">
                <MDBIcon fab icon="twitter" />
              </MDBBtn>

              <MDBBtn floating color="secondary" className="mx-1">
                <MDBIcon fab icon="github" />
              </MDBBtn>
            </div>

            <p className="text-center">or:</p>

            <MDBInput
              className="mb-4"
              type="email"
              id="form7Example1"
              label="Email address"
              name="email"
              {...register("email", {
                required: true,
                maxLength: 20,
                minLength: 15,
              })}
            />
            {errors.email && (
              <span class="text-danger">This field is required</span>
            )}
            <MDBInput
              className="mb-4"
              type="password"
              id="form7Example2"
              label="Password"
              name="password"
              {...register("password", {
                required: true,
                maxLength: 20,
                minLength: 6,
              })}
            />
            {errors.password && (
              <span class="text-danger">This field is required</span>
            )}
            <MDBRow className="mb-4">
              <MDBCol className="d-flex justify-content-center">
                <MDBCheckbox
                  id="form7Example3"
                  label="Remember me"
                  defaultChecked
                />
              </MDBCol>
              <MDBCol>
                <Link to="/forgetpassword">Forgot password?</Link>
              </MDBCol>
            </MDBRow>

            <button type="submit" class="btn btn-primary btn-block mb-3">
              Sign in
            </button>

            <div className="text-center">
              <p>
                Not a member? <Link to="/register">Register</Link>
              </p>
            </div>
          </form>
        </MDBTabsPane>
      </MDBTabsContent>
    </div>
  );
}

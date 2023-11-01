import * as React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useRegisterMutation } from "../services/auth/authApi";
import { toast } from "react-toastify";
import { useGetRolesMutation } from "../services/role/roleApi";
import { setRole } from "../features/roles/roleSlice";
import { useDispatch, useSelector } from "react-redux";
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
  MDBRadio,
} from "mdb-react-ui-kit";
import { useForm } from "react-hook-form";

export default function Register() {
  const [loginRegisterActive] = React.useState("register");

  const {
    handleSubmit,
    watch,
    register,
    formState: { errors },
  } = useForm();
  const initialState = {
    _role: "",
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [
    sendRoles,
    { data: rolesData, isSuccess, isError, error: rolesError },
  ] = useGetRolesMutation();

  React.useEffect(() => {
    sendRoles();
  }, [sendRoles]);

  React.useEffect(() => {
    if (isSuccess) {
      dispatch(setRole(rolesData));
    }
  }, [isSuccess]);

  const role = useSelector((state) => state.role);

  const [
    registerUser,
    {
      data: registerData,
      isSuccess: isRegisterSuccess,
      isError: isRegisterError,
      error: registerError,
    },
  ] = useRegisterMutation();

  const [formValue, setForm] = useState(initialState);
  const { _role } = formValue;

  const handleChange = (event) => {
    setForm({
      ...formValue,
      [event.target.name]: event.target.value,
    });
  };
  const onSubmit = (data) => {
    data._role = _role;

    console.log(data);
    if (
      data.username &&
      data.email &&
      data._role &&
      data.password &&
      data.repeat_password
    ) {
      if (data.password === data.repeat_password) {
        registerUser(data);
      } else {
        toast.error("Password and Repeat Password should be same");
      }
    } else {
      toast.error("Please enter all the fields");
    }
  };

  React.useEffect(() => {
    if (isRegisterSuccess) {
      toast.success("Register successfully please verify your email");
      navigate("/login");
    }
  }, [isRegisterSuccess]);

  React.useEffect(() => {
    if (isRegisterError) {
      toast.error(`${registerError.data.message}`);
    }
  }, [isRegisterError]);

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
        <MDBTabsPane show={loginRegisterActive === "register"}>
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
              id="form8Example2"
              label="Username"
              name="username"
              // value={username}
              // onChange={handleChange}
              {...register("username", {
                required: true,
              })}
            />
            {errors.username && (
              <p className="text-danger">Username is required</p>
            )}
            <MDBInput
              className="mb-4"
              type="email"
              id="form8Example3"
              label="Email address"
              name="email"
              // value={email}
              {...register("email", {
                required: true,
              })}
            />
            {errors.email && <p className="text-danger">Email is required</p>}
            <MDBInput
              className="mb-4"
              type="number"
              id="form8Example3"
              label="Phone"
              name="phone"
              {...register("phone", {
                required: true,
              })}
            />
            {errors.phone && <p className="text-danger">Phone is required</p>}
            <div
              style={{
                display: "flex",
                justifyContent: "space-evenly",
                marginBottom: 6,
              }}
            >
              {role.map((data) => {
                return (
                  <div key={data._id}>
                    <MDBRadio
                      checked={_role === data._id}
                      onChange={handleChange}
                      label={data.name}
                      value={data._id}
                      name="_role"
                      {...watch("_role", {
                        required: true,
                      })}
                    />
                  </div>
                );
              })}
            </div>

            <MDBInput
              className="mb-4"
              type="password"
              id="form8Example4"
              label="Password"
              name="password"
              {...register("password", {
                required: true,
              })}
            />
            {errors.password && (
              <p className="text-danger">Password is required</p>
            )}
            <MDBInput
              className="mb-4"
              type="password"
              id="form8Example5"
              label="Repeat password"
              name="repeat_password"
              {...register("repeat_password", {
                required: true,
              })}
            />
            {errors.repeat_password && (
              <p className="text-danger">Repeat Password is required</p>
            )}

            <MDBCheckbox
              wrapperClass="d-flex justify-content-center mb-4"
              id="form8Example6"
              label="I have read and agree to the terms"
              defaultChecked
            />

            <button
              type="submit"
              onClick={handleSubmit}
              class="btn btn-primary btn-block mb-3"
            >
              Sign in
            </button>
          </form>
        </MDBTabsPane>
      </MDBTabsContent>
    </div>
  );
}

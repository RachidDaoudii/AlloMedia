import * as React from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useSendEmailForGetPAssworMutation } from "../services/auth/authApi";
import { MDBInput, MDBTabsContent } from "mdb-react-ui-kit";
import { useForm } from "react-hook-form";

export default function ForGetPassword() {
  const navigate = useNavigate();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const [
    sendEmail,
    {
      data: emailData,
      isSuccess: isEmailSuccess,
      isError: isEmailError,
      error: emailError,
    },
  ] = useSendEmailForGetPAssworMutation();

  const onSubmit = (data) => {
    if (data.email) {
      sendEmail(data);
    } else {
      toast.error("Please enter Email");
    }
  };

  React.useEffect(() => {
    if (isEmailSuccess) {
      toast.success("please check your email");
      navigate("/login");
    }
  }, [isEmailSuccess]);

  React.useEffect(() => {
    if (isEmailError) {
      toast.error(`${emailError.data.message}`);
    }
  }, [isEmailError]);

  return (
    <MDBTabsContent>
      <form onSubmit={handleSubmit(onSubmit)} className="w-full">
        <div className="text-center mb-3">
          <p>ForGet Password</p>
        </div>

        <MDBInput
          className="mb-2"
          type="email"
          id="form7Example1"
          label="email address"
          name="email"
          style={{ width: 300 }}
          {...register("email", {
            required: true,
            pattern: {
              value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
              message: "Please enter a valid email",
            },
          })}
        />
        {errors.email && (
          <span class="text-danger">{errors.email.message}</span>
        )}
        <div className="text-center mb-2">
          <Link to="/login" variant="body2">
            Sign in
          </Link>

          <span className="p-2">|</span>

          <Link to="/register" variant="body2">
            Register
          </Link>
        </div>
        <button type="submit" class="btn btn-primary btn-block mb-3">
          forget password
        </button>
      </form>
    </MDBTabsContent>
  );
}

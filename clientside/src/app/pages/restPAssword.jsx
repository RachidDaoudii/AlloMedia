import { useRestPasswordMutation } from "../services/auth/authApi";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { MDBInput, MDBTabsContent } from "mdb-react-ui-kit";
export default function RestPassword() {
  const navigate = useNavigate();
  const { search } = useLocation();
  const query = new URLSearchParams(search);
  const token = query.get("token");

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  if (!token) {
    return navigate("/login");
  }

  const [
    restPassword,
    {
      data: restPasswordData,
      isSuccess: isRestPasswordSuccess,
      isError: isRestPasswordError,
      error: restPasswordError,
    },
  ] = useRestPasswordMutation();

  const onSubmit = (data) => {
    data.token = token;

    if (data.password != data.repeat_password) {
      return toast.error("Password and repeat_password must be the same");
    }

    if (data.password && data.repeat_password) {
      restPassword(data);
    } else {
      toast.error("Please enter Password and repeat_password");
    }
  };

  useEffect(() => {
    if (isRestPasswordSuccess) {
      toast.success("Password Rest Successfully");
      navigate("/login");
    }
    if (isRestPasswordError) {
      toast.error(restPasswordError.data.message);
    }
  }, [isRestPasswordSuccess, isRestPasswordError]);
  return (
    <MDBTabsContent>
      <form onSubmit={handleSubmit(onSubmit)} className="w-full">
        <div className="text-center mb-3">
          <p>Rest Password</p>
        </div>

        <MDBInput
          className="mb-4"
          type="password"
          id="form7Example1"
          label="password"
          name="password"
          style={{ width: 300 }}
          {...register("password", {
            required: true,
            minLength: {
              value: 8,
              message: "Password must have at least 8 characters",
            },
          })}
        />
        {errors.password && (
          <span class="text-danger">{errors.password.message}</span>
        )}
        <MDBInput
          className="mb-4"
          type="password"
          id="form7Example2"
          label="repeat_password"
          name="repeat_password"
          {...register("repeat_password", {
            required: true,
            minLength: {
              value: 8,
              message: "Password must have at least 8 characters",
            },
          })}
        />
        {errors.repeat_password && (
          <span class="text-danger">{errors.repeat_password.message}</span>
        )}

        <button type="submit" class="btn btn-primary btn-block mb-3">
          Rest
        </button>
      </form>
    </MDBTabsContent>
  );
}

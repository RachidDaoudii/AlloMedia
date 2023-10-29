import { MDBInput, MDBBtn } from "mdb-react-ui-kit";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
function Profile() {
  const auth = useSelector((state) => state.auth);

  const initialState = {
    username: auth.username,
    email: auth.email,
    phone: auth.phone,
    address: auth.address,
    city: auth.city,
  };

  const [formValue, setForm] = useState(initialState);

  const { username, email, phone, address, city } = formValue;

  const {
    handleSubmit,
    watch,
    register,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };
  return (
    <div>
      <section style={{ backgroundcolor: "#eee" }}>
        <div class="container pt-4">
          <div class="row">
            <div class="col-lg-4">
              <div class="card mb-8">
                <div class="card-body text-center">
                  <img
                    src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
                    alt="avatar"
                    class="rounded-circle img-fluid"
                    style={{ width: 150 }}
                  />
                  <h5 class="my-3">{auth.username}</h5>
                  <p class="text-muted mb-1">{auth.role.name}</p>
                  <input type="file" name="" id="" />
                </div>
              </div>
            </div>
            <div class="col-lg-8">
              <div class="card ">
                <div class="card-body">
                  <h5 class="mb-4">Account Information</h5>
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div class="row centerElement">
                      <div class="col-sm-9">
                        <MDBInput
                          type="text"
                          id="form7Example1"
                          label="Full Name"
                          name="username"
                          defaultValue={username}
                          {...register("username", {
                            required: true,
                            maxLength: 20,
                            minLength: 6,
                          })}
                        />
                        {errors.username && (
                          <span class="text-danger">
                            This field is required
                          </span>
                        )}
                      </div>
                    </div>
                    <hr />
                    <div class="row centerElement">
                      <div class="col-sm-9">
                        <MDBInput
                          type="text"
                          id="form7Example1"
                          label="Email"
                          name="email"
                          {...register("email", {
                            required: "Email is required",
                          })}
                          defaultValue={email}
                        />
                        {
                          <span class="text-danger">
                            {errors.email && "This field is required"}
                          </span>
                        }
                      </div>
                    </div>
                    <hr />
                    <div class="row centerElement">
                      <div class="col-sm-9">
                        <MDBInput
                          type="text"
                          id="form7Example1"
                          label="Phone"
                          name="phone"
                          defaultValue={phone}
                          {...register("phone", {
                            required: true,
                            minLength: 10,
                          })}
                        />
                        {
                          <span class="text-danger">
                            {errors.phone && "This field is required"}
                          </span>
                        }
                      </div>
                    </div>

                    <hr />
                    <div class="row centerElement">
                      <div class="col-sm-9">
                        <MDBInput
                          type="text"
                          id="form7Example1"
                          label="Address"
                          name="address"
                          defaultValue={address}
                          {...register("address", {
                            required: true,
                            minLength: 10,
                          })}
                        />
                        {errors.address && (
                          <span class="text-danger">
                            This field is required
                          </span>
                        )}
                      </div>
                    </div>
                    <hr />
                    <div class="row centerElement">
                      <div class="col-sm-9">
                        <MDBInput
                          type="text"
                          id="form7Example1"
                          label="City"
                          name="city"
                          defaultValue={city}
                          {...register("city", {
                            required: true,
                            minLength: 10,
                          })}
                        />
                        {errors.city && (
                          <span class="text-danger">
                            This field is required
                          </span>
                        )}
                      </div>
                    </div>
                    <hr />
                    <div class="row centerElement">
                      <div class="col-sm-9">
                        <button
                          type="submit"
                          class="btn btn-primary btn-block mb-3"
                        >
                          Update in
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Profile;

import * as React from "react";

import { useDispatch, useSelector } from "react-redux";
import SideBar from "./Sidebar";
import { Link, useNavigate } from "react-router-dom";
import { MDBBtn } from "mdb-react-ui-kit";
import { toast } from "react-toastify";
import { logout } from "../features/auth/authSlice";
import { useLogoutMutation } from "../services/auth/authApi";

export default function Header() {
  const auth = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [
    logoutUser,
    {
      data: logoutData,
      isSuccess: isLogoutSuccess,
      isError: isLogoutError,
      error: logoutError,
    },
  ] = useLogoutMutation();

  const handleLogout = (event) => {
    event.preventDefault();

    logoutUser();
  };

  React.useEffect(() => {
    if (isLogoutSuccess) {
      dispatch(logout());
      toast.success("Déconnecté avec succès");
      navigate("/login");
    }
  }, [isLogoutSuccess]);
  return (
    <div>
      <header>
        <SideBar />
        <nav
          id="main-navbar"
          class="navbar navbar-expand-lg navbar-light bg-white fixed-top"
        >
          <div class="container-fluid">
            <button
              class="navbar-toggler"
              type="button"
              data-mdb-toggle="collapse"
              data-mdb-target="#sidebarMenu"
              aria-controls="sidebarMenu"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <i class="fas fa-bars"></i>
            </button>

            <Link
              class="navbar-brand"
              to={
                auth.role.name === "client"
                  ? "/client"
                  : auth.role.name === "livreur"
                  ? "/livreur"
                  : "/manager"
              }
            >
              <img
                src="../../public/asset/img/logo.png"
                height="25"
                alt="MDB Logo"
                loading="lazy"
              />
            </Link>

            <ul class="navbar-nav ms-auto d-flex flex-row">
              {/* <!-- Avatar --> */}
              <li class="nav-item dropdown">
                <a
                  class="nav-link dropdown-toggle hidden-arrow d-flex align-items-center"
                  href="#"
                  id="navbarDropdownMenuLink"
                  role="button"
                  data-mdb-toggle="dropdown"
                  aria-expanded="false"
                >
                  <img
                    src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img (31).webp"
                    class="rounded-circle"
                    height="22"
                    alt="Avatar"
                    loading="lazy"
                  />
                </a>
                <ul
                  class="dropdown-menu dropdown-menu-end"
                  aria-labelledby="navbarDropdownMenuLink"
                >
                  <li>
                    {
                      <Link
                        class="dropdown-item"
                        to={
                          auth.role.name === "client"
                            ? "/client/me"
                            : auth.role.name === "livreur"
                            ? "/livreur/me"
                            : "/manager/me"
                        }
                      >
                        My account
                      </Link>
                    }
                  </li>
                  <li>
                    <a class="dropdown-item" href="#">
                      Settings
                    </a>
                  </li>
                  <li>
                    <button class="dropdown-item" onClick={handleLogout}>
                      Logout
                    </button>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </nav>
      </header>
    </div>
  );
}

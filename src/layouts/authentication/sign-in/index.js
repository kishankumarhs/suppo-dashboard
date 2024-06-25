/**
=========================================================
* Material Dashboard 2 React - v2.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { useState } from "react";

// react-router-dom components
import { Link } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";
import Switch from "@mui/material/Switch";
// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";

// Authentication layout components
import BasicLayout from "layouts/authentication/components/BasicLayout";

// Images
import bgImage from "assets/images/bg-sign-in-basic.jpeg";
import { usePostRequestLazy } from "utils/axiosHooks";
import { AUTH_ENDPOINT } from "utils/axios.apis";
import { CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";

function Basic() {
  const [rememberMe, setRememberMe] = useState(false);
  const [singIn, { data, loading, error }] = usePostRequestLazy(AUTH_ENDPOINT.LOGIN.URL);
  const [authentication, setAuthentication] = useState({
    email: "",
    password: "",
  });
  const [authenticationError, setAuthenticationError] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleSetRememberMe = () => setRememberMe(!rememberMe);
  const handleChange = (e) => {
    e.preventDefault();
    setAuthentication((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    validate({ ...authentication, [e.target.name]: e.target.value });
  };
  const validate = (values) => {
    const errors = {};
    if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$/.test(values.email)) {
      errors.email = "invalid email";
    } else errors.email = "";
    setAuthenticationError((prev) => ({ ...prev, ...errors }));
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    if (Object.values(authenticationError).filter((f) => f !== "").length > 0) return;
    await singIn({
      ...authentication,
    });
    if (error)
      setAuthenticationError({
        error: error.message,
      });
    if (data) {
      localStorage.setItem("token", data?.access_token);
      navigate("/");
    }
  };
  return (
    <BasicLayout image={bgImage}>
      <Card>
        <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="info"
          mx={2}
          mt={-3}
          p={2}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            Sign in
          </MDTypography>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox>
            <MDBox mb={2}>
              <MDInput
                onChange={handleChange}
                error={!!authenticationError.email}
                value={authentication.email}
                helperText={authenticationError.email}
                name="email"
                type="email"
                label="Email"
                fullWidth
              />
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                error={!!authenticationError.password}
                helperText={authenticationError.password}
                value={authentication.password}
                name="password"
                onChange={handleChange}
                type="password"
                label="Password"
                fullWidth
              />
            </MDBox>
            <MDBox display="flex" alignItems="center" ml={-1}>
              <Switch checked={rememberMe} onChange={handleSetRememberMe} />
              <MDTypography
                variant="button"
                fontWeight="regular"
                color="text"
                onClick={handleSetRememberMe}
                sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
              >
                &nbsp;&nbsp;Remember me
              </MDTypography>
            </MDBox>
            <MDBox mt={4} mb={1}>
              <MDButton onClick={handleSignIn} variant="gradient" color="info" fullWidth>
                {loading ? <CircularProgress size={16} /> : "sign in"}
              </MDButton>
            </MDBox>
            <MDBox mt={3} mb={1} textAlign="center">
              <MDTypography variant="button" color="text">
                Don&apos;t have an account?{" "}
                <MDTypography
                  component={Link}
                  to="/authentication/sign-up"
                  variant="button"
                  color="info"
                  fontWeight="medium"
                  textGradient
                >
                  Sign up
                </MDTypography>
              </MDTypography>
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
    </BasicLayout>
  );
}

export default Basic;

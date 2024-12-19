import { useState, useEffect } from "react";
import { useNavigate, useLocation, useSearchParams } from "react-router-dom";
import useForm from "../../custom-hooks/useForm";
import { authenticateCredentails } from "../Services/SecurityService";

const Login = () => {
  let title = "Synechron Authentication Form!";
  const navigate = useNavigate();
  const [authError, setAuthError] = useState(null);
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const onAuthenticateCredentails = async () => {
    const authResult = await authenticateCredentails(inputFields);
    console.log("authResult:",authResult)
    let returnUrl = searchParams.get("returnurl");
    if (authResult?.accessToken) {
      localStorage.setItem("token", authResult.accessToken.token);
      localStorage.setItem("role", authResult.accessToken.role);
      if (returnUrl) {
        navigate(returnUrl);
      } else {
        navigate("/home");
      }
    } else {
      setTimeout(() => {
        setAuthError(null);
      }, 5000);
      setAuthError(authResult?.message);
    }
  };
  useEffect(() => {
    console.log(location.search);
  }, [location.search]);
  const validate = (values) => {
    let errors = {};
    if (!values.email) {
      errors.email = "Email address is required!";
    }
    if (!values.password) {
      errors.password = "Password is required!";
    }
    return errors;
  };
  const [inputFields, handleChange, handleSubmit, errors] = useForm(
    onAuthenticateCredentails,
    validate
  );
  return (
    <div className="container">
      <h1>{title}</h1>
      <hr />
      <form onSubmit={(e) => handleSubmit(e)}>
        <fieldset>
          <div className="form-group">
            <label htmlFor="inputEmail" className="form-label mt-4">
              Email Id
            </label>
            <input
              type="email"
              className="form-control"
              id="inputEmail"
              placeholder="Enter your email Id"
              name="email"
              onChange={(e) => handleChange(e)}
              value={inputFields.email || ""}
            />
            {errors.email ? (
              <div className="alert alert-danger">{errors.email}</div>
            ) : (
              ""
            )}
          </div>
          <div className="form-group">
            <label htmlFor="inputPassword" className="form-label mt-4">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="inputPassword"
              placeholder="Enter your password"
              name="password"
              onChange={(e) => handleChange(e)}
              value={inputFields.password || ""}
            />
            {errors.password ? (
              <div className="alert alert-danger">{errors.password}</div>
            ) : (
              ""
            )}
          </div>
          <button type="submit" className="btn btn-primary">
            Login
          </button>
        </fieldset>
      </form>
      {authError != null ? (
        <div className="alert alert-danger">{authError}</div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Login;
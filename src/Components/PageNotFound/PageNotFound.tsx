import { Link } from "react-router-dom";
import "./PageNotFound.css";

export const PageNotFound = () => {
  return (
    <div className="page404">
      <h1>404</h1>
      <h3>Page not found</h3>
      <p>
        We're sorry, the page you requested could not be found. Please go back
        to the homepage.
      </p>
      <Link className="button" to="/home" id='back-button'>
        Go back
      </Link>
    </div>
  );
};
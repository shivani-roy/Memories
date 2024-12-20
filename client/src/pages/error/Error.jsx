import { useRouteError, Link } from "react-router-dom";
import img from "../../assets/not-found.svg";
import styles from "./Error.module.css";

const Error = () => {
  const error = useRouteError();
  console.log(error);

  if (error?.status === 404) {
    return (
      <div className={styles.container}>
        <div>
          <img
            src={img}
            alt="not found"
            className={styles.img}
          />
          <h3 className={styles.heading}>Ohh! page not found</h3>
          <p className={styles.content}>
            We can't seem to find the page you're looking for
          </p>
          <Link to="/">back home</Link>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div>
        <h3 className={styles.heading}>
          Something went wrong! please try again later.
        </h3>
        <Link to="/">back home</Link>
      </div>
    </div>
  );
};

export default Error;

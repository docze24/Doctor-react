import { useRouter } from "next/router";
import { MdKeyboardBackspace } from "react-icons/md";

const ForbiddenPage = () => {
  const router = useRouter();

  const GoBackToPreviousPage = () => {
    router.push("/dashboard");
  }
  return <div className="d-md-flex align-items-center justify-content-center">
    <div className="d-flex justify-content-center">
      <img src="/assets/img/Error-Forbidden.svg" alt="forbidden-img" style={{ height: "440px" }} />
    </div>
    <div className="d-flex flex-column gap-2">
      <div className="d-flex flex-column gap-1">
        <h1 className="mb-0 mb-0 text-center text-md-end">403 Forbidden</h1>
        <h5 className="mb-0 text-muted mb-0 text-center text-md-end">Sorry but the requested source <br />is not available for you.</h5>
      </div>
      <button className="mt-3 border-0 bg-transparent text-decoration-underline text-center text-md-end" onClick={GoBackToPreviousPage}><MdKeyboardBackspace className="me-2" />Go back</button>
    </div>
  </div>;
};

export default ForbiddenPage;
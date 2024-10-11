import {useRouteError} from "react-router-dom";

const ErrorPage = () => {

    let error = useRouteError();
    return (
        <div>
            <h1>Error: {JSON.stringify(error)}</h1>
        </div>
    );
};

export default ErrorPage;
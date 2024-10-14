import {useRouteError} from "react-router-dom";

const ErrorPage = () => {
    const error = useRouteError()
    return (
        <div>
            <h1>Error: {JSON.stringify(error)}</h1>
        </div>
    );
};

export default ErrorPage;
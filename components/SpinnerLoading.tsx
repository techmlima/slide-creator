import { Spinner } from "react-bootstrap"

const SpinnerLoading: React.FC = () => {
    return (<div className="position-absolute w-100 h-100 d-flex justify-content-center align-items-center">
        <Spinner animation="grow" size="sm" />
        <Spinner animation="grow" />
    </div>)
}

export default SpinnerLoading
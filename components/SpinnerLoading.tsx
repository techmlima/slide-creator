import { Spinner } from "react-bootstrap"

const SpinnerLoading: React.FC = () => {
    return (
    <div className="position-absolute w-100 h-100 d-flex justify-content-center align-items-center d-inline-block">
        <Spinner animation="grow" size="sm" />
        <Spinner animation="grow" />
        <Spinner animation="grow"  className="ml-2" style={{ transform: "scale(3)" }} />
    </div>
    
    )
}

export default SpinnerLoading
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { Placement } from "react-bootstrap/esm/Overlay";

type TooltipProps = {
    keyName: string;
    placement: Placement;
    text: string;
    component: any;
    children: never[];
}

const TooltipElement: React.FC<TooltipProps> = (props) => {
    return (
        <OverlayTrigger
            key={props.keyName}
            placement={props.placement}
            overlay={
                <Tooltip id={`tooltip-${props.keyName}`}>
                    {props.text}
                </Tooltip>
            }
        >
            {props.component}
        </OverlayTrigger>
    );
}

export default TooltipElement;
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { ReactElement } from 'react';

type TooltipProps = {
    keyName: string;
    placement: "top" | "bottom" | "left" | "right" | "top-start" | "top-end" | "bottom-start" | "bottom-end" | "left-start" | "left-end" | "right-start" | "right-end"; // Define specific placement types
    text: string;
    component: ReactElement; // Ensure it's a ReactElement
};

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
};

export default TooltipElement;

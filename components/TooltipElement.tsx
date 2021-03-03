import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { Placement } from "react-bootstrap/esm/Overlay";

const TooltipElement: React.FC<{ keyName: string , placement: Placement , text: string , component }> = ({ keyName, placement, text, component }) => {
    return (
        <OverlayTrigger
            key={keyName}
            placement={placement}
            overlay={
                <Tooltip id={`tooltip-${keyName}`}>
                    {text}
                </Tooltip>
            }
        >
            {component}
        </OverlayTrigger>
    );
}

export default TooltipElement;
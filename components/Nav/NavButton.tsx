import { Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import { Placement } from "react-bootstrap/esm/Overlay";

const NavButton: React.FC<{ keyName: string , placement: Placement , text: string , component }> = ({ keyName, placement, text, component }) => {
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

export default NavButton;
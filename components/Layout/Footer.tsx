import React from "react";
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import { Github, Linkedin } from "react-bootstrap-icons";
import TooltipElement from "../TooltipElement";

const Footer: React.FC = () => {
    return (<>
        <div className="text-white footer">
            <div className="col d-flex justify-content-end align-items-center h-100">
                <div className="copyright mr-3">
                    Copyright © 2020-2021 Arthur Lima
                </div>
                <div className="mr-3">
                    <TooltipElement keyName='linkedin' placement='top' text='marcos-arthur-brito-lima'
                        component={(
                            <Linkedin className="btn-social-media align-middle" onClick={() =>
                                window.open('https://www.linkedin.com/in/marcos-arthur-brito-lima/')
                            } />
                        )}>
                    </TooltipElement>
                </div>
                <div>
                    <TooltipElement keyName='linkedin' placement='top' text='arthur-lima-dev'
                        component={(
                            <Github className="btn-social-media align-middle" onClick={() =>
                                window.open('https://github.com/arthur-lima-dev')
                            } />
                        )}>
                    </TooltipElement>
                </div>
            </div>
        </div>
    </>)
}
export default Footer
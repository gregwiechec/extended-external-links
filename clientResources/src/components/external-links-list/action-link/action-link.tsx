import React from "react";

interface ActionLinkProps {
    newWindow?: boolean;
    onClick?: (e: any) => void;
    href: string;
}

export const ActionLink: React.FC<ActionLinkProps> = ({ newWindow = false, href, onClick, children }) => {
    let props: any = null;
    if (newWindow || onClick) {
        props = {};
        if (newWindow) {
            props.target = "_blank";
        }
        if (onClick) {
            props.onClick = onClick;
        }
    }
    return (
        <a className="epi-functionLink" href={href} {...props}>
            {children}
        </a>
    );
};

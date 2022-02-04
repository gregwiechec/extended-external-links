import React from "react";

interface ActionLinkProps {
    newWindow?: boolean;
    href: string;
}

const ActionLink: React.FC<ActionLinkProps> = ({ newWindow = false, href, children }) => {
    let props: any = null;
    if (newWindow) {
        props = {
            target: "_blank"
        }
    }
    return <a href={href} {...props}>{children}</a>;
};

export default ActionLink;

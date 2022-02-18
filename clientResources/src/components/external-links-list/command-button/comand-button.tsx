import React from "react";

interface CommandButtonProps {
    command: any;
}

export const CommandButton = ({ command }: CommandButtonProps) => {
    return (
        <button className="dijit dijitReset dijitInline dijitButton" onClick={() => command.execute()}>
            <span className="dijitReset dijitInline dijitButtonNode">
                <span className="dijitReset dijitStretch dijitButtonContents">
                    <span className="dijitReset dijitInline dijitButtonText">{command.label}</span>
                </span>
            </span>
        </button>
    );
};

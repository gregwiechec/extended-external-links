import topic from "dojo/topic";

export const changeContext = (sender: any) => {
    return (contentLink: string) => {
        const callerData = {
            sender: sender
        };
        topic.publish("/epi/shell/context/request", { uri: "epi.cms.contentdata:///" + contentLink }, callerData);
    };
};

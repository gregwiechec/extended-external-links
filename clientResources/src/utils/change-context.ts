import { DataItem } from "../definitions";
import topic from "dojo/topic";

const changeContext = (sender: any) => {
    return (item: DataItem) => {
        const callerData = {
            sender: sender
        };
        topic.publish("/epi/shell/context/request", { uri: "epi.cms.contentdata:///" + item.contentLink }, callerData);
    };
};

export default changeContext;

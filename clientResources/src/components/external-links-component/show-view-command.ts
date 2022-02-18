import { React_Stateful } from "./React_Stateful";
import { React_Command } from "./React_Command";

class ShowViewCommand extends React_Command {
    label: string = "Show view";
    category: string = "context";
    iconClass: string = "epi-iconReferences epi-icon--medium";

    private _topic: dojo.Topic;

    constructor(topic: dojo.Topic) {
        super();
        this._topic = topic;
    }

    execute() {
        this._topic.publish("/epi/shell/context/request", { uri: "external-links:///1" }, { sender: null });
    }
}

export { ShowViewCommand };

import { ReactCommand } from "./React_Command";
import { Resources } from "../../../resources-context";

export class ShowViewCommand extends ReactCommand {
    label: string = "Show view";
    category: string = "context";
    iconClass: string = "epi-iconReferences epi-icon--medium";

    private _topic: dojo.Topic;

    constructor(topic: dojo.Topic, resources: Resources) {
        super();
        this._topic = topic;
        this.label = resources.showview;
    }

    execute() {
        this._topic.publish("/epi/shell/context/request", { uri: "external-links:///" }, { sender: null });
    }
}

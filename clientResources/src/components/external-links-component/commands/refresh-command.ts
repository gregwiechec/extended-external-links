import { ReactCommand } from "./React_Command";
import { Resources } from "../../../resources-context";

export class RefreshCommand extends ReactCommand {
    label: string = "Refresh list";
    category: string = "context";
    iconClass: string = "epi-iconRevert epi-icon--medium";
    private _topic: dojo.Topic;

    constructor(topic: dojo.Topic, resources: Resources) {
        super();
        this._topic = topic;
        this.label = resources.refresh;
    }

    execute() {
        this._topic.publish("/external-links/reload");
    }
}

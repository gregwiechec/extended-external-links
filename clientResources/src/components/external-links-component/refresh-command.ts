import { React_Command } from "./React_Command";

class RefreshCommand extends React_Command {
    label: string = "Refresh list"; //TODO: LINKS resources
    category: string = "context";
    iconClass: string = "epi-iconRevert epi-icon--medium";
    private _topic: dojo.Topic;

    constructor(topic: dojo.Topic) {
        super();
        this._topic = topic;
    }

    execute() {
        this._topic.publish("/external-links/reload");
    }
}

export { RefreshCommand };

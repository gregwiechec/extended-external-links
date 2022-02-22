import { DataService } from "../definitions";
import axios from "axios";

export const dataService: DataService = {
    loadItems: () => new Promise((resolve) => {
        axios
            .get("/EPiServer/extended-external-links/ExternalLinks/GetItems") //TODO: LINKS fix URL to the controller
            .then((result) => {
                resolve(result.data);
            })
            .catch(() => resolve([]));
    }),
    loadAggregatedItems: () =>
        new Promise((resolve) => {
            axios
                .get("/EPiServer/extended-external-links/ExternalLinks/GetAggregatedItems")
                .then((result) => {
                    resolve(result.data);
                })
                .catch(() => resolve([]));
        })
};

import { DataService } from "../definitions";
import axios from "axios";

export const dataService: DataService = {
    loadItems: () => new Promise((resolve) => {
        axios
            .get("/ExternalLinks/getItems")
            .then((result) => {
                resolve(result.data);
            })
            .catch(() => resolve([]));
    }),
    loadAggregatedItems: () =>
        new Promise((resolve) => {
            axios
                .get("/ExternalLinks/getAggregatedItems")
                .then((result) => {
                    resolve(result.data);
                })
                .catch(() => resolve([]));
        })
};

//TODO: LINKS Implement server method

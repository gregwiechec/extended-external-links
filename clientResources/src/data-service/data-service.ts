import { DataService } from "../definitions";
import axios from "axios";

export const dataService: DataService = {
    loadItems: () => new Promise((resolve) => {
        axios
            .get("GetItems")
            .then((result) => {
                resolve(result.data);
            })
            .catch(() => resolve([]));
    }),
    loadAggregatedItems: () =>
        new Promise((resolve) => {
            axios
                .get("GetAggregatedItems")
                .then((result) => {
                    resolve(result.data);
                })
                .catch(() => resolve([]));
        })
};

import { DataService } from "../definitions";

export const dataService: DataService = {
    loadItems: () => new Promise(resolve => resolve([])),
    loadAggregatedItems: () => new Promise(resolve => resolve([])),
    export: () => undefined
};

//TODO: LINKS Implement server method

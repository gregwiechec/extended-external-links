import React from "react";
import {act, renderHook} from "@testing-library/react-hooks";
import { useManageList } from "./use-manage-list";
import {DataService} from "../definitions";

jest.useFakeTimers();

const dataService: DataService = {
    loadItems: () => new Promise(resolve => {
        resolve([{
            contentLink: "1",
            externalLink: "https://www.google.com",
            publishDate: "",
            language: "en",
            contentName: "Start PAge"
        },{
            contentLink: "1",
            externalLink: "https://www.google.com",
            publishDate: "",
            language: "en",
            contentName: "Start PAge"
        }]);
    }),
    loadAggregatedItems: () => new Promise(resolve => {
        resolve([{
            externalLink: "https://www.google.com",
            count: 10,
            contents: []
        }]);
    })
};

describe("use-manage-list", () => {
    describe("when instantiating hook", () => {
        it("it should load the list", async () => {
            const { result, rerender } = renderHook(() => useManageList(dataService, false));
            rerender();
            jest.advanceTimersByTime(510);
            await act(async () => {
                result.current.onRefresh();
            })
            expect(result.current.showDetails).toBe(false);
            expect(result.current.filteredAggregatedItems.length).toBe(1);
        });
    });
});

import React from "react";
import { act, renderHook } from "@testing-library/react-hooks";
import { useManageList, UseManageListResult } from "./use-manage-list";
import { DataService } from "../definitions";
import { RenderResult } from "@testing-library/react-hooks/src/types/index";

jest.useFakeTimers();

const dataService: DataService = {
    loadItems: () =>
        new Promise((resolve) => {
            resolve([
                {
                    contentLink: "1",
                    externalLink: "https://www.google.com",
                    publishDate: "",
                    language: "en",
                    contentName: "Start PAge"
                },
                {
                    contentLink: "1",
                    externalLink: "https://www.microsoft.com",
                    publishDate: "",
                    language: "en",
                    contentName: "Start PAge"
                }
            ]);
        }),
    loadAggregatedItems: () =>
        new Promise((resolve) => {
            resolve([
                {
                    externalLink: "https://www.google.com",
                    count: 10,
                    contents: []
                }
            ]);
        })
};

describe("use-manage-list", () => {
    describe("when instantiating hook with details 'false'", () => {
        let result: RenderResult<UseManageListResult>

        beforeAll(async () => {
            result = renderHook(() => useManageList(dataService, false)).result;
            await act(async () => {
                result.current.onRefresh();
            });
        });
        it("should set showDetails to false", async () => {
            expect(result.current.showDetails).toBe(false);
        });
        it("should return filtered aggregated items", async () => {
            expect(result.current.filteredAggregatedItems.length).toBe(1);
        });
        it("should return filtered detailed items", async () => {
            expect(result.current.filteredDetailedItems.length).toBe(0);
        });
    });

    describe("when instantiating hook with details 'true'", () => {
        it("should load the list", async () => {
            const { result } = renderHook(() => useManageList(dataService, true));
            await act(async () => {
                result.current.onRefresh();
            });
            expect(result.current.showDetails).toBe(true);
            expect(result.current.filteredAggregatedItems.length).toBe(0);
            expect(result.current.filteredDetailedItems.length).toBe(2);
        });

        describe("and then apply text filter", () => {
            let result: RenderResult<UseManageListResult>

            beforeAll(async () => {
                result = renderHook(() => useManageList(dataService, true)).result;
                await act(async () => {
                    result.current.onRefresh();
                });
                await act(async () => {
                    result.current.onExternalUrlChanged("microsoft");
                });
            });

            it("should return one filtered detailed item", async () => {
                expect(result.current.filteredDetailedItems.length).toBe(1);
            });

            it("should not load filtered aggregated items", async () => {
                expect(result.current.filteredAggregatedItems.length).toBe(0);
            });
        });

        describe("and then change showDetails to false", () => {
            let result: RenderResult<UseManageListResult>

            beforeAll(async () => {
                result = renderHook(() => useManageList(dataService, true)).result;
                await act(async () => {
                    result.current.onRefresh();
                });
                await act(async () => {
                    result.current.setShowDetails(false);
                });
            });

            it("should load aggregated list", async () => {
                expect(result.current.filteredAggregatedItems.length).toBe(1);
            });

            it("should not change detailed list", async () => {
                expect(result.current.filteredDetailedItems.length).toBe(2);
            });
        });
    });
});

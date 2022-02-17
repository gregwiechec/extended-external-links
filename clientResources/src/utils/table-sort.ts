import { useState } from "react";

//TODO: LINKS allow to sort table

const useSortState = (items: any[]) => {
    const [currentOrder, setSortOrder] = useState("");
    const [currentSortedColumn, setCurrentSortedColumn] = useState("");
    const [tableData, setTableData] = useState(items || []);

    const sortData = (columnName: string) => {
        const sortToggleMap: any = {
            "asc": "desc",
            "desc": "asc"
        };
        let newOrder = "asc";
        if (currentSortedColumn === columnName) {
            newOrder = sortToggleMap[currentOrder];
        }
        setSortOrder(newOrder);
        setCurrentSortedColumn(columnName);

        const arrayCopy = tableData.slice();
        if (newOrder === "asc") {
            arrayCopy.sort((a, b) => (a[columnName] > b[columnName] ? 1 : -1));
        } else {
            arrayCopy.sort((b, a) => (a[columnName] > b[columnName] ? 1 : -1));
        }
        setTableData(arrayCopy);
    };

    return {
        getSortDetails: (columnName: string) => {
            return {
                canSort: true,
                handleSort: () => sortData(columnName),
                order: currentOrder
            };
        },
        updateData: (tableData: any[]) => {
            setTableData(tableData);
        },
        tableData: tableData
    };
};

export { useSortState };

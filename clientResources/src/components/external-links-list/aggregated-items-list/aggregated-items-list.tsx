import React, { useEffect } from "react";
import { AggregatedDataItem } from "../../../definitions";
import NoData from "../no-data/no-data";
import ActionLink from "../action-link/action-link";
import { useSortState } from "../../../utils/table-sort";

interface ItemsListProps {
    items: AggregatedDataItem[];
}

const AggregatedItemsList = ({ items }: ItemsListProps) => {
    const sortState = useSortState(items);

    useEffect(() => {
        sortState.updateData(items);
    }, [items]);

    if (items.length === 0) {
        return <NoData />;
    }

    return (
        <table className="external-links-table">
            <thead>
                <tr>
                    <th>Web address</th>
                    <th>Number of contents</th>
                </tr>
            </thead>
            <tbody>
                {sortState.tableData.map((x) => (
                    <tr key={x.externalLink}>
                        <td>
                            <ActionLink href={x.externalLink} newWindow>
                                {x.externalLink}
                            </ActionLink>
                        </td>
                        <td>{x.count}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default AggregatedItemsList;

import React, { useEffect, useState } from "react";
import { DataItem } from "../../definitions";
import { useSortState } from "../../table-sort";
import NoData from "../no-data/no-data";
import ActionLink from "../action-link/action-link";

interface ItemsListProps {
    items: DataItem[];
}

const DetailedItemsList = ({ items }: ItemsListProps) => {
    const sortState = useSortState(items);

    useEffect(() => {
        sortState.updateData(items);
    }, [items]);

    if (items.length === 0) {
        // @ts-ignore
        return <NoData />;
    }

    return (
        <table>
            <thead>
                <tr>
                    <th>
                        Web address
                    </th>
                    <th>
                        Content
                    </th>
                </tr>
            </thead>
            <tbody>
                {sortState.tableData.map((x, index) => (
                    <tr key={index}>
                        <td>
                            <ActionLink href={x.externalLink} newWindow>{x.externalLink}</ActionLink>
                        </td>
                        <td>
                            <ActionLink href={x.contentUrl} newWindow>{x.contentName}</ActionLink>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default DetailedItemsList;
//TODO: LINKS add resources

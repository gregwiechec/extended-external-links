import React, { useEffect, useState } from "react";
import { Table } from "optimizely-oui";
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
        <Table>
            <Table.THead>
                <Table.TR>
                    <Table.TH textAlign="left" sorting={sortState.getSortDetails("externalLink")}>
                        Web address
                    </Table.TH>
                    <Table.TH textAlign="left" sorting={sortState.getSortDetails("contentName")}>
                        Content
                    </Table.TH>
                </Table.TR>
            </Table.THead>
            <Table.TBody>
                {sortState.tableData.map((x, index) => (
                    <Table.TR key={index}>
                        <Table.TD>
                            <ActionLink href={x.externalLink} newWindow>{x.externalLink}</ActionLink>
                        </Table.TD>
                        <Table.TD width="20%">
                            <ActionLink href={x.contentUrl} newWindow>{x.contentName}</ActionLink>
                        </Table.TD>
                    </Table.TR>
                ))}
            </Table.TBody>
        </Table>
    );
};

export default DetailedItemsList;
//TODO: LINKS add resources

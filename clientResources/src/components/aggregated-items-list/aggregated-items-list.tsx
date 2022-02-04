import React, { useEffect } from "react";
import { Table } from "optimizely-oui";
import { AggregatedDataItem } from "../../definitions";
import { useSortState } from "../../table-sort";
import NoData from "../no-data/no-data";
import ActionLink from "../action-link/action-link";

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
        <Table>
            <Table.THead>
                <Table.TR>
                    <Table.TH textAlign="left" sorting={sortState.getSortDetails("externalLink")}>
                        Web address
                    </Table.TH>
                    <Table.TH textAlign="left" sorting={sortState.getSortDetails("count")}>
                        Number of linking content items
                    </Table.TH>
                </Table.TR>
            </Table.THead>
            <Table.TBody>
                {sortState.tableData.map((x) => (
                    <Table.TR key={x.externalLink}>
                        <Table.TD>
                            <ActionLink href={x.externalLink} newWindow>{x.externalLink}</ActionLink>
                        </Table.TD>
                        <Table.TD width="20%">{x.count}</Table.TD>
                    </Table.TR>
                ))}
            </Table.TBody>
        </Table>
    );
};

export default AggregatedItemsList;

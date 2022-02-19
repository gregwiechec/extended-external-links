import React, { useEffect } from "react";
import { AggregatedDataItem } from "../../../definitions";
import { NoData } from "../no-data/no-data";
import { ActionLink } from "../action-link/action-link";
import { useSortState } from "../../../hooks";
import { useResourcesContext } from "../../../resources-context";

interface ItemsListProps {
    items: AggregatedDataItem[];
}

const AggregatedItemsList = ({ items }: ItemsListProps) => {
    const sortState = useSortState<AggregatedDataItem>(items);
    const resources = useResourcesContext();

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
                    <th>{resources.common.host}</th>
                    <th>{resources.common.hits}</th>
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
//TODO: LINKS aggregated view allow to show details
//TODO: LINKS update all dependencies

import React, { useEffect } from "react";
import { DataItem } from "../../../definitions";
import { NoData } from "../no-data/no-data";
import { ActionLink } from "../action-link/action-link";
import { useSortState } from "../../../utils/table-sort";
import { useResourcesContext } from "../../../resources-context";

interface ItemsListProps {
    items: DataItem[];
    onContentClick: (item: DataItem) => void;
}

const DetailedItemsList = ({ items, onContentClick }: ItemsListProps) => {
    const sortState = useSortState(items);
    const resources = useResourcesContext();

    useEffect(() => {
        sortState.updateData(items);
    }, [items]);

    if (items.length === 0) {
        // @ts-ignore
        return <NoData />;
    }

    const onContentItemClicked = (e, item: DataItem) => {
        e.preventDefault();
        onContentClick(item);
    };

    return (
        <table className="external-links-table">
            <thead>
                <tr>
                    <th>{resources.details.link}</th>
                    <th>{resources.details.content}</th>
                </tr>
            </thead>
            <tbody>
                {sortState.tableData.map((x, index) => (
                    <tr key={index}>
                        <td>
                            <ActionLink href={x.externalLink} newWindow>
                                {x.externalLink}
                            </ActionLink>
                        </td>
                        <td>
                            <ActionLink href="#" onClick={(e) => onContentItemClicked(e, x)}>
                                {x.contentName}
                            </ActionLink>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default DetailedItemsList;
//TODO: LINKS for view it should show more columns like page created

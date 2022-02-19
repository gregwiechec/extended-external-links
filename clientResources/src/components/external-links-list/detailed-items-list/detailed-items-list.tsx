import React, { useEffect } from "react";
import classnames from "classnames";
import { DataItem } from "../../../definitions";
import { NoData } from "../no-data/no-data";
import { ActionLink } from "../action-link/action-link";
import { useSortState } from "../../../hooks";
import { useResourcesContext } from "../../../resources-context";

interface ItemsListProps {
    items: DataItem[];
    onContentClick: (item: DataItem) => void;
    showExtraColumns?: boolean;
}

export const DetailedItemsList = ({ items, onContentClick, showExtraColumns = false }: ItemsListProps) => {
    const sortState = useSortState<DataItem>(items);
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
        <table className={classnames("external-links-table", { "extra-columns": showExtraColumns })}>
            <thead>
                <tr>
                    <th>{resources.details.link}</th>
                    <th>{resources.details.content}</th>
                    {showExtraColumns && (
                        <>
                            <th>{resources.details.contentlanguage}</th>
                            <th>{resources.details.publishdate}</th>
                        </>
                    )}
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
                        {showExtraColumns && (
                            <>
                                <td>{x.language}</td>
                                <td>{x.publishDate}</td>
                            </>
                        )}
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

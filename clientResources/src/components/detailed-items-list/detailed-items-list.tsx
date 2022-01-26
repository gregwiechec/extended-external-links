import React from "react";
import { Button, EmptyDashboard, Link, Table } from "optimizely-oui";
import { DataItem } from "../../definitions";

interface ItemsListProps {
    items: DataItem[];
}

const DetailedItemsList = ({ items }: ItemsListProps) => {

    if (!items) {
        items = [];
    }

    if (items.length === 0) {
        // @ts-ignore
        return <EmptyDashboard
            headline="No data"
            description={<div>Looks like there are no external links on your site</div>}
        />;
    }

    return (
        <Table>
            <Table.THead>
                <Table.TR>
                    <Table.TH textAlign="left">
                        Web address
                    </Table.TH>
                    <Table.TH textAlign="left">
                        Content
                    </Table.TH>
                </Table.TR>
            </Table.THead>
            <Table.TBody>
                {items.map((x, index) => (<Table.TR key={index}>
                    <Table.TD>
                        <Link href={x.externalLink} newWindow style="default">{x.externalLink}</Link>
                    </Table.TD>
                    <Table.TD width="20%">
                        <Link href={x.contentUrl} newWindow style="default">{x.contentName}</Link>
                    </Table.TD>
                </Table.TR>))}
            </Table.TBody>
        </Table>
    );
};

export default DetailedItemsList;

import React from "react";
import { EmptyDashboard, Link, Table } from "optimizely-oui";
import { AggregatedDataItem } from "../../definitions";

interface ItemsListProps {
    items: AggregatedDataItem[];
}

const AggregatedItemsList = ({ items }: ItemsListProps) => {
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
                        Number of linking content items
                    </Table.TH>
                </Table.TR>
            </Table.THead>
            <Table.TBody>
                {items.map(x => (<Table.TR key={x.externalLink}>
                    <Table.TD>
                        <Link href={x.externalLink} newWindow style="default">{x.externalLink}</Link>
                    </Table.TD>
                    <Table.TD width="20%">
                        {x.count}
                    </Table.TD>
                </Table.TR>))}
            </Table.TBody>
        </Table>
    );
};

export default AggregatedItemsList;

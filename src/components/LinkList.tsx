import React from "react";
import Link, { LinkDatatype } from "./Link";

import { useQuery, gql } from "@apollo/client";

const FEED_QUERY = gql`
  query Query($take: Int, $orderBy: [LinkOrderByInput!]) {
    feed(take: $take, orderBy: $orderBy) {
      count
      links {
        id
        description
        url
      }
    }
  }
`;

const LinkList = () => {
  const { data } = useQuery(FEED_QUERY, {
    variables: {
      take: 10,
      orderBy: [
        {
          createdAt: "desc",
        },
      ],
    },
  });

  return (
    <div>
      {data && (
        <>
          {data.feed.links.map((link: LinkDatatype) => (
            <Link key={link.id} link={link} />
          ))}
        </>
      )}
    </div>
  );
};

export default LinkList;

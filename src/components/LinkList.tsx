import React from "react";
import Link, { LinkDatatype } from "./Link";

import { useQuery, gql } from "@apollo/client";

export const FEED_QUERY = gql`
  query Query($take: Int, $skip: Int, $orderBy: [LinkOrderByInput!]) {
    feed(take: $take, skip: $skip, orderBy: $orderBy) {
      links {
        id
        createdAt
        url
        description
        postedBy {
          id
          name
        }
        voters {
          id
          name
        }
      }
    }
  }
`;

const LinkList = () => {
  const { data } = useQuery(FEED_QUERY, {
    variables: {
      skip: 0,
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
          {data.feed.links.map((link: LinkDatatype, index: number) => (
            <Link key={link.id} link={link} index={index} />
          ))}
        </>
      )}
    </div>
  );
};

export default LinkList;

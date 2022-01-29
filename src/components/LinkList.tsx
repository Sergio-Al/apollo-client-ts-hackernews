import React from "react";
import Link, { LinkDatatype } from "./Link";

import { useQuery, gql } from "@apollo/client";

const FEED_QUERY = gql`
  query Feed {
    feed(take: 10) {
      links {
        id
        description
        url
      }
    }
  }
`;

const LinkList = () => {
  const { data } = useQuery(FEED_QUERY);

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

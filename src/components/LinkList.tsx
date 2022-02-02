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

export const NEW_LINKS_SUBSCRIPTION = gql`
  subscription Subscription {
    newLink {
      id
      url
      description
      createdAt
    }
  }
`;

export const NEW_VOTES_SUBSCRIPTION = gql`
  subscription NewVote {
    newVote {
      link {
        id
        description
        url
        createdAt
      }
      user {
        id
      }
    }
  }
`;

const LinkList = () => {
  const { data, loading, error, subscribeToMore } = useQuery(FEED_QUERY, {
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

  subscribeToMore({
    document: NEW_LINKS_SUBSCRIPTION,
    updateQuery: (prev, { subscriptionData }) => {
      if (!subscriptionData) return prev;
      const newLink = subscriptionData.data.newLink;
      const exists = prev.feed.links.find(
        ({ id }: { id: string }) => id === newLink.id
      );
      if (exists) return prev;

      return Object.assign({}, prev, {
        feed: {
          links: [newLink, ...prev.feed.links],
          count: prev.feed.links.length + 1,
          __typename: prev.feed.__typename,
        },
      });
    },
  });

  subscribeToMore({
    document: NEW_VOTES_SUBSCRIPTION,
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

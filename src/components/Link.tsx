import React from "react";
import { AUTH_TOKEN } from "./constants";
import { timeDifferenceForDate } from "../utils";
import { gql, useMutation } from "@apollo/client";

export type UserType = {
  id: string;
  name: string;
};

export type LinkDatatype = {
  id: string;
  description: string;
  url: string;
  createdAt: Date;
  postedBy: UserType;
  voters: Array<UserType>;
};

export type LinkType = {
  link: LinkDatatype;
};

export type LinkProps = {
  index: number;
  link: LinkDatatype;
};

const VOTE_MUTATION = gql`
  mutation Mutation($linkId: Int!) {
    vote(linkId: $linkId) {
      link {
        id
        voters {
          id
          name
        }
      }
      user {
        id
        name
      }
    }
  }
`;

const Link = ({ link, index }: LinkProps) => {
  const authToken = localStorage.getItem(AUTH_TOKEN);

  // For enable the manually cache update, more 'Info' below
  // const take = 10;
  // const skip = 0;
  // const orderBy = [{ createtAt: "desc" }];

  const [vote] = useMutation(VOTE_MUTATION, {
    variables: {
      linkId: link.id,
    },

    /* 
      Info: In this app the cache recognizes the upvote 
      and upated the UI correctly (automatic process), however if the upvote ui
      is not updating you can update manually uncommenting the
      update 'callback' function below
    */

    // update: (cache, { data: { vote } }) => {
    //   // @ts-ignore
    //   const { feed } = cache.readQuery({
    //     query: FEED_QUERY,
    //     variables: {
    //       skip: 0,
    //       take: 10,
    //       orderBy: [
    //         {
    //           createdAt: "desc",
    //         },
    //       ],
    //     },
    //   });

    //   // console.log("dataquery", vote);

    //   // @ts-ignore
    //   const updatedLinks = feed.links.map((feedLink) => {
    //     if (feedLink.id === link.id) {
    //       // console.log("your voters", feedLink.voters);
    //       // console.log("your vote", vote.user);
    //       return {
    //         ...feedLink,
    //         voters: [...feedLink.voters, vote.user],
    //       };
    //     }
    //     return feedLink;
    //   });

    //   cache.writeQuery({
    //     query: FEED_QUERY,
    //     data: {
    //       feed: {
    //         links: updatedLinks,
    //       },
    //     },
    //     variables: {
    //       take,
    //       skip,
    //       orderBy,
    //     },
    //   });
    // },
  });

  return (
    <div className="flex mt2 items-start">
      <div className="flex items-center">
        <span className="gray">{index + 1}</span>
        {authToken && (
          <div
            className="ml1 gray f11"
            style={{ cursor: "pointer" }}
            onClick={() => {
              vote();
            }}
          >
            ▲
          </div>
        )}
      </div>
      <div className="ml1">
        <div>
          {link.description} ({link.url})
        </div>

        {authToken && (
          <div className="f6 lh-copy gray">
            {link.voters.length} votes | by{" "}
            {link.postedBy ? link.postedBy.name : "Unknown"}{" "}
            {timeDifferenceForDate(link.createdAt)}
          </div>
        )}
      </div>
    </div>
  );
};

export default Link;

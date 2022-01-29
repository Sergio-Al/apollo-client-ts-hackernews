import React from "react";


export type LinkDatatype = {
  id: string;
  description: string;
  url: string;
};

export type LinkType = {
  link: LinkDatatype;
};

const Link = ({ link }: LinkType) => {
  return (
    <div>
      <div>
        {link.description} ({link.url})
      </div>
    </div>
  );
};

export default Link;

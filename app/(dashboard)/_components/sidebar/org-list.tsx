"use client";

import { useOrganizationList } from "@clerk/nextjs";
import OrgListItem from "./org-list-item";

function OrgList() {
  const { userMemberships } = useOrganizationList({
    userMemberships: {
      infinite: true,
    },
  });

  if (!userMemberships.data?.length) {
    return null;
  }

  return (
    <div>
      <ul className="space-y-4">
        {userMemberships.data.map(
          ({ organization: { id, name, imageUrl } }) => (
            <OrgListItem key={id} id={id} name={name} imageUrl={imageUrl} />
          )
        )}
      </ul>
    </div>
  );
}

export default OrgList;

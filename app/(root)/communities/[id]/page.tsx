import UserCard from "@/components/cards/UserCard";
import ProfileHeader from "@/components/shared/ProfileHeader";

import { communityTabs } from "@/constants";
import { fetchCommunityDetails } from "@/lib/actions/community.actions";
import { currentUser } from "@clerk/nextjs";
import { TabsTrigger } from "@radix-ui/react-tabs";
import Image from "next/image";
import React, { FC } from "react";
import Content from "./content";

const Page: FC<{ params: { id: string } }> = async ({ params }) => {
  const user = await currentUser();
  if (!user) return null;

  const communityDetails = await fetchCommunityDetails(params.id);

  return (
    <section>
      <ProfileHeader
        accountId={communityDetails.createdBy.id}
        authUserId={user.id}
        name={communityDetails.name}
        username={communityDetails.username}
        imgUrl={communityDetails.image}
        bio={communityDetails.bio}
        type="Community"
      />

      <div className="mt-9">
        <Content communityDetails={communityDetails} user={user} />
      </div>
    </section>
  );
};

export default Page;

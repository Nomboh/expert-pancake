import { observer } from "mobx-react-lite";
import React from "react";
import { Tab } from "semantic-ui-react";
import { Profile } from "../../../app/models/profile";
import { useStore } from "../../../app/store/store";
import ProfileAbout from "./ProfileAbout";
import Profilefollowing from "./Profilefollowing";
import ProfilePhotos from "./ProfilePhotos";

type Props = {
  profile: Profile;
};

function ProfileContent({ profile }: Props) {
  const { profileStore } = useStore();
  const panes = [
    { menuItem: "About", render: () => <ProfileAbout /> },
    { menuItem: "Photos", render: () => <ProfilePhotos profile={profile} /> },
    { menuItem: "Events", render: () => <Tab.Pane>Events Content</Tab.Pane> },
    {
      menuItem: "Followers",
      render: () => <Profilefollowing />,
    },
    {
      menuItem: "Followings",
      render: () => <Profilefollowing />,
    },
  ];
  return (
    <Tab
      menu={{ fluid: true, vertical: true }}
      menuPosition="right"
      panes={panes}
      onTabChange={(e, data) => profileStore.setActiveTab(data.activeIndex)}
    />
  );
}

export default observer(ProfileContent);

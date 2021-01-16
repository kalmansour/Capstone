//Libraries
import React from "react";
import { observer } from "mobx-react";
import { Left, Right, Spinner, Item } from "native-base";

//Components
import MySchedule from "./MySchedule";

//Buttons
import EditProfileButton from "./buttons/EditProfileButton";
import SignoutButton from "./buttons/SignoutButton";

//Stores
import authStore from "../stores/authStore";
import profileStore from "../stores/profileStore";
import eventStore from "../stores/eventStore";

//Styles
import {
  ProfileWrapper,
  ProfileImage,
  ProfileUsernameStyled,
  ProfileBio,
  NumberOfFriendsStyled,
} from "../styles";

const Profile = ({ navigation }) => {
  if (!authStore.user) return <Spinner />;

  const myProfile = profileStore.getProfileById(authStore.user.id);

  if (profileStore.loading) return <Spinner />;

  //Show Signed in user events --> My Schedule
  const profileEvents = eventStore.events.filter(
    (event) => event.userId === authStore.user.id
  );

  // const sideBar = true;

  return (
    <>
      <ProfileWrapper style={{ marginBottom: 20 }}>
        <Item>
          <Left>
            <EditProfileButton oldProfile={myProfile} />
          </Left>
          <Right>
            <SignoutButton navigation={navigation} />
          </Right>
        </Item>
        <ProfileImage source={{ uri: authStore.user.image }} />
        <ProfileUsernameStyled>
          @{authStore.user.username}
        </ProfileUsernameStyled>
        <ProfileBio>{authStore.user.bio}</ProfileBio>
        <NumberOfFriendsStyled># Friends</NumberOfFriendsStyled>
      </ProfileWrapper>
      <MySchedule
        navigation={navigation}
        exploreEvents={profileEvents}
        // sideBar={sideBar}
      />
    </>
  );
};

export default observer(Profile);

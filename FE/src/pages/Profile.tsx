import { useState } from "react";
import ProfileLayout from "../layouts/ProfileLayout";
import ProfileSideMenu from "../components/profile/ProfileSideMenu";
import { ProfileUpdate } from "../components/profile/ProfileUpdate";
import { ProfileHeaderBtn } from "../components/profile/ProfileHeaderBtn";
import { ProfileRecentlyData } from "../components/profile/ProfileRecentlyData";
import { ProfileData } from "../components/profile/ProfileData";
import ProfileDelUser from "./../components/profile/ProfileDelUser";
import { useEffect } from "react";
import ProfileBasic from "../components/profile/ProfileBasic";
import { PROFILE_MAP } from "../constants/profile/ProfileMap";
import { useFetchAccessToken } from "../hooks/useFetchAccessToken";
import { useUsersApiCall } from "../api/axios/useUsersApiCall";
interface MyInfo {
  email: string;
  nickname: string;
}

const Profile = () => {
  const { getMyInfo } = useUsersApiCall();
  useFetchAccessToken();

  const [viewMain, setViewMain] = useState(0);
  const [myInfo, setMyInfo] = useState<MyInfo>({
    email: "",
    nickname: "",
  });

  useEffect(() => {
    (async () => {
      const myInfo = await getMyInfo();
      setMyInfo(myInfo);
    })();
  }, []);

  const onSetViewMain = (index: number) => {
    setViewMain((prevViewMain) => {
      if (prevViewMain === index) {
        return 0;
      } else {
        return index;
      }
    });
  };
  return (
    <ProfileLayout>
      <div className="flex flex-col w-full h-full">
        <div className="flex justify-end 3xl:mt-[40px] mt-[32px] 3xl:mb-[20px] mb-[16px] 3xl:mr-[60px] mr-[48px]">
          <ProfileHeaderBtn text="옷장" loc="shop" />
          <ProfileHeaderBtn text="로비 화면" loc="lobby" />
          <ProfileHeaderBtn text="홈 화면" loc="" />
        </div>
        <div className="relative flex items-center 3xl:ml-[120px] ml-[96px] h-[560px] 3xl:mt-20">
          <ProfileSideMenu viewMain={viewMain} onSetViewMain={onSetViewMain} />
          {viewMain !== PROFILE_MAP.NONE && (
            <div className="3xl:min-w-[1140px] min-w-[912px] 3xl:h-[700px] h-[560px] 3xl:mx-[140px] mx-[112px] border-solid border-white 3xl:border-[20px] border-[15px] 3xl:text-[56px] text-[44.8px] font-bold bg-black overflow-scroll">
              {viewMain == PROFILE_MAP.PROFILE_BASIC && (
                <ProfileBasic email={myInfo.email} nickname={myInfo.nickname} onSetViewMain={onSetViewMain} />
              )}
              {viewMain === PROFILE_MAP.PROFILE_UPDATE && <ProfileUpdate onSetViewMain={onSetViewMain} />}
              {viewMain === PROFILE_MAP.PROFILE_RECENTLY_DATA && <ProfileRecentlyData />}
              {viewMain === PROFILE_MAP.PROFILE_DATA && <ProfileData />}
              {viewMain === PROFILE_MAP.PROFILE_DEL_USER && <ProfileDelUser onSetViewMain={onSetViewMain} />}
            </div>
          )}
        </div>
      </div>
    </ProfileLayout>
  );
};

export default Profile;

import { useEffect } from "react";
import { toast } from "react-toastify";

export const usePreventGoBackShop = () => {
  useEffect(() => {
    const preventGoBack = () => {
      history.pushState(null, "", location.href);
      toast.warn("오른쪽 상단의 뒤로가기 버튼을 클릭하여야 선택한 아이템이 정상적으로 착용됩니다.");
    };

    history.pushState(null, "", location.href);
    window.addEventListener("popstate", preventGoBack);

    return () => {
      window.removeEventListener("popstate", preventGoBack);
    };
  }, []);
};

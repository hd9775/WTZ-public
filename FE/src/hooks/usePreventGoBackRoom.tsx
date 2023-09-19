import { useEffect } from "react";
import { toast } from "react-toastify";

export const usePreventGoBackRoom = () => {
  useEffect(() => {
    const preventGoBack = () => {
      history.pushState(null, "", location.href);
      toast.warn("오른쪽 상단의 EXIT 버튼을 클릭하여야 정상적으로 방에서 나갈 수 있습니다.");
    };

    history.pushState(null, "", location.href);
    window.addEventListener("popstate", preventGoBack);

    return () => {
      window.removeEventListener("popstate", preventGoBack);
    };
  }, []);
};

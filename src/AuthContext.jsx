import axios from "axios";
import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userToken, setUserToken] = useState(null);
  const [bookmarks, SetBookmarks] = useState({});
  const [bookmarksToggle, SetBookmarksToggle] = useState(false);
  const [restaurantModalOpen, setRestaurantModalOpen] = useState();
  const [dietToggle, setDietToggle] = useState({
    Vegan: false,
    Halal: false,
    "Gluten-Free": false,
    "Lacto-Free": false,
  });

  useEffect(() => {
    console.log(dietToggle);
  }, [dietToggle]);

  const URL = "http://pureplate.site:443";
  useEffect(() => {
    const storedUser = sessionStorage.getItem("user");
    const storedToken = sessionStorage.getItem("token");
    const storedBookmarks = JSON.parse(sessionStorage.getItem("bookmarks"));

    if (storedUser && storedToken && storedBookmarks) {
      setUser(storedUser);
      setIsLoggedIn(true);
      setUserToken(storedToken);
      SetBookmarks(storedBookmarks);
    }
  }, []);

  // Login
  const login = async (username, password) => {
    try {
      const response = await axios.post(`${URL}/api/account/login/`, {
        username,
        password,
      });
      setUser(response.data.nickname);
      setIsLoggedIn(true);
      setUserToken(response.data.token);
      sessionStorage.setItem("user", response.data.nickname);
      sessionStorage.setItem("token", response.data.token);
      alert("logged in!");

      await bookmarkGet(response.data.token);
    } catch (error) {
      if (error.response) {
        console.error("로그인 실패:", error.response.data);
      } else {
        console.error("요청 처리 중 문제가 발생했습니다.", error.message);
      }
      setIsLoggedIn(false);
    }
  };

  const logout = () => {
    setUser(null);
    setIsLoggedIn(false);
    setUserToken(null);
    SetBookmarks([]);
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("bookmarks");
    SetBookmarksToggle(false);
  };

  const bookmarkGet = async (token) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
    };
    try {
      const response = await axios.get(`${URL}/api/favorite/user`, config);
      // 받아온 배열을 객체로 변환
      const bookmarksObj = response.data.favorites.reduce((acc, cur) => {
        acc[cur.restaurant_id] = cur.restaurant_name;
        return acc;
      }, {});
      // 상태 업데이트
      SetBookmarks(bookmarksObj);
      sessionStorage.setItem("bookmarks", JSON.stringify(bookmarksObj));
    } catch (error) {
      if (error.response) {
        // 서버가 응답을 반환했으나 상태 코드가 2xx 범위를 벗어났을 때
        console.error(
          "서버 응답 오류:",
          error.response.status,
          error.response.data
        );
      } else if (error.request) {
        // 요청이 만들어졌으나 응답을 받지 못했을 때
        console.error(
          "서버로부터 응답이 없습니다. 네트워크 문제일 수 있습니다.",
          error.request
        );
      } else {
        // 요청 설정 중에 오류가 발생했을 때
        console.error("요청 설정 중 오류가 발생했습니다:", error.message);
      }
    }
  }; //

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        user,
        setUser,
        login,
        logout,
        userToken,
        setUserToken,
        bookmarks,
        bookmarkGet,
        bookmarksToggle,
        SetBookmarksToggle,
        setRestaurantModalOpen,
        restaurantModalOpen,
        URL,
        dietToggle,
        setDietToggle,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;

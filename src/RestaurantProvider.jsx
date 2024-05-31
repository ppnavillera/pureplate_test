import { createContext } from "react";

const RestaurantContext = createContext();

export function useRestaurant() {
  return useContext(RestaurantContext);
}

function RestaurantProvider({ children }) {
  const [RestInfo, SetRestInfo] = useState({
    id: "",
    name: "",
    rating: "",
    reviewcount: "",
    address: "",
    phone: "",
    photo: "",
  });

  const fetchRestaurant = async (restId) => {
    try {
      const response = await axios.get(`${URL}/api/restaurant/list`);
      response.data.data.forEach((element) => {
        if (element.Id == restId) {
          SetRestInfo((prevState) => ({
            ...prevState,
            id: element.Id,
            name: element.Name,
            rating: parseFloat(element.Rating).toFixed(1),
            reviewcount: element.ReviewCount,
            address: element.Address,
            phone: element.Phone,
            photo: element.Photo,
          }));
        }
      });
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
  };
}

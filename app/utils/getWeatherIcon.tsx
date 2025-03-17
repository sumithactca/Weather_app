// utils/getWeatherIcon.tsx
import { 
    WiDaySunny, 
    WiNightClear, 
    WiDayCloudy, 
    WiNightAltCloudy, 
    WiCloudy, 
    WiRain, 
    WiThunderstorm, 
    WiSnow, 
    WiFog 
  } from "react-icons/wi";
  
  export const getWeatherIcon = (iconCode: string) => {
    switch (iconCode) {
      case "01d":
        return <WiDaySunny size={100} />;
      case "01n":
        return <WiNightClear size={100} />;
      case "02d":
        return <WiDayCloudy size={100} />;
      case "02n":
        return <WiNightAltCloudy size={100} />;
      case "03d":
      case "03n":
        return <WiCloudy size={100} />;
      case "04d":
      case "04n":
        return <WiCloudy size={100} />;
      case "09d":
      case "09n":
        return <WiRain size={100} />;
      case "10d":
      case "10n":
        return <WiRain size={100} />;
      case "11d":
      case "11n":
        return <WiThunderstorm size={100} />;
      case "13d":
      case "13n":
        return <WiSnow size={100} />;
      case "50d":
      case "50n":
        return <WiFog size={100} />;
      default:
        return <WiDaySunny size={100} />;
    }
  };
  
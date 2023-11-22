import Home from "./components/Home.jsx";
import WeatherForecast from "./components/WeatherForecast.jsx";

const AppRoutes = [
    {
        index: true,
        element: <Home />
    },
    {
        path: '/weather-forecast',
        element: <WeatherForecast />
    }
];

export default AppRoutes;
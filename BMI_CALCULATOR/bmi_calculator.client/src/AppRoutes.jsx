import TDEECalculator from "./components/TDEECalculator";
import WeatherForecast from "./components/WeatherForecast";
const AppRoutes = [
    {
        index: true,
        element: <TDEECalculator />
    },
    {
        path: '/weather-forecast',
        element: <WeatherForecast />
    }
        
];


export default AppRoutes;
import TDEECalculator from "./components/TDEECalculator";
import WeatherForecast from "./components/WeatherForecast";
import TDEEResult from './components/TDEEResult';

const AppRoutes = [
    {
        index: true,
        element: <TDEECalculator />
    },
    {
        path: '/weather-forecast',
        element: <WeatherForecast />
    },
    {
        path: '/api/TDEE/calculateTDEE',
        element: <TDEEResult />
    },
];

export default AppRoutes;
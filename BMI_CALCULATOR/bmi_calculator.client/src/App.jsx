
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AppRoutes from './AppRoutes';
import { Layout } from './components/Layout';

function App() {
    return (
        <BrowserRouter>
            <Layout>
                <Routes>
                    {AppRoutes.map((route, index) => {
                        const { element, ...rest } = route;
                        return <Route key={index} {...rest} element={element} />;
                    })}
                </Routes>
            </Layout>
        </BrowserRouter>
    );
}

export default App;
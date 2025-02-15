import { useRoutes } from 'react-router-dom';
import MainRoutes from './MainRoutes';

const Routes = () => {
    return useRoutes([MainRoutes])
}

export default Routes;
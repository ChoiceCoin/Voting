import { useRoutes } from 'react-router-dom';
import MainRoutes from './MainRoutes';
import DashboardRoute from './DashboardRoute';
import { useAccountContext } from '../../context/account';

const Routes = () => {
    const { selectedAccount } = useAccountContext();
    return useRoutes([MainRoutes, DashboardRoute(selectedAccount)])
}

export default Routes;
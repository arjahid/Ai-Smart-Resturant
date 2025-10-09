import useRole from "../../Hooks/useRole";
import AdminDashboard from "./AdminDashboard";
import ChefDashboard from "./ChefDashboard";
import UserDashboard from "./UserDashboard";


const Dashboard = () => {
	const {role,loading}=useRole();
	if(loading){
		return <div>Loading...</div>
	}
	if(role ==='admin') return <AdminDashboard></AdminDashboard>
	if(role ==='chef') return <ChefDashboard></ChefDashboard>
	if(role ==='customer') return <UserDashboard></UserDashboard>
	return (
		<div>
			<h1>Dashboard</h1>
		</div>
	);
};

export default Dashboard;
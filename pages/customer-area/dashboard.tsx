import withAuth from "../../src/hoc/with-auth";

const Dashboard = () => (
  <div>
    <h1>This is the dashboard</h1>
  </div>
);

export default withAuth(Dashboard);

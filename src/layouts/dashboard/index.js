// @mui material components
import Grid from "@mui/material/Grid";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import ReportsBarChart from "examples/Charts/BarCharts/ReportsBarChart";
import ReportsLineChart from "examples/Charts/LineCharts/ReportsLineChart";
import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";

// Data
import reportsBarChartData from "layouts/dashboard/data/reportsBarChartData";
import reportsLineChartData from "layouts/dashboard/data/reportsLineChartData";

// Dashboard components
import Projects from "layouts/dashboard/components/Projects";
import OrdersOverview from "layouts/dashboard/components/OrdersOverview";
import { useGetRequest } from "utils/axiosHooks";
import { USERS_ENDPOINT, PLANS_REQUEST_ENDPOINT } from "utils/axios.apis";
import { useEffect, useState } from "react";
import dayjs from "dayjs";

function Dashboard() {
  // const { sales, tasks } = reportsLineChartData;
  const {
    data,
    loading: userLoading,
    error: userError,
  } = useGetRequest(USERS_ENDPOINT.GET_ALL.URL);
  const { data: planReq, loading: planReqLoading } = useGetRequest(
    PLANS_REQUEST_ENDPOINT.GET_ALL.URL
  );
  const [todayUsers, setTodayUsers] = useState(0);
  const [totalListingTime, setTotalListingTime] = useState(0);
  const [prevMonthUsersPer, setPrevMonthUsersPer] = useState("0%");
  const [totalUsers, setTotalUser] = useState(0);
  const [totalReqThisWeek, setTotalReqThisWeek] = useState(0);
  const [totalReqLastWeek, setTotalLastWeek] = useState(0);

  useEffect(() => {
    if (!userLoading && Array(data).length && !userError) {
      const prevMonth = [];
      const thisMonth = [];
      let totalListingTime = 0;
      data?.forEach((user) => {
        totalListingTime += user.totalListenTime;
        if (dayjs(user.createdAt).isSame(dayjs(), "month")) thisMonth.push(user);
        if (dayjs(user.createdAt).isSame(dayjs().subtract(1, "month"), "month"))
          prevMonth.push(user);
      });
      setTotalListingTime(`${(totalListingTime / 3600).toFixed(2)} hrs`);
      setTodayUsers(thisMonth.length);
      setTotalUser(data.length);
      console.log(thisMonth.length, prevMonth.length);
      const growthRate = ((thisMonth.length - prevMonth.length) / prevMonth.length) * 100;
      setPrevMonthUsersPer(`${growthRate == Infinity ? 0 : growthRate.toFixed(2)}%`);
    }
    console.log("userError", userError);
  }, [userLoading, data]);

  useEffect(() => {
    if (!planReqLoading && Array(planReq).length) {
      const thisWeekReq = [];
      const lastWeekReq = [];
      planReq?.forEach((plan) => {
        if (dayjs(plan.createdAt).isSame(dayjs(), "week")) thisWeekReq.push(plan);
        if (dayjs(plan.createdAt).isSame(dayjs().subtract(1, "week"), "week"))
          lastWeekReq.push(plan);
      });
      const growthRate = ((thisWeekReq.length - lastWeekReq.length) / lastWeekReq.length) * 100;
      setTotalReqThisWeek(thisWeekReq.length);
      setTotalLastWeek(`${growthRate == Infinity ? 0 : growthRate.toFixed(2)}%`);
    }
  }, [planReqLoading, planReq]);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="dark"
                icon="weekend"
                title="Plan Requests"
                count={totalReqThisWeek}
                percentage={{
                  color: parseInt(totalReqLastWeek) >= 0 ? "success" : "error",
                  amount: totalReqLastWeek,
                  label: "than lask week",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                icon="leaderboard"
                title="This Months's Users"
                count={todayUsers}
                percentage={{
                  color: parseInt(prevMonthUsersPer) >= 0 ? "success" : "error",
                  amount: prevMonthUsersPer,
                  label: "than last month",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="success"
                icon="store"
                title="Total Listing Time"
                count={totalListingTime}
                percentage={{
                  color: "success",
                  // amount: "total listing time of users in hours",
                  label: "Total listing time of users in hours",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="primary"
                icon="person_add"
                title="Total Users"
                count={totalUsers}
                percentage={{
                  color: "success",
                  amount: "",
                  label: "Just updated",
                }}
              />
            </MDBox>
          </Grid>
        </Grid>
        {/* <MDBox mt={4.5}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <ReportsBarChart
                  color="info"
                  title="website views"
                  description="Last Campaign Performance"
                  date="campaign sent 2 days ago"
                  chart={reportsBarChartData}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <ReportsLineChart
                  color="success"
                  title="daily sales"
                  description={
                    <>
                      (<strong>+15%</strong>) increase in today sales.
                    </>
                  }
                  date="updated 4 min ago"
                  chart={sales}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <ReportsLineChart
                  color="dark"
                  title="completed tasks"
                  description="Last Campaign Performance"
                  date="just updated"
                  chart={tasks}
                />
              </MDBox>
            </Grid>
          </Grid>
        </MDBox> */}
        <MDBox>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={8}>
              <Projects />
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <OrdersOverview />
            </Grid>
          </Grid>
        </MDBox>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Dashboard;

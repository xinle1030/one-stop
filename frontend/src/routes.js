/*!

=========================================================
* Black Dashboard React v1.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/black-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/black-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import Playground from "views/Playground";
import Dashboard from "views/Dashboard";
import CompanyProfile from "views/CompanyProfile";
import CompanyData from "views/CompanyData";


var routes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "tim-icons icon-notes",
    component: Dashboard,
    layout: "/admin",
  },
  {
    path: "/company-data",
    name: "Company Data",
    icon: "tim-icons icon-laptop",
    component: CompanyData,
    layout: "/admin",
  },
  {
    path: "/playground",
    name: "Playground",
    icon: "tim-icons icon-cloud-upload-94",
    component: Playground,
    layout: "/admin",
  },
];
export default routes;

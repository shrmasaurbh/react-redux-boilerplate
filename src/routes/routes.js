import React from "react";
import { Route, Switch } from "react-router-dom";
import { PrivateRoute } from "./PrivateRoute";

import Login from "../pages/login";
// import Dashboard from "../components/Dashboard";
// import Client from "../components/Client";
// import CreateClient from "../components/Client/Form/CreateClient";
// import UpdateClient from "../components/Client/Form/UpdateClient";
import NotFoundComponent from "../static/404";
// import Caregiver from "../components/Caregiver";
// import CaregiverForm from "../components/Caregiver/CaregiverForm";
// import Caremanager from "../components/Caremanager";
// import CaremanagerForm from "../components/Caremanager/Form/CareManagerForm";
// import PhysicalTherapist from "../components/PhysicalTherapist";
// import PhysicalTherapistForm from "../components/PhysicalTherapist/PhysicalTherapistForm";
// import Nurse from "../components/Nurse";
// import NurseAppointment from "../components/Nurse/NurseAppointment";
// import NurseForm from "../components/Nurse/NurseForm";
// import PhysicalTherapistAppointment from "../components/PhysicalTherapist/PhysicalTherapistAppointment";

export const Routes = () => {
  return (
    <Switch>
      <Route exact path="/" component={Login} />
      <Route exact path="/login" component={Login} />
      <Route path="*" component={NotFoundComponent} />
    </Switch>
  );
};

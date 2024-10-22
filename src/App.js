import React from "react";
import  ReactDOM from "react-dom/client";
import Navbar from "./Navbar";
import { AllAgents } from "./AllAgents";
import Body from "./Body/Body";

import { createBrowserRouter,RouterProvider,Outlet } from "react-router-dom";
import { AgentDetail } from "./AgentDetail";
import CreateAgentForm from "./Components/NewAgentForm/Agentform";
import { Login } from "./User/Login/login";
import { Signup } from "./User/UserSignUp/signup";

const Applayout=()=>{
    return (
       <>
       <Navbar/>
       <Outlet/>
       </>
    );
}

const appRouter=createBrowserRouter([

    {
        path:"/",
        element:<Applayout/>,
        children:[
             {
                path:"/",
                element:<Body/>
                
             },
             {
                path:"/agent/:id",
                element:<AgentDetail/>
             },
             {
                path:"/agentform",
                element:<CreateAgentForm/>
             },
             {
               path:"/allagent",
               element:<AllAgents/>
             },
             {
               path:'/login',
               element:<Login/>
             },{
               path:'/signup',
               element:<Signup/>
             }
            

             
        ]
    }

     




]);
const root=ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={appRouter}/>)
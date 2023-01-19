import { Outlet } from "react-router-dom";

function MainLayoutComponent() {
    return (
      <div className="main_block">
        <div className="header"></div>
            <Outlet />
        <div className="footer"></div>
      </div> 
    );
  }
  
  export default MainLayoutComponent;
  
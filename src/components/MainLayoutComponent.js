import { Outlet } from "react-router-dom";

function MainLayoutComponent() {
    return (
      <div className="main_block">
        <div class="header"></div>
        <Outlet />
        <div class="footer"></div>
      </div> 
    );
  }
  
  export default MainLayoutComponent;
  
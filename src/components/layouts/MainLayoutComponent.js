import { Outlet } from "react-router-dom";
import HeaderBlockComponent from "../blocks/HeaderBlockComponent";
import FooterBlockComponent from "../blocks/FooterBlockComponent";

function MainLayoutComponent() {
    return (
      <div className="main_block">
        <HeaderBlockComponent showLogOut />
        <Outlet />
        <FooterBlockComponent />
      </div> 
    );
  }
  
  export default MainLayoutComponent;
  
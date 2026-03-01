import { Link } from "react-router";
import { SidebarComponent } from "@syncfusion/ej2-react-navigations";
import { NavItems } from "~/components";
import { useRef } from "react";
import { logoSVG, menuSVG } from "~/assets";

export const MobileSidebar = () => {
  const sidebar = useRef<SidebarComponent>(null);

  const toggleSidebar = () => {
    if (!sidebar.current) return;
    sidebar.current.toggle();
  };

  return (
    <div className="mobile-sidebar wrapper">
      <header>
        <Link to="/">
          <img src={logoSVG} alt="Logo" className="size-7.5" />

          <h1>Tourvisto</h1>
        </Link>

        <button onClick={toggleSidebar}>
          <img src={menuSVG} alt="menu" className="size-7" />
        </button>
      </header>

      <SidebarComponent
        width={270}
        ref={sidebar}
        created={() => {
          if (!sidebar.current) return;
          sidebar.current.hide();
        }}
        closeOnDocumentClick={true}
        showBackdrop={true}
        type="Over"
      >
        <NavItems handleClick={toggleSidebar} />
      </SidebarComponent>
    </div>
  );
};

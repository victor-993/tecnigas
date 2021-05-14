import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  SidebarHeader,
  ProSidebar,
  Menu,
  MenuItem,
  SubMenu,
  SidebarContent,
  SidebarFooter,
} from "react-pro-sidebar";
import "react-pro-sidebar/dist/css/styles.css";
import {
  FcStatistics,
  FcCalendar,
  FcFeedback,
  FcPortraitMode,
  FcShop,
  FcFilingCabinet,
  FcAlarmClock,
  FcEngineering,
} from "react-icons/fc";
import { RiMapPinUserFill } from "react-icons/ri";

import "./Nav.scss";
import Logo from "./log_tecnigas_40x40.ico";
import Clock from "../Clock/Clock";

const Img = () => {
  return <img src={Logo} />;
};

const inicial = {
  ventas: null,
  perfil: null,
  inv: null,
  compra: null,
  agenda: null,
  dev: null,
  client: null,
  prov: null,
  info: null,
};

const Nav = ({ tipo }) => {
  let menu = null;
  const [collap, setCollap] = useState(false);
  const [active, setActive] = useState({
    ventas: tipo === "vent" ? <RiMapPinUserFill /> : null,
    perfil: tipo === "perf" ? <RiMapPinUserFill /> : null,
    inv: tipo === "inv" ? <RiMapPinUserFill /> : null,
    compra: tipo === "compra" ? <RiMapPinUserFill /> : null,
    agenda: tipo === "agen" ? <RiMapPinUserFill /> : null,
    dev: tipo === "dev" ? <RiMapPinUserFill /> : null,
    client: tipo === "cli" ? <RiMapPinUserFill /> : null,
    prov: tipo === "prov" ? <RiMapPinUserFill /> : null,
    info: tipo === "info" ? <RiMapPinUserFill /> : null,
  });

  useEffect(() => {
    menu = document.getElementById("menu");
  }, []);

  return (
    <>
      <ProSidebar id="menu" collapsed={collap} className="nav-bar">
        <SidebarHeader>
          <Menu
            onClick={() => {
              setCollap(!collap);
              document.getElementById("menu").collapsed = { collap };
            }}
          >
            <MenuItem icon={<Img />}>
              <div className="menu-tittle">
                <h2>TecniGas</h2>
              </div>
            </MenuItem>
          </Menu>
        </SidebarHeader>

        <SidebarContent>
          <Menu iconShape="circle">
            <MenuItem
              suffix={active.ventas}
              onClick={() => {
                setActive({ ...inicial, ventas: <RiMapPinUserFill /> });
              }}
              icon={<FcShop className="menu-icons" />}
            >
              Ventas
              <Link to="/ventas" />
            </MenuItem>
            <MenuItem
              onClick={() => {
                setActive({ ...inicial, perfil: <RiMapPinUserFill /> });
              }}
              suffix={active.perfil}
              icon={<FcPortraitMode className="menu-icons" />}
            >
              Perfil <Link to="/perfil" />
            </MenuItem>
            <SubMenu
              title="Inventario"
              icon={<FcFilingCabinet className="menu-icons" />}
            >
              <MenuItem
                onClick={() => {
                  setActive({ ...inicial, inv: <RiMapPinUserFill /> });
                }}
                suffix={active.inv}
              >
                Listado de Prod <Link to="/inventario" />
              </MenuItem>
              <MenuItem
                onClick={() => {
                  setActive({ ...inicial, compra: <RiMapPinUserFill /> });
                }}
                suffix={active.compra}
              >
                Compra de Prod <Link to="/compra" />
              </MenuItem>
            </SubMenu>
            <MenuItem
              onClick={() => {
                setActive({ ...inicial, agenda: <RiMapPinUserFill /> });
              }}
              suffix={active.agenda}
              icon={<FcCalendar className="menu-icons" />}
            >
              Agenda <Link to="/" />
            </MenuItem>
            <MenuItem
              onClick={() => {
                setActive({ ...inicial, dev: <RiMapPinUserFill /> });
              }}
              suffix={active.dev}
              icon={<FcFeedback className="menu-icons" />}
            >
              Devoluciones <Link to="/" />
            </MenuItem>
            <SubMenu
              title="Gestion"
              icon={<FcEngineering className="menu-icons" />}
            >
              <MenuItem
                onClick={() => {
                  setActive({ ...inicial, client: <RiMapPinUserFill /> });
                }}
                suffix={active.client}
              >
                Clientes <Link to="/clientes" />
              </MenuItem>
              <MenuItem
                onClick={() => {
                  setActive({ ...inicial, prov: <RiMapPinUserFill /> });
                }}
                suffix={active.prov}
              >
                Proveedores <Link to="/proveedores" />
              </MenuItem>
            </SubMenu>
            <MenuItem
              onClick={() => {
                setActive({ ...inicial, info: <RiMapPinUserFill /> });
              }}
              suffix={active.info}
              icon={<FcStatistics className="menu-icons" />}
            >
              Informes <Link to="/ventas" />
            </MenuItem>
          </Menu>
        </SidebarContent>
        <SidebarFooter className="footer">
          <Menu>
            {collap ? (
              <MenuItem
                icon={<Clock colapsado={collap} icon={true} />}
              ></MenuItem>
            ) : (
              <MenuItem icon={<FcAlarmClock className="menu-icons" />}>
                <Clock colapsado={collap} icon={false} />
              </MenuItem>
            )}
          </Menu>
        </SidebarFooter>
      </ProSidebar>
    </>
  );
};

export default Nav;

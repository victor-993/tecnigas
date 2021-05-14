import React, { useCallback, useState, useEffect } from "react";
import { makeStyles, withStyles } from "@material-ui/styles";
import InputBase from "@material-ui/core/InputBase";
import Divider from "@material-ui/core/Divider";
import { FaKey, FaUser, FaEye, FaCheck } from "react-icons/fa";
import logo from "./imagenes/logo.ico";
import llama from "./imagenes/llama.gif";
import useAxios from "../Hooks/useAxios";
import "./login.css";
import { Button, IconButton } from "@material-ui/core";
import { ToastContainer } from "react-toastify";
import axios from "axios";
import { notify } from "../Componentes/notify/Notify";

const useStyles = makeStyles((theme) => ({
  usuario: {
    borderRadius: "6px 6px 0 0",
  },
  contraseña: {
    borderRadius: "0 0 6px 6px",
  },
  divider: {
    height: 25,
    margin: "5px 15px 5px 30px",
    width: "1px",
    backgroundColor: "darkgray",
  },
  button: {
    width: "20px",
    height: "20px",
  },
}));

const Login = () => {
  const [usuario, setUsuario] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [verContra, setVerContra] = useState("password");
  const [redo, setRedo] = useState("");
  const [loading, setLoading] = useState(false);
  const [verificado, setVerificado] = useState(false)
  const classes = useStyles();

  

  const cambio = () => {
    verContra == "text" ? setVerContra("password") : setVerContra("text");
  };

  useEffect(() => {
    contraseña.length == 0 &&
      setVerContra("password")
  }, [contraseña])

  const verificarUsu = async () => {
    try {
      const body = {
        usuario,
        contraseña
      }
    setLoading(true)
    await axios.post(`/verifiusu/`, body).
    then((response) =>{
      if (response.data.length > 0) {
        const usu = response.data[0];
        setVerificado(true)
        notify("Bienvenido: ", usu.nombre_pe,"info");
       }else 
      notify("Usuario o contraseña invalida por favor verifique");
      setLoading(false);
      //window.location.reload()
    })
    } catch (error) {
      notify("Ha susedido un problema intente mas tarde, error: ", error);
      setLoading(false);
    }
  }

  return (
    <div className="login-conte">
      <ToastContainer/>
      <div className="login">
        <img src={logo} className="logo" />
        <h1>Tecnigas</h1>
        <MiInputB
          placeholder="Usuario"
          className={classes.usuario}
          value={usuario}
          onChange={(e) => setUsuario(e.target.value)}
          startAdornment={
            <>
              <FaUser className="iconologin" />
              <Divider className={classes.divider} orientation="vertical" />
            </>
          }
        />
        <MiInputB
          className={classes.contraseña}
          type={verContra}
          placeholder="Contraeña"
          value={contraseña}
          onChange={(e) => setContraseña(e.target.value)}
          startAdornment={
            <>
              <FaKey className="iconologin" />
              <Divider className={classes.divider} orientation="vertical" />
            </>
          }
          endAdornment={
            contraseña.length > 0 && (
              <>
                <FaEye className="iconoboton" onClick={() => cambio()} />
              </>
            )
          }
        />
        <button className={`boton-login ${redo}`} onClick={() => verificarUsu()} >
          {loading ? 
          <img src={llama} className="llama" /> :
          verificado? 
            <FaCheck className="check"/>:
           "Login"}
        </button>
      </div>
    </div>
  );
};

const MiInputB = withStyles({
  root: {
    padding: "2% 6%",
    display: "flex",
    alignItems: "center",
    width: "90%",
    margin: 0.5,
    backgroundColor: "ghostwhite",
    "& hr": {
      opacity: 0.5,
      height: 25,
    },
  },
})(InputBase);

export default Login;

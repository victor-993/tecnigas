import { useState } from "react";
import "./Inventario.css";
import CollapsibleTable from "../../Componentes/Table/Table";
import Loading from "../../Componentes/Loading/Loading";
import Error404 from "../../Componentes/Error/Error";
import useAxios from "../../Hooks/useAxios";
import Search from "../../Componentes/Search";
import FormularioProd from "../ModalProducto/FormularioProd";

const Inventario = () => {
  const [valueInp, setValueInp] = useState("");
  const [url, setUrl] = useState(`/producto/`);
  const [recarga, setRecarga] = useState(false);
  const { data, error, loading } = useAxios(url, recarga);
  const dataCategoria = useAxios("/categorias");

  const title = [
    "Codigo del Producto",
    "Nombre del Producto",
    "Cantidad",
    "Categoria",
    "Opciones",
  ];
  const titleDetails = [
    "Precio Publico",
    "Precio Mayorista",
    "Cantidad Minima",
  ];

  return (
    <>
      <div className="conteiner">
        <div className="cont__lista">
          <h2 className="cont__lista-titulo">Listado de Productos</h2>
          <FormularioProd
            recarga={recarga}
            setRecarga={setRecarga}
            tipo="Producto"
            metodo="post"
            titulo="Crear Producto"
            dataCategoria={dataCategoria.data}
          />
          <hr className="linea-h2" />

          <Search
            valueInp={valueInp}
            setValueInp={setValueInp}
            titulo="Filtrar Productos"
            tooltip={`Tipos de Filtro: - Categoria - Nombre - Codigo`}
          />

          <div className="cont__lista-tabla">
            {loading ? (
              <Loading />
            ) : error ? (
              <Error404
                ancho={200}
                error="Se ha producido un problema, Recargue la pagina."
              />
            ) : (
              <CollapsibleTable
                data={data}
                filtro={valueInp}
                titulos={title}
                titulosDetalles={titleDetails}
                tipo="inv"
                recarga={recarga}
                setRecarga={setRecarga}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Inventario;

/*
import Modal from "../Componentes/Modal/Modal";
  const [valueSel, setValueSel] = useState(10);
   const [filtro, setFiltro] = useState(false);
<Modal
          filtro={filtro}
          setFiltro={setFiltro}
          value={valueSel}
          setValue={setValueSel}
          options={modalOptions}
        />
        
        const modalOptions = [
    { value: 10, label: "Codigo" },
    { value: 20, label: "Nombre" },
    { value: 30, label: "Categoria" },
      const filtrar = () => {
    if (valueSel == 10 && valueInp !== "") {
      setUrl(`/producto/cod/${valueInp}`);
    } else if (valueSel == 20 && valueInp !== "") {
      setUrl(`/producto/nom/${valueInp}`);
    } else if (valueSel == 30 && valueInp !== "") {
      setUrl(`/producto/cat/${valueInp}`);
    }
  };
  ];*/

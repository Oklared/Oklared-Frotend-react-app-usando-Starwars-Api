import React, { useState, useEffect, useCallback } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import manImage from "../assets/man.webp";
import womanImage from "../assets/woman.webp";
import robotImage from "../assets/robot.webp";

// URL de la API (reemplazar con la URL real de tu API)
const API_URL = "https://api.example.com/elementos";

// Componente Modal para Crear y Editar Elementos
const Modal = ({ isVisible, onClose, onSubmit, initialValues }) => {
  const [nombre, setNombre] = useState(initialValues?.nombre || "");
  const [descripcion, setDescripcion] = useState(initialValues?.descripcion || "");
  const [genere, setGenere] = useState(initialValues?.genere || "");

  useEffect(() => {
    if (initialValues) {
      setNombre(initialValues.nombre);
      setDescripcion(initialValues.descripcion);
      setGenere(initialValues.genere);
    }
  }, [initialValues]);

  const handleSubmit = () => {
    if (!nombre || !descripcion || !genere) {
      toast.error("Por favor, ingresa todos los campos.");
      return;
    }
    onSubmit({ nombre, descripcion, genere });
    onClose();
  };

  return (
    isVisible && (
      <div className="modal-overlay">
        <div className="modal-content">
          <h3>{initialValues ? "Editar Elemento" : "Nuevo Elemento"}</h3>
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            placeholder="Nombre"
          />
          <input
            type="text"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            placeholder="Descripción"
          />
          <select value={genere} onChange={(e) => setGenere(e.target.value)}>
            <option value="">Seleccione un género</option>
            <option value="woman">Mujer</option>
            <option value="man">Hombre</option>
            <option value="robot">Robot</option>
          </select>
          <div className="modal-actions">
            <button onClick={handleSubmit}>{initialValues ? "Guardar" : "Agregar"}</button>
            <button onClick={onClose}>Cancelar</button>
          </div>
        </div>
      </div>
    )
  );
};

// Componente Principal para Editar y Crear Elementos
const EditCreate = () => {
  const [elementos, setElementos] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [elementoEditando, setElementoEditando] = useState(null);

  const fetchElementos = useCallback(async () => {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error("Error al cargar los elementos.");
      const data = await response.json();
      setElementos(data);
    } catch (error) {
      toast.error("No se pudieron cargar los elementos.");
    }
  }, []);

  useEffect(() => {
    fetchElementos();
  }, [fetchElementos]);

  const agregarElemento = async (elemento) => {
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(elemento),
      });
      if (!response.ok) throw new Error("Error al agregar el elemento.");
      const addedElemento = await response.json();
      setElementos((prevElementos) => [...prevElementos, addedElemento]);
      toast.success("Elemento agregado correctamente.");
    } catch (error) {
      toast.error(error.message);
    }
  };

  const editarElemento = async (id, updatedElemento) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedElemento),
      });
      if (!response.ok) throw new Error("Error al actualizar el elemento.");
      setElementos((prevElementos) =>
        prevElementos.map((elem) =>
          elem.id === id ? { ...elem, ...updatedElemento } : elem
        )
      );
      toast.success("Elemento actualizado correctamente.");
    } catch (error) {
      toast.error(error.message);
    }
  };

  const eliminarElemento = async (id) => {
    const confirmacion = window.confirm("¿Estás seguro de que deseas eliminar este elemento?");
    if (!confirmacion) return;

    try {
      const response = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      if (!response.ok) throw new Error("Error al eliminar el elemento.");
      setElementos((prevElementos) => prevElementos.filter((elem) => elem.id !== id));
      toast.success("Elemento eliminado correctamente.");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="container">
      <Modal
        isVisible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSubmit={elementoEditando ? (updatedElemento) => editarElemento(elementoEditando.id, updatedElemento) : agregarElemento}
        initialValues={elementoEditando}
      />
      <div className="header">
        <h2>{elementoEditando ? "Editar Elemento" : "Crear Nuevo Elemento"}</h2>
        <button onClick={() => setModalVisible(true)}>Nuevo Elemento</button>
      </div>

      <div className="element-list">
        {elementos.length ? (
          elementos.map((elem) => (
            <div key={elem.id} className="element-item">
              <img
                src={elem.genere === "man" ? manImage : elem.genere === "woman" ? womanImage : robotImage}
                alt={elem.genere}
              />
              <div className="element-details">
                <h4>{elem.nombre}</h4>
                <p>{elem.descripcion}</p>
                <div className="actions">
                  <button onClick={() => { setElementoEditando(elem); setModalVisible(true); }}>Editar</button>
                  <button onClick={() => eliminarElemento(elem.id)}>Eliminar</button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No hay elementos disponibles.</p>
        )}
      </div>
      <ToastContainer />
    </div>
  );
};

export default EditCreate;

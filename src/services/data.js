import React from "react";
import slide1 from "../assets/slide4.webp";
import slide2 from "../assets/slide2.webp";
import slide3 from "../assets/slide3.webp";
import slide4 from "../assets/slide1.webp";
import slide5 from "../assets/202310171642263_4.jpg";

// Información de login
const login = [
  {
    name: "Login",
    href: "/login",
  },
];

// Información de las categorías del API
const categories = [
  { label: "Characters", category: "characters" },
  { label: "Planets", category: "planets" },
  { label: "Species", category: "species" },
  { label: "Films", category: "films" },
  { label: "Vehicles", category: "vehicles" },
  { label: "Starships", category: "starships" },
  { label: "Edit", category: "edit" },
];

// Información de botones
const buttonlogin = [
  {
    name: "Continue with Google",
    href: "#",
    icon: React.createElement("span", { className: "google-icon" }),
    target: "_blank",
  },
  {
    name: "Continue with Github",
    href: "#",
    icon: React.createElement("span", { className: "github-icon" }),
    target: "_blank",
  },
];

// Información del slider
const slides = [
  { id: 1, imageUrl: slide1 },
  { id: 2, imageUrl: slide2 },
  { id: 3, imageUrl: slide3 },
  { id: 4, imageUrl: slide4 },
  { id: 5, imageUrl: slide5 },
];

export { login, categories, buttonlogin, slides };

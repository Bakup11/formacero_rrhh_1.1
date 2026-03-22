import express from "express";
import {
  searchEmpleado, 
  getEmpleados,
  createEmpleado,
  updateEmpleado,
  deleteEmpleado,
  countEmpleados,
  getExEmpleados,
  deleteExEmpleado,
  getCumpleaneros,
  getEmpleadoById // 🔹 agregamos la función para detalle por ID
} from "../controllers/empleados.controller.js";

const router = express.Router();

// 🔹 BUSQUEDAS
router.get("/search", searchEmpleado);           // 🔥 PRIMERO
router.get("/count", countEmpleados);
router.get("/cumpleaneros", getCumpleaneros);
router.get("/exempleados", getExEmpleados);

// 🔹 CRUD GENERAL
router.get("/", getEmpleados);
router.post("/", createEmpleado);
router.put("/:id", updateEmpleado);
router.delete("/:id", deleteEmpleado);

// 🔹 DELETE EX-EMPLEADO
router.delete("/exempleados/:id", deleteExEmpleado);

// 🔹 OBTENER EMPLEADO POR ID (SIEMPRE AL FINAL)
router.get("/:id", getEmpleadoById);             // 🔥 DINÁMICA, SIEMPRE AL FINAL

export default router;
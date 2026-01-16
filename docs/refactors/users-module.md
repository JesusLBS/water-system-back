# Refactorización del módulo de usuarios

## Contexto

El módulo de usuarios acumuló varios problemas a lo largo del tiempo:

- Los ayudantes de validación genéricos diluyeron la responsabilidad y ocultaron la intención.
- Los parámetros de consulta se validaron de forma vaga, lo que provocó un comportamiento inconsistente.
- El estado del usuario (activo/inactivo) estaba implícito y se infería de `deletedAt`.
- Los metadatos de paginación eran ambiguos (`count` vs registros totales).
- Las respuestas del backend filtraron inquietudes sobre la tabla/IU (encabezados).

Esta refactorización aborda esos problemas sin ampliar el alcance más allá del módulo de usuarios.

---

## Decisiones técnicas

### 1. Estrategia de validación
- Todas las validaciones se trasladaron a las clases de Solicitud.
- Se modifico el ayudante de validación genérico.
- Cada punto final ahora define explícitamente su contrato.

**Beneficio:** límites de responsabilidad más claros y manejo de insumos más seguro.

---

### 2. Aclaración de la entidad de dominio
- La entidad `Usuario` ahora expone un `estado` explícito (`activo | inactivo`).
- `deletedAt` permanece interno y no es requerido por el frontend.
- La lógica de mapeo instancia la entidad una vez y la devuelve directamente.

**Beneficio:** el modelo de dominio comunica intención en lugar de obligar a los consumidores a inferir estado.

---

### 3. Filtrado de semántica
- `withTrashed` fue reemplazado conceptualmente por un filtro semántico:
  - `active`
  - `inactive`
  - `all`
- La lógica de filtrado reside en UseCase, no en el repositorio.

**Beneficio:** el repositorio permanece genérico; las reglas comerciales permanecen en la capa de dominio.

---

### 4. Metadatos de paginación
La paginación fue rediseñada para que fuera descriptiva en lugar de implícita.

Metadatos devueltos:
- `total`: número absoluto de usuarios (activos + inactivos)
- `filtered`: número de usuarios que coinciden con los filtros actuales
- `perPage`, `currentPage`, `lastPage`
- `from`, `to`
- `hasNextPage`, `hasPrevPage`

**Beneficio:** el frontend no necesita derivar lógica de paginación.

---

### 5. Simplificación de contratos API
- Los encabezados de tabla se eliminaron de las respuestas del backend.
- El backend ahora devuelve datos puros + metadatos.
- El frontend es propietario de las decisiones de presentación (columnas, visibilidad, etiquetas).

**Beneficio:** el backend sigue siendo independiente de la interfaz de usuario y reutilizable.

---

## Antes vs Después (Conceptual)

### Antes
- Estado implícito derivado de campos anulables
- Preocupaciones mixtas sobre la interfaz de usuario en las respuestas de la API
- Capa de validación genérica
- La paginación ambigua cuenta

### Después
- Estado de dominio explícito
- Borrar contrato API
- Fuerte validación de solicitudes
- Metadatos de paginación descriptiva

---

## Impacto

- Separación más limpia de preocupaciones
- Modelo de dominio más expresivo
- Integración frontend más sencilla
- Base sólida para completar CRUD completo y reutilizarlo en todos los módulos

Esta refactorización refleja un cambio del código basado en características a una estructura basada en dominios.
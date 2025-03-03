# Clean Architecture con NestJS y Prisma

Este repositorio implementa **Clean Architecture** en una aplicación construida con **NestJS** y **Prisma**. La arquitectura está diseñada para ser modular, escalable y mantenible.

## 🚀 Tecnologías Utilizadas

- [NestJS](https://nestjs.com/)
- [Prisma ORM](https://www.prisma.io/)
- [TypeScript](https://www.typescriptlang.org/)
- [PostgreSQL](https://www.postgresql.org/) (o cualquier base de datos compatible con Prisma)

## 📂 Estructura del Proyecto

```plaintext
src/
│── modules/
│   ├── product/
│   │   ├── application/
│   │   │   ├── use-cases/
│   │   │   ├── mappers/
│   │   ├── domain/
│   │   │   ├── entities/
│   │   │   ├── repositories/
│   │   ├── infrastructure/
│   │   │   ├── controllers/
│   │   │   ├── persistence/
│   │   │   ├── providers/
│   │   ├── product.module.ts
│   ├── shared/
│   │   ├── constants/
│   │   │   ├── types.constant.ts
│   │   ├── infrastructure/
│   │   │   ├── db/
│   │   │   │   ├── prisma/
│   │   │   │   │   ├── prisma.service.ts
│   │   │   │   │   ├── prisma.module.ts
│   │   ├── shared.module.ts
│── app.module.ts
│── main.ts
│── README.md
```

## 🔥 Instalación y Configuración

### 1️⃣ Clonar el Repositorio
```sh
git clone https://github.com/tuusuario/nestjs-clean-architecture.git
cd nestjs-clean-architecture
```

### 2️⃣ Instalar Dependencias
```sh
npm install
```

### 3️⃣ Configurar Variables de Entorno
Crea un archivo **.env** en la raíz con la siguiente configuración:
```env
DATABASE_URL="postgresql://user:password@localhost:5432/mydatabase"
PORT=3000
```

### 4️⃣ Configurar Prisma
Ejecuta los siguientes comandos para generar los archivos de Prisma y migrar la base de datos:
```sh
npx prisma generate
npx prisma migrate dev --name init
```

### 5️⃣ Iniciar el Servidor
```sh
npm run start:dev
```

El servidor estará disponible en `http://localhost:3000`

## 📌 Endpoints Disponibles

### 📍 Crear Producto
**POST** `/products`
```json
{
  "name": "Laptop Gamer",
  "description": "Laptop potente para juegos",
  "price": 1200.50,
  "stock": 10
}
```

### 📍 Obtener Producto por ID
**GET** `/products/{id}`

### 📍 Listar Todos los Productos
**GET** `/products`

### 📍 Actualizar Producto
**PATCH** `/products/{id}`
```json
{
  "price": 1100.00
}
```

### 📍 Eliminar Producto
**DELETE** `/products/{id}`

## 📜 Arquitectura
Este proyecto sigue los principios de **Clean Architecture**, separando responsabilidades en capas:

- **Domain**: Contiene las entidades y las interfaces de los repositorios.
- **Application**: Implementa los casos de uso y lógica de negocio.
- **Infrastructure**: Contiene la persistencia (Prisma), controladores y proveedores.

## ✅ Próximos Pasos
- 🛠️ Implementar autenticación con JWT.
- 📊 Agregar logs con Winston o Pino.
- 📦 Crear contenedores Docker.

## 📄 Licencia
Este proyecto está bajo la **MIT License**.

---

💡 **Desarrollado con ❤️ por [Jhon](https://github.com/jhon-birreo)**


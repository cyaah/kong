### **README.md**

---

# **Kong Services API**

This project implements a **Services API** using **NestJS** with **TypeORM** and **PostgreSQL**, designed to showcase essential backend development concepts like filtering, sorting, pagination, and testing.

## **Features**

- **Get Services**:
  - Supports filtering by any field, sorting, and pagination.
- **Get Service by ID**:
  - Includes all versions of the service inline.
- **Database Seeding**:
  - Populates the database with mock data for testing.
- **Testing**:
  - Essential tests for controller and service layers using **Jest**.

---

## **Tech Stack**

- **Node.js**: Backend runtime.
- **NestJS**: Framework for building scalable server-side applications.
- **TypeORM**: ORM for database operations.
- **PostgreSQL**: Database for persistent storage.
- **Docker**: For containerized deployment.

---

## **Setup Instructions**

### **Prerequisites**
Ensure the following are installed on your machine:
- **Docker**: [Install Docker](https://www.docker.com/get-started)

---

### **Steps to Run**

1. **Clone the Repository**:
   ```bash
   git clone <repository-url>
   cd <repository-name>
   ```

2. **Start the App with Docker**:
   - Build and start the Docker containers:
     ```bash
     docker-compose up --build
     ```
   - This will spin up the following:
     - The NestJS application (`http://localhost:3000`)
     - PostgreSQL database (`localhost:5432`)

3. **Verify the App**:
   - The app will be available at `http://localhost:3000`.

---

## **Seeding the Database**

To populate the database with mock data:

1. Run the seeding script inside the app container:
   ```bash
   docker exec -it kong_app npx ts-node src/database/seed.ts
   ```
2. Verify the data:
   - Use a database tool like **pgAdmin** or **DBeaver**.
   - Connect with:
     - **Host**: `localhost`
     - **Port**: `5432`
     - **Username**: `kong`
     - **Password**: `kong`
     - **Database**: `kong`

---

## **Endpoints**

### **1. Get All Services**
- **URL**: `GET /services`
- **Query Parameters**:
  - `filterField` (optional): Field to filter (e.g., `name` or `description`).
  - `filterValue` (optional): Value to filter by.
  - `sortBy` (optional): Field to sort by (default: `name`).
  - `order` (optional): Sorting order (`asc` or `desc`, default: `asc`).
  - `page` (optional): Page number (default: `1`).
  - `limit` (optional): Number of results per page (default: `10`).

**Example**:
```http
GET http://localhost:3000/services?filterField=name&filterValue=Service A&sortBy=name&order=asc&page=1&limit=5
```

---

### **2. Get Service by ID**
- **URL**: `GET /services/:id`
- **Path Parameter**: 
  - `id`: Service ID.

**Example**:
```http
GET http://localhost:3000/services/1
```

---

## **Testing**

### **Run Tests**
Run the test suite using Jest:
1. **Inside the Docker Container**:
   ```bash
   docker exec -it kong_app npm run test
   ```
2. **Clear Jest Cache (if needed)**:
   ```bash
   docker exec -it kong_app npm run test -- --clearCache
   ```

### **Test Coverage**
The test suite covers:
- **Controller Layer**:
  - Fetch all services (`GET /services`).
  - Fetch a specific service by ID (`GET /services/:id`).
- **Service Layer**:
  - Validates business logic for filtering, sorting, and pagination.


# Hospital Management System - Admin Dashboard

This is the **Admin Dashboard** for the Hospital Management System. It is built using **React** for frontend and **Node.js + Prisma** for the backend. The dashboard allows the admin to manage doctors, patients, and treatments efficiently.

---

## **Features Implemented**

### **1. Dashboard Overview**
- Displays total counts of:
  - Doctors
  - Patients
  - Treatments
- Provides a quick snapshot of hospital activity.

### **2. Doctor Management**
- View list of all doctors.
- (Future) Add, update, or delete doctor records.

### **3. Patient Management**
- View list of all patients.
- Assign patients to doctors.
- (Future) Add, update, or delete patient records.

### **4. Treatment Management**
- View all treatments.
- Add treatment records for patients.
- (Future) Update or delete treatment records.

### **5. Integration with Backend**
- Uses **Prisma ORM** with MySQL database.
- Backend exposes APIs for:
  - Fetching doctors, patients, and treatments.
  - Adding treatments for patients.

---

## **Tech Stack**
- **Frontend:** React.js, TailwindCSS
- **Backend:** Node.js, Express, Prisma
- **Database:** MySQL
- **Others:** Axios for API calls, dotenv for environment variables

---

## **Setup Instructions**

### **Backend**
1. Clone the repository.
2. Install dependencies:
   ```bash
   npm install
Set up .env file with your MySQL credentials:


DATABASE_URL="mysql://user:password@localhost:3306/hospital_management"
Run Prisma migrations:

npx prisma migrate dev --name init
Start the backend server:

npm run dev
Frontend
Navigate to the frontend folder.

Install dependencies:

npm install
Start the frontend:

npm start
Access the admin dashboard at:

http://localhost:3000
API Endpoints Used
GET /api/admin/doctors – Fetch all doctors

GET /api/admin/patients – Fetch all patients

GET /api/admin/treatments – Fetch all treatments

POST /api/admin/patients/:id/treatment – Add treatment for a patient

Future Improvements
Add, update, delete functionality for doctors, patients, and treatments.

Generate reports for hospital activities.

Integrate billing and lab reports.

Author
Developed by: Karthikeya

Email:karthikeyavempala@gmail.com

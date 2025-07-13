
# Clinic Appointment Calendar (Frontend Project)

This is a frontend-only React application created for clinic staff to manage doctor appointments. The app features a login screen, a responsive calendar view, and a form to add/edit appointments. Appointment data is stored in the browser using localStorage.

## 🔗 Live Demo

👉 [https://care-cure-gamma.vercel.app/](https://care-cure-gamma.vercel.app/)


## 🖼️ Screenshots

### 1. Login Page - Mobile View
![Login Mobile](./public/screenshots/1.png)

### 2. Calendar Page - Mobile View
![Calendar Mobile](./public/screenshots/2.png)

### 3. Appointment Form
![Appointment Form](./public/screenshots/3.png)

### 4. Login Page - Desktop View
![Login Desktop](./public/screenshots/4.png)

### 5. Calendar Page - Desktop View
![Calendar Desktop](./public/screenshots/5.png)

## ✅ Features

- Login screen with mock credentials
- Month view calendar (desktop)
- Day view with date picker (mobile)
- Add/edit appointments (patient, doctor, time)
- Uses localStorage to persist data
- Fully responsive design for mobile and desktop

## 🔐 Login Credentials

```
Email: staff@clinic.com
Password: 123456
```

## 🧰 Tech Stack

- React
- React Router DOM
- React Calendar
- Plain CSS
- localStorage

## 🚀 Installation (for local testing)

1. Clone this repository:
```
git clone https://github.com/yourusername/clinic-calendar.git
cd clinic-calendar
```

2. Install dependencies:
```
npm install
```

3. Start development server:
```
npm start
```

## 🗂️ Folder Structure

```
src/
├── components/
│   ├── Login.js
│   ├── CalendarView.js
│   ├── AppointmentForm.js
├── data/
│   └── dummyData.js
├── App.js
├── App.css
```

## 📝 Notes

- All data is stored locally in the browser.
- Appointments are saved per date in a readable format.
- Fully works offline after initial load (PWA behavior not implemented).
- Built as a part of a frontend job assignment.

## 🙋 Author

Submitted by MOHAMMED SHUAIB M
GitHub: [https://github.com/shuaib5948](https://github.com/shuaib5948)

// import React, { useState } from 'react';
// import { Calendar, Clock, User, Phone, Save, X } from 'lucide-react';
// import { useLocalStorage } from '../hooks/useLocalStorage'; // adjust path if needed
// import  db  from '../firebase'; // Adjust path
// import { collection, addDoc, Timestamp } from 'firebase/firestore';


// interface Appointment {
//   id: string;
//   patientName: string;
//   phone: string;
//   doctor: string;
//   department: string;
//   date: string;
//   time: string;
//   status: string;
// }

// const BookingSystem: React.FC = () => {
//   const [appointments, setAppointments] = useLocalStorage<Appointment[]>('appointments', []);
//   // const [appointments, setAppointments] = useState<Appointment[]>([]);
//   const [showForm, setShowForm] = useState(false);
//   const [formData, setFormData] = useState({
//     patientName: '',
//     phone: '',
//     doctor: '',
//     department: '',
//     date: '',
//     time: '',
//   });

//   const doctors = ['Dr. Sharma', 'Dr. Patel', 'Dr. Singh', 'Dr. Kumar'];
//   const departments = ['General', 'Cardiology', 'Orthopedics', 'Pediatrics'];
//   const timeSlots = ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00'];

//   const handleSubmit = async (e: React.FormEvent) => {
//   e.preventDefault();
//   const newAppointment: Appointment = {
//     id: Date.now().toString(),
//     ...formData,
//     status: 'Scheduled',
//   };

//   try {
//     // Save to Firestore
//     await addDoc(collection(db, 'appointments'), {
//       patientName: newAppointment.patientName,
//       phone: newAppointment.phone,
//       doctor: newAppointment.doctor,
//       department: newAppointment.department,
//       date: Timestamp.fromDate(new Date(newAppointment.date)),
//       time: newAppointment.time,
//       status: newAppointment.status,
//     });

//     // Optional: Save locally
//     setAppointments([...appointments, newAppointment]);

//     // Reset form
//     setFormData({ patientName: '', phone: '', doctor: '', department: '', date: '', time: '' });
//     setShowForm(false);
//     alert('Appointment booked and saved!');
//   } catch (error) {
//     console.error('Error saving to Firestore:', error);
//     alert('Failed to save appointment. Please try again.');
//   }
// };

  
//   // const handleSubmit = (e: React.FormEvent) => {
//   //   e.preventDefault();
//   //   const newAppointment: Appointment = {
//   //     id: Date.now().toString(),
//   //     ...formData,
//   //     status: 'Scheduled',
//   //   };
//   //   setAppointments([...appointments, newAppointment]);
//   //   setFormData({ patientName: '', phone: '', doctor: '', department: '', date: '', time: '' });
//   //   setShowForm(false);
//   //   alert('Appointment booked successfully!');
//   // };

//   const deleteAppointment = (id: string) => {
//     const confirm = window.confirm("Are you sure you want to delete this appointment?");
//     if (confirm) {
//       setAppointments(appointments.filter(a => a.id !== id));
//     }
//   };

//   return (
//     <div className="space-y-6">
//       <div className="flex items-center justify-between">
//         <div>
//           <h2 className="text-2xl font-bold text-gray-900">Appointment Booking System</h2>
//           <p className="text-gray-600">Book and manage patient appointments</p>
//         </div>
//         <button
//           onClick={() => setShowForm(true)}
//           className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2"
//         >
//           <Calendar className="h-4 w-4" />
//           <span>New Appointment</span>
//         </button>
//       </div>

//       {/* Appointment List */}
//       <div className="bg-white rounded-lg shadow-sm">
//         <div className="p-4 border-b">
//           <h3 className="font-semibold text-gray-900">Recent Appointments</h3>
//         </div>
//         <div className="p-4">
//           {appointments.length === 0 ? (
//             <div className="text-center py-8 text-gray-500">
//               <Calendar className="h-12 w-12 mx-auto mb-4 text-gray-300" />
//               <p>No appointments booked yet</p>
//               <p className="text-sm">Click "New Appointment" to get started</p>
//             </div>
//           ) : (
//             <div className="space-y-4">
//               {appointments.map((appointment) => (
//                 <div key={appointment.id} className="border rounded-lg p-4 relative">
//                   <button
//                     onClick={() => deleteAppointment(appointment.id)}
//                     className="absolute top-2 right-2 text-gray-400 hover:text-red-600"
//                     title="Delete appointment"
//                   >
//                     <X className="h-4 w-4" />
//                   </button>
//                   <div className="flex items-center justify-between">
//                     <div>
//                       <h4 className="font-medium text-gray-900">{appointment.patientName}</h4>
//                       <p className="text-sm text-gray-600">{appointment.phone}</p>
//                     </div>
//                     <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm">
//                       {appointment.status}
//                     </span>
//                   </div>
//                   <div className="mt-2 grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600">
//                     <div>Doctor: {appointment.doctor}</div>
//                     <div>Dept: {appointment.department}</div>
//                     <div>Date: {appointment.date}</div>
//                     <div>Time: {appointment.time}</div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Booking Form Modal */}
//       {showForm && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
//           <div className="bg-white rounded-lg p-6 w-full max-w-md">
//             <div className="flex items-center justify-between mb-4">
//               <h3 className="text-lg font-semibold">Book New Appointment</h3>
//               <button
//                 onClick={() => setShowForm(false)}
//                 className="text-gray-400 hover:text-gray-600"
//               >
//                 ✕
//               </button>
//             </div>

//             <form onSubmit={handleSubmit} className="space-y-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Patient Name</label>
//                 <input
//                   type="text"
//                   required
//                   value={formData.patientName}
//                   onChange={(e) => setFormData({ ...formData, patientName: e.target.value })}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
//                 <input
//                   type="tel"
//                   required
//                   value={formData.phone}
//                   onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
//                 />
//               </div>

//               <div className="grid grid-cols-2 gap-4">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
//                   <select
//                     required
//                     value={formData.department}
//                     onChange={(e) => setFormData({ ...formData, department: e.target.value })}
//                     className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
//                   >
//                     <option value="">Select</option>
//                     {departments.map((dept) => (
//                       <option key={dept} value={dept}>{dept}</option>
//                     ))}
//                   </select>
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Doctor</label>
//                   <select
//                     required
//                     value={formData.doctor}
//                     onChange={(e) => setFormData({ ...formData, doctor: e.target.value })}
//                     className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
//                   >
//                     <option value="">Select</option>
//                     {doctors.map((doctor) => (
//                       <option key={doctor} value={doctor}>{doctor}</option>
//                     ))}
//                   </select>
//                 </div>
//               </div>

//               <div className="grid grid-cols-2 gap-4">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
//                   <input
//                     type="date"
//                     required
//                     value={formData.date}
//                     onChange={(e) => setFormData({ ...formData, date: e.target.value })}
//                     className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
//                   <select
//                     required
//                     value={formData.time}
//                     onChange={(e) => setFormData({ ...formData, time: e.target.value })}
//                     className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
//                   >
//                     <option value="">Select</option>
//                     {timeSlots.map((time) => (
//                       <option key={time} value={time}>{time}</option>
//                     ))}
//                   </select>
//                 </div>
//               </div>

//               <div className="flex space-x-3 pt-4">
//                 <button
//                   type="button"
//                   onClick={() => setShowForm(false)}
//                   className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   type="submit"
//                   className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center justify-center space-x-2"
//                 >
//                   <Save className="h-4 w-4" />
//                   <span>Book</span>
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default BookingSystem;

// BookingSystem.tsx
import React, { useState, useEffect } from 'react';
import { Calendar, Clock, User, Phone, Save, X } from 'lucide-react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import  db  from '../firebase';
import {
  collection,
  addDoc,
  getDocs,
  Timestamp
} from 'firebase/firestore';

interface Appointment {
  id: string;
  patientName: string;
  phone: string;
  doctor: string;
  department: string;
  date: string;
  time: string;
  status: string;
}

const BookingSystem: React.FC = () => {
  const [appointments, setAppointments] = useLocalStorage<Appointment[]>('appointments', []);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    patientName: '',
    phone: '',
    doctor: '',
    department: '',
    date: '',
    time: '',
  });

  const [doctors, setDoctors] = useState<string[]>([]);
  const [departments, setDepartments] = useState<string[]>([]);
  const [timeSlots, setTimeSlots] = useState<string[]>([]);

  useEffect(() => {
    const fetchOptions = async () => {
      const fetchCollection = async (name: string): Promise<string[]> => {
        const snapshot = await getDocs(collection(db, name));
        return snapshot.docs.map(doc => doc.data().name || doc.data().time);
      };

      const [doctorList, deptList, timeList] = await Promise.all([
        fetchCollection('doctors'),
        fetchCollection('departments'),
        fetchCollection('timeslots')
      ]);

      setDoctors(doctorList);
      setDepartments(deptList);
      setTimeSlots(timeList);
    };

    fetchOptions();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newAppointment: Appointment = {
      id: Date.now().toString(),
      ...formData,
      status: 'Scheduled',
    };

    try {
      await addDoc(collection(db, 'appointments'), {
        patientName: newAppointment.patientName,
        phone: newAppointment.phone,
        doctor: newAppointment.doctor,
        department: newAppointment.department,
        date: Timestamp.fromDate(new Date(newAppointment.date)),
        time: newAppointment.time,
        status: newAppointment.status,
      });

      setAppointments([...appointments, newAppointment]);
      setFormData({ patientName: '', phone: '', doctor: '', department: '', date: '', time: '' });
      setShowForm(false);
      alert('Appointment booked and saved!');
    } catch (error) {
      console.error('Error saving to Firestore:', error);
      alert('Failed to save appointment. Please try again.');
    }
  };

  const deleteAppointment = (id: string) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this appointment?");
    if (confirmDelete) {
      setAppointments(appointments.filter(a => a.id !== id));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Appointment Booking System</h2>
          <p className="text-gray-600">Book and manage patient appointments</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="bg-sky-600 text-white px-4 py-2 rounded-lg hover:bg-sky-800 flex items-center space-x-2"
        >
          <Calendar className="h-4 w-4" />
          <span>New Appointment</span>
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-4 border-b">
          <h3 className="font-semibold text-gray-900">Recent Appointments</h3>
        </div>
        <div className="p-4">
          {appointments.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <Calendar className="h-12 w-12 mx-auto mb-4 text-gray-300" />
              <p>No appointments booked yet</p>
              <p className="text-sm">Click \"New Appointment\" to get started</p>
            </div>
          ) : (
            <div className="space-y-4">
              {appointments.map((appointment) => (
                <div key={appointment.id} className="border rounded-lg p-4 relative">
                  <button
                    onClick={() => deleteAppointment(appointment.id)}
                    className="absolute top-2 right-2 text-gray-400 hover:text-red-600"
                    title="Delete appointment"
                  >
                    <X className="h-4 w-4" />
                  </button>
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-gray-900">{appointment.patientName}</h4>
                      <p className="text-sm text-gray-600">{appointment.phone}</p>
                    </div>
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm">
                      {appointment.status}
                    </span>
                  </div>
                  <div className="mt-2 grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600">
                    <div>Doctor: {appointment.doctor}</div>
                    <div>Dept: {appointment.department}</div>
                    <div>Date: {appointment.date}</div>
                    <div>Time: {appointment.time}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Book New Appointment</h3>
              <button onClick={() => setShowForm(false)} className="text-gray-400 hover:text-gray-600">✕</button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Patient Name</label>
                <input type="text" required value={formData.patientName} onChange={(e) => setFormData({ ...formData, patientName: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                <input type="tel" required value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
                  <select required value={formData.department} onChange={(e) => setFormData({ ...formData, department: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500">
                    <option value="">Select</option>
                    {departments.map((dept) => (
                      <option key={dept} value={dept}>{dept}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Doctor</label>
                  <select required value={formData.doctor} onChange={(e) => setFormData({ ...formData, doctor: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500">
                    <option value="">Select</option>
                    {doctors.map((doctor) => (
                      <option key={doctor} value={doctor}>{doctor}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                  <input type="date" required value={formData.date} onChange={(e) => setFormData({ ...formData, date: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
                  <select required value={formData.time} onChange={(e) => setFormData({ ...formData, time: e.target.value })} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500">
                    <option value="">Select</option>
                    {timeSlots.map((time) => (
                      <option key={time} value={time}>{time}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="flex space-x-3 pt-4">
                <button type="button" onClick={() => setShowForm(false)} className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50">
                  Cancel
                </button>
                <button type="submit" className="flex-1 px-4 py-2 bg-cyan-400 text-white rounded-md hover:bg-cyan-700 flex items-center justify-center space-x-2">
                  <Save className="h-4 w-4" />
                  <span>Book</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingSystem;


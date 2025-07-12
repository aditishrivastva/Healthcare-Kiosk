export interface Patient {
  id: string;
  name: string;
  age: number;
  gender: 'male' | 'female' | 'other';
  phone: string;
  address: string;
  emergencyContact: string;
  medicalHistory: string[];
}

export interface Appointment {
  id: string;
  patientId: string;
  patientName: string;
  doctorName: string;
  department: string;
  date: string;
  time: string;
  status: 'scheduled' | 'in-progress' | 'completed' | 'cancelled';
  type: 'consultation' | 'checkup' | 'follow-up';
  fee: number;
}

export interface VitalReading {
  id: string;
  patientId: string;
  timestamp: string;
  readings: {
    bloodPressureSystolic: number;
    bloodPressureDiastolic: number;
    heartRate: number;
    bodyTemperature: number;
    respiratoryRate: number;
    oxygenSaturation: number;
    bloodGlucose: number;
    weight: number;
    height: number;
    bmi: number;
    cholesterolTotal: number;
    cholesterolHDL: number;
    cholesterolLDL: number;
    triglycerides: number;
    hemoglobin: number;
    whiteBloodCells: number;
    redBloodCells: number;
    platelets: number;
    bloodUreaNitrogen: number;
    creatinine: number;
    sodium: number;
    potassium: number;
    chloride: number;
    carbonDioxide: number;
  };
}

export interface PaymentDetails {
  id: string;
  appointmentId: string;
  amount: number;
  method: 'cash' | 'card' | 'upi' | 'netbanking';
  status: 'pending' | 'completed' | 'failed';
  transactionId?: string;
  timestamp: string;
}

export interface PatientStatus {
  id: string;
  patientId: string;
  patientName: string;
  roomNumber: string;
  bedNumber: string;
  status: 'admitted' | 'in-treatment' | 'recovery' | 'discharge-ready';
  admissionDate: string;
  condition: 'stable' | 'critical' | 'improving' | 'under-observation';
  assignedDoctor: string;
  lastUpdated: string;
}

export interface ConsultationSession {
  id: string;
  patientId: string;
  doctorName: string;
  startTime: string;
  endTime?: string;
  status: 'waiting' | 'active' | 'completed';
  language: 'en' | 'hi';
  notes: string;
}
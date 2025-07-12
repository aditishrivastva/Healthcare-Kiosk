import React, { useEffect, useState } from 'react';
import { collection, getDocs, Timestamp } from 'firebase/firestore';
import db from '../firebase';
import { Monitor, User, Bed, Clock, AlertTriangle, CheckCircle } from 'lucide-react';

interface Patient {
  id: string;
  name: string;
  room: string;
  bed: string;
  status: 'Admitted' | 'Treatment' | 'Recovery' | 'Discharge';
  condition: 'Stable' | 'Critical' | 'Improving';
  doctor: string;
  admissionDate: string;
}

const PatientMonitor: React.FC = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [filterStatus, setFilterStatus] = useState<string>('All');
  const [searchTerm, setSearchTerm] = useState<string>('');

  // 🔥 Fetch from Firestore
  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'patients'));
        const data: Patient[] = querySnapshot.docs.map((doc) => ({
          ...doc.data(),
        })) as Patient[];
        setPatients(data);
      } catch (error) {
        console.error('Error fetching patients:', error);
      }
    };

    fetchPatients();
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Admitted': return 'bg-blue-100 text-blue-800';
      case 'Treatment': return 'bg-yellow-100 text-yellow-800';
      case 'Recovery': return 'bg-green-100 text-green-800';
      case 'Discharge': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getConditionColor = (condition: string) => {
    switch (condition) {
      case 'Stable': return 'text-green-600';
      case 'Critical': return 'text-red-600';
      case 'Improving': return 'text-blue-600';
      default: return 'text-gray-600';
    }
  };

  const getConditionIcon = (condition: string) => {
    switch (condition) {
      case 'Stable': return CheckCircle;
      case 'Critical': return AlertTriangle;
      case 'Improving': return CheckCircle;
      default: return CheckCircle;
    }
  };

  // 🔍 Apply filters and search
  const filteredPatients = filterStatus === 'All'
    ? patients
    : patients.filter(p => p.status === filterStatus);

  const searchedPatients = filteredPatients.filter(p =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.id.includes(searchTerm)
  );

  const statusCounts = {
    total: patients.length,
    admitted: patients.filter(p => p.status === 'Admitted').length,
    treatment: patients.filter(p => p.status === 'Treatment').length,
    recovery: patients.filter(p => p.status === 'Recovery').length,
    critical: patients.filter(p => p.condition === 'Critical').length,
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Patient Status Monitor</h2>
        <p className="text-gray-600">Track indoor patient status and conditions</p>
      </div>

      {/* 📊 Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <div className="bg-white p-4 rounded-lg shadow-sm text-center">
          <Monitor className="h-6 w-6 mx-auto mb-2 text-gray-400" />
          <div className="text-xl font-bold text-gray-900">{statusCounts.total}</div>
          <div className="text-sm text-gray-600">Total Patients</div>
        </div>
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 text-center">
          <Bed className="h-6 w-6 mx-auto mb-2 text-blue-600" />
          <div className="text-xl font-bold text-blue-900">{statusCounts.admitted}</div>
          <div className="text-sm text-blue-600">Admitted</div>
        </div>
        <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200 text-center">
          <Clock className="h-6 w-6 mx-auto mb-2 text-yellow-600" />
          <div className="text-xl font-bold text-yellow-900">{statusCounts.treatment}</div>
          <div className="text-sm text-yellow-600">In Treatment</div>
        </div>
        <div className="bg-green-50 p-4 rounded-lg border border-green-200 text-center">
          <CheckCircle className="h-6 w-6 mx-auto mb-2 text-green-600" />
          <div className="text-xl font-bold text-green-900">{statusCounts.recovery}</div>
          <div className="text-sm text-green-600">Recovery</div>
        </div>
        <div className="bg-red-50 p-4 rounded-lg border border-red-200 text-center">
          <AlertTriangle className="h-6 w-6 mx-auto mb-2 text-red-600" />
          <div className="text-xl font-bold text-red-900">{statusCounts.critical}</div>
          <div className="text-sm text-red-600">Critical</div>
        </div>
      </div>

      {/* 🔍 Filter & Search */}
      <div className="bg-white rounded-lg shadow-sm p-4 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-gray-900">Filter Patients</h3>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-1 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="All">All Status</option>
            <option value="Admitted">Admitted</option>
            <option value="Treatment">Treatment</option>
            <option value="Recovery">Recovery</option>
            <option value="Discharge">Discharge</option>
          </select>
        </div>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search by name or ID"
          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
      </div>

      {/* 👥 Patient List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {searchedPatients.map((patient) => {
          const ConditionIcon = getConditionIcon(patient.condition);

          return (
            <div key={patient.id} className="bg-white rounded-lg shadow-sm p-4 border border-gray-100">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <User className="h-5 w-5 text-blue-600" />
                  <div>
                    <h4 className="font-medium text-gray-900">{patient.name}</h4>
                    <p className="text-sm text-gray-500">ID: {patient.id}</p>
                  </div>
                </div>
                <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(patient.status)}`}>
                  {patient.status}
                </span>
              </div>

              <div className="space-y-2 mb-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Room:</span>
                  <span className="font-medium">{patient.room}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Bed:</span>
                  <span className="font-medium">{patient.bed}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Doctor:</span>
                  <span className="font-medium">{patient.doctor}</span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                <div className={`flex items-center space-x-1 ${getConditionColor(patient.condition)}`}>
                  <ConditionIcon className="h-4 w-4" />
                  <span className="text-sm font-medium">{patient.condition}</span>
                </div>
                <span className="text-xs text-gray-500">
                  Admitted: {new Date(patient.admissionDate).toLocaleDateString('en-IN', {
                    year: 'numeric', month: 'short', day: 'numeric'
                  })}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* 🚫 Empty State */}
      {searchedPatients.length === 0 && (
        <div className="text-center py-12">
          <Monitor className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No patients found</h3>
          <p className="text-gray-500">No patients match the selected filter or search term</p>
        </div>
      )}
    </div>
  );
};

export default PatientMonitor;

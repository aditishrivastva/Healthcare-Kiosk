import React, { useState } from 'react';
import {
  Activity,
  Heart,
  Thermometer,
  Scale,
  Save,
  User,
  X,
} from 'lucide-react';
import { useLocalStorage } from '../hooks/useLocalStorage'; // Adjust path if needed

interface VitalReading {
  id: string;
  patientName: string;
  timestamp: string;
  readings: {
    height: number;
    weight: number;
    bmi: number;
    bloodPressure: string;
    heartRate: number;
    temperature: number;
    oxygenSaturation: number;
    bloodSugar: number;
  };
}

const VitalsChecker: React.FC = () => {
  const [readings, setReadings] = useLocalStorage<VitalReading[]>(
    'vitalReadings',
    []
  );
  const [patientName, setPatientName] = useState('');
  const [vitals, setVitals] = useState({
    height: 170,
    weight: 70,
    bmi: 24.2,
    systolic: 120,
    diastolic: 80,
    heartRate: 72,
    temperature: 98.6,
    oxygenSaturation: 98,
    bloodSugar: 90,
  });

  const vitalParameters = [
    { key: 'height', name: 'Height', unit: 'cm', icon: Scale, normal: '150-200', color: 'blue' },
    { key: 'weight', name: 'Weight', unit: 'kg', icon: Scale, normal: '40-120', color: 'green' },
    { key: 'bmi', name: 'BMI', unit: '', icon: Activity, normal: '18.5-25', color: 'purple' },
    { key: 'heartRate', name: 'Heart Rate', unit: 'bpm', icon: Heart, normal: '60-100', color: 'red' },
    { key: 'temperature', name: 'Temperature', unit: '°F', icon: Thermometer, normal: '97-99', color: 'orange' },
    { key: 'oxygenSaturation', name: 'Oxygen Sat', unit: '%', icon: Activity, normal: '95-100', color: 'teal' },
    { key: 'bloodSugar', name: 'Blood Sugar', unit: 'mg/dL', icon: Activity, normal: '70-100', color: 'indigo' },
  ];

  const handleInputChange = (key: string, value: number) => {
    setVitals((prev) => {
      const updated = { ...prev, [key]: value };
      if (key === 'weight' || key === 'height') {
        const heightInMeters = updated.height / 100;
        updated.bmi = parseFloat(
          (updated.weight / (heightInMeters * heightInMeters)).toFixed(1)
        );
      }
      return updated;
    });
  };

  const saveReadings = () => {
    if (!patientName) {
      alert('Please enter patient name');
      return;
    }

    const newReading: VitalReading = {
      id: Date.now().toString(),
      patientName,
      timestamp: new Date().toISOString(),
      readings: {
        height: vitals.height,
        weight: vitals.weight,
        bmi: vitals.bmi,
        bloodPressure: `${vitals.systolic}/${vitals.diastolic}`,
        heartRate: vitals.heartRate,
        temperature: vitals.temperature,
        oxygenSaturation: vitals.oxygenSaturation,
        bloodSugar: vitals.bloodSugar,
      },
    };

    setReadings([newReading, ...readings]);
    setPatientName('');
    alert('Vital readings saved successfully!');
  };

  const deleteReading = (id: string) => {
    const updated = readings.filter((reading) => reading.id !== id);
    setReadings(updated);
  };

  const getBMICategory = (bmi: number) => {
    if (bmi < 18.5) return { category: 'Underweight', color: 'text-blue-600' };
    if (bmi < 25) return { category: 'Normal', color: 'text-green-600' };
    if (bmi < 30) return { category: 'Overweight', color: 'text-yellow-600' };
    return { category: 'Obese', color: 'text-red-600' };
  };

  const bmiInfo = getBMICategory(vitals.bmi);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">
          BMI & Health Vitals Checker
        </h2>
        <p className="text-gray-600">
          Monitor 8 key health parameters including BMI calculation
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Form */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Patient Information
          </h3>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Patient Name
            </label>
            <input
              type="text"
              value={patientName}
              onChange={(e) => setPatientName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter patient name"
            />
          </div>

          <h4 className="font-medium text-gray-900 mb-4">Vital Parameters</h4>

          <div className="space-y-4">
            {vitalParameters.map((param) => {
              const Icon = param.icon;
              const value =
                param.key === 'bmi'
                  ? vitals.bmi
                  : vitals[param.key as keyof typeof vitals];

              return (
                <div key={param.key} className="flex items-center space-x-3">
                  <Icon className={`h-5 w-5 text-${param.color}-600`} />
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <label className="text-sm font-medium text-gray-700">
                        {param.name}
                      </label>
                      <span className="text-xs text-gray-500">
                        Normal: {param.normal}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input
                        type="number"
                        step="0.1"
                        value={value}
                        onChange={(e) =>
                          handleInputChange(
                            param.key,
                            parseFloat(e.target.value) || 0
                          )
                        }
                        disabled={param.key === 'bmi'}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
                      />
                      <span className="text-sm text-gray-600 w-12">
                        {param.unit}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Blood Pressure */}
            <div className="flex items-center space-x-3">
              <Heart className="h-5 w-5 text-red-600" />
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <label className="text-sm font-medium text-gray-700">
                    Blood Pressure
                  </label>
                  <span className="text-xs text-gray-500">
                    Normal: 90-140/60-90
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="number"
                    value={vitals.systolic}
                    onChange={(e) =>
                      handleInputChange(
                        'systolic',
                        parseInt(e.target.value) || 0
                      )
                    }
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Systolic"
                  />
                  <span className="text-gray-500">/</span>
                  <input
                    type="number"
                    value={vitals.diastolic}
                    onChange={(e) =>
                      handleInputChange(
                        'diastolic',
                        parseInt(e.target.value) || 0
                      )
                    }
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Diastolic"
                  />
                  <span className="text-sm text-gray-600 w-12">mmHg</span>
                </div>
              </div>
            </div>
          </div>

          {/* BMI Display */}
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">BMI Result</p>
                <p className="text-2xl font-bold text-gray-900">{vitals.bmi}</p>
              </div>
              <div className="text-right">
                <p className={`text-lg font-semibold ${bmiInfo.color}`}>
                  {bmiInfo.category}
                </p>
                <p className="text-xs text-gray-500">Category</p>
              </div>
            </div>
          </div>

          <button
            onClick={saveReadings}
            className="w-full mt-6 bg-sky-600 hover:bg-sky-800 text-white py-3 rounded-lg font-semibold transition-colors flex items-center justify-center space-x-2"
          >
            <Save className="h-4 w-4" />
            <span>Save Readings</span>
          </button>
        </div>

        {/* Recent Readings */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Recent Readings
          </h3>

          {readings.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <Activity className="h-12 w-12 mx-auto mb-4 text-gray-300" />
              <p>No readings recorded yet</p>
              <p className="text-sm">
                Take your first measurement to see history
              </p>
            </div>
          ) : (
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {readings.map((reading) => (
                <div
                  key={reading.id}
                  className="border rounded-lg p-4 relative group"
                >
                  {/* ❌ Delete icon */}
                  <button
                    onClick={() => deleteReading(reading.id)}
                    className="absolute top-2 right-2 text-gray-400 hover:text-red-600 transition-colors"
                    title="Remove"
                  >
                    <X className="w-4 h-4" />
                  </button>

                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-gray-900">
                      {reading.patientName}
                    </h4>
                    <span className="text-xs text-gray-500">
                      {new Date(reading.timestamp).toLocaleString()}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      BMI:{' '}
                      <span className="font-medium">
                        {reading.readings.bmi}
                      </span>
                    </div>
                    <div>
                      BP:{' '}
                      <span className="font-medium">
                        {reading.readings.bloodPressure}
                      </span>
                    </div>
                    <div>
                      HR:{' '}
                      <span className="font-medium">
                        {reading.readings.heartRate} bpm
                      </span>
                    </div>
                    <div>
                      Temp:{' '}
                      <span className="font-medium">
                        {reading.readings.temperature}°F
                      </span>
                    </div>
                    <div>
                      O2:{' '}
                      <span className="font-medium">
                        {reading.readings.oxygenSaturation}%
                      </span>
                    </div>
                    <div>
                      Sugar:{' '}
                      <span className="font-medium">
                        {reading.readings.bloodSugar} mg/dL
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VitalsChecker;

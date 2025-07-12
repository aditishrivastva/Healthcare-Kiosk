import React, { useState } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import db from '../firebase';
import { collection, addDoc } from 'firebase/firestore';

const SymptomChecker: React.FC = () => {
  const [symptom, setSymptom] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleCheck = async () => {
    if (!symptom.trim()) {
      setError('Please enter symptoms');
      return;
    }
    setError('');
    setLoading(true);
    setResult('');

    try {
      const response = await axios.post(import.meta.env.VITE_RAPIDAPI_URL!, {
        symptoms: symptom.split(',').map((s) => s.trim()),
        patientInfo: {
          age: 30,
          gender: 'male',
          height: 170,
          weight: 70,
          medicalHistory: [],
          currentMedications: [],
          allergies: [],
          lifestyle: {},
        },
        lang: 'en',
      }, {
        headers: {
          'X-RapidAPI-Key': import.meta.env.VITE_RAPIDAPI_KEY!,
          'X-RapidAPI-Host': import.meta.env.VITE_RAPIDAPI_HOST!,
        },
      });

      const jsonResult = JSON.stringify(response.data, null, 2);
      setResult(jsonResult);

      // Save to Firebase
      await addDoc(collection(db, 'diagnosisRecords'), {
        symptom,
        result: response.data,
        timestamp: new Date()
      });

    } catch (err) {
      console.error(err);
      setError('Failed to fetch data from API.');
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadPDF = () => {
    const element = document.getElementById('result-section');
    if (element) {
      html2canvas(element).then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF();
        pdf.addImage(imgData, 'PNG', 10, 10, 190, 180);
        pdf.save('symptom_diagnosis.pdf');
      });
    }
  };

  const renderResult = () => {
    if (!result) return null;

    const data = JSON.parse(result);
    const conditions = data.result?.analysis?.possibleConditions;

    return (
      <div id="result-section" className="bg-gray-100 p-8 rounded-2xl mt-8 shadow-inner">
        {conditions?.map((cond: any, idx: number) => (
          <div key={idx} className="mb-8">
            <h3 className="text-2xl font-bold text-blue-800">{cond.condition}</h3>
            <p className="text-lg text-gray-700 mb-3">
              <strong>Risk Level:</strong> {cond.riskLevel}
            </p>
            <p className="text-gray-600 mb-3 text-lg">{cond.description}</p>
            <h4 className="font-semibold text-xl text-gray-800 mb-2">Common Symptoms:</h4>
            <ul className="list-disc ml-6 text-lg text-gray-700">
              {cond.commonSymptoms.map((s: string, i: number) => <li key={i}>{s}</li>)}
            </ul>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="p-10 py-16 bg-white rounded-3xl shadow-2xl max-w-xl mx-auto">
      <h2 className="text-4xl font-extrabold mb-10 text-center text-gray-800">
        AI Symptom Checker
      </h2>
      <input
        type="text"
        placeholder="Enter symptoms, separated by commas"
        value={symptom}
        onChange={(e) => setSymptom(e.target.value)}
        className="w-full border-2 border-gray-400 p-5 rounded-2xl text-2xl mb-8 focus:outline-none focus:ring-4 focus:ring-blue-500"
      />
      <button
        onClick={handleCheck}
        className="bg-blue-700 text-white px-8 py-4 rounded-2xl w-full text-2xl font-semibold hover:bg-blue-800 transition-all duration-300"
      >
        {loading ? 'Checking...' : 'Check Symptom'}
      </button>
      {error && <p className="text-red-700 mt-5 text-center text-lg">{error}</p>}
      {renderResult()}
      {result && (
        <button
          onClick={handleDownloadPDF}
          className="bg-cyan-600 text-white px-8 py-4 rounded-2xl w-full mt-8 text-2xl font-semibold hover:bg-cyan-700 transition-all duration-300"
        >
          Download PDF Report
        </button>
      )}
    </div>
  );
};

export default SymptomChecker;

import React, { useState } from 'react';
import { Heart, Calendar, CreditCard, Monitor, Activity, BookOpen, Video, Stethoscope, SmileIcon} from 'lucide-react';
import BookingSystem from './components/BookingSystem';
import PaymentSystem from './components/PaymentSystem';
import PatientMonitor from './components/PatientMonitor';
import VitalsChecker from './components/VitalsChecker';
import HealthInfo from './components/HealthInfo';
import SimpleTeleconsultation from './components/SimpleTeleconsultation';
import SymptomChecker from './components/SymptomChecker';

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  const menuItems = [
    { id: 'home', name: 'Home', icon: Heart },
    { id: 'booking', name: 'Book Appointment', icon: Calendar },
    { id: 'payment', name: 'Payment', icon: CreditCard },
    { id: 'monitor', name: 'Patient Status', icon: Monitor },
    { id: 'vitals', name: 'Health Check', icon: Activity },
    { id: 'info', name: 'Health Info', icon: BookOpen },
    { id: 'consulting', name: 'video call', icon: Video },
    { id: 'symptom', name: 'AI Symptom Checker', icon: Stethoscope },
  ];

  const renderPage = () => {
    switch (currentPage) {
      case 'booking': return <BookingSystem />;
      case 'payment': return <PaymentSystem />;
      case 'monitor': return <PatientMonitor />;
      case 'vitals': return <VitalsChecker />;
      case 'info': return <HealthInfo />;
      case 'consulting': return <SimpleTeleconsultation />;
      case 'symptom': return <SymptomChecker />;
      default: return <HomePage onNavigate={setCurrentPage} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-gradient-to-r from-sky-600 to-cyan-300 rounded-lg p-6 text-white">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Heart className="h-8 w-8" />
            <div>
              <h1 className="text-xl font-bold">Healthcare Kiosk System</h1>
            </div>
          </div>
          <div className="text-sm">
            <p>"Empowering health access through technology — </p>
            <p> one touch, one test, one life at a time."</p>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto">
          <div className="flex space-x-0">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setCurrentPage(item.id)}
                  className={`flex items-center space-x-2 px-6 py-4 border-b-2 transition-colors ${
                    currentPage === item.id
                      ? 'border-blue-600 text-blue-600 bg-blue-50'
                      : 'border-transparent text-gray-600 hover:text-blue-600'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span className="text-sm font-medium">{item.name}</span>
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto p-6">
        {renderPage()}
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white p-4 mt-12">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-sm">Healthcare Kiosk  System</p>
          <p className="text-xs text-gray-400 mt-1">Smart kiosks. Smarter care. </p>
        </div>
      </footer>
    </div>
  );
}

// Home Page Component
const HomePage: React.FC<{ onNavigate: (page: string) => void }> = ({ onNavigate }) => {
  const features = [
    {
      id: 'booking',
      title: 'Appointment Booking',
      description: 'Schedule doctor appointments easily',
      icon: Calendar,
      color: 'bg-orange-300',
    },
    {
      id: 'payment',
      title: 'Payment Processing',
      description: 'Handle medical bill payments',
      icon: CreditCard,
      color: 'bg-emerald-300',
    },
    {
      id: 'monitor',
      title: 'Patient Monitoring',
      description: 'Track indoor patient status',
      icon: Monitor,
      color: 'bg-purple-300',
    },
    {
      id: 'vitals',
      title: 'Health Checkup',
      description: 'BMI calculator and vital signs',
      icon: Activity,
      color: 'bg-red-300',
    },
    {
      id: 'consulting',
      title: 'Teleconsultation',
      description: 'Teleconsultation with doctors',
      icon: Video,
      color: 'bg-cyan-400',
    },
    {
      id: 'symptom',
      title: 'AI Symptom Checker',
      description: 'Check symptoms using AI-powered system',
      icon: Stethoscope,
      color: 'bg-amber-300',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-white rounded-lg p-8 shadow-sm">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Welcome to Healthcare Kiosk System
        </h2>
        <p className="text-gray-600 mb-4">
          This is a digital healthcare Kiosk system 
          for hospitals and clinics in India. The system includes patient booking, 
          payment processing, health monitoring, and patient education features.
        </p>
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <p className="text-sm text-yellow-800">
            <strong><SmileIcon>SmileIcon</SmileIcon></strong> Smart care starts here — with privacy you can trust, bringing better healthcare to you.
          </p>
        </div>
      </div>

      {/* Feature Cards */}
      <div>
        <h3 className="text-xl font-semibold text-gray-900 mb-6">System Features</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <button
                key={feature.id}
                onClick={() => onNavigate(feature.id)}
                className={`${feature.color} text-white p-6 rounded-lg text-left hover:opacity-90 transition-opacity`}
              >
                <Icon className="h-8 w-8 mb-3" />
                <h4 className="text-lg font-semibold mb-2">{feature.title}</h4>
                <p className="text-sm opacity-90">{feature.description}</p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Project Info */}
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">“Did You Know?” – Healthcare Kiosk Edition</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium text-gray-900 mb-2">💡 Did You Know?</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Healthcare kiosks can reduce patient wait times by up to 60%.</li>
              <li>• Many kiosks now offer AI-powered symptom checkers.</li>
              <li>• Kiosks are used in over 50 countries for basic health services.</li>
              <li>• They can perform 24+ vitals checks in under 5 minutes.</li>
              <li>• Some kiosks now integrate telemedicine consultations.</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-gray-900 mb-2">Key Features:</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Patient appointment booking system</li>
              <li>• Multi-payment method support</li>
              <li>• Real-time patient status monitoring</li>
              <li>• Comprehensive health parameter tracking</li>
              <li>• Patient education and awareness</li>
               <li>• Teleconsultation with doctors</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
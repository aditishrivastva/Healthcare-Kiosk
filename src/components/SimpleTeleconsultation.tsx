import React, { useState, useEffect, useRef } from 'react';
import {
  Video,
  VideoOff,
  Mic,
  MicOff,
  Phone,
  User,
  Clock,
  Globe,
} from 'lucide-react';
import { collection, getDocs } from 'firebase/firestore';
import  db  from '../firebase';
import { useTranslation } from 'react-i18next';

interface Doctor {
  id: string;
  name: string;
  specialty: string;
  consultationFee: number;
  available: boolean;
}


const LANGUAGES = [
  { code: 'en', label: 'English' },
  { code: 'hi', label: 'हिंदी/Hindi' },
  { code: 'mr', label: 'मराठी/Marathi' },
  { code: 'gu', label: 'ગુજરાતી/Gujrati' },
  { code: 'ta', label: 'தமிழ்/Tamil' },
];

const SimpleTeleconsultation: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [isCallActive, setIsCallActive] = useState(false);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isAudioOn, setIsAudioOn] = useState(true);
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [callDuration, setCallDuration] = useState(0);
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const fetchDoctors = async () => {
      const querySnapshot = await getDocs(collection(db, 'doctors'));
      const docs: Doctor[] = querySnapshot.docs
      .map((doc) => ({ id: doc.id, ...(doc.data() as Omit<Doctor, 'id'>) }))
      .filter((doc) => doc.available === true);
      setDoctors(docs);
    };

    fetchDoctors();
  }, []);

  useEffect(() => {
    i18n.changeLanguage(selectedLanguage);
  }, [selectedLanguage, i18n]);

  useEffect(() => {
    let stream: MediaStream;
    if (isCallActive && isVideoOn) {
      navigator.mediaDevices
        .getUserMedia({ video: true, audio: true })
        .then((mediaStream) => {
          stream = mediaStream;
          if (videoRef.current) {
            videoRef.current.srcObject = mediaStream;
            videoRef.current.play();
          }
        })
        .catch((err) => console.error('Camera Error:', err));
    }

    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [isCallActive, isVideoOn]);

  const startCall = () => {
    setIsCallActive(true);
    const timer = setInterval(() => {
      setCallDuration((prev) => prev + 1);
    }, 1000);
    setTimeout(() => {
      clearInterval(timer);
      setIsCallActive(false);
      setCallDuration(0);
    }, 30000);
  };

  const endCall = () => {
    setIsCallActive(false);
    setCallDuration(0);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (isCallActive) {
    return (
      <div className="space-y-6">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <User className="w-6 h-6 text-green-600" />
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Live Consultation</h3>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4 text-gray-500" />
              <span className="font-mono">{formatTime(callDuration)}</span>
            </div>
          </div>
        </div>

        <div className="bg-gray-900 rounded-xl overflow-hidden relative h-96">
          <video ref={videoRef} className="w-full h-full object-cover" muted autoPlay playsInline />
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-4">
            <button
              onClick={() => setIsVideoOn(!isVideoOn)}
              className={`p-3 rounded-full ${isVideoOn ? 'bg-gray-600' : 'bg-red-600'} text-white`}
            >
              {isVideoOn ? <Video /> : <VideoOff />}
            </button>
            <button
              onClick={() => setIsAudioOn(!isAudioOn)}
              className={`p-3 rounded-full ${isAudioOn ? 'bg-gray-600' : 'bg-red-600'} text-white`}
            >
              {isAudioOn ? <Mic /> : <MicOff />}
            </button>
            <button
              onClick={endCall}
              className="p-3 rounded-full bg-red-600 text-white"
            >
              <Phone />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">{t('Video Consultation')}</h2>
        <div className="flex items-center bg-blue-100 px-3 py-2 rounded-lg space-x-1">
        <Globe className="w-5 h-5 text-blue-700" />
        <select
          value={selectedLanguage}
          onChange={(e) => setSelectedLanguage(e.target.value)}
          className="bg-blue-100 px-4 py-2 rounded-lg pl-1"
        > 
        
          {LANGUAGES.map((lang) => (
            <option key={lang.code} value={lang.code}>
              {lang.label}
            </option>
          ))}
        </select>
      </div>
    </div>

      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">{t('Available Doctors')}</h3>
        <div className="space-y-4">
          {doctors.map((doctor) => (
            <div
              key={doctor.id}
              className="p-4 border rounded-lg flex items-center justify-between bg-lime-100 border-lime-200"
            >
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-lime-500 rounded-full flex items-center justify-center">
                  <User className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">{doctor.name}</h4>
                  <p className="text-gray-600 text-sm">{doctor.specialty}</p>
                  <p className="text-sm text-gray-500">{t('Fee')}: ₹{doctor.consultationFee}</p>
                </div>
              </div>
              <button
                onClick={startCall}
                className="bg-sky-500 hover:bg-sky-800 text-white px-4 py-2 rounded-lg"
              >
                {t('Start Call')}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SimpleTeleconsultation;
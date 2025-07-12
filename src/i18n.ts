// src/i18n.ts
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: {
      "Video Consultation": "Video Consultation",
      "Available Doctors": "Available Doctors",
      "Fee": "Fee",
      "Start Call": "Start Call",
    },
  },
  hi: {
    translation: {
      "Video Consultation": "वीडियो परामर्श",
      "Available Doctors": "उपलब्ध डॉक्टर",
      "Fee": "शुल्क",
      "Start Call": "कॉल शुरू करें",
    },
  },
  mr: {
    translation: {
      "Video Consultation": "व्हिडिओ सल्लामसलत",
      "Available Doctors": "उपलब्ध डॉक्टर",
      "Fee": "फी",
      "Start Call": "कॉल सुरू करा",
    },
  },
  gu: {
    translation: {
      "Video Consultation": "વિડિયો કન્સલ્ટેશન",
      "Available Doctors": "ઉપલબ્ધ ડૉક્ટરો",
      "Fee": "ફી",
      "Start Call": "કોલ શરૂ કરો",
    },
  },
  ta: {
    translation: {
      "Video Consultation": "வீடியோ ஆலோசனை",
      "Available Doctors": "கிடைக்கக்கூடிய டாக்டர்கள்",
      "Fee": "கட்டணம்",
      "Start Call": "காலத்தை தொடங்கு",
    },
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    interpolation: { escapeValue: false },
  });

export default i18n;

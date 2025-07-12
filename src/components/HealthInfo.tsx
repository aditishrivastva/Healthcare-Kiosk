import React, { useState } from 'react';
import { BookOpen, Heart, Utensils, Activity, Shield, Info } from 'lucide-react';

const HealthInfo: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('general');

  const categories = [
    { id: 'general', name: 'General Health', icon: Heart, color: 'bg-red-500' },
    { id: 'nutrition', name: 'Nutrition', icon: Utensils, color: 'bg-green-500' },
    { id: 'exercise', name: 'Exercise', icon: Activity, color: 'bg-blue-500' },
    { id: 'prevention', name: 'Prevention', icon: Shield, color: 'bg-purple-500' },
  ];

  const healthContent = {
    general: [
      {
        title: 'Importance of Hydration',
        content: 'Drinking adequate water is essential for maintaining good health. Adults should drink at least 8 glasses of water daily.',
        tips: [
          'Drink water first thing in the morning',
          'Keep a water bottle with you',
          'Set reminders to drink water',
          'Eat water-rich foods like fruits'
        ]
      },
      {
        title: 'Quality Sleep',
        content: 'Getting 7-9 hours of quality sleep is crucial for physical and mental well-being.',
        tips: [
          'Maintain a regular sleep schedule',
          'Create a comfortable sleep environment',
          'Avoid screens before bedtime',
          'Practice relaxation techniques'
        ]
      }
    ],
    nutrition: [
      {
        title: 'Balanced Diet',
        content: 'A balanced diet includes a variety of foods from all food groups in appropriate proportions.',
        tips: [
          'Include fruits and vegetables in every meal',
          'Choose whole grains over refined grains',
          'Include lean proteins',
          'Limit processed foods and sugar'
        ]
      },
      {
        title: 'Portion Control',
        content: 'Eating the right amount of food is as important as eating the right types of food.',
        tips: [
          'Use smaller plates and bowls',
          'Listen to your hunger cues',
          'Eat slowly and mindfully',
          'Stop eating when you feel satisfied'
        ]
      }
    ],
    exercise: [
      {
        title: 'Daily Physical Activity',
        content: 'Regular physical activity is essential for maintaining good health and preventing chronic diseases.',
        tips: [
          'Aim for 150 minutes of moderate exercise weekly',
          'Include both cardio and strength training',
          'Start slowly and gradually increase intensity',
          'Find activities you enjoy'
        ]
      },
      {
        title: 'Simple Exercises',
        content: 'You don\'t need a gym membership to stay active. Simple exercises can be done anywhere.',
        tips: [
          'Take stairs instead of elevators',
          'Walk or bike for short trips',
          'Do bodyweight exercises at home',
          'Take regular breaks from sitting'
        ]
      }
    ],
    prevention: [
      {
        title: 'Regular Health Checkups',
        content: 'Regular health screenings can help detect health problems early when they are easier to treat.',
        tips: [
          'Schedule annual physical exams',
          'Get recommended health screenings',
          'Monitor your vital signs regularly',
          'Keep track of your health history'
        ]
      },
      {
        title: 'Hand Hygiene',
        content: 'Proper hand hygiene is one of the most effective ways to prevent the spread of infections.',
        tips: [
          'Wash hands with soap for at least 20 seconds',
          'Use hand sanitizer when soap is not available',
          'Avoid touching your face with unwashed hands',
          'Clean frequently touched surfaces regularly'
        ]
      }
    ]
  };

  const selectedContent = healthContent[selectedCategory as keyof typeof healthContent];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Health Information & Awareness</h2>
        <p className="text-gray-600">Educational content for better health understanding</p>
      </div>

      {/* Quick Tips */}
      <div className="bg-gradient-to-r from-rose-300 to-rose-200 rounded-lg p-6 text-white">
        <h3 className="text-xl font-bold mb-4">Daily Health Tips</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white/20 rounded-lg p-4">
            <p className="font-medium">💧 Drink 8 glasses of water daily</p>
          </div>
          <div className="bg-white/20 rounded-lg p-4">
            <p className="font-medium">🚶‍♀️ Take a 10-minute walk after meals</p>
          </div>
          <div className="bg-white/20 rounded-lg p-4">
            <p className="font-medium">🥗 Add vegetables to every meal</p>
          </div>
          <div className="bg-white/20 rounded-lg p-4">
            <p className="font-medium">😴 Get 7-9 hours of sleep nightly</p>
          </div>
        </div>
      </div>

      {/* Category Selection */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Health Topics</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.map((category) => {
            const Icon = category.icon;
            const isActive = selectedCategory === category.id;
            
            return (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`p-4 rounded-lg border-2 transition-colors ${
                  isActive
                    ? `${category.color} bg-opacity-10 border-current text-current`
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <Icon className={`h-8 w-8 mx-auto mb-2 ${isActive ? '' : 'text-gray-400'}`} />
                <p className="font-medium text-sm">{category.name}</p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Content Display */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {selectedContent.map((item, index) => (
          <div key={index} className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center space-x-2 mb-4">
              <Info className="h-6 w-6 text-blue-600" />
              <h3 className="text-lg font-semibold text-gray-900">{item.title}</h3>
            </div>
            
            <p className="text-gray-700 mb-4 leading-relaxed">{item.content}</p>
            
            <div className="bg-blue-50 rounded-lg p-4">
              <h4 className="font-medium text-blue-900 mb-2">Practical Tips:</h4>
              <ul className="space-y-1">
                {item.tips.map((tip, tipIndex) => (
                  <li key={tipIndex} className="flex items-start space-x-2">
                    <span className="text-blue-600 mt-1">•</span>
                    <span className="text-blue-800 text-sm">{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      {/* Emergency Information */}
      <div className="bg-red-50 rounded-lg p-6 border border-red-200">
        <div className="flex items-center space-x-2 mb-4">
          <Shield className="h-6 w-6 text-red-600" />
          <h3 className="text-lg font-semibold text-red-900">Emergency Information</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-lg p-4">
            <h4 className="font-medium text-red-900 mb-2">Emergency Contacts</h4>
            <div className="space-y-1 text-sm">
              <p>🚑 Ambulance: <strong>108</strong></p>
              <p>👮 Police: <strong>100</strong></p>
              <p>🔥 Fire: <strong>101</strong></p>
            </div>
          </div>
          
          <div className="bg-white rounded-lg p-4">
            <h4 className="font-medium text-red-900 mb-2">Warning Signs</h4>
            <div className="space-y-1 text-sm text-red-800">
              <p>• Chest pain or pressure</p>
              <p>• Difficulty breathing</p>
              <p>• Severe headache</p>
              <p>• Loss of consciousness</p>
            </div>
          </div>
          
          <div className="bg-white rounded-lg p-4">
            <h4 className="font-medium text-red-900 mb-2">First Aid Basics</h4>
            <div className="space-y-1 text-sm text-red-800">
              <p>• Call for help immediately</p>
              <p>• Keep the person calm</p>
              <p>• Don't move injured person</p>
              <p>• Apply pressure to bleeding</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HealthInfo;
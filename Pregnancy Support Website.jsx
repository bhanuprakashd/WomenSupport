function App() {
  const [activeTab, setActiveTab] = React.useState('tracker');
  const [currentWeek, setCurrentWeek] = React.useState(20);
  const [kickCount, setKickCount] = React.useState(0);
  const [mood, setMood] = React.useState('😊');
  const [currentNameIndex, setCurrentNameIndex] = React.useState(0);
  const [likedNames, setLikedNames] = React.useState([]);
  const [wheelSpinning, setWheelSpinning] = React.useState(false);
  const [prediction, setPrediction] = React.useState('');
  const [lastPeriodDate, setLastPeriodDate] = React.useState('');
  const [estimatedDeliveryDate, setEstimatedDeliveryDate] = React.useState('');
  const [prominentFigures, setProminentFigures] = React.useState([]);
  const [expandedFaq, setExpandedFaq] = React.useState(null);
  const [selectedTrimester, setSelectedTrimester] = React.useState(1);
  const [selectedSymptom, setSelectedSymptom] = React.useState('');
  const [waterGlasses, setWaterGlasses] = React.useState(0);

  const hinduBoyNames = [
    'Aarav', 'Vivaan', 'Aditya', 'Vihaan', 'Arjun', 'Sai', 'Reyansh', 'Ayaan', 'Krishna', 'Ishaan',
    'Shaurya', 'Atharv', 'Advik', 'Pranav', 'Vedant', 'Kabir', 'Shivansh', 'Abhinav', 'Rudra', 'Samarth'
  ];

  const hinduGirlNames = [
    'Aadhya', 'Ananya', 'Diya', 'Kavya', 'Anika', 'Saanvi', 'Priya', 'Riya', 'Kiara', 'Myra',
    'Sara', 'Avni', 'Pari', 'Ira', 'Tara', 'Nisha', 'Meera', 'Siya', 'Arya', 'Zara'
  ];

  const allNames = [...hinduBoyNames, ...hinduGirlNames];

  // Famous figures data
  const famousFigures = {
    1: { 1: ['J.D. Salinger', 'Betsy Ross'], 15: ['Martin Luther King Jr.'], 26: ['Republic Day India'], 30: ['Mahatma Gandhi'] },
    2: { 12: ['Abraham Lincoln', 'Charles Darwin'], 14: ['Valentine\'s Day'], 22: ['George Washington'] },
    3: { 8: ['International Women\'s Day'], 14: ['Albert Einstein'], 21: ['World Poetry Day'] },
    4: { 14: ['B.R. Ambedkar', 'Shah Rukh Khan'], 22: ['Earth Day'], 28: ['Jessica Alba'] },
    5: { 1: ['Labour Day'], 12: ['Florence Nightingale'], 26: ['John Wayne'] },
    6: { 5: ['World Environment Day'], 21: ['International Yoga Day'], 27: ['Helen Keller'] },
    7: { 4: ['Independence Day USA'], 15: ['Rembrandt'], 26: ['Mick Jagger'] },
    8: { 15: ['Independence Day India'], 25: ['Sean Connery'], 29: ['Michael Jackson'] },
    9: { 2: ['Keanu Reeves'], 15: ['Agatha Christie'], 26: ['Serena Williams'] },
    10: { 2: ['Mahatma Gandhi'], 14: ['Dwight Eisenhower'], 31: ['Halloween'] },
    11: { 14: ['Children\'s Day India'], 19: ['Indira Gandhi'], 26: ['Thanksgiving USA'] },
    12: { 7: ['Pearl Harbor Day'], 25: ['Christmas Day'], 31: ['New Year\'s Eve'] }
  };

  // FAQ Data
  const faqData = [
    {
      category: "Early Pregnancy",
      questions: [
        { q: "What are the earliest signs of pregnancy?", a: "Missed period, nausea, breast tenderness, fatigue, frequent urination, and mood changes." },
        { q: "When should I take a pregnancy test?", a: "After you've missed your period for the most accurate results." },
        { q: "Is cramping normal in early pregnancy?", a: "Mild cramping is normal, but severe cramping with bleeding should be evaluated by a doctor." }
      ]
    },
    {
      category: "Nutrition & Diet",
      questions: [
        { q: "What foods should I avoid?", a: "Raw meats, high mercury fish, unpasteurized dairy, raw eggs, alcohol, and limit caffeine." },
        { q: "How much weight should I gain?", a: "Depends on pre-pregnancy BMI: Normal weight 25-35 lbs, consult your doctor." },
        { q: "Do I need prenatal vitamins?", a: "Yes, they provide essential nutrients like folic acid, iron, calcium, and DHA." }
      ]
    },
    {
      category: "Health & Safety",
      questions: [
        { q: "Is exercise safe during pregnancy?", a: "Yes, moderate exercise like walking, swimming, and prenatal yoga is beneficial." },
        { q: "Can I travel during pregnancy?", a: "Generally safe, especially in second trimester. Avoid travel after 36 weeks." },
        { q: "What medications are safe?", a: "Always consult your doctor. Generally safe: acetaminophen. Avoid: aspirin, ibuprofen." }
      ]
    }
  ];

  // Symptom checker
  const symptomChecker = {
    "Morning Sickness": {
      description: "Nausea and vomiting, especially in the first trimester",
      remedies: ["Eat small, frequent meals", "Try ginger tea", "Avoid strong odors", "Get plenty of rest"],
      whenToCall: "If you can't keep fluids down for 24 hours"
    },
    "Back Pain": {
      description: "Common due to weight gain and posture changes",
      remedies: ["Use proper posture", "Wear supportive shoes", "Sleep with pillow between knees"],
      whenToCall: "If pain is severe or affects daily activities"
    },
    "Heartburn": {
      description: "Burning sensation in chest, common in later pregnancy",
      remedies: ["Eat smaller meals", "Avoid spicy foods", "Don't lie down after eating"],
      whenToCall: "If antacids don't help or symptoms worsen"
    },
    "Swelling": {
      description: "Mild swelling in feet and ankles is normal",
      remedies: ["Elevate feet", "Wear compression socks", "Stay hydrated"],
      whenToCall: "If swelling is sudden, severe, or affects face and hands"
    }
  };

  const calculateDeliveryDate = (lmpDate) => {
    if (!lmpDate) return '';
    const lmp = new Date(lmpDate);
    const deliveryDate = new Date(lmp);
    deliveryDate.setDate(deliveryDate.getDate() + 280);
    return deliveryDate;
  };

  const getProminentFigures = (date) => {
    if (!date) return [];
    const month = date.getMonth() + 1;
    const day = date.getDate();
    
    if (famousFigures[month] && famousFigures[month][day]) {
      return famousFigures[month][day];
    }
    
    const monthData = famousFigures[month];
    if (monthData) {
      const availableDays = Object.keys(monthData).map(Number).sort((a, b) => a - b);
      const closestDay = availableDays.reduce((prev, curr) => 
        Math.abs(curr - day) < Math.abs(prev - day) ? curr : prev
      );
      return monthData[closestDay] || [];
    }
    return [];
  };

  const handleDateChange = (date) => {
    setLastPeriodDate(date);
    const deliveryDate = calculateDeliveryDate(date);
    setEstimatedDeliveryDate(deliveryDate);
    
    if (deliveryDate) {
      const figures = getProminentFigures(deliveryDate);
      setProminentFigures(figures);
      
      const today = new Date();
      const lmp = new Date(date);
      const daysDiff = Math.floor((today - lmp) / (1000 * 60 * 60 * 24));
      const weeks = Math.floor(daysDiff / 7);
      setCurrentWeek(Math.max(1, Math.min(40, weeks)));
    }
  };

  const formatDate = (date) => {
    if (!date) return '';
    return date.toLocaleDateString('en-IN', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const addKick = () => setKickCount(kickCount + 1);
  const resetKicks = () => setKickCount(0);
  const addWater = () => setWaterGlasses(Math.min(10, waterGlasses + 1));

  const nextName = () => setCurrentNameIndex((currentNameIndex + 1) % allNames.length);
  const likeName = () => {
    const currentName = allNames[currentNameIndex];
    if (!likedNames.includes(currentName)) {
      setLikedNames([...likedNames, currentName]);
    }
    nextName();
  };

  const spinWheel = () => {
    setWheelSpinning(true);
    setTimeout(() => {
      const predictions = ['It\'s a Boy! 💙', 'It\'s a Girl! 💗', 'Surprise! 🎉'];
      setPrediction(predictions[Math.floor(Math.random() * predictions.length)]);
      setWheelSpinning(false);
    }, 2000);
  };

  const openVideo = (url) => window.open(url, '_blank');
  const toggleFaq = (index) => setExpandedFaq(expandedFaq === index ? null : index);

  const TabButton = ({ id, label, icon }) => (
    <button
      onClick={() => setActiveTab(id)}
      className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all ${
        activeTab === id
          ? 'bg-pink-500 text-white shadow-lg'
          : 'bg-white text-gray-600 hover:bg-pink-50'
      }`}
    >
      <div className="flex flex-col items-center">
        <span className="text-xl mb-1">{icon}</span>
        <span className="text-sm">{label}</span>
      </div>
    </button>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 to-purple-100">
      <div className="container mx-auto px-4 py-6">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-pink-600 mb-2">🤱 Pregnancy Support Hub</h1>
          <p className="text-gray-600">Your comprehensive companion through this beautiful journey</p>
          <div className="mt-4 flex justify-center space-x-4 text-sm text-gray-500">
            <span>📱 Mobile Friendly</span>
            <span>👩‍⚕️ Expert Approved</span>
            <span>🔒 Safe & Secure</span>
          </div>
        </header>

        <nav className="flex flex-wrap space-x-1 mb-8 bg-white p-2 rounded-xl shadow-lg">
          <TabButton id="tracker" label="Tracker" icon="📊" />
          <TabButton id="guide" label="Guide" icon="📚" />
          <TabButton id="nutrition" label="Nutrition" icon="🥗" />
          <TabButton id="symptoms" label="Symptoms" icon="🩺" />
          <TabButton id="faq" label="FAQ" icon="❓" />
          <TabButton id="games" label="Games" icon="🎮" />
          <TabButton id="videos" label="Videos" icon="📹" />
          <TabButton id="hospitals" label="Hospitals" icon="🏥" />
        </nav>

        {activeTab === 'tracker' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h2 className="text-2xl font-bold text-pink-600 mb-4">📅 Pregnancy Calculator</h2>
              
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Last Menstrual Period Date:
                </label>
                <input
                  type="date"
                  value={lastPeriodDate}
                  onChange={(e) => handleDateChange(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500"
                />
              </div>

              {estimatedDeliveryDate && (
                <div className="bg-gradient-to-r from-pink-50 to-purple-50 p-4 rounded-lg mb-4">
                  <h3 className="text-lg font-semibold text-pink-600 mb-2">🎯 Estimated Delivery Date</h3>
                  <p className="text-xl font-bold text-gray-800">{formatDate(estimatedDeliveryDate)}</p>
                  <p className="text-sm text-gray-600 mt-1">You are currently in week {currentWeek} of pregnancy</p>
                  <div className="mt-3 bg-white p-3 rounded-lg">
                    <div className="flex justify-between text-xs text-gray-500 mb-1">
                      <span>Week 1</span>
                      <span>Week 40</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-pink-400 to-purple-500 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${(currentWeek / 40) * 100}%` }}
                      ></div>
                    </div>
                    <p className="text-center text-sm text-gray-600 mt-2">{Math.round((currentWeek / 40) * 100)}% Complete</p>
                  </div>
                </div>
              )}

              {prominentFigures.length > 0 && (
                <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-4 rounded-lg">
                  <h3 className="text-lg font-semibold text-orange-600 mb-2">⭐ Famous People Born on This Day</h3>
                  <ul className="space-y-1">
                    {prominentFigures.map((figure, index) => (
                      <li key={index} className="text-gray-700 flex items-center">
                        <span className="text-orange-500 mr-2">🌟</span>
                        {figure}
                      </li>
                    ))}
                  </ul>
                  <p className="text-xs text-gray-500 mt-2">Your baby will share their special day! ✨</p>
                </div>
              )}
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <h3 className="text-xl font-bold text-pink-600 mb-4">👶 Baby Kick Counter</h3>
                <div className="text-center">
                  <div className="text-6xl font-bold text-pink-500 mb-4">{kickCount}</div>
                  <p className="text-gray-600 mb-4">Kicks today</p>
                  <div className="space-y-2">
                    <button
                      onClick={addKick}
                      className="w-full bg-pink-500 text-white px-6 py-3 rounded-lg hover:bg-pink-600 transition-colors"
                    >
                      Add Kick 👶
                    </button>
                    <button
                      onClick={resetKicks}
                      className="w-full bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-600 transition-colors"
                    >
                      Reset
                    </button>
                  </div>
                  <p className="text-xs text-gray-500 mt-3">💡 Tip: Count kicks when baby is most active</p>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-lg">
                <h3 className="text-xl font-bold text-pink-600 mb-4">😊 Mood Tracker</h3>
                <div className="text-center">
                  <div className="text-6xl mb-4">{mood}</div>
                  <p className="text-gray-600 mb-4">How are you feeling today?</p>
                  <div className="flex justify-center space-x-2">
                    {['😊', '😴', '😰', '🤗', '😢'].map((emoji) => (
                      <button
                        key={emoji}
                        onClick={() => setMood(emoji)}
                        className={`text-3xl p-2 rounded-lg transition-all ${
                          mood === emoji ? 'bg-pink-100 scale-110' : 'hover:bg-gray-100'
                        }`}
                      >
                        {emoji}
                      </button>
                    ))}
                  </div>
                  <p className="text-xs text-gray-500 mt-3">💡 Track your emotional wellness</p>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-lg">
                <h3 className="text-xl font-bold text-pink-600 mb-4">💧 Water Intake</h3>
                <div className="text-center">
                  <div className="text-4xl mb-4">🚰</div>
                  <p className="text-gray-600 mb-4">Daily Goal: 8-10 glasses</p>
                  <div className="grid grid-cols-5 gap-1 mb-4">
                    {[...Array(10)].map((_, i) => (
                      <div 
                        key={i} 
                        className={`w-6 h-8 rounded border ${
                          i < waterGlasses ? 'bg-blue-400 border-blue-500' : 'bg-blue-100 border-blue-200'
                        }`}
                      ></div>
                    ))}
                  </div>
                  <button 
                    onClick={addWater}
                    className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                  >
                    Add Glass 💧
                  </button>
                  <p className="text-xs text-gray-500 mt-3">💡 Stay hydrated for healthy pregnancy</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'guide' && (
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <h2 className="text-2xl font-bold text-pink-600 mb-6">📚 Pregnancy Guide by Trimester</h2>
            
            <div className="flex space-x-2 mb-6">
              {[1, 2, 3].map((trimester) => (
                <button
                  key={trimester}
                  onClick={() => setSelectedTrimester(trimester)}
                  className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all ${
                    selectedTrimester === trimester
                      ? 'bg-purple-500 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-600 hover:bg-purple-50'
                  }`}
                >
                  Trimester {trimester}
                </button>
              ))}
            </div>

            <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-lg">
              <h3 className="text-xl font-bold text-purple-600 mb-4">
                {selectedTrimester === 1 && "First Trimester (Weeks 1-12)"}
                {selectedTrimester === 2 && "Second Trimester (Weeks 13-27)"}
                {selectedTrimester === 3 && "Third Trimester (Weeks 28-40)"}
              </h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white p-4 rounded-lg">
                  <h4 className="font-semibold text-purple-600 mb-3">Key Developments</h4>
                  {selectedTrimester === 1 && (
                    <ul className="space-y-2 text-sm">
                      <li>• Neural tube forms (Week 4)</li>
                      <li>• Heart begins to beat (Week 6)</li>
                      <li>• Major organs developing (Week 8)</li>
                      <li>• All organs present (Week 12)</li>
                    </ul>
                  )}
                  {selectedTrimester === 2 && (
                    <ul className="space-y-2 text-sm">
                      <li>• Gender can be determined (Week 14)</li>
                      <li>• First movements felt (Week 16)</li>
                      <li>• Hearing develops (Week 18)</li>
                      <li>• Halfway point! (Week 20)</li>
                    </ul>
                  )}
                  {selectedTrimester === 3 && (
                    <ul className="space-y-2 text-sm">
                      <li>• Rapid brain development (Week 28)</li>
                      <li>• Bones hardening (Week 32)</li>
                      <li>• Considered full-term soon (Week 36)</li>
                      <li>• Ready for birth (Week 38-40)</li>
                    </ul>
                  )}
                </div>
                
                <div className="bg-white p-4 rounded-lg">
                  <h4 className="font-semibold text-purple-600 mb-3">Common Symptoms & Tips</h4>
                  {selectedTrimester === 1 && (
                    <div className="text-sm space-y-2">
                      <p><strong>Symptoms:</strong> Morning sickness, fatigue, breast tenderness</p>
                      <p><strong>Tips:</strong> Take prenatal vitamins, get plenty of rest, stay hydrated</p>
                    </div>
                  )}
                  {selectedTrimester === 2 && (
                    <div className="text-sm space-y-2">
                      <p><strong>Symptoms:</strong> Increased appetite, round ligament pain, heartburn</p>
                      <p><strong>Tips:</strong> Continue prenatal care, start thinking about baby gear</p>
                    </div>
                  )}
                  {selectedTrimester === 3 && (
                    <div className="text-sm space-y-2">
                      <p><strong>Symptoms:</strong> Back pain, swelling, difficulty sleeping</p>
                      <p><strong>Tips:</strong> Pack hospital bag, finalize birth plan, rest when possible</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'nutrition' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h2 className="text-2xl font-bold text-pink-600 mb-6">🥗 Nutrition Guide</h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-green-600 mb-3">✅ Recommended Foods</h3>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                      <img src="https://placehold.co/60x60/228B22/FFFFFF?text=🥬" alt="Leafy Greens" className="rounded-lg" />
                      <div>
                        <p className="font-medium">Leafy Greens</p>
                        <p className="text-sm text-gray-600">Rich in folate and iron</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                      <img src="https://placehold.co/60x60/87CEEB/FFFFFF?text=🥛" alt="Dairy" className="rounded-lg" />
                      <div>
                        <p className="font-medium">Dairy Products</p>
                        <p className="text-sm text-gray-600">Calcium for bone development</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                      <img src="https://placehold.co/60x60/CD853F/FFFFFF?text=🍗" alt="Protein" className="rounded-lg" />
                      <div>
                        <p className="font-medium">Lean Proteins</p>
                        <p className="text-sm text-gray-600">Essential amino acids</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-red-600 mb-3">❌ Foods to Avoid</h3>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3 p-3 bg-red-50 rounded-lg">
                      <img src="https://placehold.co/60x60/DC143C/FFFFFF?text=🍣" alt="Raw Fish" className="rounded-lg" />
                      <div>
                        <p className="font-medium">Raw Fish & Sushi</p>
                        <p className="text-sm text-gray-600">Risk of bacterial infection</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 p-3 bg-red-50 rounded-lg">
                      <img src="https://placehold.co/60x60/8B0000/FFFFFF?text=🍷" alt="Alcohol" className="rounded-lg" />
                      <div>
                        <p className="font-medium">Alcohol</p>
                        <p className="text-sm text-gray-600">Can harm baby's development</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 p-3 bg-red-50 rounded-lg">
                      <img src="https://placehold.co/60x60/A0522D/FFFFFF?text=☕" alt="Caffeine" className="rounded-lg" />
                      <div>
                        <p className="font-medium">Excessive Caffeine</p>
                        <p className="text-sm text-gray-600">Limit to 200mg per day</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'symptoms' && (
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <h2 className="text-2xl font-bold text-pink-600 mb-6">🩺 Symptom Checker</h2>
            
            <div className="mb-6">
              <select
                value={selectedSymptom}
                onChange={(e) => setSelectedSymptom(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500"
              >
                <option value="">Choose a symptom...</option>
                {Object.keys(symptomChecker).map((symptom) => (
                  <option key={symptom} value={symptom}>{symptom}</option>
                ))}
              </select>
            </div>

            {selectedSymptom && (
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg">
                <h3 className="text-xl font-bold text-blue-600 mb-3">{selectedSymptom}</h3>
                <p className="text-gray-700 mb-4">{symptomChecker[selectedSymptom].description}</p>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-green-600 mb-3">💡 Remedies</h4>
                    <div className="bg-white p-4 rounded-lg">
                      <ul className="space-y-2">
                        {symptomChecker[selectedSymptom].remedies.map((remedy, index) => (
                          <li key={index} className="flex items-center text-gray-700">
                            <span className="text-green-500 mr-2">✓</span>
                            {remedy}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-red-600 mb-3">🚨 When to Call Doctor</h4>
                    <div className="bg-white p-4 rounded-lg">
                      <p className="text-gray-700">{symptomChecker[selectedSymptom].whenToCall}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'faq' && (
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <h2 className="text-2xl font-bold text-pink-600 mb-6">❓ Frequently Asked Questions</h2>
            
            <div className="space-y-4">
              {faqData.map((category, categoryIndex) => (
                <div key={categoryIndex} className="border border-gray-200 rounded-lg overflow-hidden">
                  <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4">
                    <h3 className="text-lg font-semibold text-purple-600">{category.category}</h3>
                  </div>
                  <div className="divide-y divide-gray-200">
                    {category.questions.map((faq, faqIndex) => {
                      const globalIndex = categoryIndex * 100 + faqIndex;
                      return (
                        <div key={faqIndex}>
                          <button
                            onClick={() => toggleFaq(globalIndex)}
                            className="w-full p-4 text-left hover:bg-gray-50 transition-colors"
                          >
                            <div className="flex justify-between items-center">
                              <h4 className="font-medium text-gray-800">{faq.q}</h4>
                              <span className={`transform transition-transform ${
                                expandedFaq === globalIndex ? 'rotate-180' : ''
                              }`}>
                                ▼
                              </span>
                            </div>
                          </button>
                          {expandedFaq === globalIndex && (
                            <div className="px-4 pb-4">
                              <p className="text-gray-600">{faq.a}</p>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'games' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h2 className="text-2xl font-bold text-pink-600 mb-6">👶 Baby Name Game</h2>
              <div className="text-center">
                <div className="text-4xl font-bold text-purple-600 mb-4">{allNames[currentNameIndex]}</div>
                <p className="text-gray-600 mb-6">Do you like this name for your baby?</p>
                <div className="space-x-4">
                  <button
                    onClick={likeName}
                    className="bg-green-500 text-white px-8 py-3 rounded-lg hover:bg-green-600 transition-colors"
                  >
                    💚 Love it!
                  </button>
                  <button
                    onClick={nextName}
                    className="bg-gray-500 text-white px-8 py-3 rounded-lg hover:bg-gray-600 transition-colors"
                  >
                    ⏭️ Next
                  </button>
                </div>
                {likedNames.length > 0 && (
                  <div className="mt-6 p-4 bg-green-50 rounded-lg">
                    <h3 className="font-semibold text-green-600 mb-2">Your Favorite Names:</h3>
                    <div className="flex flex-wrap gap-2">
                      {likedNames.map((name, index) => (
                        <span key={index} className="bg-green-200 text-green-800 px-3 py-1 rounded-full text-sm">
                          {name}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h2 className="text-2xl font-bold text-pink-600 mb-6">🎯 Gender Prediction Wheel</h2>
              <div className="text-center">
                <div className={`w-32 h-32 mx-auto mb-6 rounded-full border-8 border-pink-300 flex items-center justify-center text-4xl ${wheelSpinning ? 'animate-spin' : ''}`}>
                  {wheelSpinning ? '🌀' : '🎯'}
                </div>
                <button
                  onClick={spinWheel}
                  disabled={wheelSpinning}
                  className="bg-pink-500 text-white px-8 py-3 rounded-lg hover:bg-pink-600 transition-colors disabled:opacity-50"
                >
                  {wheelSpinning ? 'Spinning...' : 'Spin the Wheel!'}
                </button>
                {prediction && (
                  <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
                    <p className="text-2xl font-bold text-yellow-600">{prediction}</p>
                    <p className="text-sm text-gray-600 mt-2">*Just for fun! Only ultrasound can confirm 😊</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'videos' && (
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <h2 className="text-2xl font-bold text-pink-600 mb-6">📹 Educational Videos</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="cursor-pointer" onClick={() => openVideo('https://www.youtube.com/watch?v=BzVfuYsSC8Q')}>
                <img src="https://placehold.co/300x200/FF69B4/FFFFFF?text=Pregnancy+Exercises" alt="Pregnancy Exercises" className="w-full rounded-lg mb-3" />
                <h3 className="font-semibold text-gray-800">Safe Pregnancy Exercises</h3>
                <p className="text-sm text-gray-600">Stay fit during pregnancy</p>
              </div>
              <div className="cursor-pointer" onClick={() => openVideo('https://www.youtube.com/watch?v=j7YucfJuziU')}>
                <img src="https://placehold.co/300x200/32CD32/FFFFFF?text=Nutrition+Guide" alt="Nutrition Guide" className="w-full rounded-lg mb-3" />
                <h3 className="font-semibold text-gray-800">Pregnancy Nutrition</h3>
                <p className="text-sm text-gray-600">What to eat for healthy pregnancy</p>
              </div>
              <div className="cursor-pointer" onClick={() => openVideo('https://www.youtube.com/watch?v=gAzJRHWgNGc')}>
                <img src="https://placehold.co/300x200/87CEEB/FFFFFF?text=Baby+Development" alt="Baby Development" className="w-full rounded-lg mb-3" />
                <h3 className="font-semibold text-gray-800">Baby Development</h3>
                <p className="text-sm text-gray-600">Week by week baby growth</p>
              </div>
              <div className="cursor-pointer" onClick={() => openVideo('https://www.youtube.com/watch?v=YQS71Q3k5v8')}>
                <img src="https://placehold.co/300x200/DDA0DD/FFFFFF?text=Breathing+Techniques" alt="Breathing" className="w-full rounded-lg mb-3" />
                <h3 className="font-semibold text-gray-800">Breathing Techniques</h3>
                <p className="text-sm text-gray-600">Relaxation and labor preparation</p>
              </div>
              <div className="cursor-pointer" onClick={() => openVideo('https://www.youtube.com/watch?v=lYBSLPg4h5s')}>
                <img src="https://placehold.co/300x200/FFB6C1/FFFFFF?text=Prenatal+Yoga" alt="Prenatal Yoga" className="w-full rounded-lg mb-3" />
                <h3 className="font-semibold text-gray-800">Prenatal Yoga</h3>
                <p className="text-sm text-gray-600">Gentle yoga for expecting mothers</p>
              </div>
              <div className="cursor-pointer" onClick={() => openVideo('https://www.youtube.com/watch?v=8D1PexVZaYY')}>
                <img src="https://placehold.co/300x200/F0E68C/000000?text=Labor+Prep" alt="Labor Preparation" className="w-full rounded-lg mb-3" />
                <h3 className="font-semibold text-gray-800">Labor Preparation</h3>
                <p className="text-sm text-gray-600">Getting ready for delivery</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'hospitals' && (
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <h2 className="text-2xl font-bold text-pink-600 mb-6">🏥 Hospitals & Doctors in Hyderabad</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-blue-600 mb-2">Rainbow Children's Hospital</h3>
                <p className="text-gray-600 mb-2">📍 Banjara Hills, Hyderabad</p>
                <p className="text-gray-600 mb-2">📞 040-4455 5555</p>
                <p className="text-sm text-gray-500 mb-2">Specialty: Pediatrics, Neonatology</p>
                <p className="text-sm text-gray-700">Key Doctors: Dr. Ramesh Reddy, Dr. Sunitha Rao</p>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-blue-600 mb-2">Apollo Cradle</h3>
                <p className="text-gray-600 mb-2">📍 Jubilee Hills, Hyderabad</p>
                <p className="text-gray-600 mb-2">📞 040-4424 4424</p>
                <p className="text-sm text-gray-500 mb-2">Specialty: Maternity, Gynecology</p>
                <p className="text-sm text-gray-700">Key Doctors: Dr. Manjula Anagani, Dr. Padmaja Divakar</p>
              </div>

              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-blue-600 mb-2">Fernandez Hospital</h3>
                <p className="text-gray-600 mb-2">📍 Bogulkunta, Hyderabad</p>
                <p className="text-gray-600 mb-2">📞 040-4780 8888</p>
                <p className="text-sm text-gray-500 mb-2">Specialty: Obstetrics, Fertility</p>
                <p className="text-sm text-gray-700">Key Doctors: Dr. Evita Fernandez, Dr. Shobha Gupta</p>
              </div>

              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-blue-600 mb-2">Cloudnine Hospital</h3>
                <p className="text-gray-600 mb-2">📍 Gachibowli, Hyderabad</p>
                <p className="text-gray-600 mb-2">📞 040-6719 9999</p>
                <p className="text-sm text-gray-500 mb-2">Specialty: Maternity, Women's Health</p>
                <p className="text-sm text-gray-700">Key Doctors: Dr. Anitha Reddy, Dr. Kavitha Kovi</p>
              </div>
            </div>

            <div className="mt-8 bg-gradient-to-r from-red-50 to-pink-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-red-600 mb-3">🚨 Emergency Information</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-lg">
                  <h4 className="font-semibold text-red-600 mb-2">Emergency Numbers:</h4>
                  <ul className="text-sm space-y-1 text-gray-700">
                    <li>• Emergency: 108</li>
                    <li>• Ambulance: 102</li>
                    <li>• Women Helpline: 181</li>
                  </ul>
                </div>
                <div className="bg-white p-4 rounded-lg">
                  <h4 className="font-semibold text-red-600 mb-2">When to Call Immediately:</h4>
                  <ul className="text-sm space-y-1 text-gray-700">
                    <li>• Severe abdominal pain</li>
                    <li>• Heavy bleeding</li>
                    <li>• Severe headaches</li>
                    <li>• Decreased fetal movement</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
// Importeer de benodigde React functionaliteit en iconen
import React, { useState, useEffect } from 'react';
import { Clock, CheckCircle, Circle, ChevronDown, ChevronUp, Dumbbell, Timer } from 'lucide-react';

// De workout data voor beide sessies
const workoutData = {
  sessionA: [
    {
      id: 'chest_press_a',
      name: 'Chest Press',
      currentWeight: 15,
      warmupWeight: 10,
      workingWeight: 15,
      nextWeight: 17.5,
      sets: 3,
      reps: 10,
      warmupReps: 12,
      restTime: 90,
    },
    {
      id: 'row_a',
      name: 'Row',
      currentWeight: 35,
      warmupWeight: 25,
      workingWeight: 35,
      nextWeight: 37.5,
      sets: 3,
      reps: 10,
      warmupReps: 12,
      restTime: 90,
    },
    {
      id: 'leg_extension_a',
      name: 'Leg Extension',
      currentWeight: 35,
      warmupWeight: 25,
      workingWeight: 35,
      nextWeight: 37.5,
      sets: 3,
      reps: 10,
      warmupReps: 12,
      restTime: 90,
    },
    {
      id: 'shoulder_press_a',
      name: 'Shoulder Press',
      currentWeight: 15,
      warmupWeight: 10,
      workingWeight: 15,
      nextWeight: 17.5,
      sets: 3,
      reps: 10,
      warmupReps: 12,
      restTime: 90,
      note: 'Blijf op dit gewicht tot het makkelijker voelt'
    },
    {
      id: 'plank_a',
      name: 'Plank',
      isTime: true,
      duration: '30-45 sec',
      sets: 3,
      restTime: 60,
    }
  ],
  sessionB: [
    {
      id: 'leg_curl_b',
      name: 'Leg Curl',
      currentWeight: 35,
      warmupWeight: 25,
      workingWeight: 35,
      nextWeight: 37.5,
      sets: 3,
      reps: 10,
      warmupReps: 12,
      restTime: 90,
    },
    {
      id: 'pulley_b',
      name: 'Pulley (Lat Pulldown)',
      currentWeight: 18.75,
      warmupWeight: 15,
      workingWeight: 18.75,
      nextWeight: 20,
      sets: 3,
      reps: 10,
      warmupReps: 12,
      restTime: 90,
    },
    {
      id: 'fly_b',
      name: 'Fly',
      currentWeight: 22.5,
      warmupWeight: 17.5,
      workingWeight: 22.5,
      nextWeight: 25,
      sets: 3,
      reps: 10,
      warmupReps: 12,
      restTime: 90,
    },
    {
      id: 'bicycle_crunches_b',
      name: 'Bicycle Crunches',
      reps: 20,
      sets: 3,
      note: '10 per kant',
      restTime: 60,
    }
  ]
};

// De hoofdcomponent van onze app
function App() {
  // State management voor verschillende onderdelen van de app
  const [selectedSession, setSelectedSession] = useState('A');
  const [expandedExercise, setExpandedExercise] = useState(null);
  const [timer, setTimer] = useState(0);
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [completedExercises, setCompletedExercises] = useState([]);

  // Timer logica
  useEffect(() => {
    let interval = null;
    if (isTimerActive) {
      interval = setInterval(() => {
        setTimer((timer) => {
          if (timer <= 1) {
            setIsTimerActive(false);
            return 0;
          }
          return timer - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerActive]);

  // Helper functies
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const startTimer = (duration) => {
    setTimer(duration);
    setIsTimerActive(true);
  };

  const stopTimer = () => {
    setIsTimerActive(false);
    setTimer(0);
  };

  const toggleExerciseCompletion = (exerciseId) => {
    setCompletedExercises(prev => 
      prev.includes(exerciseId)
        ? prev.filter(id => id !== exerciseId)
        : [...prev, exerciseId]
    );
  };

  const exercises = selectedSession === 'A' ? workoutData.sessionA : workoutData.sessionB;

  return (
    <div className="max-w-md mx-auto min-h-screen bg-gray-50 p-4">
      {/* Header sectie */}
      <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl font-bold flex items-center gap-2">
            <Dumbbell className="w-5 h-5" />
            Workout Tracker
          </h1>
          <select 
            value={selectedSession}
            onChange={(e) => setSelectedSession(e.target.value)}
            className="border rounded p-2 text-sm"
          >
            <option value="A">Sessie A (Ma)</option>
            <option value="B">Sessie B (Do)</option>
          </select>
        </div>

        {/* Timer sectie */}
        <div className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5" />
            <span className="text-lg font-mono">{formatTime(timer)}</span>
          </div>
          <div className="space-x-2">
            {!isTimerActive ? (
              <>
                <button 
                  onClick={() => startTimer(90)}
                  className="bg-blue-500 text-white px-3 py-1 rounded text-sm"
                >
                  90s
                </button>
                <button 
                  onClick={() => startTimer(60)}
                  className="bg-blue-500 text-white px-3 py-1 rounded text-sm"
                >
                  60s
                </button>
              </>
            ) : (
              <button 
                onClick={stopTimer}
                className="bg-red-500 text-white px-3 py-1 rounded text-sm"
              >
                Stop
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Warming-up herinnering */}
      <div className="bg-blue-50 p-4 rounded-lg mb-4 shadow-sm">
        <p className="font-medium">Start met 10 min crosstrainer (rustig tempo)</p>
      </div>

      {/* Lijst met oefeningen */}
      <div className="space-y-3">
        {exercises.map((exercise, index) => (
          <div key={exercise.id} className="bg-white rounded-lg shadow-sm">
            <div 
              className="p-4 flex items-center justify-between"
              onClick={() => setExpandedExercise(expandedExercise === index ? null : index)}
            >
              <div className="flex items-center gap-3">
                <div 
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleExerciseCompletion(exercise.id);
                  }}
                  className="cursor-pointer"
                >
                  {completedExercises.includes(exercise.id) ? (
                    <CheckCircle className="w-6 h-6 text-green-500" />
                  ) : (
                    <Circle className="w-6 h-6 text-gray-300" />
                  )}
                </div>
                <div>
                  <h3 className="font-bold">{exercise.name}</h3>
                  {!exercise.isTime && exercise.currentWeight && (
                    <p className="text-sm text-gray-600">Huidig: {exercise.currentWeight} kg</p>
                  )}
                </div>
              </div>
              {expandedExercise === index ? (
                <ChevronUp className="w-5 h-5" />
              ) : (
                <ChevronDown className="w-5 h-5" />
              )}
            </div>

            {expandedExercise === index && (
              <div className="p-4 border-t">
                {/* Warming-up details */}
                {exercise.warmupWeight && (
                  <div className="mb-4">
                    <h4 className="font-medium mb-2">Warming-up</h4>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p>1 × {exercise.warmupReps} herhalingen @ {exercise.warmupWeight}kg</p>
                      <button 
                        onClick={() => startTimer(exercise.restTime)}
                        className="mt-2 flex items-center gap-1 text-sm text-blue-500"
                      >
                        <Timer className="w-4 h-4" />
                        Start {exercise.restTime}s rust timer
                      </button>
                    </div>
                  </div>
                )}

                {/* Werksets details */}
                <div className="mb-4">
                  <h4 className="font-medium mb-2">Werksets</h4>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    {exercise.isTime ? (
                      <p>{exercise.sets} sets × {exercise.duration}</p>
                    ) : (
                      <p>{exercise.sets} × {exercise.reps} herhalingen @ {exercise.workingWeight}kg</p>
                    )}
                    <button 
                      onClick={() => startTimer(exercise.restTime)}
                      className="mt-2 flex items-center gap-1 text-sm text-blue-500"
                    >
                      <Timer className="w-4 h-4" />
                      Start {exercise.restTime}s rust timer
                    </button>
                  </div>
                </div>

                {/* Volgend doel */}
                {exercise.nextWeight && (
                  <div className="bg-green-50 p-3 rounded-lg">
                    <p className="text-sm text-green-700">
                      Volgend doel: {exercise.nextWeight} kg
                    </p>
                  </div>
                )}

                {/* Extra notities */}
                {exercise.note && (
                  <div className="mt-4 text-sm text-gray-600">
                    <p>{exercise.note}</p>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Cooldown herinnering */}
      <div className="bg-blue-50 p-4 rounded-lg mt-4 shadow-sm">
        <p className="font-medium">Eindig met 20 min crosstrainer (stevig tempo)</p>
      </div>
    </div>
  );
}

export default App;

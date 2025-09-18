import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Textarea } from '@/components/ui/textarea.jsx'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs.jsx'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog.jsx'
import { 
  Brain, 
  Calendar, 
  CheckCircle, 
  Clock, 
  Plus, 
  Target, 
  Zap,
  ArrowRight,
  Star,
  MessageSquare,
  BarChart3,
  Settings,
  Bell,
  Trash2,
  Edit,
  Play,
  Pause,
  RotateCcw,
  TrendingUp,
  Users,
  BookOpen,
  Coffee,
  Briefcase,
  Home,
  X
} from 'lucide-react'
import './App.css'

function App() {
  const [tasks, setTasks] = useState([
    { id: 1, title: "Complete React project", description: "Build the AI Task Manager demo", status: "now", priority: "high", category: "work", dueDate: "2024-09-18", progress: 75 },
    { id: 2, title: "Study for exam", description: "Review chapters 5-8", status: "now", priority: "high", category: "study", dueDate: "2024-09-19", progress: 40 },
    { id: 3, title: "Grocery shopping", description: "Buy ingredients for dinner", status: "later", priority: "medium", category: "personal", dueDate: "2024-09-20", progress: 0 },
    { id: 4, title: "Call mom", description: "Weekly check-in call", status: "optional", priority: "low", category: "personal", dueDate: "2024-09-21", progress: 0 },
    { id: 5, title: "Workout session", description: "30 minutes cardio", status: "later", priority: "medium", category: "health", dueDate: "2024-09-18", progress: 0 }
  ])

  const [newTask, setNewTask] = useState({ title: "", description: "", priority: "medium", category: "work", dueDate: "" })
  const [aiMessages, setAiMessages] = useState([
    { type: "ai", content: "Good morning! You have 2 high-priority tasks for today. Would you like me to help you prioritize them?" },
    { type: "ai", content: "I notice you've been working on the React project for 2 hours. Consider taking a 15-minute break to maintain productivity." }
  ])
  const [userMessage, setUserMessage] = useState("")
  const [activeTab, setActiveTab] = useState("tasks")
  const [isAiThinking, setIsAiThinking] = useState(false)
  const [showAddTask, setShowAddTask] = useState(false)
  const [productivity, setProductivity] = useState({
    todayCompleted: 3,
    weeklyGoal: 20,
    streak: 5,
    focusTime: 4.5
  })

  const [insights, setInsights] = useState([
    { type: "pattern", title: "Peak Productivity", description: "You're most productive between 9-11 AM", icon: <TrendingUp className="w-4 h-4" /> },
    { type: "suggestion", title: "Break Reminder", description: "Consider a 15-min break after 90 minutes of work", icon: <Coffee className="w-4 h-4" /> },
    { type: "optimization", title: "Task Grouping", description: "Group similar tasks together for better flow", icon: <Target className="w-4 h-4" /> }
  ])

  const addTask = () => {
    if (newTask.title.trim()) {
      const task = {
        id: Date.now(),
        ...newTask,
        status: "now",
        progress: 0
      }
      setTasks([...tasks, task])
      setNewTask({ title: "", description: "", priority: "medium", category: "work", dueDate: "" })
      setShowAddTask(false)
      
      // Simulate AI response
      setTimeout(() => {
        setAiMessages(prev => [...prev, { 
          type: "ai", 
          content: `I've added "${task.title}" to your Now list. Based on your current workload, I recommend tackling this after your current high-priority tasks.` 
        }])
      }, 1000)
    }
  }

  const updateTaskStatus = (taskId, newStatus) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, status: newStatus } : task
    ))
  }

  const updateTaskProgress = (taskId, progress) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, progress } : task
    ))
    
    if (progress === 100) {
      setTimeout(() => {
        setAiMessages(prev => [...prev, { 
          type: "ai", 
          content: "Great job completing that task! 🎉 Your productivity streak continues. Ready for the next challenge?" 
        }])
      }, 500)
    }
  }

  const deleteTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId))
  }

  const sendMessage = () => {
    if (userMessage.trim()) {
      setAiMessages(prev => [...prev, { type: "user", content: userMessage }])
      setIsAiThinking(true)
      setUserMessage("")
      
      // Simulate AI response
      setTimeout(() => {
        const responses = [
          "I can help you break that down into smaller, manageable steps. Let me suggest a plan...",
          "Based on your current workload, I recommend prioritizing the high-impact tasks first.",
          "I notice you've been working hard today. Would you like me to suggest an optimal break schedule?",
          "Let me analyze your task patterns and suggest some optimizations for better productivity.",
          "I can help you reschedule some tasks to balance your workload better."
        ]
        const randomResponse = responses[Math.floor(Math.random() * responses.length)]
        setAiMessages(prev => [...prev, { type: "ai", content: randomResponse }])
        setIsAiThinking(false)
      }, 2000)
    }
  }

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'work': return <Briefcase className="w-4 h-4" />
      case 'study': return <BookOpen className="w-4 h-4" />
      case 'personal': return <Home className="w-4 h-4" />
      case 'health': return <Target className="w-4 h-4" />
      default: return <Target className="w-4 h-4" />
    }
  }

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800'
      case 'medium': return 'bg-yellow-100 text-yellow-800'
      case 'low': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const TaskCard = ({ task }) => (
    <Card className="mb-4 hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {getCategoryIcon(task.category)}
            <CardTitle className="text-lg">{task.title}</CardTitle>
          </div>
          <div className="flex items-center gap-2">
            <Badge className={getPriorityColor(task.priority)}>
              {task.priority}
            </Badge>
            <Button variant="ghost" size="sm" onClick={() => deleteTask(task.id)}>
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </div>
        <CardDescription>{task.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm text-gray-600">
            <span>Due: {task.dueDate}</span>
            <span>{task.progress}% complete</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
              style={{ width: `${task.progress}%` }}
            ></div>
          </div>
          <div className="flex gap-2">
            <Button 
              size="sm" 
              variant="outline"
              onClick={() => updateTaskProgress(task.id, Math.min(100, task.progress + 25))}
            >
              <Play className="w-4 h-4 mr-1" />
              Progress
            </Button>
            <Button 
              size="sm" 
              variant="outline"
              onClick={() => updateTaskStatus(task.id, task.status === 'now' ? 'later' : 'now')}
            >
              <RotateCcw className="w-4 h-4 mr-1" />
              {task.status === 'now' ? 'Move to Later' : 'Move to Now'}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Brain className="w-8 h-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">AI Task Manager</h1>
              <Badge className="bg-blue-100 text-blue-800">Interactive Demo</Badge>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm text-gray-600">Today's Progress</p>
                <p className="font-semibold">{productivity.todayCompleted}/{productivity.weeklyGoal} tasks</p>
              </div>
              <Button variant="outline" size="sm">
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="tasks">Dynamic Tasks</TabsTrigger>
            <TabsTrigger value="ai">AI Assistant</TabsTrigger>
            <TabsTrigger value="insights">Adaptive Learning</TabsTrigger>
            <TabsTrigger value="overview">Overview</TabsTrigger>
          </TabsList>

          {/* Dynamic Tasks Tab */}
          <TabsContent value="tasks" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-3xl font-bold text-gray-900">Dynamic Task Management</h2>
              <Dialog open={showAddTask} onOpenChange={setShowAddTask}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    Add Task
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add New Task</DialogTitle>
                    <DialogDescription>
                      Create a new task and let AI help you prioritize it.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <Input
                      placeholder="Task title"
                      value={newTask.title}
                      onChange={(e) => setNewTask({...newTask, title: e.target.value})}
                    />
                    <Textarea
                      placeholder="Task description"
                      value={newTask.description}
                      onChange={(e) => setNewTask({...newTask, description: e.target.value})}
                    />
                    <div className="grid grid-cols-2 gap-4">
                      <select 
                        className="p-2 border rounded"
                        value={newTask.priority}
                        onChange={(e) => setNewTask({...newTask, priority: e.target.value})}
                      >
                        <option value="low">Low Priority</option>
                        <option value="medium">Medium Priority</option>
                        <option value="high">High Priority</option>
                      </select>
                      <select 
                        className="p-2 border rounded"
                        value={newTask.category}
                        onChange={(e) => setNewTask({...newTask, category: e.target.value})}
                      >
                        <option value="work">Work</option>
                        <option value="study">Study</option>
                        <option value="personal">Personal</option>
                        <option value="health">Health</option>
                      </select>
                    </div>
                    <Input
                      type="date"
                      value={newTask.dueDate}
                      onChange={(e) => setNewTask({...newTask, dueDate: e.target.value})}
                    />
                    <Button onClick={addTask} className="w-full">Add Task</Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
              {/* Now Column */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Zap className="w-5 h-5 text-red-600" />
                  <h3 className="text-xl font-semibold text-gray-900">Now</h3>
                  <Badge variant="destructive">{tasks.filter(t => t.status === 'now').length}</Badge>
                </div>
                <div className="space-y-4">
                  {tasks.filter(task => task.status === 'now').map(task => (
                    <TaskCard key={task.id} task={task} />
                  ))}
                </div>
              </div>

              {/* Later Column */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Clock className="w-5 h-5 text-yellow-600" />
                  <h3 className="text-xl font-semibold text-gray-900">Later</h3>
                  <Badge variant="secondary">{tasks.filter(t => t.status === 'later').length}</Badge>
                </div>
                <div className="space-y-4">
                  {tasks.filter(task => task.status === 'later').map(task => (
                    <TaskCard key={task.id} task={task} />
                  ))}
                </div>
              </div>

              {/* Optional Column */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Star className="w-5 h-5 text-green-600" />
                  <h3 className="text-xl font-semibold text-gray-900">Optional</h3>
                  <Badge variant="outline">{tasks.filter(t => t.status === 'optional').length}</Badge>
                </div>
                <div className="space-y-4">
                  {tasks.filter(task => task.status === 'optional').map(task => (
                    <TaskCard key={task.id} task={task} />
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>

          {/* AI Assistant Tab */}
          <TabsContent value="ai" className="space-y-6">
            <h2 className="text-3xl font-bold text-gray-900">AI-Powered Guidance</h2>
            
            <Card className="h-96">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="w-5 h-5" />
                  Conversational Assistant
                </CardTitle>
                <CardDescription>
                  Get help with prioritization, task breakdown, and productivity optimization
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col h-full">
                <div className="flex-1 overflow-y-auto space-y-4 mb-4">
                  {aiMessages.map((message, index) => (
                    <div key={index} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                        message.type === 'user' 
                          ? 'bg-blue-600 text-white' 
                          : 'bg-gray-100 text-gray-900'
                      }`}>
                        {message.content}
                      </div>
                    </div>
                  ))}
                  {isAiThinking && (
                    <div className="flex justify-start">
                      <div className="bg-gray-100 text-gray-900 px-4 py-2 rounded-lg">
                        <div className="flex items-center gap-2">
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-600"></div>
                          AI is thinking...
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                <div className="flex gap-2">
                  <Input
                    placeholder="Ask AI for help with your tasks..."
                    value={userMessage}
                    onChange={(e) => setUserMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                  />
                  <Button onClick={sendMessage} disabled={isAiThinking}>
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            <div className="grid md:grid-cols-3 gap-4">
              <Button variant="outline" className="p-4 h-auto" onClick={() => {
                setUserMessage("Help me prioritize my tasks for today")
                sendMessage()
              }}>
                <Target className="w-5 h-5 mb-2" />
                <div className="text-center">
                  <p className="font-semibold">Prioritize Tasks</p>
                  <p className="text-sm text-gray-600">Get AI help with task ordering</p>
                </div>
              </Button>
              <Button variant="outline" className="p-4 h-auto" onClick={() => {
                setUserMessage("Can you break down my complex project into smaller steps?")
                sendMessage()
              }}>
                <BarChart3 className="w-5 h-5 mb-2" />
                <div className="text-center">
                  <p className="font-semibold">Break Down Tasks</p>
                  <p className="text-sm text-gray-600">Split complex tasks into steps</p>
                </div>
              </Button>
              <Button variant="outline" className="p-4 h-auto" onClick={() => {
                setUserMessage("Summarize my day and suggest improvements")
                sendMessage()
              }}>
                <Calendar className="w-5 h-5 mb-2" />
                <div className="text-center">
                  <p className="font-semibold">Daily Summary</p>
                  <p className="text-sm text-gray-600">Get insights about your day</p>
                </div>
              </Button>
            </div>
          </TabsContent>

          {/* Adaptive Learning Tab */}
          <TabsContent value="insights" className="space-y-6">
            <h2 className="text-3xl font-bold text-gray-900">Adaptive Learning & Insights</h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {insights.map((insight, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center gap-2">
                      {insight.icon}
                      <CardTitle className="text-lg">{insight.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">{insight.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Productivity Patterns</CardTitle>
                <CardDescription>AI-detected patterns in your work habits</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                    <div>
                      <p className="font-semibold">Peak Performance Hours</p>
                      <p className="text-sm text-gray-600">9:00 AM - 11:00 AM</p>
                    </div>
                    <TrendingUp className="w-8 h-8 text-blue-600" />
                  </div>
                  <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                    <div>
                      <p className="font-semibold">Optimal Break Interval</p>
                      <p className="text-sm text-gray-600">Every 90 minutes</p>
                    </div>
                    <Coffee className="w-8 h-8 text-green-600" />
                  </div>
                  <div className="flex items-center justify-between p-4 bg-purple-50 rounded-lg">
                    <div>
                      <p className="font-semibold">Task Completion Rate</p>
                      <p className="text-sm text-gray-600">85% this week</p>
                    </div>
                    <CheckCircle className="w-8 h-8 text-purple-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <h2 className="text-3xl font-bold text-gray-900">Productivity Overview</h2>
            
            <div className="grid md:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-gray-600">Today's Tasks</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{productivity.todayCompleted}</div>
                  <p className="text-xs text-gray-600">completed</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-gray-600">Weekly Goal</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{productivity.weeklyGoal}</div>
                  <p className="text-xs text-gray-600">target tasks</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-gray-600">Current Streak</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{productivity.streak}</div>
                  <p className="text-xs text-gray-600">days</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-gray-600">Focus Time</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{productivity.focusTime}h</div>
                  <p className="text-xs text-gray-600">today</p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Feature Highlights</CardTitle>
                <CardDescription>Experience the core capabilities of AI Task Manager</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <Zap className="w-6 h-6 text-blue-600 mt-1" />
                      <div>
                        <h4 className="font-semibold">Dynamic Task Updates</h4>
                        <p className="text-sm text-gray-600">Tasks automatically reorganize based on progress and context</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Brain className="w-6 h-6 text-purple-600 mt-1" />
                      <div>
                        <h4 className="font-semibold">AI Conversations</h4>
                        <p className="text-sm text-gray-600">Natural language interaction for task management</p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <BarChart3 className="w-6 h-6 text-green-600 mt-1" />
                      <div>
                        <h4 className="font-semibold">Pattern Learning</h4>
                        <p className="text-sm text-gray-600">Adapts to your productivity patterns over time</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Bell className="w-6 h-6 text-orange-600 mt-1" />
                      <div>
                        <h4 className="font-semibold">Smart Notifications</h4>
                        <p className="text-sm text-gray-600">Contextual reminders without overwhelming you</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

export default App

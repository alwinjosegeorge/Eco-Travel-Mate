import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Bot, Send, User, Clock, Leaf, Wind } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

const predefinedResponses = {
  "when should i leave": "Based on current air quality data, the best time to leave would be early morning (6-8 AM) when AQI is typically lowest at 35-45. Avoid 4-7 PM when traffic pollution peaks.",
  "air quality": "Current air quality is GOOD (AQI: 42). PM2.5 levels are at 15 μg/m³. It's safe for outdoor activities, but sensitive individuals should consider wearing masks during high-traffic hours.",
  "carbon footprint": "Your daily carbon footprint can be reduced by 40% by choosing train over car for trips >50km. Consider carpooling or electric vehicles for shorter distances.",
  "pollution": "Major pollution sources in your area: vehicle emissions (45%), industrial activity (30%), construction (15%). Peak pollution hours: 7-9 AM and 5-7 PM.",
  "recommendations": "🌱 Eco-friendly travel tips:\n• Use public transport or bike for trips <5km\n• Choose direct flights to reduce emissions\n• Stay in eco-certified hotels\n• Pack light to reduce fuel consumption\n• Offset carbon through verified programs"
};

export const AIAssistantChat = () => {
  const { toast } = useToast();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hello! I'm your GreenPath AI assistant. I can help you with air quality insights, carbon footprint advice, and eco-friendly travel recommendations. What would you like to know?",
      sender: 'ai',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const getAIResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    for (const [key, response] of Object.entries(predefinedResponses)) {
      if (lowerMessage.includes(key)) {
        return response;
      }
    }
    
    return "I understand you're asking about environmental travel insights. Currently, I can help with air quality timing, carbon footprint calculation, pollution data, and eco-friendly recommendations. Could you be more specific about what you'd like to know?";
  };

  const sendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage("");
    setIsTyping(true);

    // Simulate AI thinking time
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: getAIResponse(inputMessage),
        sender: 'ai',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
      
      toast({
        title: "AI Assistant Response",
        description: "I've provided environmental insights for your query",
      });
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const quickActions = [
    { text: "When should I leave?", icon: Clock },
    { text: "Check air quality", icon: Wind },
    { text: "Carbon footprint tips", icon: Leaf }
  ];

  return (
    <section className="py-20 px-6 bg-gradient-secondary">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-foreground mb-4">AI Environmental Assistant</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Get personalized insights on air quality, travel timing, and eco-friendly recommendations
          </p>
        </div>

        <Card className="bg-card shadow-eco border-0 overflow-hidden">
          {/* Chat Header */}
          <div className="bg-gradient-primary p-4 text-white">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-white/20 rounded-full">
                <Bot className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-semibold">GreenPath AI</h3>
                <p className="text-sm text-white/80">Environmental Travel Assistant</p>
              </div>
            </div>
          </div>

          {/* Messages */}
          <ScrollArea className="h-96 p-4">
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`flex items-start space-x-2 max-w-[80%] ${
                      message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                    }`}
                  >
                    <div className={`p-2 rounded-full ${
                      message.sender === 'user' 
                        ? 'bg-primary text-white' 
                        : 'bg-muted text-primary'
                    }`}>
                      {message.sender === 'user' ? (
                        <User className="w-4 h-4" />
                      ) : (
                        <Bot className="w-4 h-4" />
                      )}
                    </div>
                    <div
                      className={`p-3 rounded-lg ${
                        message.sender === 'user'
                          ? 'bg-primary text-white'
                          : 'bg-muted text-card-foreground'
                      }`}
                    >
                      <p className="whitespace-pre-line">{message.text}</p>
                      <p className={`text-xs mt-1 ${
                        message.sender === 'user' ? 'text-white/70' : 'text-muted-foreground'
                      }`}>
                        {message.timestamp.toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex justify-start">
                  <div className="flex items-start space-x-2">
                    <div className="p-2 bg-muted text-primary rounded-full">
                      <Bot className="w-4 h-4" />
                    </div>
                    <div className="p-3 bg-muted rounded-lg">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-primary rounded-full animate-bounce" />
                        <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                        <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>

          {/* Quick Actions */}
          <div className="p-4 border-t border-border">
            <div className="flex flex-wrap gap-2 mb-4">
              {quickActions.map((action, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  onClick={() => setInputMessage(action.text)}
                  className="text-xs"
                >
                  <action.icon className="w-3 h-3 mr-1" />
                  {action.text}
                </Button>
              ))}
            </div>

            {/* Input */}
            <div className="flex space-x-2">
              <Input
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask about air quality, carbon footprint, or travel recommendations..."
                className="flex-1"
                disabled={isTyping}
              />
              <Button
                onClick={sendMessage}
                disabled={!inputMessage.trim() || isTyping}
                className="bg-gradient-primary hover:shadow-glow text-white"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
};
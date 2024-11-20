import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Copy,
  Key,
  Book,
  Calendar,
  Brain,
  Blocks,
  Eye,
  EyeOff,
  Check,
} from "lucide-react";

const DeveloperHome = () => {
  const [showApiKey, setShowApiKey] = useState(false);
  const [showCopyConfirm, setShowCopyConfirm] = useState(false);
  const apiKey = "ghec_1234567890abcdef";

  const handleCopyClick = async () => {
    try {
      await navigator.clipboard.writeText(apiKey);
      setShowCopyConfirm(true);
      setTimeout(() => setShowCopyConfirm(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const features = [
    {
      title: "Curriculum ",
      icon: Book,
      description:
        "Access comprehensive curriculum data across all grade levels",
      endpoint: "/api/curriculum",
      status: "Active",
    },
    {
      title: "Assessment ",
      icon: Brain,
      description: "Generate dynamic assessments based on curriculum standards",
      endpoint: "/api/assessments",
      status: "Active",
    },
    {
      title: " Calendar",
      icon: Calendar,
      description: "Schedule and manage educational content delivery",
      endpoint: "/api/calendar",
      status: "active",
    },
    {
      title: "Lesson Plan",
      icon: Blocks,
      description: "Plan and organize educational resources",
      endpoint: "/api/resources",
      status: "active",
    },
  ];

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Developer Dashboard</h1>
          <p className="text-muted-foreground mt-2">
            Manage your API access and monitor usage across services
          </p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-xl flex items-center">
            <Key className="mr-2 h-5 w-5" />
            Your API Key
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between bg-muted p-3 rounded-lg">
            <code className="text-sm font-mono">
              {showApiKey ? apiKey : "•".repeat(apiKey.length)}
            </code>
            <div className="flex gap-2 relative">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowApiKey(!showApiKey)}
              >
                {showApiKey ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </Button>
              <Button variant="ghost" size="sm" onClick={handleCopyClick}>
                {showCopyConfirm ? (
                  <Check className="h-4 w-4 text-green-500" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </Button>
              {showCopyConfirm && (
                <div className="absolute -top-8 right-0 bg-black text-white text-xs px-2 py-1 rounded">
                  Copied!
                </div>
              )}
            </div>
          </div>
          <p className="text-sm text-muted-foreground mt-2">
            Use this key to authenticate your API requests. Keep it secure and
            never share it publicly.
          </p>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {features.map((feature, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle className="text-lg flex items-center justify-between">
                <span className="flex items-center">
                  <feature.icon className="mr-2 h-5 w-5" />
                  {feature.title}
                </span>
                <Badge
                  variant={
                    feature.status.toLowerCase() === "active"
                      ? "default"
                      : "secondary"
                  }
                >
                  {feature.status}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                {feature.description}
              </p>
              <code className="text-xs bg-muted p-2 rounded block">
                {feature.endpoint}
              </code>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default DeveloperHome;

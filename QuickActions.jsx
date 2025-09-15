import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { 
  Upload, 
  Users, 
  BarChart3, 
  Download,
  Settings,
  BookOpen
} from "lucide-react";

const ActionButton = ({ icon: Icon, title, description, to, color = "pink" }) => (
  <Link to={to} className="block">
    <Button 
      variant="outline" 
      className={`w-full justify-start h-auto p-4 border-slate-200 hover:bg-${color}-50 hover:border-${color}-200 group transition-all duration-200`}
    >
      <div className="flex items-center gap-3">
        <div className={`p-2 rounded-lg bg-${color}-100 group-hover:bg-${color}-200 transition-colors`}>
          <Icon className={`w-4 h-4 text-${color}-600`} />
        </div>
        <div className="text-left">
          <div className="font-medium text-slate-900">{title}</div>
          <div className="text-xs text-slate-500">{description}</div>
        </div>
      </div>
    </Button>
  </Link>
);

export default function QuickActions() {
  return (
    <Card className="shadow-sm border-slate-200 bg-white/80 backdrop-blur-sm">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg font-semibold text-slate-900">
          Quick Actions
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <ActionButton
          icon={Upload}
          title="New X-Ray Analysis"
          description="Upload and analyze chest X-ray"
          to={createPageUrl("Analysis")}
          color="blue"
        />
        <ActionButton
          icon={Users}
          title="Patient Management"
          description="View and manage patients"
          to={createPageUrl("Patients")}
          color="green"
        />
        <ActionButton
          icon={BarChart3}
          title="Analytics Dashboard"
          description="View performance metrics"
          to={createPageUrl("Analytics")}
          color="purple"
        />
        
        <div className="pt-3 border-t border-slate-100">
          <Button variant="ghost" className="w-full justify-start text-slate-600 hover:text-slate-860">
            <Download className="w-4 h-4 mr-3" />
            Export Reports
          </Button>
          <Button variant="ghost" className="w-full justify-start text-slate-600 hover:text-slate-860">
            <BookOpen className="w-4 h-4 mr-3" />
            View Guidelines
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

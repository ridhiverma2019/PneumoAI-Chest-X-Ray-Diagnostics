import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Activity, 
  Users, 
  Brain, 
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Clock
} from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

const StatCard = ({ title, value, icon: Icon, color, trend, isLoading }) => (
  <Card className="shadow-sm border-slate-200 bg-white/80 backdrop-blur-sm hover:shadow-md transition-all duration-300">
    <CardContent className="p-6">
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <p className="text-sm font-medium text-slate-600">{title}</p>
          {isLoading ? (
            <Skeleton className="h-8 w-16" />
          ) : (
            <p className="text-3xl font-bold text-slate-900">{value}</p>
          )}
          {trend && !isLoading && (
            <div className="flex items-center gap-1 text-sm text-green-600">
              <TrendingUp className="w-3 h-3" />
              <span>{trend}</span>
            </div>
          )}
        </div>
        <div className={`p-3 rounded-xl ${color} bg-opacity-10`}>
          <Icon className={`w-6 h-6 ${color.replace('bg-', 'text-')}`} />
        </div>
      </div>
    </CardContent>
  </Card>
);

export default function StatsGrid({ stats, isLoading }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatCard
        title="Total Analyses"
        value={stats.totalAnalyses}
        icon={Activity}
        color="bg-blue-500"
        trend="This month"
        isLoading={isLoading}
      />
      <StatCard
        title="Pneumonia Detected"
        value={stats.pneumoniaDetected}
        icon={AlertTriangle}
        color="bg-red-500"
        isLoading={isLoading}
      />
      <StatCard
        title="Avg. Confidence"
        value={`${stats.avgConfidence}%`}
        icon={Brain}
        color="bg-purple-500"
        trend="94.2% target"
        isLoading={isLoading}
      />
      <StatCard
        title="Total Patients"
        value={stats.totalPatients}
        icon={Users}
        color="bg-green-500"
        isLoading={isLoading}
      />
    </div>
  );
}

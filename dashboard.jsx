import React, { useState, useEffect } from "react";
import { XrayAnalysis, Patient } from "@/entities/all";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { 
  Activity, 
  Users, 
  Upload, 
  TrendingUp,
  Clock,
  CheckCircle,
  AlertTriangle,
  Calendar,
  ArrowRight
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";

import StatsGrid from "../components/dashboard/StatsGrid";
import RecentAnalyses from "../components/dashboard/RecentAnalyses";
import QuickActions from "../components/dashboard/QuickActions";

export default function Dashboard() {
  const [analyses, setAnalyses] = useState([]);
  const [patients, setPatients] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [analysesData, patientsData] = await Promise.all([
        XrayAnalysis.list("-created_date", 10),
        Patient.list("-created_date", 5)
      ]);
      setAnalyses(analysesData);
      setPatients(patientsData);
    } catch (error) {
      console.error("Error loading data:", error);
    }
    setIsLoading(false);
  };

  const stats = {
    totalAnalyses: analyses.length,
    pneumoniaDetected: analyses.filter(a => a.diagnosis === "pneumonia").length,
    avgConfidence: analyses.length > 0 
      ? (analyses.reduce((sum, a) => sum + a.confidence_score, 0) / analyses.length).toFixed(1)
      : 0,
    totalPatients: patients.length
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 mb-2">
              Medical Dashboard
            </h1>
            <p className="text-slate-600 flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              {format(new Date(), "EEEE, MMMM do, yyyy")}
            </p>
          </div>
          <div className="flex gap-3">
            <Link to={createPageUrl("Patients")}>
              <Button variant="outline" className="border-slate-200 hover:bg-slate-50">
                <Users className="w-4 h-4 mr-2" />
                Manage Patients
              </Button>
            </Link>
            <Link to={createPageUrl("Analysis")}>
              <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg">
                <Upload className="w-4 h-4 mr-2" />
                New Analysis
              </Button>
            </Link>
          </div>
        </div>

        {/* Stats Grid */}
        <StatsGrid stats={stats} isLoading={isLoading} />

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Recent Analyses - Takes 2 columns */}
          <div className="lg:col-span-2">
            <RecentAnalyses 
              analyses={analyses}
              isLoading={isLoading}
            />
          </div>

          {/* Quick Actions - Takes 1 column */}
          <div className="space-y-6">
            <QuickActions />
            
            {/* Recent Patients */}
            <Card className="shadow-sm border-slate-200 bg-white/80 backdrop-blur-sm">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg font-semibold text-slate-900 flex items-center gap-2">
                  <Users className="w-5 h-5 text-blue-600" />
                  Recent Patients
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {isLoading ? (
                  Array(3).fill(0).map((_, i) => (
                    <div key={i} className="animate-pulse">
                      <div className="h-4 bg-slate-200 rounded w-3/4 mb-2"></div>
                      <div className="h-3 bg-slate-200 rounded w-1/2"></div>
                    </div>
                  ))
                ) : patients.length > 0 ? (
                  patients.slice(0, 5).map((patient) => (
                    <div key={patient.id} className="flex items-center justify-between py-2 border-b border-slate-100 last:border-b-0">
                      <div>
                        <p className="font-medium text-slate-900">{patient.full_name}</p>
                        <p className="text-sm text-slate-500">ID: {patient.patient_id}</p>
                      </div>
                      <Button variant="ghost" size="sm">
                        <ArrowRight className="w-4 h-4" />
                      </Button>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-6 text-slate-500">
                    <Users className="w-8 h-8 mx-auto mb-2 text-slate-300" />
                    <p className="text-sm">No patients yet</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

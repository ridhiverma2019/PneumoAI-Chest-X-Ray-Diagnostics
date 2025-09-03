import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Activity, 
  Eye, 
  Calendar,
  AlertTriangle,
  CheckCircle,
  HelpCircle
} from "lucide-react";
import { format } from "date-fns";
import { Skeleton } from "@/components/ui/skeleton";

const DiagnosisIcon = ({ diagnosis }) => {
  switch (diagnosis) {
    case 'pneumonia':
      return <AlertTriangle className="w-4 h-4 text-red-500" />;
    case 'normal':
      return <CheckCircle className="w-4 h-4 text-green-500" />;
    default:
      return <HelpCircle className="w-4 h-4 text-yellow-500" />;
  }
};

const DiagnosisBadge = ({ diagnosis, confidence }) => {
  const getVariant = () => {
    switch (diagnosis) {
      case 'pneumonia':
        return confidence > 80 ? 'destructive' : 'secondary';
      case 'normal':
        return confidence > 80 ? 'default' : 'secondary';
      default:
        return 'outline';
    }
  };

  return (
    <Badge variant={getVariant()} className="flex items-center gap-1">
      <DiagnosisIcon diagnosis={diagnosis} />
      {diagnosis.charAt(0).toUpperCase() + diagnosis.slice(1)}
    </Badge>
  );
};

export default function RecentAnalyses({ analyses, isLoading }) {
  return (
    <Card className="shadow-sm border-slate-200 bg-white/80 backdrop-blur-sm">
      <CardHeader className="pb-4">
        <CardTitle className="text-xl font-semibold text-slate-900 flex items-center gap-2">
          <Activity className="w-6 h-6 text-blue-600" />
          Recent Analyses
        </CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="space-y-4">
            {Array(5).fill(0).map((_, i) => (
              <div key={i} className="animate-pulse border rounded-lg p-4">
                <div className="flex justify-between items-start mb-3">
                  <Skeleton className="h-5 w-32" />
                  <Skeleton className="h-6 w-20 rounded-full" />
                </div>
                <div className="grid grid-cols-3 gap-4 mb-3">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-4 w-16" />
                  <Skeleton className="h-4 w-20" />
                </div>
                <Skeleton className="h-8 w-20" />
              </div>
            ))}
          </div>
        ) : analyses.length > 0 ? (
          <div className="space-y-4">
            {analyses.map((analysis) => (
              <div key={analysis.id} className="border border-slate-200 rounded-lg p-4 hover:bg-slate-50/50 transition-colors">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h4 className="font-semibold text-slate-900">
                      Patient: {analysis.patient_id || 'Anonymous'}
                    </h4>
                    <p className="text-sm text-slate-500 flex items-center gap-1 mt-1">
                      <Calendar className="w-3 h-3" />
                      {format(new Date(analysis.created_date), "MMM d, yyyy 'at' h:mm a")}
                    </p>
                  </div>
                  <DiagnosisBadge 
                    diagnosis={analysis.diagnosis} 
                    confidence={analysis.confidence_score}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 text-sm">
                  <div>
                    <span className="text-slate-500">Confidence:</span>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="flex-1 bg-slate-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${
                            analysis.confidence_score > 80 ? 'bg-green-500' : 
                            analysis.confidence_score > 60 ? 'bg-yellow-500' : 'bg-red-500'
                          }`}
                          style={{ width: `${analysis.confidence_score}%` }}
                        />
                      </div>
                      <span className="font-medium text-slate-900">
                        {analysis.confidence_score}%
                      </span>
                    </div>
                  </div>
                  <div>
                    <span className="text-slate-500">Status:</span>
                    <p className="font-medium text-slate-900 capitalize mt-1">
                      {analysis.status}
                    </p>
                  </div>
                  <div>
                    <span className="text-slate-500">Findings:</span>
                    <p className="font-medium text-slate-900 mt-1">
                      {analysis.analysis_details?.findings?.length || 0} items
                    </p>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <div className="text-sm text-slate-600">
                    {analysis.analysis_details?.findings?.slice(0, 2).map((finding, index) => (
                      <span key={index} className="inline-block bg-slate-100 px-2 py-1 rounded mr-2 mb-1">
                        {finding}
                      </span>
                    ))}
                  </div>
                  <Button variant="outline" size="sm" className="border-blue-200 hover:bg-blue-50 hover:text-blue-700">
                    <Eye className="w-4 h-4 mr-2" />
                    View Details
                  </Button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Activity className="w-12 h-12 text-slate-300 mx-auto mb-4" />
            <h3 className="font-medium text-slate-900 mb-2">No analyses yet</h3>
            <p className="text-slate-500 mb-4">Start analyzing chest X-rays to see results here</p>
            <Button className="bg-gradient-to-r from-blue-600 to-indigo-600">
              Start First Analysis
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

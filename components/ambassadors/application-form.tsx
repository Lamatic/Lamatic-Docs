"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  User, 
  Mail, 
  MapPin, 
  Briefcase, 
  Globe, 
  MessageSquare,
  Send,
  CheckCircle,
  ArrowRight,
  ExternalLink
} from "lucide-react";
import { cn } from "@/lib/utils";

interface ApplicationFormProps {
  className?: string;
}

export const ApplicationForm: React.FC<ApplicationFormProps> = ({ className }) => {


  useEffect(() => {

  }, []);


  return (
    <div className={cn("max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16", className)} id="application-form">
      <div className="text-center mb-12">
        {/* <Badge className="mb-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white border-0 px-4 py-2 text-sm font-medium">
          <Send className="w-4 h-4 mr-2" />
          Application Form
        </Badge> */}
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Apply to Become an Ambassador
        </h2>
        <div className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          Tell us about yourself and why you'd like to join our ambassador program. 
          We're looking for passionate individuals who can help grow our community.
        </div>
      </div>

      <div className="w-full">
        <iframe 
          className="notion-embed" 
          src="https://lamatic.notion.site/ebd/2682e0e2612880fe8058e69e9a91bf4a" 
          frameBorder="0" 
          onWheel={() => {}} 
          width="100%" 
          height="533" 
          style={{ background: 'transparent', border: '1px solid #ccc', borderRadius: '10px' }}
        />
      </div>
    </div>
  );
};

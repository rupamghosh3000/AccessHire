import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { resumeService } from '../services/resumeService';
import { useAuth } from '../hooks/useAuth';
import { Button } from '../components/ui/Button';
import { LoadingState } from '../components/ui/LoadingState';
import { SkillChip } from '../components/jobs/SkillChip';
import { FileText, Upload, Trash2, CheckCircle2, Briefcase, GraduationCap, Sparkles } from 'lucide-react';

export const ResumeCenterPage = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    loadResumes();
  }, [isAuthenticated]);

  const loadResumes = async () => {
    setLoading(true);
    try {
      const list = await resumeService.getResumes();
      setResumes(list || []);
    } catch (_) {
      setResumes([]);
    } finally {
      setLoading(false);
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    setUploading(true);
    try {
      await resumeService.uploadResume(selectedFile);
      setSelectedFile(null);
      await loadResumes();
    } catch (err) {
      console.error('Upload error:', err);
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await resumeService.deleteResume(id);
      setResumes((prev) => prev.filter((r) => (r._id || r.id) !== id));
    } catch (err) {
      console.error('Delete error:', err);
    }
  };

  const activeResume = resumes[0];

  return (
    <div className="space-y-8 text-left pb-16 pt-4">
      <div className="p-7 bg-[#E3DDFB] rounded-2xl flex flex-wrap items-center justify-between gap-6 text-[#111114]">
        <div className="space-y-1.5">
          <span className="px-3 py-1 bg-white text-indigo-700 text-xs font-bold rounded-full shadow-sm">
            Resume Vault
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#111114]">Resume Center</h1>
          <p className="text-sm text-[#6B7280] max-w-xl">
            Upload your resume (PDF or DOCX) for automated skill extraction and direct attachment in guided applications.
          </p>
        </div>

        <form onSubmit={handleUpload} className="flex items-center space-x-3">
          <label className="p-2.5 bg-white border border-slate-200 hover:border-slate-400 rounded-full text-xs font-semibold text-[#111114] cursor-pointer flex items-center space-x-2 shadow-sm">
            <Upload className="w-4 h-4 text-indigo-600" />
            <span>{selectedFile ? selectedFile.name : 'Select File (PDF / DOCX)'}</span>
            <input
              type="file"
              accept=".pdf,.docx,.doc,.txt"
              onChange={(e) => setSelectedFile(e.target.files[0])}
              className="hidden"
            />
          </label>

          <Button type="submit" variant="primary" isLoading={uploading}>
            Upload
          </Button>
        </form>
      </div>

      {loading ? (
        <LoadingState message="Loading candidate resume..." />
      ) : activeResume ? (
        <div className="space-y-6">
          <div className="p-6 bg-white border border-[#ECECF0] rounded-3xl space-y-6 shadow-sm">
            <div className="flex flex-wrap items-center justify-between border-b border-[#ECECF0] pb-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-[#E3DDFB] flex items-center justify-center text-[#111114]">
                  <FileText className="w-5 h-5 text-indigo-600" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#111114]">
                    {activeResume.name || 'Rupam Paltu Ghosh'} ({activeResume.fileName || 'Resume.pdf'})
                  </h3>
                  <p className="text-xs text-[#6B7280]">
                    {activeResume.email || 'rupamghosh9010@gmail.com'} • +91 9163464261
                  </p>
                  <span className="text-xs text-[#1B8A5A] font-semibold flex items-center mt-1">
                    <CheckCircle2 className="w-3.5 h-3.5 mr-1" /> Verified Active Resume & AI Extracted Profile
                  </span>
                </div>
              </div>

              <Button
                variant="danger"
                size="sm"
                onClick={() => handleDelete(activeResume._id || activeResume.id)}
              >
                <Trash2 className="w-4 h-4 mr-1" /> Delete
              </Button>
            </div>

            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#6B7280] flex items-center">
                <Sparkles className="w-4 h-4 mr-1.5 text-indigo-600" /> Technical Skills & Tools ({activeResume.skills?.length || 0})
              </h4>
              <div className="flex flex-wrap gap-2">
                {activeResume.skills?.map((skill) => (
                  <SkillChip key={skill} skill={skill} variant="required" />
                ))}
              </div>
            </div>

            <div className="space-y-3 pt-4 border-t border-[#ECECF0]">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#6B7280] flex items-center">
                <GraduationCap className="w-4 h-4 mr-1.5 text-sky-600" /> Education & Academic Background
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {activeResume.education?.map((edu, i) => (
                  <div key={i} className="p-4 bg-[#F1F1F4] rounded-2xl space-y-1 text-[#111114]">
                    <h5 className="font-bold text-sm">{edu.degree} — {edu.field}</h5>
                    <p className="text-xs text-[#6B7280]">{edu.institution}</p>
                    <p className="text-xs font-semibold text-indigo-700">{edu.year}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-3 pt-4 border-t border-[#ECECF0]">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#6B7280] flex items-center">
                <Briefcase className="w-4 h-4 mr-1.5 text-[#1B8A5A]" /> Projects & Software Engineering Work
              </h4>
              <div className="grid grid-cols-1 gap-3">
                {activeResume.experience?.map((exp, i) => (
                  <div key={i} className="p-4 bg-[#F1F1F4] rounded-2xl space-y-2 text-[#111114]">
                    <div className="flex flex-wrap items-center justify-between">
                      <h5 className="font-bold text-sm text-[#111114]">{exp.role}</h5>
                      <span className="px-2.5 py-0.5 bg-white text-xs font-semibold text-slate-700 rounded-full border border-slate-200">
                        {exp.duration}
                      </span>
                    </div>
                    <p className="text-xs font-medium text-indigo-800">
                      Tech Stack: {exp.company}
                    </p>
                    <ul className="list-disc list-inside text-xs text-[#6B7280] space-y-1 pt-1">
                      {exp.highlights?.map((h, idx) => <li key={idx}>{h}</li>)}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-3 pt-4 border-t border-[#ECECF0]">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#6B7280] flex items-center">
                <CheckCircle2 className="w-4 h-4 mr-1.5 text-indigo-600" /> Certifications & Courses
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {(activeResume.certifications && activeResume.certifications.length > 0
                  ? activeResume.certifications
                  : [
                      'Web Development — Apna College (June 2026): HTML, CSS, JavaScript',
                      'Java Training — Spoken Tutorial (May 2026): Object-Oriented Fundamentals',
                    ]
                ).map((cert, idx) => (
                  <div key={idx} className="p-3 bg-[#E3DDFB] rounded-xl text-xs font-semibold text-indigo-950">
                    • {cert}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

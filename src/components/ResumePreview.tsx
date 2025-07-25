import { useState } from 'react';
import { ResumeData } from '@/types/resume';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Label } from '@/components/ui/label';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Briefcase, 
  GraduationCap, 
  Award, 
  Star,
  Edit3,
  Save,
  Plus,
  X
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ResumePreviewProps {
  data: ResumeData;
}

export function ResumePreview({ data: initialData }: ResumePreviewProps) {
  const [data, setData] = useState<ResumeData>(initialData);
  const [editMode, setEditMode] = useState<string | null>(null);
  const [newSkill, setNewSkill] = useState('');
  const { toast } = useToast();

  const updateField = (section: keyof ResumeData, field: string, value: any) => {
    setData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const updateArrayField = (section: keyof ResumeData, index: number, field: string, value: any) => {
    setData(prev => ({
      ...prev,
      [section]: (prev[section] as any[]).map((item, i) => 
        i === index ? { ...item, [field]: value } : item
      )
    }));
  };

  const addSkill = () => {
    if (newSkill.trim()) {
      setData(prev => ({
        ...prev,
        skills: [...prev.skills, newSkill.trim()]
      }));
      setNewSkill('');
    }
  };

  const removeSkill = (index: number) => {
    setData(prev => ({
      ...prev,
      skills: prev.skills.filter((_, i) => i !== index)
    }));
  };

  const saveChanges = () => {
    setEditMode(null);
    toast({
      title: "Changes Saved",
      description: "Your resume information has been updated.",
      duration: 3000,
    });
  };

  const exportData = () => {
    const jsonData = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'resume-data.json';
    a.click();
    URL.revokeObjectURL(url);
    
    toast({
      title: "Data Exported",
      description: "Resume data downloaded as JSON file.",
      duration: 3000,
    });
  };

  const EditButton = ({ section }: { section: string }) => (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => setEditMode(editMode === section ? null : section)}
      className="ml-auto"
    >
      {editMode === section ? <Save className="h-4 w-4" /> : <Edit3 className="h-4 w-4" />}
    </Button>
  );

  return (
    <div className="space-y-6">
      {/* Personal Information */}
      <Card className="glass-card p-6 animate-slide-up">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold flex items-center">
            <User className="h-5 w-5 mr-2 text-primary" />
            Personal Information
          </h3>
          <EditButton section="personal" />
        </div>
        
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="name">Full Name</Label>
            {editMode === 'personal' ? (
              <Input
                id="name"
                value={data.personalInfo.name}
                onChange={(e) => updateField('personalInfo', 'name', e.target.value)}
                className="mt-1"
              />
            ) : (
              <p className="text-lg font-medium mt-1">{data.personalInfo.name}</p>
            )}
          </div>
          
          <div>
            <Label htmlFor="email">Email</Label>
            {editMode === 'personal' ? (
              <Input
                id="email"
                type="email"
                value={data.personalInfo.email}
                onChange={(e) => updateField('personalInfo', 'email', e.target.value)}
                className="mt-1"
              />
            ) : (
              <p className="flex items-center mt-1">
                <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                {data.personalInfo.email}
              </p>
            )}
          </div>
          
          <div>
            <Label htmlFor="phone">Phone</Label>
            {editMode === 'personal' ? (
              <Input
                id="phone"
                value={data.personalInfo.phone}
                onChange={(e) => updateField('personalInfo', 'phone', e.target.value)}
                className="mt-1"
              />
            ) : (
              <p className="flex items-center mt-1">
                <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                {data.personalInfo.phone}
              </p>
            )}
          </div>
          
          <div>
            <Label htmlFor="location">Location</Label>
            {editMode === 'personal' ? (
              <Input
                id="location"
                value={data.personalInfo.location}
                onChange={(e) => updateField('personalInfo', 'location', e.target.value)}
                className="mt-1"
              />
            ) : (
              <p className="flex items-center mt-1">
                <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                {data.personalInfo.location}
              </p>
            )}
          </div>
        </div>
        
        {editMode === 'personal' && (
          <Button onClick={saveChanges} className="mt-4">
            Save Changes
          </Button>
        )}
      </Card>

      {/* Skills */}
      <Card className="glass-card p-6 animate-slide-up">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold flex items-center">
            <Star className="h-5 w-5 mr-2 text-primary" />
            Skills
          </h3>
          <EditButton section="skills" />
        </div>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {data.skills.map((skill, index) => (
            <Badge key={index} variant="secondary" className="text-sm">
              {skill}
              {editMode === 'skills' && (
                <button
                  onClick={() => removeSkill(index)}
                  className="ml-2 hover:text-destructive"
                >
                  <X className="h-3 w-3" />
                </button>
              )}
            </Badge>
          ))}
        </div>
        
        {editMode === 'skills' && (
          <div className="flex gap-2">
            <Input
              placeholder="Add new skill"
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addSkill()}
            />
            <Button onClick={addSkill} size="sm">
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        )}
      </Card>

      {/* Work Experience */}
      <Card className="glass-card p-6 animate-slide-up">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold flex items-center">
            <Briefcase className="h-5 w-5 mr-2 text-primary" />
            Work Experience
          </h3>
          <EditButton section="experience" />
        </div>
        
        <div className="space-y-6">
          {data.workExperience.map((exp, index) => (
            <div key={index} className="border-l-2 border-primary/20 pl-4">
              {editMode === 'experience' ? (
                <div className="space-y-3">
                  <Input
                    value={exp.title}
                    onChange={(e) => updateArrayField('workExperience', index, 'title', e.target.value)}
                    placeholder="Job Title"
                  />
                  <Input
                    value={exp.company}
                    onChange={(e) => updateArrayField('workExperience', index, 'company', e.target.value)}
                    placeholder="Company"
                  />
                  <Input
                    value={exp.duration}
                    onChange={(e) => updateArrayField('workExperience', index, 'duration', e.target.value)}
                    placeholder="Duration"
                  />
                  <Textarea
                    value={exp.description}
                    onChange={(e) => updateArrayField('workExperience', index, 'description', e.target.value)}
                    placeholder="Job Description"
                    rows={3}
                  />
                </div>
              ) : (
                <>
                  <h4 className="font-semibold text-lg">{exp.title}</h4>
                  <p className="text-primary font-medium">{exp.company}</p>
                  <p className="text-sm text-muted-foreground">{exp.duration}</p>
                  <p className="mt-2">{exp.description}</p>
                </>
              )}
            </div>
          ))}
        </div>
        
        {editMode === 'experience' && (
          <Button onClick={saveChanges} className="mt-4">
            Save Changes
          </Button>
        )}
      </Card>

      {/* Education */}
      <Card className="glass-card p-6 animate-slide-up">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold flex items-center">
            <GraduationCap className="h-5 w-5 mr-2 text-primary" />
            Education
          </h3>
          <EditButton section="education" />
        </div>
        
        <div className="space-y-4">
          {data.education.map((edu, index) => (
            <div key={index}>
              {editMode === 'education' ? (
                <div className="space-y-3">
                  <Input
                    value={edu.degree}
                    onChange={(e) => updateArrayField('education', index, 'degree', e.target.value)}
                    placeholder="Degree"
                  />
                  <Input
                    value={edu.institution}
                    onChange={(e) => updateArrayField('education', index, 'institution', e.target.value)}
                    placeholder="Institution"
                  />
                  <Input
                    value={edu.year}
                    onChange={(e) => updateArrayField('education', index, 'year', e.target.value)}
                    placeholder="Year"
                  />
                </div>
              ) : (
                <>
                  <h4 className="font-semibold">{edu.degree}</h4>
                  <p className="text-primary">{edu.institution}</p>
                  <p className="text-sm text-muted-foreground">{edu.year}</p>
                </>
              )}
              {index < data.education.length - 1 && <Separator className="mt-4" />}
            </div>
          ))}
        </div>
        
        {editMode === 'education' && (
          <Button onClick={saveChanges} className="mt-4">
            Save Changes
          </Button>
        )}
      </Card>

      {/* Action Buttons */}
      <div className="flex gap-4 justify-center pt-6">
        <Button onClick={exportData} variant="outline" className="hover-lift">
          Export JSON Data
        </Button>
        <Button className="hover-lift">
          Submit Resume Data
        </Button>
      </div>
    </div>
  );
}
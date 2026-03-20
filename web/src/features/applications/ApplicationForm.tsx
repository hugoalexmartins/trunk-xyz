import { useState, useRef } from 'react';
import { useRouter } from 'next/router';
import { applicationSchema, type ApplicationFormValues } from './applicationSchema';
import { useCreateApplication } from './useCreateApplication';
import { useUploadResume } from './useUploadResume';

const C = {
  canvas:    '#F5F9FC',
  ink:       '#0B1929',
  primary:   '#00D9FF',
  secondary: '#FFB81C',
  accent:    '#FF4D7D',
  muted:     '#4A5A6A',
  faint:     '#8B99A6',
}

const today = new Date().toISOString().split('T')[0];

const labelStyle: React.CSSProperties = {
  fontSize: 13,
  fontWeight: 700,
  color: C.ink,
  display: 'block',
  marginBottom: 6,
}

const errorMsg: React.CSSProperties = {
  fontSize: 12,
  fontWeight: 700,
  color: C.accent,
  marginTop: 4,
}

const helperText: React.CSSProperties = {
  fontSize: 12,
  fontWeight: 600,
  color: C.faint,
  marginTop: 4,
}

function inputStyle(hasError?: boolean): React.CSSProperties {
  return {
    width: '100%',
    height: 36,
    padding: '0 12px',
    border: `3px solid ${hasError ? C.accent : C.ink}`,
    background: C.canvas,
    fontSize: 13,
    fontWeight: 600,
    color: C.ink,
    fontFamily: '"Space Grotesk", system-ui, sans-serif',
    outline: 'none',
    boxSizing: 'border-box' as const,
  }
}

interface ApplicationFormProps {
  showNavControls?: boolean
}

export function ApplicationForm({ showNavControls = true }: ApplicationFormProps) {
  const router = useRouter();
  const { mutate: createApplication, isLoading: isCreating, error: createError } = useCreateApplication();
  const { upload, isUploading, uploadError } = useUploadResume();

  const [values, setValues] = useState<ApplicationFormValues>({
    position: '',
    company: '',
    jobUrl: '',
    jobUrlFile: '',
    date: today,
  });
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const isSubmitting = isCreating || isUploading;

  const handleChange = (field: keyof ApplicationFormValues, value: string) => {
    setValues(prev => ({ ...prev, [field]: value }));
    if (fieldErrors[field]) {
      setFieldErrors(prev => { const next = { ...prev }; delete next[field]; return next; });
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setResumeFile(e.target.files?.[0] ?? null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const result = applicationSchema.safeParse(values);
    if (!result.success) {
      const errs: Record<string, string> = {};
      result.error.issues.forEach((issue) => {
        if (issue.path[0]) errs[issue.path[0] as string] = issue.message;
      });
      setFieldErrors(errs);
      return;
    }

    try {
      let jobUrlFile: string | undefined;
      if (resumeFile) {
        jobUrlFile = await upload(resumeFile);
      }
      await createApplication({ ...result.data, jobUrlFile });
      router.push('/timeline');
    } catch {
      // errors handled by hooks
    }
  };

  const globalError = createError || uploadError;

  const btnBase: React.CSSProperties = {
    padding: '14px 28px',
    fontSize: 15,
    fontWeight: 800,
    border: `4px solid ${C.ink}`,
    boxShadow: `5px 5px 0 ${C.ink}`,
    cursor: isSubmitting ? 'not-allowed' : 'pointer',
    opacity: isSubmitting ? 0.6 : 1,
    transition: 'all .1s',
    fontFamily: '"Space Grotesk", system-ui, sans-serif',
    letterSpacing: '-0.01em',
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {globalError && (
        <div style={{
          padding: '12px 16px',
          background: C.accent,
          border: `3px solid ${C.ink}`,
          fontSize: 13,
          fontWeight: 700,
          color: '#fff',
          fontFamily: '"Space Grotesk", system-ui, sans-serif',
        }}>
          ⚠ {globalError}
        </div>
      )}

      {/* Position */}
      <div>
        <label htmlFor="app-position" style={labelStyle}>Position</label>
        <input
          id="app-position"
          type="text"
          required
          placeholder="Software Engineer"
          value={values.position}
          onChange={e => handleChange('position', e.target.value)}
          disabled={isSubmitting}
          style={{ ...inputStyle(!!fieldErrors.position), opacity: isSubmitting ? 0.5 : 1 }}
        />
        {fieldErrors.position && <p style={errorMsg}>⚠ {fieldErrors.position}</p>}
      </div>

      {/* Company */}
      <div>
        <label htmlFor="app-company" style={labelStyle}>Company</label>
        <input
          id="app-company"
          type="text"
          required
          placeholder="Acme Corp"
          value={values.company}
          onChange={e => handleChange('company', e.target.value)}
          disabled={isSubmitting}
          style={{ ...inputStyle(!!fieldErrors.company), opacity: isSubmitting ? 0.5 : 1 }}
        />
        {fieldErrors.company && <p style={errorMsg}>⚠ {fieldErrors.company}</p>}
      </div>

      {/* Application Date */}
      <div>
        <label htmlFor="app-date" style={labelStyle}>Application Date</label>
        <input
          id="app-date"
          type="date"
          required
          value={values.date}
          onChange={e => handleChange('date', e.target.value)}
          disabled={isSubmitting}
          style={{ ...inputStyle(!!fieldErrors.date), opacity: isSubmitting ? 0.5 : 1 }}
        />
        {fieldErrors.date && <p style={errorMsg}>⚠ {fieldErrors.date}</p>}
      </div>

      {/* Job Posting URL */}
      <div>
        <label htmlFor="app-job-url" style={labelStyle}>Job Posting URL</label>
        <input
          id="app-job-url"
          type="url"
          placeholder="https://example.com/jobs/123"
          value={values.jobUrl}
          onChange={e => handleChange('jobUrl', e.target.value)}
          disabled={isSubmitting}
          style={{ ...inputStyle(!!fieldErrors.jobUrl), opacity: isSubmitting ? 0.5 : 1 }}
        />
        {fieldErrors.jobUrl
          ? <p style={errorMsg}>⚠ {fieldErrors.jobUrl}</p>
          : <p style={helperText}>Optional</p>
        }
      </div>

      {/* Resume PDF */}
      <div>
        <label htmlFor="app-resume" style={labelStyle}>Resume (PDF)</label>
        <input
          id="app-resume"
          ref={fileInputRef}
          type="file"
          accept=".pdf"
          onChange={handleFileChange}
          disabled={isSubmitting}
          style={{
            width: '100%',
            padding: '0 12px',
            height: 36,
            border: `3px solid ${C.ink}`,
            background: C.canvas,
            fontSize: 13,
            fontWeight: 600,
            color: C.ink,
            fontFamily: '"Space Grotesk", system-ui, sans-serif',
            outline: 'none',
            boxSizing: 'border-box' as const,
            cursor: isSubmitting ? 'not-allowed' : 'pointer',
            opacity: isSubmitting ? 0.5 : 1,
          }}
        />
        <p style={helperText}>
          {resumeFile ? resumeFile.name : 'Optional — PDF only, max 10 MB'}
        </p>
      </div>

      {/* Actions */}
      <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', paddingTop: 8 }}>
        <button
          type="submit"
          disabled={isSubmitting}
          style={{ ...btnBase, background: C.primary, color: C.ink }}
        >
          {isUploading ? 'Uploading…' : isCreating ? 'Submitting…' : 'Submit Application →'}
        </button>
        {showNavControls && (
          <button
            type="button"
            disabled={isSubmitting}
            onClick={() => router.back()}
            style={{ ...btnBase, background: C.canvas, color: C.ink }}
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}

'use client';
import React, { useState } from 'react';
import api from "../lib/api";

export default function Home() {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setResult(null);
    setError(null);
  };

  const handleUpload = async () => {
    if (!file) return alert('Please select a file.');
    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await api.post('/import', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setResult(res.data);
    } catch (err) {
      if (err.response && err.response.status === 422) {
        setResult(err.response.data);
      } else {
        setError('Upload failed.');
      }
    } finally {
      setUploading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#f8fafc',
      fontFamily: "'Inter', sans-serif",
      background: 'linear-gradient(135deg, #f9fafb 0%, #f3f4f6 100%)',
    }}>
      <div style={{
        maxWidth: '900px',
        width: '100%',
        background: '#ffffff',
        padding: '2.5rem',
        borderRadius: '16px',
        boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04)',
        border: '1px solid #e5e7eb',
      }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #3b82f6 0%, #6366f1 100%)',
            marginBottom: '1rem',
            boxShadow: '0 4px 6px -1px rgba(59, 130, 246, 0.3)',
          }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
              <polyline points="17 8 12 3 7 8"></polyline>
              <line x1="12" y1="3" x2="12" y2="15"></line>
            </svg>
          </div>
          <h1 style={{ 
            fontSize: '1.75rem',
            fontWeight: '700',
            color: '#111827',
            marginBottom: '0.5rem',
          }}>Excel File Importer</h1>
          <p style={{ color: '#4b5563', marginBottom: '1.5rem' }}>Upload your Excel file to process the data</p>
        </div>

        <div style={{
          border: '2px dashed #d1d5db',
          borderRadius: '12px',
          padding: '2rem',
          textAlign: 'center',
          marginBottom: '2rem',
          transition: 'all 0.2s ease',
          backgroundColor: file ? '#f0fdf4' : '#f9fafb',
          borderColor: file ? '#34d399' : '#d1d5db',
        }}>
          <div style={{ marginBottom: '1rem' }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke={file ? '#34d399' : '#9ca3af'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
              <polyline points="14 2 14 8 20 8"></polyline>
              <path d="M16 13H8"></path>
              <path d="M16 17H8"></path>
              <polyline points="10 9 9 9 8 9"></polyline>
            </svg>
          </div>
          <input 
            type="file" 
            accept=".xlsx,.xls" 
            onChange={handleFileChange} 
            id="file-upload"
            style={{ display: 'none' }}
          />
          <label 
            htmlFor="file-upload"
            style={{
              display: 'inline-block',
              padding: '0.75rem 1.5rem',
              background: '#ffffff',
              color: '#111827',
              border: '1px solid #d1d5db',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: '500',
              boxShadow: '0 1px 2px 0 rgba(0,0,0,0.05)',
              transition: 'all 0.2s ease',
              marginBottom: '1rem',
              ':hover': {
                background: '#f3f4f6',
              }
            }}
          >
            {file ? file.name : 'Choose Excel File'}
          </label>
          <p style={{ color: '#6b7280', fontSize: '0.875rem' }}>.xlsx or .xls files only</p>
        </div>

        <div style={{ textAlign: 'center' }}>
          <button
            onClick={handleUpload}
            disabled={uploading || !file}
            style={{
              padding: '0.875rem 2rem',
              fontSize: '1rem',
              fontWeight: '600',
              background: uploading ? '#9ca3af' : (!file ? '#d1d5db' : 'linear-gradient(135deg, #3b82f6 0%, #6366f1 100%)'),
              color: uploading || !file ? '#4b5563' : '#ffffff',
              border: 'none',
              borderRadius: '8px',
              cursor: uploading || !file ? 'not-allowed' : 'pointer',
              boxShadow: !file || uploading ? 'none' : '0 4px 6px -1px rgba(59, 130, 246, 0.3)',
              transition: 'all 0.2s ease',
              width: '100%',
              maxWidth: '300px',
              ':hover': {
                boxShadow: !file || uploading ? 'none' : '0 6px 8px -1px rgba(59, 130, 246, 0.4)',
                transform: !file || uploading ? 'none' : 'translateY(-1px)',
              }
            }}
          >
            {uploading ? (
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                <svg className="animate-spin" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 12a9 9 0 1 1-6.219-8.56"></path>
                </svg>
                Processing...
              </span>
            ) : 'Upload & Process'}
          </button>
        </div>

        {error && (
          <div style={{
            marginTop: '1.5rem',
            padding: '1rem',
            background: '#fee2e2',
            borderRadius: '8px',
            borderLeft: '4px solid #ef4444',
          }}>
            <p style={{ color: '#b91c1c', fontWeight: '500', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="12"></line>
                <line x1="12" y1="16" x2="12.01" y2="16"></line>
              </svg>
              {error}
            </p>
          </div>
        )}

        {result?.errors && (
          <div style={{ marginTop: '2rem' }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              marginBottom: '1rem',
              paddingBottom: '0.5rem',
              borderBottom: '1px solid #e5e7eb',
            }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="12"></line>
                <line x1="12" y1="16" x2="12.01" y2="16"></line>
              </svg>
              <h3 style={{ 
                fontSize: '1.25rem',
                fontWeight: '600',
                color: '#111827',
              }}>Validation Errors Found</h3>
            </div>
            
            <div style={{ 
              overflowX: 'auto',
              borderRadius: '8px',
              border: '1px solid #e5e7eb',
              boxShadow: '0 1px 3px 0 rgba(0,0,0,0.05)',
            }}>
              <table style={{ 
                width: '100%',
                borderCollapse: 'collapse',
                fontSize: '0.875rem',
              }}>
                <thead style={{ 
                  background: '#f3f4f6',
                  borderBottom: '1px solid #e5e7eb',
                }}>
                  <tr>
                    <th style={{ padding: '0.75rem 1rem', textAlign: 'left', fontWeight: '600', color: '#111827' }}>Row</th>
                    <th style={{ padding: '0.75rem 1rem', textAlign: 'left', fontWeight: '600', color: '#111827' }}>Column</th>
                    <th style={{ padding: '0.75rem 1rem', textAlign: 'left', fontWeight: '600', color: '#111827' }}>Errors</th>
                    <th style={{ padding: '0.75rem 1rem', textAlign: 'left', fontWeight: '600', color: '#111827' }}>Values</th>
                  </tr>
                </thead>
                <tbody>
                  {result.errors.map((err, i) => (
                    <tr key={i} style={{ 
                      borderBottom: i < result.errors.length - 1 ? '1px solid #e5e7eb' : 'none',
                      ':hover': { backgroundColor: '#f9fafb' }
                    }}>
                      <td style={{ padding: '0.75rem 1rem', color: '#111827' }}>{err.row}</td>
                      <td style={{ padding: '0.75rem 1rem', color: '#111827' }}>{err.attribute}</td>
                      <td style={{ padding: '0.75rem 1rem', color: '#ef4444' }}>{err.errors.join(', ')}</td>
                      <td style={{ padding: '0.75rem 1rem', color: '#111827' }}>
                        {Object.entries(err.values).map(([k, v]) => (
                          <div key={k} style={{ marginBottom: '0.25rem' }}>
                            <span style={{ fontWeight: '500', color: '#4b5563' }}>{k}:</span> {v}
                          </div>
                        ))}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {result.download && (
              <div style={{ 
                marginTop: '1.5rem',
                textAlign: 'center',
              }}>
                <a 
                  href={result.download} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  style={{ 
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    padding: '0.75rem 1.5rem',
                    background: '#f3f4f6',
                    color: '#111827',
                    borderRadius: '8px',
                    fontWeight: '500',
                    textDecoration: 'none',
                    transition: 'all 0.2s ease',
                    ':hover': {
                      background: '#e5e7eb',
                    }
                  }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                    <polyline points="7 10 12 15 17 10"></polyline>
                    <line x1="12" y1="15" x2="12" y2="3"></line>
                  </svg>
                  Download Failed Rows (.xlsx)
                </a>
              </div>
            )}
          </div>
        )}

        {result?.message && !result.errors && (
          <div style={{
            marginTop: '1.5rem',
            padding: '1rem',
            background: '#ecfdf5',
            borderRadius: '8px',
            borderLeft: '4px solid #10b981',
            textAlign: 'center',
          }}>
            <p style={{ 
              color: '#065f46', 
              fontWeight: '500',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
            }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
              </svg>
              {result.message}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
import JSZip from 'jszip';
import { useState } from "react";

export const DownloadButton = ({
  quickstart,
  framework,
  label = "Download Sample",
  variant = "primary"
}) => {

  const [isDownloading, setIsDownloading] = useState(false);
  const [error, setError] = useState(null);

  const folderPath = `${quickstart}/${framework}`;

  const downloadFolder = async () => {
    setIsDownloading(true);
    setError(null);

    try {
      const response = await fetch(
        `https://api.github.com/repos/auth0-samples/auth0-ai-samples/contents/${folderPath}`,
        {
          headers: {
            'Accept': 'application/vnd.github.v3+json',
          }
        }
      );

      if (!response.ok) {
        console.log('error occurred')
      }

      const files = await response.json();

      console.log('files', files)

    } catch (err) {
      console.log('error', err);
      setError (err.message  || 'An unexpected error occurred. Please try again.')
    } finally {
      setIsDownloading(false);
    }
  }

  return (
    <div className="download-button-container">
      <button
        onClick={downloadFolder}
        disabled={isDownloading}
        className={`download-button ${variant} ${isDownloading ? 'downloading' : ''}`}
        aria-label={`Download ${quickstart} ${framework} sample code`}
      >
        {isDownloading ? (
          <>
            <svg className="download-spinner" width="16" height="16" viewBox="0 0 24 24">
              <circle 
                cx="12" 
                cy="12" 
                r="10" 
                stroke="currentColor" 
                strokeWidth="2" 
                fill="none" 
                strokeDasharray="31.416" 
                strokeDashoffset="31.416"
              >
                <animate 
                  attributeName="stroke-dasharray" 
                  dur="2s" 
                  values="0 31.416;15.708 15.708;0 31.416" 
                  repeatCount="indefinite"
                />
                <animate 
                  attributeName="stroke-dashoffset" 
                  dur="2s" 
                  values="0;-15.708;-31.416" 
                  repeatCount="indefinite"
                />
              </circle>
            </svg>
            Downloading...
          </>
        ) : (
          <>
            <svg className="download-icon" width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path 
                d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
              <polyline 
                points="7,10 12,15 17,10" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
              <line 
                x1="12" 
                y1="15" 
                x2="12" 
                y2="3" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round"
              />
            </svg>
            {label}
          </>
        )}
      </button>
      
      {error && (
        <div className="download-error" role="alert">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
            <line x1="15" y1="9" x2="9" y2="15" stroke="currentColor" strokeWidth="2"/>
            <line x1="9" y1="9" x2="15" y2="15" stroke="currentColor" strokeWidth="2"/>
          </svg>
          {error}
        </div>
      )}
    </div>
  );
}
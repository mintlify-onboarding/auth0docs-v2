import JSZip from 'jszip';
import { useState } from "react";

export const DownloadQuickstartButton = ({
  quickstart,
  framework,
  label = "Download Sample",
}) => {

  const [isDownloading, setIsDownloading] = useState(false);
  const [error, setError] = useState(null);

  const githubRepo = 'auth0-samples/auth0-ai-samples';
  const folderPath = `${quickstart}/${framework}`;
  const genericErrorMessage = 'An unexpected error occurred. Please try again.';

  const downloadFolder = async () => {
    setIsDownloading(true);
    setError(null);

    try {
      const response = await fetch(
        `https://api.github.com/repos/${githubRepo}/contents/${folderPath}`,
        {
          headers: {
            'Accept': 'application/vnd.github.v3+json',
          }
        }
      );

      if (!response.ok) {
        setError(genericErrorMessage);
      }

      const files = await response.json();

      console.log('files', files)

    } catch (err) {
      console.log('error', err);
      setError (err.message  || genericErrorMessage);
    } finally {
      setIsDownloading(false);
    }
  }

  return (
    <div className="download-button-container">
      <button
        onClick={downloadFolder}
        disabled={isDownloading}
        className={`download-button ${isDownloading ? 'downloading' : ''}`}
        aria-label={`Download ${quickstart} ${framework} sample code`}
      >
        {isDownloading ? (
          <>
            <svg 
              className="download-spinner" 
              width="16" 
              height="16" 
              viewBox="0 0 24 24" 
              fill="none"
            >
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
            <Icon icon="download" color="white"/>
            {label}
          </>
        )}
      </button>
      
      {error && (
        <div className="download-error" role="alert">
          <Icon icon="triangle-exclamation" color="#DC2626"/>
          {error}
        </div>
      )}
    </div>
  );
}
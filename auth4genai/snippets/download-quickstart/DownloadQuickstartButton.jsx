import { useState } from "react";

export const DownloadQuickstartButton = ({
  quickstart,
  framework,
  label = "Download Sample",
}) => {

  const [isDownloading, setIsDownloading] = useState(false);
  const [error, setError] = useState(null);

  const githubRepo = 'auth0-samples/auth0-ai-samples';
  const filename = `${quickstart}-${framework}-sample.zip`;
  const defaultErrorMessage = 'Failed to download sample. Please try again.';

  const downloadFolder = async () => {
    setIsDownloading(true);
    setError(null);

    // TODO: set up when ready, working on script to create releases first
    try {
      const downloadUrl = `https://github.com/${githubRepo}/releases/latest/download/${filename}`;

      console.log('downloadUrl', downloadUrl);
      
      // // Try to download directly
      // const response = await fetch(downloadUrl, { method: 'HEAD' });
      
      // if (!response.ok) {
      //   throw new Error(`Sample not found: ${quickstart}/${framework}`);
      // }

      // // If file exists, trigger download
      // window.location.href = downloadUrl;
      
    } catch (err) {
      setError(err.message || defaultErrorMessage);
    } finally {
      // Reset after brief delay to allow download to start
      setTimeout(() => setIsDownloading(false), 1000);
    }
  };

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
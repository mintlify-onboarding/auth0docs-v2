import JSZip from 'jszip'; // TODO: fix, this is currently not working
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
  const defaultErrorMessage = 'An unexpected error occurred. Please try again.';

  const downloadFolder = async () => {
    setIsDownloading(true);
    setError(null);

    try {
      const zip = new JSZip();
      console.log('zip,', zip) // breaks

      const processDirectory = async (dirPath, dirName = '') => {
        const response = await fetch(
          `https://api.github.com/repos/${githubRepo}/contents/${dirPath}`,
          {
            headers: {
              'Accept': 'application/vnd.github.v3+json',
            }
          }
        );

        if (!response.ok) {
          throw new Error(`Failed to fetch directory: ${dirPath}`);
        }

        const items = await response.json();
        
        const promises = items.map(async (item) => {
          if (item.type === 'file') {
            const fileResponse = await fetch(item.download_url);
            if (fileResponse.ok) {
              const isTextFile = item.name.match(/\.(js|jsx|ts|tsx|json|md|txt|env|yml|yaml)$/i);
              const content = isTextFile 
                ? await fileResponse.text()
                : await fileResponse.arrayBuffer();
              
              const filePath = dirName ? `${dirName}/${item.name}` : item.name;
              zip.file(filePath, content);
            }
          } else if (item.type === 'dir') {
            const subDirName = dirName ? `${dirName}/${item.name}` : item.name;
            await processDirectory(item.path, subDirName);
          }
        });

        await Promise.all(promises);
      };

      // Start processing from the root folder
      await processDirectory(folderPath);
      
      // Generate and download zip
      const blob = await zip.generateAsync({ 
        type: 'blob',
        compression: 'DEFLATE',
        compressionOptions: { level: 6 }
      });
      
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${quickstart}-${framework}-sample.zip`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

    } catch (err) {
      setError(err.message || defaultErrorMessage);
    } finally {
      setIsDownloading(false);
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
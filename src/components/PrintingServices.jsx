import React, { useState, useCallback } from 'react';
import { Upload, Printer, FileText, Settings, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

const PrintingService = () => {
  const [file, setFile] = useState(null);
  const [copies, setCopies] = useState(1);
  const [isColor, setIsColor] = useState(false);
  const [orientation, setOrientation] = useState('portrait');
  const [quality, setQuality] = useState('normal');
  const [isDragging, setIsDragging] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [recentJobs, setRecentJobs] = useState([]); // Store recent print jobs

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) setFile(droppedFile);
  }, []);

  const calculateCost = () => {
    const baseCost = isColor ? 0.50 : 0.10;
    const qualityMultiplier = quality === 'high' ? 1.5 : quality === 'draft' ? 0.8 : 1;
    return (baseCost * copies * qualityMultiplier).toFixed(2);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!file) return;

    // Add new print job to the list
    setRecentJobs((prevJobs) => [
      { id: Date.now(), name: file.name, status: 'Processing', time: 'Just now' },
      ...prevJobs,
    ]);

    // Reset file input
    setFile(null);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-8">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center">
          <Printer className="h-8 w-8 text-blue-600 mr-3" />
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Printing Service</h2>
            <p className="text-gray-500">Upload your documents for printing</p>
          </div>
        </div>
        <button
          onClick={() => setShowAdvanced(!showAdvanced)}
          className="flex items-center px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
        >
          <Settings className="h-5 w-5 mr-2" />
          Advanced Options
        </button>
      </div>

      <form className="space-y-6" onSubmit={handleSubmit}>
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300 ${
            isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-blue-400'
          }`}
        >
          <input
            type="file"
            onChange={(e) => e.target.files?.[0] && setFile(e.target.files[0])}
            className="hidden"
            id="file-upload"
            accept=".pdf,.doc,.docx"
          />
          <label htmlFor="file-upload" className="cursor-pointer flex flex-col items-center">
            <Upload className={`h-16 w-16 mb-4 transition-colors duration-300 ${
              isDragging ? 'text-blue-500' : 'text-gray-400'
            }`} />
            <span className="text-lg text-gray-600 mb-2">
              {file ? file.name : 'Drop your file here or click to browse'}
            </span>
            <span className="text-sm text-gray-500">
              Supports PDF, DOC, DOCX (Max 50MB)
            </span>
          </label>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Number of Copies</label>
            <div className="flex items-center">
              <button
                type="button"
                onClick={() => copies > 1 && setCopies(copies - 1)}
                className="px-3 py-2 border border-gray-300 rounded-l-md hover:bg-gray-50"
              >
                -
              </button>
              <input
                type="number"
                min="1"
                value={copies}
                onChange={(e) => setCopies(Math.max(1, parseInt(e.target.value) || 1))}
                className="w-20 text-center border-y border-gray-300 py-2"
              />
              <button
                type="button"
                onClick={() => setCopies(copies + 1)}
                className="px-3 py-2 border border-gray-300 rounded-r-md hover:bg-gray-50"
              >
                +
              </button>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center text-gray-600">
            <Clock className="h-5 w-5 mr-2" />
            <span>Estimated time: 5-10 minutes</span>
          </div>
          <div className="text-lg font-semibold">
            Total Cost: <span className="text-blue-600">${calculateCost()}</span>
          </div>
        </div>

        <button
          type="submit"
          disabled={!file}
          className={`w-full py-3 px-4 rounded-lg text-white text-lg font-medium transition-all duration-300 ${
            file ? 'bg-blue-600 hover:bg-blue-700 transform hover:scale-[1.02]' : 'bg-gray-400 cursor-not-allowed'
          }`}
        >
          Submit Print Job
        </button>
      </form>

      <div className="mt-8">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Recent Print Jobs</h3>
        <div className="space-y-4">
          {recentJobs.length > 0 ? (
            recentJobs.map((job) => (
              <div
                key={job.id}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center">
                  <FileText className="h-5 w-5 text-gray-500 mr-3" />
                  <div>
                    <span className="font-medium text-gray-800">{job.name}</span>
                    <p className="text-sm text-gray-500">{job.time}</p>
                  </div>
                </div>
                <span className="px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-700">
                  {job.status}
                </span>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No recent print jobs.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PrintingService;

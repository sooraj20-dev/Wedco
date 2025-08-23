import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDropzone } from 'react-dropzone';
import {
  Upload, Image as ImageIcon, Type, Sliders, Download, Link as LinkIcon,
  Check, Crop, RotateCw, Palette, Smartphone, Monitor, RefreshCw, Sparkles, X
} from 'lucide-react';

export default function Invitations() {
  // State for invitation data
  const [invitationData, setInvitationData] = useState({
    couplePhoto: null,
    backgroundImage: null,
    names: { firstPerson: 'Sarah', secondPerson: 'Michael' },
    date: new Date().toISOString().split('T')[0],
    time: '16:00',
    venue: 'Sunset Garden Resort',
    rsvpLink: 'https://ourwedding.com/sarah-michael',
    style: 'classic',
    fontFamily: 'Playfair Display',
    colorScheme: '#8B5FBF'
  });

  const [previewMode, setPreviewMode] = useState('desktop');
  const [isFlipped, setIsFlipped] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [exportSuccess, setExportSuccess] = useState(false);

  // Available options
  const fontOptions = ['Playfair Display', 'Cormorant Garamond', 'Montserrat'];
  const colorSchemes = [
    { name: 'Royal Purple', value: '#8B5FBF' },
    { name: 'Blush Pink', value: '#FF9EB5' },
    { name: 'Golden', value: '#D4AF37' }
  ];
  const styleOptions = [
    { name: 'Classic', value: 'classic' },
    { name: 'Modern', value: 'modern' },
    { name: 'Rustic', value: 'rustic' }
  ];

  // Image upload handlers
  const onDropCouplePhoto = (acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      setInvitationData({
        ...invitationData,
        couplePhoto: Object.assign(file, {
          preview: URL.createObjectURL(file)
        })
      });
    }
  };

  const onDropBackground = (acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      setInvitationData({
        ...invitationData,
        backgroundImage: Object.assign(file, {
          preview: URL.createObjectURL(file)
        })
      });
    }
  };

  const { getRootProps: getCouplePhotoRootProps, getInputProps: getCouplePhotoInputProps } = useDropzone({
    accept: {'image/*': ['.jpeg', '.jpg', '.png']},
    multiple: false,
    onDrop: onDropCouplePhoto
  });

  const { getRootProps: getBackgroundRootProps, getInputProps: getBackgroundInputProps } = useDropzone({
    accept: {'image/*': ['.jpeg', '.jpg', '.png']},
    multiple: false,
    onDrop: onDropBackground
  });

  // Update form data
  const updateInvitationData = (field, value, nestedField = null) => {
    if (nestedField) {
      setInvitationData({
        ...invitationData,
        [field]: {
          ...invitationData[field],
          [nestedField]: value
        }
      });
    } else {
      setInvitationData({
        ...invitationData,
        [field]: value
      });
    }
  };

  // Export handlers
  const exportInvitation = async (format) => {
    setIsExporting(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setExportSuccess(true);
    setTimeout(() => setExportSuccess(false), 3000);
    setIsExporting(false);
  };

  // Format date and time for display
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const formatTime = (timeString) => {
    const [hours, minutes] = timeString.split(':');
    const period = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 || 12;
    return `${formattedHours}:${minutes} ${period}`;
  };

  return (
<div className="pt-20">
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="max-w-6xl mx-auto px-4 pt-8 pb-4">
        <h1 className="text-3xl font-bold text-gray-800">Create Your Wedding Invitation</h1>
      </div>

      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Panel - Form */}
        <div className="lg:col-span-5 space-y-6">
          {/* Image Upload */}
          <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <Upload className="mr-2" size={20} />
              Upload Images
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600 mb-2">Couple's Photo</p>
                <div {...getCouplePhotoRootProps()} className="border-2 border-dashed rounded-lg p-4 flex flex-col items-center justify-center cursor-pointer">
                  <input {...getCouplePhotoInputProps()} />
                  {invitationData.couplePhoto ? (
                    <img src={invitationData.couplePhoto.preview} alt="Couple" className="h-32 object-cover rounded" />
                  ) : (
                    <>
                      <ImageIcon className="text-gray-400 mb-2" size={36} />
                      <p className="text-sm text-gray-500">Drag & drop photo</p>
                    </>
                  )}
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-2">Background</p>
                <div {...getBackgroundRootProps()} className="border-2 border-dashed rounded-lg p-4 flex flex-col items-center justify-center cursor-pointer">
                  <input {...getBackgroundInputProps()} />
                  {invitationData.backgroundImage ? (
                    <img src={invitationData.backgroundImage.preview} alt="Background" className="h-32 object-cover rounded" />
                  ) : (
                    <>
                      <ImageIcon className="text-gray-400 mb-2" size={36} />
                      <p className="text-sm text-gray-500">Drag & drop background</p>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Design Options */}
          <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <Sliders className="mr-2" size={20} />
              Design Options
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Style</label>
                <div className="grid grid-cols-3 gap-2">
                  {styleOptions.map(style => (
                    <button
                      key={style.value}
                      onClick={() => updateInvitationData('style', style.value)}
                      className={`p-2 rounded-md text-sm ${
                        invitationData.style === style.value
                          ? 'bg-purple-100 text-purple-700 border border-purple-300'
                          : 'bg-gray-100 text-gray-700'
                      }`}
                    >
                      {style.name}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Color</label>
                <div className="flex gap-2">
                  {colorSchemes.map(color => (
                    <button
                      key={color.value}
                      onClick={() => updateInvitationData('colorScheme', color.value)}
                      className={`w-8 h-8 rounded-full ${invitationData.colorScheme === color.value ? 'ring-2 ring-offset-2 ring-gray-400' : ''}`}
                      style={{ backgroundColor: color.value }}
                    />
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Font</label>
                <select
                  value={invitationData.fontFamily}
                  onChange={(e) => updateInvitationData('fontFamily', e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md"
                >
                  {fontOptions.map(font => (
                    <option key={font} value={font}>{font}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Text Content */}
          <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <Type className="mr-2" size={20} />
              Invitation Text
            </h2>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                  <input
                    type="text"
                    value={invitationData.names.firstPerson}
                    onChange={(e) => updateInvitationData('names', e.target.value, 'firstPerson')}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Second Name</label>
                  <input
                    type="text"
                    value={invitationData.names.secondPerson}
                    onChange={(e) => updateInvitationData('names', e.target.value, 'secondPerson')}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                  <input
                    type="date"
                    value={invitationData.date}
                    onChange={(e) => updateInvitationData('date', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
                  <input
                    type="time"
                    value={invitationData.time}
                    onChange={(e) => updateInvitationData('time', e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Venue</label>
                <input
                  type="text"
                  value={invitationData.venue}
                  onChange={(e) => updateInvitationData('venue', e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">RSVP Link</label>
                <input
                  type="text"
                  value={invitationData.rsvpLink}
                  onChange={(e) => updateInvitationData('rsvpLink', e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
            </div>
          </div>

          {/* Export */}
          <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <Download className="mr-2" size={20} />
              Export
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => exportInvitation('png')}
                disabled={isExporting}
                className="py-2 px-4 bg-purple-600 text-white rounded-md flex items-center justify-center"
              >
                {isExporting ? <RefreshCw className="animate-spin mr-2" /> : <Download className="mr-2" />}
                PNG
              </button>
              <button
                onClick={() => exportInvitation('link')}
                disabled={isExporting}
                className="py-2 px-4 bg-pink-600 text-white rounded-md flex items-center justify-center"
              >
                {isExporting ? <RefreshCw className="animate-spin mr-2" /> : <LinkIcon className="mr-2" />}
                Share Link
              </button>
            </div>
            {exportSuccess && (
              <div className="mt-4 p-2 bg-green-100 text-green-800 rounded-md text-sm flex items-center">
                <Check className="mr-2" /> Export successful!
              </div>
            )}
          </div>
        </div>

        {/* Right Panel - Preview */}
        <div className="lg:col-span-7">
          <div className="bg-white rounded-xl shadow p-6 sticky top-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold flex items-center">
                <ImageIcon className="mr-2" size={20} />
                Preview
              </h2>
              <div className="flex bg-gray-100 rounded-md p-1">
                <button
                  onClick={() => setPreviewMode('desktop')}
                  className={`py-1 px-3 rounded ${previewMode === 'desktop' ? 'bg-white shadow' : ''}`}
                >
                  <Monitor size={16} />
                </button>
                <button
                  onClick={() => setPreviewMode('mobile')}
                  className={`py-1 px-3 rounded ${previewMode === 'mobile' ? 'bg-white shadow' : ''}`}
                >
                  <Smartphone size={16} />
                </button>
              </div>
            </div>

            <div className="flex justify-center">
              <div 
                className={`relative ${previewMode === 'mobile' ? 'w-64' : 'w-full max-w-lg'}`}
                onClick={() => setIsFlipped(!isFlipped)}
              >
                <motion.div
                  className="relative w-full shadow-xl rounded-xl overflow-hidden"
                  style={{
                    aspectRatio: previewMode === 'mobile' ? '9/16' : '16/9',
                    backgroundColor: invitationData.colorScheme,
                    backgroundImage: invitationData.backgroundImage 
                      ? `url(${invitationData.backgroundImage.preview})`
                      : 'none',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                  }}
                  animate={{ rotateY: isFlipped ? 180 : 0 }}
                  transition={{ duration: 0.6 }}
                >
                  {/* Front Side */}
                  {!isFlipped && (
                    <div className="absolute inset-0 p-8 flex flex-col items-center justify-center text-center text-white">
                      {invitationData.couplePhoto && (
                        <img 
                          src={invitationData.couplePhoto.preview} 
                          alt="Couple" 
                          className="w-32 h-32 rounded-full object-cover mb-6 border-4 border-white"
                        />
                      )}
                      <h2 
                        className="text-3xl font-bold mb-2"
                        style={{ fontFamily: invitationData.fontFamily }}
                      >
                        {invitationData.names.firstPerson} & {invitationData.names.secondPerson}
                      </h2>
                      <p className="text-xl mb-6">Invite you to celebrate their wedding</p>
                      <div className="mb-6">
                        <p className="text-lg">{formatDate(invitationData.date)}</p>
                        <p className="text-lg">{formatTime(invitationData.time)}</p>
                      </div>
                      <p className="text-lg">{invitationData.venue}</p>
                    </div>
                  )}

                  {/* Back Side */}
                  {isFlipped && (
                    <div 
                      className="absolute inset-0 p-8 flex flex-col items-center justify-center text-center text-white"
                      style={{ 
                        backgroundColor: invitationData.colorScheme,
                        transform: 'rotateY(180deg)'
                      }}
                    >
                      <h3 className="text-2xl font-bold mb-4">We Can't Wait To Celebrate With You!</h3>
                      <p className="mb-6">Please RSVP by June 1st</p>
                      <a 
                        href={invitationData.rsvpLink} 
                        className="px-6 py-2 bg-white text-purple-600 rounded-full font-medium"
                      >
                        RSVP Now
                      </a>
                    </div>
                  )}
                </motion.div>
                <div className="mt-2 text-center text-sm text-gray-500">
                  Click to {isFlipped ? 'see front' : 'see back'}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
</div>
  );
}
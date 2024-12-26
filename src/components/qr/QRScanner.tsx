'use client';

import { useEffect, useRef, useState } from 'react';
import { Html5Qrcode, Html5QrcodeSupportedFormats } from 'html5-qrcode';
import { useRouter } from 'next/navigation';
import { X, Camera } from 'lucide-react';

interface QRScannerProps {
  onClose: () => void;
}

export default function QRScanner({ onClose }: QRScannerProps) {
  const router = useRouter();
  const scannerRef = useRef<Html5Qrcode | null>(null);
  const [hasScanned, setHasScanned] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    
    const initializeScanner = async () => {
      try {
        scannerRef.current = new Html5Qrcode('qr-reader', {
          verbose: false,
          formatsToSupport: [Html5QrcodeSupportedFormats.QR_CODE]
        });
        
        const config = {
          fps: 10,
          qrbox: { width: 250, height: 250 },
          aspectRatio: 1.0,
          showTorchButtonIfSupported: true,
        };

        // For iOS, we need to use specific constraints
        const constraints = {
          facingMode: "environment",
          width: { min: 640, ideal: 1280, max: 1920 },
          height: { min: 480, ideal: 720, max: 1080 }
        };

        await scannerRef.current.start(
          constraints,
          config,
          async (decodedText) => {
            if (!hasScanned && isMounted) {
              setHasScanned(true);
              
              if (scannerRef.current?.isScanning) {
                await scannerRef.current.stop();
                scannerRef.current = null;
              }
              
              onClose();
              router.push(`/bill/${decodedText}`);
            }
          },
          () => {} // Ignore continuous scanning errors
        );
      } catch (error: any) {
        console.error('Scanner error:', error);
        setError('Unable to access camera. Please make sure you\'re using Safari and have granted camera permissions.');
      }
    };

    if (!hasScanned) {
      initializeScanner();
    }

    return () => {
      isMounted = false;
      if (scannerRef.current?.isScanning) {
        scannerRef.current.stop().then(() => {
          scannerRef.current = null;
        }).catch(() => {});
      }
    };
  }, [router, onClose, hasScanned]);

  const handleRetry = () => {
    setError(null);
    setHasScanned(false);
  };

  const handleClose = async () => {
    if (scannerRef.current?.isScanning) {
      try {
        await scannerRef.current.stop();
        scannerRef.current = null;
      } catch (error) {
        // Ignore stop errors
      }
    }
    onClose();
  };

  if (error) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
        <div className="bg-white rounded-2xl p-6 mx-4 max-w-sm w-full">
          <div className="text-center">
            <Camera className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Camera Access Required</h3>
            <p className="text-sm text-gray-600 mb-4">{error}</p>
            <div className="space-y-3">
              <button
                onClick={handleRetry}
                className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Try Again
              </button>
              <button
                onClick={handleClose}
                className="w-full bg-gray-100 text-gray-700 py-2 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
      <div className="relative w-full max-w-sm mx-4">
        <button 
          onClick={handleClose}
          className="absolute -top-12 right-0 text-white p-2 hover:bg-white/10 rounded-full transition-colors"
        >
          <X className="h-6 w-6" />
        </button>

        <div className="bg-white rounded-2xl overflow-hidden">
          <div className="px-4 py-3 border-b">
            <h3 className="text-lg font-semibold text-center text-gray-900">
              Scan QR Code
            </h3>
          </div>

          <div className="relative">
            <div 
              id="qr-reader" 
              className="w-full aspect-square bg-black"
              style={{ minHeight: '300px' }}
            />
            
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-64 h-64 border-2 border-blue-500 rounded-2xl">
                <div className="absolute inset-0 border-2 border-blue-500 rounded-2xl animate-pulse" />
                <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-blue-500 rounded-tl" />
                <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-blue-500 rounded-tr" />
                <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-blue-500 rounded-bl" />
                <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-blue-500 rounded-br" />
              </div>
            </div>
          </div>

          <div className="px-4 py-3 bg-gray-50">
            <p className="text-sm text-gray-700 text-center">
              Position the QR code within the frame
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 
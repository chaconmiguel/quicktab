'use client';

import { useEffect, useRef, useState } from 'react';
import { Html5Qrcode } from 'html5-qrcode';
import { useRouter } from 'next/navigation';
import { X } from 'lucide-react';

export default function QRScanner({ onClose }: { onClose: () => void }) {
  const router = useRouter();
  const qrRef = useRef<Html5Qrcode | null>(null);
  const [error, setError] = useState<string>('');
  const [isScanning, setIsScanning] = useState(false);

  useEffect(() => {
    // Only create the scanner if it hasn't been created yet
    if (!qrRef.current) {
      qrRef.current = new Html5Qrcode('qr-reader');
    }

    const startScanner = async () => {
      try {
        if (!qrRef.current) return;

        await qrRef.current.start(
          { facingMode: "environment" },
          {
            fps: 10,
            qrbox: { width: 250, height: 250 },
            aspectRatio: 1,
          },
          (decodedText) => {
            handleSuccess(decodedText);
          },
          () => {
            // Ignore errors during scanning
          }
        );
        setIsScanning(true);
      } catch (err) {
        setError('Camera access denied. Please allow camera access and try again.');
        setIsScanning(false);
      }
    };

    startScanner();

    // Cleanup function
    return () => {
      const stopScanner = async () => {
        if (qrRef.current && isScanning) {
          try {
            await qrRef.current.stop();
            setIsScanning(false);
          } catch (err) {
            // Ignore stop errors during cleanup
          }
        }
      };
      stopScanner();
    };
  }, []);

  const handleSuccess = async (decodedText: string) => {
    if (qrRef.current && isScanning) {
      try {
        await qrRef.current.stop();
        setIsScanning(false);
        router.push(`/bill/${decodedText}`);
        onClose();
      } catch (err) {
        console.error("Error stopping scanner:", err);
      }
    }
  };

  const handleClose = async () => {
    if (qrRef.current && isScanning) {
      try {
        await qrRef.current.stop();
        setIsScanning(false);
      } catch (err) {
        // Ignore stop errors
      }
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
      <div className="relative w-full max-w-sm mx-4">
        <button 
          onClick={handleClose}
          className="absolute -top-12 right-0 text-white p-2 hover:bg-white/10 rounded-full transition-colors"
        >
          <X className="w-6 h-6" />
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
            {error ? (
              <p className="text-sm text-red-600 text-center">{error}</p>
            ) : (
              <p className="text-sm text-gray-600 text-center">
                Position the QR code within the frame
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 
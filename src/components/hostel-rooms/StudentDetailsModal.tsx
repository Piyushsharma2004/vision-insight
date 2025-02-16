import { X, User, Phone, MapPin } from 'lucide-react';
import type { Room, Student } from './types';

interface StudentDetailsModalProps {
  showModal: boolean;
  selectedRoom: Room | null;
  studentDetails: Student | null;
  loadingStudent: boolean;
  onClose: () => void;
}

export const StudentDetailsModal = ({
  showModal,
  selectedRoom,
  studentDetails,
  loadingStudent,
  onClose,
}: StudentDetailsModalProps) => {
  if (!showModal || !selectedRoom) return null;

  // Loading state component
  const LoadingState = () => (
    <div className="flex items-center justify-center py-8">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 dark:border-blue-400"></div>
    </div>
  );

  // Empty state component
  const EmptyState = () => (
    <div className="text-center py-8">
      <div className="bg-gray-100 dark:bg-gray-800 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
        <User className="h-8 w-8 text-gray-400 dark:text-gray-500" />
      </div>
      <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
        No Student Details Available
      </h3>
      <p className="text-gray-600 dark:text-gray-400">
        No student information found for this room.
      </p>
    </div>
  );

  // Room information section
  const RoomInformation = () => (
    <div className="mb-8">
      <h3 className="text-lg font-semibold mb-4 dark:text-white">Room Information</h3>
      <div className="grid grid-cols-2 gap-4 bg-gray-50 dark:bg-gray-800 p-4 rounded-xl">
        {[
          { label: 'Block', value: selectedRoom.block },
          { label: 'Section', value: selectedRoom.section },
          { label: 'Type', value: selectedRoom.hostel_type },
          { 
            label: 'Status', 
            value: selectedRoom.status ? 'Occupied' : 'Available',
            className: selectedRoom.status ? 'text-red-600 dark:text-red-400' : 'text-green-600 dark:text-green-400'
          }
        ].map(({ label, value, className = '' }) => (
          <div key={label}>
            <p className="text-sm text-gray-600 dark:text-gray-400">{label}</p>
            <p className={`font-medium dark:text-gray-200 ${className}`}>{value}</p>
          </div>
        ))}
      </div>
    </div>
  );

  // Student basic information section
  const StudentBasicInfo = () => (
    <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-xl">
      <div className="flex items-center gap-4 mb-4">
        <div className="bg-white dark:bg-gray-700 p-3 rounded-full">
          <User className="h-8 w-8 text-gray-400 dark:text-gray-300" />
        </div>
        <div>
          <h4 className="text-lg font-medium dark:text-white">{studentDetails?.student_name}</h4>
          <p className="text-sm text-gray-600 dark:text-gray-400">{studentDetails?.registration_number}</p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-sm text-gray-600 dark:text-gray-400">Father Name</p>
          <p className="font-medium dark:text-gray-200">{studentDetails?.father_name}</p>
        </div>
        <div>
          <p className="text-sm text-gray-600 dark:text-gray-400">Course</p>
          <p className="font-medium dark:text-gray-200">{studentDetails?.course}</p>
        </div>
      </div>
    </div>
  );

  // Contact information section
  const ContactInformation = () => (
    <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-xl space-y-4">
      <h4 className="font-medium dark:text-white">Contact Information</h4>
      <div className="space-y-3">
        {[
          { label: 'Student', number: studentDetails?.student_mobile_number },
          { label: 'Father', number: studentDetails?.father_mobile_number },
          { label: 'Mother', number: studentDetails?.mother_mobile_number }
        ].map(({ label, number }) => (
          <div key={label} className="flex items-center gap-2">
            <Phone className="h-4 w-4 text-gray-400 dark:text-gray-500" />
            <div>
              <p className="text-sm font-medium dark:text-gray-200">{number}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">{label}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // Address section
  const AddressInformation = () => (
    <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-xl">
      <h4 className="font-medium mb-2 dark:text-white">Address</h4>
      <div className="flex items-start gap-2">
        <MapPin className="h-4 w-4 text-gray-400 dark:text-gray-500 mt-1" />
        <p className="text-sm text-gray-600 dark:text-gray-400">{studentDetails?.address}</p>
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 dark:bg-opacity-60 flex items-center justify-center z-[9999999]">
      <div className="bg-white dark:bg-gray-900 rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        {/* Modal Header */}
        <div className="p-6 border-b border-gray-100 dark:border-gray-800">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Room {selectedRoom.room_number} Details
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-colors"
            >
              <X className="h-6 w-6 text-gray-500 dark:text-gray-400" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6">
          <RoomInformation />
          
          {loadingStudent ? (
            <LoadingState />
          ) : !studentDetails ? (
            <EmptyState />
          ) : (
            <div className="space-y-6">
              <StudentBasicInfo />
              <ContactInformation />
              <AddressInformation />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
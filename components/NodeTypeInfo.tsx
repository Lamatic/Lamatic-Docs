import React from 'react';

interface NodeTypeInfoProps {
  batchTrigger: boolean;
  eventTrigger: boolean;
  action: boolean;
  description?: string;
}

export const NodeTypeInfo: React.FC<NodeTypeInfoProps> = ({
  batchTrigger,
  eventTrigger,
  action,
  description
}) => {
  return (
    <div className="my-6">
      <h3 className="text-lg text-black dark:text-white font-semibold mb-4">Node Type Information</h3>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-50">
              <th className="border border-gray-300 px-4 py-2 text-left font-medium">Type</th>
              <th className="border border-gray-300 px-4 py-2 text-left font-medium">Description</th>
              <th className="border border-gray-300 px-4 py-2 text-left font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-gray-300 px-4 py-2 font-medium">Batch Trigger</td>
              <td className="border border-gray-300 px-4 py-2">
                Starts the flow on a schedule or batch event. Ideal for periodic data processing.
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {batchTrigger ? (
                  <span className="text-green-600 font-medium">✅ True</span>
                ) : (
                  <span className="text-red-600 font-medium">❌ False</span>
                )}
              </td>
            </tr>
            <tr>
              <td className="border border-gray-300 px-4 py-2 font-medium">Event Trigger</td>
              <td className="border border-gray-300 px-4 py-2">
                Starts the flow based on external events (e.g., webhook, user interaction).
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {eventTrigger ? (
                  <span className="text-green-600 font-medium">✅ True</span>
                ) : (
                  <span className="text-red-600 font-medium">❌ False</span>
                )}
              </td>
            </tr>
            <tr>
              <td className="border border-gray-300 px-4 py-2 font-medium">Action</td>
              <td className="border border-gray-300 px-4 py-2">
                Executes a task or logic as part of the flow (e.g., API call, transformation).
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {action ? (
                  <span className="text-green-600 font-medium">✅ True</span>
                ) : (
                  <span className="text-red-600 font-medium">❌ False</span>
                )}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      {description && (
        <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-md">
          <p className="text-sm text-blue-800">
            {description}
          </p>
        </div>
      )}
    </div>
  );
}; 